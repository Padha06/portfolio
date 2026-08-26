import { CRT_FRAGMENT_SHADER, CRT_VERTEX_SHADER } from "./crtShaders";

export type CrtOptions = {
  speed: number;
  typeSpeed: number;
  motion: number;
  brightness: number;
  opacity: number;
  hue: number;
  saturation: number;
};

export const CRT_DEFAULTS: CrtOptions = {
  speed: 1,
  typeSpeed: 1,
  motion: 1,
  brightness: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
};

type Segment = { t: string; c: "p" | "d" | "a" | "h" };

const segment = (text: string, color: Segment["c"] = "p"): Segment => ({
  t: text,
  c: color,
});
const dots = (count: number) => "·".repeat(count);

const LOG: Segment[][] = [
  [segment("VASKOI SYSTEMS  v3.12.0"), segment("   (c) 2026 Shubham Padha", "d")],
  [segment("Initializing dev environment  Rev S  S/N VK-2026-0001", "d")],
  [],
  [segment("Loading Python runtime       "), segment(`${dots(14)} `, "d"), segment("OK", "a")],
  [segment("Virtual env  .venv/bin/python "), segment(`${dots(8)} `, "d"), segment("ACTIVE "), segment("OK", "a")],
  [segment("pip install dependencies     "), segment(`${dots(6)} `, "d"), segment("347 packages")],
  [segment("django      5.1.4            "), segment(`${dots(4)} `, "d"), segment("READY", "a")],
  [segment("fastapi     0.115.6          "), segment(`${dots(4)} `, "d"), segment("READY", "a")],
  [segment("sqlalchemy  2.0.36           "), segment(`${dots(4)} `, "d"), segment("READY", "a")],
  [segment("celery      5.4.0            "), segment(`${dots(4)} `, "d"), segment("READY", "a")],
  [segment("Connecting to PostgreSQL     "), segment(`${dots(8)} `, "d"), segment("ONLINE", "a")],
  [segment("Redis cache  127.0.0.1:6379  "), segment(`${dots(4)} `, "d"), segment("LINK", "a")],
  [segment("Running migrations           "), segment(`${dots(6)} `, "d"), segment("OK", "a")],
  [segment("Starting uvicorn workers [4] "), segment(`${dots(4)} `, "d"), segment("OK", "a")],
  [segment("API endpoints loaded         "), segment(`${dots(6)} `, "d"), segment("23 routes")],
  [],
  [segment("STATUS: "), segment("ALL SYSTEMS NOMINAL", "h")],
  [segment("Build. Connect. Scale.", "d"), segment("  >> ", "d")],
  [],
];

const COLORS = {
  p: { fill: "#dc2626", glow: "rgba(220,38,38,0.95)" },
  d: { fill: "#991b1b", glow: "rgba(220,38,38,0.45)" },
  a: { fill: "#fbbf24", glow: "rgba(251,191,36,0.95)" },
  h: { fill: "#fef2f2", glow: "rgba(254,242,242,0.95)" },
};

const lineLength = (line: Segment[]) =>
  line.reduce((total, item) => total + item.t.length, 0);

const TOTAL = LOG.reduce((total, line) => total + lineLength(line), 0);
const MAX_CHARS = Math.max(...LOG.map(lineLength));

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create CRT shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info ?? "CRT shader compilation failed");
  }
  return shader;
}

export function createCrtRenderer(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  getOptions: () => CrtOptions
) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) throw new Error("CRT requires WebGL");

  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");
  if (!textCtx) throw new Error("CRT text canvas unavailable");

  const vs = compile(gl, gl.VERTEX_SHADER, CRT_VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, CRT_FRAGMENT_SHADER);
  const prog = gl.createProgram();
  if (!prog) throw new Error("Unable to create CRT program");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(info ?? "CRT link failed");
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTex = gl.getUniformLocation(prog, "uTex");
  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uMotion = gl.getUniformLocation(prog, "uMotion");

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(uTex, 0);

  let W = 1, H = 1;
  let fontSize = 14, lineHeight = 20, startY = 0, charWidth = 8;
  let caretX = 0, caretY = 0;
  let typed = 0, done = false;
  let textDirty = true, lastReveal = -1, lastBlink = -1;
  const t0 = performance.now();

  const layout = () => {
    startY = H * 0.135;
    lineHeight = (H * 0.74) / LOG.length;
    fontSize = Math.max(5, Math.min(lineHeight * 0.8, (W * 0.88) / (Math.max(MAX_CHARS, 1) * 0.62)));
    textCtx.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
    charWidth = textCtx.measureText("M").width || fontSize * 0.6;
  };

  const setStyle = (key: Segment["c"]) => {
    const c = COLORS[key];
    textCtx.fillStyle = c.fill;
    textCtx.shadowColor = c.glow;
    textCtx.shadowBlur = fontSize * 0.55;
  };

  const drawScreen = (reveal: number) => {
    textCtx.setTransform(1, 0, 0, 1, 0, 0);
    textCtx.fillStyle = "#0a0a0a";
    textCtx.fillRect(0, 0, W, H);
    textCtx.textBaseline = "top";
    textCtx.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;

    let remaining = reveal, y = startY;
    caretX = Math.floor((W - MAX_CHARS * charWidth) / 2);
    caretY = startY;

    for (const line of LOG) {
      const len = lineLength(line);
      const vis = reveal === Infinity ? Infinity : Math.min(remaining, len);
      let x = Math.floor((W - MAX_CHARS * charWidth) / 2), drawn = 0;

      for (const item of line) {
        let text = item.t;
        if (vis !== Infinity) {
          const left = vis - drawn;
          if (left <= 0) break;
          if (left < text.length) text = text.slice(0, left);
        }
        if (text.length) {
          setStyle(item.c);
          textCtx.fillText(text, x, y);
          x += charWidth * text.length;
        }
        drawn += item.t.length;
        if (vis !== Infinity && drawn >= vis) break;
      }

      caretX = x;
      caretY = y;
      if (vis !== Infinity) remaining -= vis;
      y += lineHeight;
      if (vis !== Infinity && remaining <= 0) break;
    }
  };

  const drawCursor = () => {
    textCtx.shadowColor = COLORS.p.glow;
    textCtx.shadowBlur = fontSize * 0.6;
    textCtx.fillStyle = "#f87171";
    textCtx.fillRect(caretX, caretY + fontSize * 0.06, Math.max(charWidth * 0.92, 4), fontSize * 0.96);
  };

  const uploadTexture = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    textDirty = false;
  };

  const resize = () => {
    const bounds = host.getBoundingClientRect();
    const vw = Math.max(1, bounds.width);
    const vh = Math.max(1, bounds.height);
    const scale = vw < 700 ? 0.82 : 0.55;
    const bw = Math.min(Math.round(vw * scale), 920);
    const bh = Math.round((bw * vh) / vw);

    if (canvas.width !== bw || canvas.height !== bh || W !== bw) {
      canvas.width = bw;
      canvas.height = bh;
      textCanvas.width = bw;
      textCanvas.height = bh;
      W = bw;
      H = bh;
      layout();
      lastReveal = -1;
      lastBlink = -1;
      textDirty = true;
    }
    gl.viewport(0, 0, bw, bh);
    gl.uniform2f(uRes, bw, bh);
  };

  const render = (now: number) => {
    const opts = getOptions();

    // Advance typewriter
    if (!done) {
      typed += 4.4 * opts.typeSpeed;
      if (typed >= TOTAL) { typed = TOTAL; done = true; }
    }

    // Redraw text when needed
    const reveal = done ? Infinity : Math.floor(typed);
    const blink = Math.floor((now - t0) / 420) % 2 === 0 ? 1 : 0;
    const needsRedraw = reveal !== lastReveal || blink !== lastBlink;

    if (needsRedraw) {
      drawScreen(reveal);
      if (blink) drawCursor();
      lastReveal = reveal;
      lastBlink = blink;
      textDirty = true;
    }

    // Upload and draw
    if (textDirty) uploadTexture();

    gl.useProgram(prog);
    gl.uniform1f(uTime, (now - t0) * 0.001 * opts.speed);
    gl.uniform1f(uMotion, opts.motion);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const dispose = () => {
    gl.deleteBuffer(buf);
    gl.deleteTexture(tex);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };

  return { resize, render, dispose };
}
