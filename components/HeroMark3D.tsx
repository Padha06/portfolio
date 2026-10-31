'use client'

import { useEffect, useRef, useState } from 'react'
import LogoMark from './Logo'

// Facets of the Vaskoi "V", in the logo's original SVG coordinates.
const FACETS: { points: [number, number][]; color: string; z: number }[] = [
  { points: [[388, 234], [943, 718], [749, 900], [943, 1125]], color: '#24216b', z: 0 },
  { points: [[388, 234], [689, 295], [943, 718]], color: '#5552b8', z: 18 },
  { points: [[943, 507], [1512, 225], [943, 718]], color: '#b9b9c0', z: 12 },
  { points: [[1512, 225], [1148, 908], [943, 718]], color: '#c9c7ee', z: 6 },
  { points: [[943, 718], [1148, 908], [943, 1125]], color: '#f4f5f8', z: 24 },
]

const CENTER = { x: 950, y: 675 }
const SCALE = 1 / 330

/**
 * The logo mark as a slowly floating glossy 3D object. Facets assemble on load
 * and the whole mark tilts toward the pointer. Falls back to the flat SVG when
 * WebGL or motion isn't available.
 */
export default function HeroMark3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const probe = document.createElement('canvas')
    if (reduced || !(probe.getContext('webgl2') || probe.getContext('webgl'))) {
      setFallback(true)
      return
    }

    let disposed = false
    let cleanup = () => {}

    import('three').then(async (THREE) => {
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
      if (disposed) return

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 0.95
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      // Keep reflections soft so the indigo facets stay saturated on a light page.
      scene.environmentIntensity = 0.55

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      camera.position.set(0, 0, 11)

      const key = new THREE.DirectionalLight('#ffffff', 1.4)
      key.position.set(3, 4, 6)
      scene.add(key, new THREE.AmbientLight('#ffffff', 0.35))

      const mark = new THREE.Group()
      scene.add(mark)

      const pieces = FACETS.map((f, i) => {
        const shape = new THREE.Shape(
          f.points.map(([x, y]) => new THREE.Vector2((x - CENTER.x) * SCALE, -(y - CENTER.y) * SCALE))
        )
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.22,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.03,
          bevelSegments: 4,
        })
        const material = new THREE.MeshPhysicalMaterial({
          color: f.color,
          roughness: 0.28,
          metalness: 0.15,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
        })
        const mesh = new THREE.Mesh(geometry, material)
        const rest = new THREE.Vector3(0, 0, f.z * 0.004)
        // Each facet starts scattered and settles into place.
        const from = new THREE.Vector3(
          (i % 2 ? 1 : -1) * (0.8 + i * 0.25),
          (i - 2) * 0.6,
          2.5 + i * 0.4
        )
        const spin = { x: (i - 2) * 0.5, y: (i % 2 ? -1 : 1) * 0.9 }
        mesh.position.copy(from)
        mesh.rotation.set(spin.x, spin.y, 0)
        mark.add(mesh)
        return { mesh, from, rest, spin, delay: i * 0.09 }
      })

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(mount)

      const pointer = { x: 0, y: 0 }
      const tilt = { x: 0, y: 0 }
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      let visible = true
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
      io.observe(mount)

      const ease = (t: number) => 1 - Math.pow(1 - t, 4)
      const start = performance.now()
      let raf = 0
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop)
        if (!visible) return
        const t = (now - start) / 1000

        for (const p of pieces) {
          const k = ease(Math.min(Math.max((t - 0.15 - p.delay) / 1.4, 0), 1))
          p.mesh.position.lerpVectors(p.from, p.rest, k)
          p.mesh.rotation.x = (1 - k) * p.spin.x
          p.mesh.rotation.y = (1 - k) * p.spin.y
        }

        tilt.x += (pointer.y * 0.25 - tilt.x) * 0.05
        tilt.y += (pointer.x * 0.45 - tilt.y) * 0.05
        mark.rotation.x = tilt.x + Math.sin(t * 0.6) * 0.05
        mark.rotation.y = tilt.y + Math.sin(t * 0.4) * 0.18
        mark.position.y = Math.sin(t * 0.9) * 0.08

        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(loop)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        window.removeEventListener('pointermove', onMove)
        pieces.forEach(({ mesh }) => {
          mesh.geometry.dispose()
          mesh.material.dispose()
        })
        scene.environment?.dispose()
        pmrem.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }).catch(() => setFallback(true))

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div className="mark3d" aria-hidden="true">
      <div ref={mountRef} className="mark3d-canvas" />
      {fallback && <LogoMark className="mark3d-fallback" />}
      <div className="mark3d-shadow" />
    </div>
  )
}
