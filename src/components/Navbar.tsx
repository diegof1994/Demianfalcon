import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardCheck, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CAMPAIGN, NAV_LINKS } from '../data/campaign'
import { cn } from '../lib/utils'
import { Logo } from './Logo'

interface NavbarProps {
  onOpenFiscal: () => void
}

export function Navbar({ onOpenFiscal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resaltado de la sección visible (scroll spy)
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'bg-navy-900/95 shadow-lg shadow-navy-950/20 backdrop-blur-md' : 'bg-navy-900',
      )}
    >
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-sol-400 to-transparent" aria-hidden="true" />
      <nav aria-label="Navegación principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 rounded-lg" aria-label={`${CAMPAIGN.candidate} — Ir al inicio`}>
          <Logo className="h-9 lg:h-10" />
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold text-cream sm:text-base">{CAMPAIGN.candidate}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-sol-400">
              {CAMPAIGN.movement}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-lg px-2.5 py-2 text-sm font-medium xl:px-3 transition-colors',
                  active === link.id ? 'text-white' : 'text-slate-300 hover:text-white',
                )}
              >
                {link.label}
                {active === link.id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-sol-400" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpenFiscal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-2 rounded-full bg-sol-400 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-md shadow-sol-500/30 transition-colors hover:bg-sol-500 sm:inline-flex"
          >
            <ClipboardCheck className="size-4" aria-hidden="true" />
            Fiscalizá
          </motion.button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900 xl:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-base font-medium',
                      active === link.id ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenFiscal()
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-sol-400 px-5 py-3 text-base font-bold text-navy-950"
                >
                  <ClipboardCheck className="size-5" aria-hidden="true" />
                  Fiscalizá
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
