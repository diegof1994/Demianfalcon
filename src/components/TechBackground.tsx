import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  gold: boolean
}

/** Red de nodos animada (estética tecnológica / IA). Se detiene con "reducir movimiento". */
export function TechBackground({ className = '', density = 0.00009 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let nodes: Node[] = []
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.min(110, Math.round(w * h * density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        gold: Math.random() < 0.35,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const max = 140
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < max) {
            const o = (1 - d / max) * 0.35
            ctx.strokeStyle = a.gold && b.gold ? `rgba(201,164,92,${o})` : `rgba(141,184,232,${o * 0.7})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.gold ? 'rgba(232,197,120,0.95)' : 'rgba(186,214,245,0.8)'
        ctx.shadowColor = n.gold ? 'rgba(232,197,120,0.9)' : 'rgba(141,184,232,0.8)'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    resize()
    if (reduce) draw()
    else raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw()
    })
    ro.observe(canvas)
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduce) raf = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 size-full ${className}`} aria-hidden="true" />
}

/** Globo terráqueo en malla, con brillo, para fondos */
export function WireGlobe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="globe-glow" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#4a8fd6" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#0b1f42" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0b1f42" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#globe-glow)" />
      <g fill="none" stroke="#8db8e8" strokeOpacity="0.35" strokeWidth="0.8">
        <circle cx="200" cy="200" r="180" />
        {[30, 60, 90, 120, 150].map((rx) => (
          <ellipse key={rx} cx="200" cy="200" rx={rx} ry="180" />
        ))}
        {[-135, -90, -45, 0, 45, 90, 135].map((y) => (
          <ellipse key={y} cx="200" cy={200 + y} rx={Math.sqrt(180 * 180 - y * y)} ry={Math.sqrt(180 * 180 - y * y) * 0.12} />
        ))}
      </g>
      <g fill="#e8c578">
        {[
          [150, 120], [230, 90], [280, 170], [170, 230], [250, 260], [120, 180], [210, 310], [300, 240],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" />
        ))}
      </g>
      <path d="M150 120 230 90 280 170 250 260 170 230 120 180Z M170 230 210 310 M280 170 300 240" fill="none" stroke="#e8c578" strokeOpacity="0.55" strokeWidth="0.9" />
    </svg>
  )
}
