import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { KPIS, RISKS } from '../data/plan'
import { cn } from '../lib/utils'
import { Reveal, SectionHeader } from './ui'

export function Control() {
  const [openRisk, setOpenRisk] = useState<number | null>(0)

  return (
    <section id="transparencia" aria-labelledby="transparencia-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="transparencia-title"
          eyebrow="Transparencia y control de gestión"
          title="Un gobierno que se somete a su propio tablero público"
          description="Para garantizar la ejecución “al pie de la letra”, cada avance se mide con indicadores públicos de cumplimiento, auditables en tiempo real."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KPIS.map((k, i) => {
            const Icon = k.icon
            return (
              <motion.li
                key={k.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sol-400 to-sol-500" aria-hidden="true" />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sol-400">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wider text-sol-600 uppercase">Indicador {i + 1}</p>
                  <h3 className="mt-0.5 font-display text-lg font-bold text-navy-900">{k.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{k.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>

        <div className="mx-auto mt-20 max-w-4xl">
          <Reveal>
            <h3 className="flex items-center justify-center gap-2 text-center font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              <ShieldAlert className="size-7 text-sol-600" aria-hidden="true" />
              Riesgos previstos y cómo respondemos
            </h3>
            <p className="mt-3 text-center text-slate-600">Un plan serio anticipa los obstáculos. Estas son las respuestas ya definidas.</p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {RISKS.map((r, i) => {
              const open = openRisk === i
              return (
                  <motion.li
                    key={r.risk}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className={cn('overflow-hidden rounded-2xl border bg-white transition-colors', open ? 'border-sol-400 shadow-md' : 'border-slate-200')}>
                    <h4>
                      <button
                        type="button"
                        onClick={() => setOpenRisk(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`risk-${i}`}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-display text-lg font-bold text-navy-900">{r.risk}</span>
                        <ChevronDown className={cn('size-5 shrink-0 text-navy-700 transition-transform', open && 'rotate-180')} aria-hidden="true" />
                      </button>
                    </h4>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div id={`risk-${i}`} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <dl className="grid gap-4 px-6 pb-6 sm:grid-cols-[1fr_1.6fr]">
                            <div className="rounded-xl bg-paper p-4">
                              <dt className="text-xs font-bold tracking-wider text-slate-600 uppercase">Causa posible</dt>
                              <dd className="mt-1 text-sm leading-relaxed text-slate-700">{r.cause}</dd>
                            </div>
                            <div className="rounded-xl bg-navy-900 p-4">
                              <dt className="text-xs font-bold tracking-wider text-sol-400 uppercase">Respuesta</dt>
                              <dd className="mt-1 text-sm leading-relaxed text-slate-200">{r.response}</dd>
                            </div>
                          </dl>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
