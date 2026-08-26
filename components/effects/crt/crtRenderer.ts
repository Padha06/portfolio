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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(
      gl.getShaderInfoLog(shader) ?? "CRT shader compilation failed"
    );
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
  });
  if (!gl) throw new Error("CRT requires WebGL");

  const textCanvas = document.createElement("canvas"),
    textContext = textCanvas.getContext("2d");
  if (!textContext) throw new Error("CRT text canvas unavailable");

  const vertex = compile(gl, gl.VERTEX_SHADER, CRT_VERTEX_SHADER),
    fragment = compile(gl, gl.FRAGMENT_SHADER, CRT_FRAGMENT_SHADER),
    program = gl.createProgram();
  if (!program) throw new Error("Unable to create CRT program");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program) ?? "CRT link failed");
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const position = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uTexture = gl.getUniformLocation(program, "uTex"),
    uResolution = gl.getUniformLocation(program, "uRes"),
    uTime = gl.getUniformLocation(program, "uTime"),
    uMotion = gl.getUniformLocation(program, "uMotion"),
    texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(uTexture, 0);

  let width = 1,
    height = 1,
    fontSize = 14,
    lineHeight = 20,
    startY = 0,
    charWidth = 8,
    caretX = 0,
    caretY = 0,
    typed = 0,
    done = false,
    textDirty = true,
    lastTextAt = 0,
    lastReveal = -1,
    lastBlink = -1;
  const startedAt = performance.now();

  const layout = () => {
    startY = height * 0.135;
    lineHeight = (height * 0.74) / LOG.length;
    fontSize = Math.max(
      5,
      Math.min(
        lineHeight * 0.8,
        (width * 0.88) / (Math.max(MAX_CHARS, 1) * 0.62)
      )
    );
    textContext.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
    charWidth = textContext.measureText("M").width || fontSize * 0.6;
  };

  const setStyle = (key: Segment["c"]) => {
    const color = COLORS[key];
    textContext.fillStyle = color.fill;
    textContext.shadowColor = color.glow;
    textContext.shadowBlur = fontSize * 0.55;
  };

  const drawScreen = (reveal: number) => {
    textContext.setTransform(1, 0, 0, 1, 0, 0);
    textContext.fillStyle = "#0a0a0a";
    textContext.fillRect(0, 0, width, height);
    textContext.textBaseline = "top";
    textContext.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;

    let remaining = reveal,
      y = startY;
    caretX = Math.floor((width - MAX_CHARS * charWidth) / 2);
    caretY = startY;

    for (const line of LOG) {
      const length = lineLength(line),
        visible = reveal === Infinity ? Infinity : Math.min(remaining, length);
      let x = Math.floor((width - MAX_CHARS * charWidth) / 2),
        drawn = 0;

      for (const item of line) {
        let text = item.t;
        if (visible !== Infinity) {
          const left = visible - drawn;
          if (left <= 0) break;
          if (left < text.length) text = text.slice(0, left);
        }
        if (text.length) {
          setStyle(item.c);
          textContext.fillText(text, x, y);
          x += charWidth * text.length;
        }
        drawn += item.t.length;
        if (visible !== Infinity && drawn >= visible) break;
      }

      caretX = x;
      caretY = y;
      if (visible !== Infinity) remaining -= visible;
      y += lineHeight;
      if (visible !== Infinity && remaining <= 0) break;
    }
  };

  const drawCursor = () => {
    textContext.shadowColor = COLORS.p.glow;
    textContext.shadowBlur = fontSize * 0.6;
    textContext.fillStyle = "#f87171";
    textContext.fillRect(
      caretX,
      caretY + fontSize * 0.06,
      Math.max(charWidth * 0.92, 4),
      fontSize * 0.96
    );
  };

  const uploadTexture = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      textCanvas
    );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    textDirty = false;
  };

  const resize = () => {
    const bounds = host.getBoundingClientRect(),
      viewportWidth = Math.max(1, bounds.width),
      viewportHeight = Math.max(1, bounds.height),
      scale = viewportWidth < 700 ? 0.82 : 0.55,
      bufferWidth = Math.min(Math.round(viewportWidth * scale), 920),
      bufferHeight = Math.round(
        (bufferWidth * viewportHeight) / viewportWidth
      );

    if (
      canvas.width !== bufferWidth ||
      canvas.height !== bufferHeight ||
      width !== bufferWidth
    ) {
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      textCanvas.width = bufferWidth;
      textCanvas.height = bufferHeight;
      width = bufferWidth;
      height = bufferHeight;
      layout();
      lastReveal = -1;
      lastBlink = -1;
    }
    gl.viewport(0, 0, bufferWidth, bufferHeight);
    gl.uniform2f(uResolution, bufferWidth, bufferHeight);
  };

  const maybeRedrawText = (now: number) => {
    const reveal = done ? Infinity : Math.floor(typed),
      blink =
        Math.floor((now - startedAt) / 420) % 2 === 0 ? 1 : 0,
      due = !done
        ? now - lastTextAt > 42
        : blink !== lastBlink;

    if (
      reveal === lastReveal &&
      blink === lastBlink &&
      !due
    )
      return;
    if (
      !done &&
      now - lastTextAt <= 42 &&
      reveal === lastReveal &&
      blink === lastBlink
    )
      return;

    drawScreen(reveal);
    if (blink) drawCursor();
    lastTextAt = now;
    lastReveal = reveal;
    lastBlink = blink;
    textDirty = true;
  };

  return {
    resize,
    render(now: number) {
      const options = getOptions();
      if (!done) {
        typed += 4.4 * options.typeSpeed;
        if (typed >= TOTAL) {
          typed = TOTAL;
          done = true;
        }
      }
      maybeRedrawText(now);
      if (textDirty) uploadTexture();
      gl.useProgram(program);
      gl.uniform1f(uTime, ((now - startedAt) * 0.001 * options.speed) );
      gl.uniform1f(uMotion, options.motion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}
