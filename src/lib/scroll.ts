let frame = 0
let cancelUserScroll: (() => void) | null = null

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Desplazamiento fluido a un elemento.
 * Si el destino está lejos, salta en silencio hasta cerca y desliza solo el último tramo:
 * así no se recorren miles de píxeles (ni se disparan decenas de animaciones) en el camino.
 */
export function scrollToElement(target: HTMLElement, offset: number) {
  cancelAnimationFrame(frame)
  cancelUserScroll?.()

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)

  if (reduce) {
    window.scrollTo(0, destination)
    return
  }

  const viewport = window.innerHeight
  let start = window.scrollY
  const distance = destination - start
  const glide = Math.min(Math.abs(distance), viewport * 0.9)

  if (Math.abs(distance) > glide) {
    start = destination - Math.sign(distance) * glide
    window.scrollTo(0, start)
  }

  const delta = destination - start
  const duration = 380 + Math.min(Math.abs(delta) / viewport, 1) * 220
  const t0 = performance.now()

  const stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', stop)
    cancelUserScroll = null
  }
  cancelUserScroll = stop
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', stop)

  const step = (now: number) => {
    const p = Math.min((now - t0) / duration, 1)
    window.scrollTo(0, start + delta * easeOutCubic(p))
    if (p < 1) frame = requestAnimationFrame(step)
    else stop()
  }
  frame = requestAnimationFrame(step)
}
