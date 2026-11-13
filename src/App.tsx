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
import { scrollToElement } from './lib/scroll'
import { TechStrip } from './components/TechStrip'

export default function App() {
  const [fiscalOpen, setFiscalOpen] = useState(false)
  const openFiscal = useCallback(() => setFiscalOpen(true), [])
  const closeFiscal = useCallback(() => setFiscalOpen(false), [])

  // Navegación interna confiable (menú móvil incluido): scroll manual con compensación del header fijo
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      // Se espera un frame para que el menú móvil empiece a cerrarse antes de desplazar
      requestAnimationFrame(() => {
        // Solo la barra fija (sin el menú desplegable, que en ese momento se está cerrando)
        const bar = document.querySelector('header nav')?.getBoundingClientRect().bottom ?? 72
        scrollToElement(target, bar)
        history.replaceState(null, '', `#${id}`)
        if (id === 'contenido' || id === 'inicio') return
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
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
