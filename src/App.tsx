import { MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Candidate } from './components/Candidate'
import { Control } from './components/Control'
import { Execution } from './components/Execution'
import { Federal } from './components/Federal'
import { FiscalModal } from './components/FiscalModal'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { KitEmergencia } from './components/KitEmergencia'
import { Tokeniza } from './components/Tokeniza'
import { Navbar } from './components/Navbar'
import { Participation } from './components/Participation'
import { Pillars } from './components/Pillars'
import { initAnalytics } from './lib/analytics'
import { scrollToElement } from './lib/scroll'
import { TechStrip } from './components/TechStrip'

export default function App() {
  const [fiscalOpen, setFiscalOpen] = useState(false)
  const openFiscal = useCallback(() => setFiscalOpen(true), [])
  const closeFiscal = useCallback(() => setFiscalOpen(false), [])

  useEffect(() => {
    initAnalytics()
  }, [])

  // Navegación interna: scroll propio con compensación de la barra fija, historial y links directos (#seccion)
  useEffect(() => {
    const barBottom = () => document.querySelector('header nav')?.getBoundingClientRect().bottom ?? 72

    const goTo = (id: string, mode: 'push' | 'none' | 'instant') => {
      const target = document.getElementById(id)
      if (!target) return
      // Se espera un frame para que el menú móvil empiece a cerrarse antes de medir
      requestAnimationFrame(() => {
        if (mode === 'instant') {
          window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - barBottom()))
        } else {
          scrollToElement(target, barBottom())
        }
        if (mode === 'push' && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
        if (id === 'contenido' || id === 'inicio') return
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      })
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      if (!id || !document.getElementById(id)) return
      e.preventDefault()
      goTo(id, 'push')
    }

    // Botón "atrás"/"adelante": vuelve a la sección anterior
    const onPop = () => {
      const id = location.hash.slice(1)
      if (id) goTo(id, 'none')
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Link directo compartido (ej. /#tokeniza): se posiciona cuando la página terminó de armarse
    const initial = location.hash.slice(1)
    let settle = 0
    if (initial && document.getElementById(initial)) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
      goTo(initial, 'instant')
      // Una segunda pasada corrige si imágenes o fuentes cambiaron alturas mientras cargaban
      settle = window.setTimeout(() => goTo(initial, 'instant'), 700)
    }
    // Si la persona empieza a desplazarse, no se la vuelve a mover
    const cancelSettle = () => window.clearTimeout(settle)
    window.addEventListener('wheel', cancelSettle, { once: true, passive: true })
    window.addEventListener('touchstart', cancelSettle, { once: true, passive: true })

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      window.clearTimeout(settle)
      window.removeEventListener('wheel', cancelSettle)
      window.removeEventListener('touchstart', cancelSettle)
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-lg bg-white px-4 py-2 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Navbar onOpenFiscal={openFiscal} />
      <main id="contenido">
        <Hero onOpenFiscal={openFiscal} />
        <TechStrip />
        <Candidate />
        <Pillars />
        <Execution />
        <Tokeniza />
        <Federal />
        <KitEmergencia />
        <Control />
        <Participation />
      </main>
      <Footer />
      <FiscalModal open={fiscalOpen} onClose={closeFiscal} />
    </MotionConfig>
  )
}
