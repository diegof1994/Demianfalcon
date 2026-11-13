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
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let nodes: Node[] = []
    let raf = 0
    let w = 0
    let h = 0
    let visible = false
    let last = 0
    let small = false
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    // Brillo pre-renderizado (evita shadowBlur, que es muy costoso por cuadro)
    const makeSprite = (rgb: string) => {
      const c = document.createElement('canvas')
      c.width = c.height = 24
      const g = c.getContext('2d')!
      const grad = g.createRadialGradient(12, 12, 0, 12, 12, 12)
      grad.addColorStop(0, `rgba(${rgb},1)`)
      grad.addColorStop(0.25, `rgba(${rgb},0.85)`)
      grad.addColorStop(1, `rgba(${rgb},0)`)
      g.fillStyle = grad
      g.fillRect(0, 0, 24, 24)
      return c
    }
    const goldSprite = makeSprite('232,197,120')
    const blueSprite = makeSprite('186,214,245')

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      small = w < 640
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cap = small ? 34 : 80
      const count = Math.max(20, Math.min(cap, Math.round(w * h * density)))
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
      const max = small ? 110 : 140
      const max2 = max * max
      ctx.lineWidth = 0.6
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < max2) {
            const o = (1 - Math.sqrt(d2) / max) * 0.35
            ctx.strokeStyle = a.gold && b.gold ? `rgba(201,164,92,${o})` : `rgba(141,184,232,${o * 0.7})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        const size = n.r * 7
        ctx.drawImage(n.gold ? goldSprite : blueSprite, n.x - size / 2, n.y - size / 2, size, size)
      }
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      // En celulares, 30 cuadros por segundo alcanzan y liberan al navegador para el scroll
      if (small && now - last < 32) return
      last = now
      for (const n of nodes) {
        n.x += n.vx * (small ? 2 : 1)
        n.y += n.vy * (small ? 2 : 1)
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      draw()
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce) draw()
      else if (visible && !document.hidden) raf = requestAnimationFrame(tick)
    }

    resize()
    draw()

    // Solo se anima mientras está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else cancelAnimationFrame(raf)
    })
    io.observe(canvas)

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        draw()
      }, 150)
    })
    ro.observe(canvas)
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start())
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.clearTimeout(resizeTimer)
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
