import { MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
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

export default function App() {
  const [fiscalOpen, setFiscalOpen] = useState(false)
  const openFiscal = useCallback(() => setFiscalOpen(true), [])
  const closeFiscal = useCallback(() => setFiscalOpen(false), [])

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
