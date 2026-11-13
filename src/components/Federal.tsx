import { AnimatePresence, motion } from 'framer-motion'
import { Building2, Landmark, MapPinned } from 'lucide-react'
import { useState } from 'react'
import { PROVINCES } from '../data/federal'
import { cn } from '../lib/utils'
import { Reveal, SectionHeader } from './ui'

const COLS = 5
const ROWS = 9

const CAPITALS = [
  {
    code: 'TF',
    city: 'Ushuaia',
    title: 'Capital Federal',
    icon: Landmark,
    items: ['Sede del Poder Ejecutivo', 'Sede del Poder Legislativo', 'Eje de la Argentina Bicontinental'],
  },
  {
    code: 'CABA',
    city: 'Buenos Aires',
    title: 'Capital Financiera',
    icon: Building2,
    items: ['Mercado de valores y bancos', 'Centro de negocios y finanzas', 'Enclave de comercio internacional'],
  },
]

const STATE_POWERS = [
  'Plena capacidad de gestión y de recaudación de sus propios impuestos.',
  'Transfiere una cuota equitativa a la Nación (Nuevo Régimen Fiscal Federal).',
  'Autonomía para fijar sus políticas de desarrollo.',
  'Acceso al Fondo de Nivelación Federal para evitar desequilibrios regionales.',
  'Recepción de organismos nacionales según su vocación económica regional.',
  'Participación en los beneficios del Fondo Nacional Digital (art. 124 CN).',
]

export function Federal() {
  const [selected, setSelected] = useState('TF')
  const province = PROVINCES.find((p) => p.code === selected)!
  const capital = CAPITALS.find((c) => c.code === selected)

  return (
    <section id="federal" aria-labelledby="federal-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="federal-title"
          eyebrow="Pilar 11 · República Federal de Estados"
          title="24 Estados autosuficientes y una Argentina bicontinental"
          description="Las provincias pasan a ser Estados con plena capacidad de gestión y recaudación. La Capital Federal se traslada a Ushuaia y Buenos Aires se consolida como Capital Financiera."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CAPITALS.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.code} delay={i * 0.1}>
                <button
                  type="button"
                  onClick={() => setSelected(c.code)}
                  aria-pressed={selected === c.code}
                  className={cn(
                    'relative h-full w-full overflow-hidden rounded-3xl p-8 text-left transition-all',
                    selected === c.code ? 'bg-navy-900 text-white shadow-xl ring-2 ring-sol-400' : 'bg-paper text-navy-900 ring-1 ring-slate-200 hover:ring-sol-400',
                  )}
                >
                  <Icon className={cn('size-9', selected === c.code ? 'text-sol-400' : 'text-navy-700')} aria-hidden="true" />
                  <p className={cn('mt-5 text-xs font-bold tracking-[0.2em] uppercase', selected === c.code ? 'text-sol-400' : 'text-sol-600')}>{c.title}</p>
                  <p className="mt-1 font-display text-3xl font-bold">{c.city}</p>
                  <ul className={cn('mt-5 space-y-2 text-sm', selected === c.code ? 'text-slate-300' : 'text-slate-600')}>
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sol-400" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
          <Reveal className="mx-auto w-full max-w-[270px] sm:max-w-[320px]">
            <div className="rounded-3xl bg-navy-900 p-5 sm:p-6">
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))` }}
                role="group"
                aria-label="Mapa de las 24 jurisdicciones. Seleccioná una para ver su rol en la República Federal de Estados."
              >
                {PROVINCES.map((p) => {
                  const isCapital = p.code === 'TF' || p.code === 'CABA'
                  const active = p.code === selected
                  return (
                    <motion.button
                      key={p.code}
                      type="button"
                      onClick={() => setSelected(p.code)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={p.name}
                      aria-pressed={active}
                      style={{ gridColumnStart: p.col + 1, gridRowStart: p.row + 1 }}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-lg text-[11px] font-bold tracking-tight transition-colors sm:text-xs',
                        active ? 'bg-sol-400 text-navy-950 shadow-lg' : isCapital ? 'bg-celeste-400 text-navy-950' : 'bg-white/10 text-slate-200 hover:bg-white/20',
                      )}
                    >
                      {p.code === 'CABA' ? 'BA·C' : p.code}
                    </motion.button>
                  )
                })}
              </div>
              <p className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-celeste-400" aria-hidden="true" /> Capitales
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-sol-400" aria-hidden="true" /> Seleccionado
                </span>
              </p>
            </div>
          </Reveal>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={selected} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <p className="flex items-center gap-2 text-sm font-semibold tracking-wider text-sol-600 uppercase">
                  <MapPinned className="size-4" aria-hidden="true" />
                  {capital ? capital.title : 'Estado federado'}
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold text-navy-900">
                  {capital && capital.code === 'TF' ? 'Ushuaia, Tierra del Fuego' : capital ? 'Ciudad de Buenos Aires' : `Estado de ${province.name}`}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                  {capital?.code === 'TF'
                    ? 'Ushuaia proyecta a la Argentina sobre el Atlántico Sur y el sector antártico, respetando el Tratado Antártico. El traslado se hace por módulos: primero los ministerios prioritarios, luego conectividad y sedes institucionales, con una Mesa Interministerial para su planificación urbana y energética.'
                    : capital
                      ? 'Buenos Aires concentra el mercado de valores, la banca y los negocios internacionales como Capital Financiera de la República.'
                      : `Con la reforma, ${province.name} deja de depender del centralismo histórico y pasa a ser un Estado con autonomía real dentro de la República Federal.`}
                </p>
                <p className="mt-8 text-xs font-bold tracking-wider text-slate-500 uppercase">Lo que gana cada Estado</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {STATE_POWERS.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-paper p-4 text-sm leading-relaxed text-slate-700"
                    >
                      <span className="font-display font-bold text-sol-600">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </motion.li>
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
