import { AnimatePresence, motion } from 'framer-motion'
import { FileSignature, Info, Landmark } from 'lucide-react'
import { useState } from 'react'
import { CONGRESS_SENDS, CONSTITUTIONAL_NOTE, DAY_ONE_DECREES, DAY_ONE_LAWS, TIMELINE, VIAS } from '../data/plan'
import { cn } from '../lib/utils'
import { VIA_STYLE } from './Pillars'
import { Reveal, SectionHeader } from './ui'

export function Execution() {
  const [stage, setStage] = useState(0)
  const current = TIMELINE[stage]

  return (
    <section id="cien-dias" aria-labelledby="cien-dias-title" className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          id="cien-dias-title"
          eyebrow="Los primeros 100 días"
          title="Ejecución simultánea desde el Día 1"
          description="Para evitar parálisis burocráticas o bloqueos normativos, el plan avanza por cuatro vías legales en paralelo a partir del 10 de diciembre de 2027. Ningún camino espera al otro."
        />

        {/* Las 4 vías */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VIAS.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.li
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className={cn('flex size-11 items-center justify-center rounded-xl font-display text-xl font-bold', VIA_STYLE[v.id])}>{v.id}</span>
                  <Icon className="size-6 text-sol-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-cream">Vía {v.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-sol-400 uppercase">{v.start}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{v.scope}</p>
                <p className="mt-auto border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400">{v.instrument}</p>
              </motion.li>
            )
          })}
        </ul>

        {/* Paquete Día Uno */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-cream p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-sol-600 uppercase">
              <FileSignature className="size-4" aria-hidden="true" /> Paquete “Día Uno” · Vía A
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-navy-900">8 medidas de firma inmediata</h3>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {DAY_ONE_DECREES.map((d, i) => (
                <li key={d.title} className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="font-display text-sm font-bold text-sol-600">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-1 font-semibold text-navy-900">{d.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{d.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-sol-400/30 bg-white/[0.04] p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-sol-400 uppercase">
              <Landmark className="size-4" aria-hidden="true" /> Envíos inmediatos al Congreso · Vías B y C
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-cream">Paquete legislativo de transformación</h3>
            <ul className="mt-6 space-y-2.5">
              {DAY_ONE_LAWS.map((l) => (
                <li key={l} className="flex gap-3 text-slate-200">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sol-400" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
              {CONGRESS_SENDS.map((c) => (
                <div key={c.title}>
                  <dt className="font-semibold text-cream">{c.title}</dt>
                  <dd className="mt-0.5 text-sm text-slate-400">{c.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-6 flex gap-3 rounded-2xl border border-celeste-400/30 bg-celeste-400/10 p-5 text-sm leading-relaxed text-celeste-100">
          <Info className="mt-0.5 size-5 shrink-0 text-celeste-400" aria-hidden="true" />
          <p>
            <strong className="text-white">Nota constitucional.</strong> {CONSTITUTIONAL_NOTE}
          </p>
        </Reveal>

        {/* Cronograma */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-cream sm:text-3xl">Cronograma integral de los primeros 100 días</h3>
          </Reveal>

          <Reveal className="mt-8">
            <div role="tablist" aria-label="Tramos del cronograma" className="relative mx-auto grid max-w-4xl grid-cols-4 gap-2">
              {TIMELINE.map((t, i) => (
                <button
                  key={t.range}
                  role="tab"
                  id={`stage-tab-${i}`}
                  aria-selected={stage === i}
                  aria-controls="stage-panel"
                  onClick={() => setStage(i)}
                  className={cn(
                    'rounded-xl px-2 py-3 text-center text-xs font-semibold transition-colors sm:text-sm',
                    stage === i ? 'bg-sol-400 text-navy-950' : 'bg-white/5 text-slate-300 hover:bg-white/10',
                  )}
                >
                  {t.range}
                </button>
              ))}
            </div>
            <div className="mx-auto mt-3 h-1.5 max-w-4xl overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <motion.div className="h-full rounded-full bg-sol-400" animate={{ width: `${((stage + 1) / TIMELINE.length) * 100}%` }} transition={{ type: 'spring', damping: 24 }} />
            </div>
          </Reveal>

          <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${stage}`} className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div key={stage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <p className="text-center font-display text-lg text-cream sm:text-xl">{current.headline}</p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {VIAS.map((v) => (
                    <li key={v.id} className="rounded-2xl bg-white p-5 shadow-lg">
                      <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                        <span className={cn('flex size-6 items-center justify-center rounded-md text-xs font-bold', VIA_STYLE[v.id])}>{v.id}</span>
                        Vía {v.name}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{current.byVia[v.id]}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
