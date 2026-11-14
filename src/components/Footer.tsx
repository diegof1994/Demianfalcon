import { motion } from 'framer-motion'
import { Check, Download, Loader2, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { CAMPAIGN, NAV_LINKS } from '../data/campaign'
import { track } from '../lib/analytics'
import { Logo } from './Logo'


const ALL_SOCIALS = [
  {
    name: 'Instagram',
    href: CAMPAIGN.socials.instagram,
    path: 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
  },
  {
    name: 'X',
    href: CAMPAIGN.socials.x,
    path: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z',
  },
  {
    name: 'Facebook',
    href: CAMPAIGN.socials.facebook,
    path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z',
  },
  {
    name: 'YouTube',
    href: CAMPAIGN.socials.youtube,
    path: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z',
  },
]

const SOCIALS = ALL_SOCIALS.filter((s) => s.href)

export function Footer() {
  const [dl, setDl] = useState<'idle' | 'loading' | 'done'>('idle')

  const download = () => {
    if (dl === 'loading') return
    setDl('loading')
    track('descarga_pdf')
    window.setTimeout(() => {
      const a = document.createElement('a')
      a.href = CAMPAIGN.pdfUrl
      a.download = CAMPAIGN.pdfName
      document.body.appendChild(a)
      a.click()
      a.remove()
      setDl('done')
      window.setTimeout(() => setDl('idle'), 3500)
    }, 900)
  }

  return (
    <footer className="bg-navy-950 text-slate-300">
      {/* Banda de descarga */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-sol-400 uppercase">Documento oficial</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">{CAMPAIGN.planTitle}: {CAMPAIGN.planName}</h2>
            <p className="mt-2 text-slate-400">
              Documento completo con los 11 pilares, el paquete “Día Uno”, el cronograma de los primeros 100 días y el tablero de control
              de gestión (PDF, 13 páginas).
            </p>
          </div>
          <motion.button
            type="button"
            onClick={download}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-live="polite"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-sol-400 px-7 py-4 font-bold text-navy-950 shadow-lg shadow-sol-400/20 transition-colors hover:bg-sol-500"
          >
            {dl === 'loading' && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
            {dl === 'done' && <Check className="size-5" aria-hidden="true" />}
            {dl === 'idle' && <Download className="size-5" aria-hidden="true" />}
            {dl === 'loading' ? 'Preparando PDF…' : dl === 'done' ? 'Descarga iniciada' : 'Descargar PDF'}
          </motion.button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-display font-bold text-cream">{CAMPAIGN.candidate}</p>
              <p className="text-sm text-sol-400">{CAMPAIGN.movement}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            {CAMPAIGN.planTitle}: {CAMPAIGN.planName}. “{CAMPAIGN.centralIdea[0]}”
          </p>
          {SOCIALS.length > 0 && (
          <ul className="mt-6 flex gap-3" aria-label="Redes oficiales">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} oficial (abre en una pestaña nueva)`}
                  className="flex size-11 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-sol-400 hover:text-navy-950"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          )}
        </div>

        <nav aria-label="Secciones">
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Secciones</h3>
          <ul className="mt-3 space-y-0.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-block py-1.5 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Participá</h3>
          <ul className="mt-3 space-y-0.5 text-sm">
            <li>
              <a href="#sumate" className="inline-block py-1.5 hover:text-white">Ser fiscal de mesa</a>
            </li>
            <li>
              <a href="#sumate" className="inline-block py-1.5 hover:text-white">Sumarme como voluntario</a>
            </li>
            <li>
              <a href="#sumate" className="inline-block py-1.5 hover:text-white">Enviar una propuesta</a>
            </li>
            {CAMPAIGN.email && (
              <li className="flex gap-2 pt-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-sol-400" aria-hidden="true" />
                <a href={`mailto:${CAMPAIGN.email}`} className="inline-block py-1.5 break-all hover:text-white">{CAMPAIGN.email}</a>
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-sol-400/30 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full border-2 border-sol-400 text-sol-400">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <p className="font-display leading-tight font-bold text-white">
              Compromiso de
              <br />
              Transparencia Total
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Declaraciones juradas abiertas de todo el gabinete, agendas públicas y licitaciones en tiempo real desde el Día 1, con
            un tablero público de cumplimiento auditable.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed text-slate-400 sm:px-6 lg:px-8">
          <p>Publicidad electoral conforme a la Ley 26.215 de Financiamiento de los Partidos Políticos y al Código Electoral Nacional. Medimos las visitas de forma anónima, sin cookies; los datos de los formularios se usan solo para coordinar la participación (Ley 25.326).</p>
          <p className="flex flex-col justify-between gap-2 sm:flex-row">
            <span>© 2026 {CAMPAIGN.candidate}. Todos los derechos reservados.</span>
            <span>{CAMPAIGN.movement}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
