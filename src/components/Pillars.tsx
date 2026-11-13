import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LayoutGrid, Scale, Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { BLOCKS, PILLARS, VIAS } from '../data/plan'
import { cn, normalize } from '../lib/utils'
import type { BlockId, Pillar, ViaId } from '../types'
import { Reveal, SectionHeader } from './ui'

type Filter = BlockId | 'todos'

const SUGGESTIONS = ['impuestos', 'empleo', 'vivienda', 'justicia', 'corrupción', 'hambre', 'ushuaia', 'ia']

const TABS: { id: Filter; short: string; icon: typeof LayoutGrid }[] = [
  { id: 'todos', short: 'Los 11 pilares', icon: LayoutGrid },
  ...BLOCKS.map((b) => ({ id: b.id as Filter, short: b.short, icon: b.icon })),
]

export const VIA_STYLE: Record<ViaId, string> = {
  A: 'bg-navy-900 text-cream',
  B: 'bg-sol-400 text-navy-950',
  C: 'bg-celeste-700 text-white',
  D: 'bg-emerald-700 text-white',
}

function matches(p: Pillar, q: string) {
  const text = normalize(
    [p.title, p.promise, ...p.actions.map((a) => a.text), ...p.notes.map((n) => n.text), ...p.keywords, `pilar ${p.number}`].join(' '),
  )
  return q.split(/\s+/).filter(Boolean).every((t) => text.includes(t))
}

export function Pillars() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const q = normalize(deferred)
  const searching = q.length > 0
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const results = useMemo(() => {
    if (searching) return PILLARS.filter((p) => matches(p, q))
    return filter === 'todos' ? PILLARS : PILLARS.filter((p) => p.block === filter)
  }, [searching, q, filter])

  const block = BLOCKS.find((b) => b.id === filter)

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = TABS.length - 1
    const next =
      e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1
    if (next < 0) return
    e.preventDefault()
    setFilter(TABS[next].id)
    setQuery('')
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="plan-title"
          eyebrow="Plan de gobierno · 11 pilares"
          title="Una nueva estructura del Estado, pilar por pilar"
          description="Cada pilar tiene una promesa, las acciones concretas de los primeros 100 días y sus fundamentos legales. Buscá por tema o filtrá por bloque."
        />

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <label htmlFor="pillar-search" className="sr-only">
            Buscar en el plan de gobierno
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="pillar-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscá en el plan: impuestos, vivienda, justicia, Ushuaia…"
              autoComplete="off"
              className="w-full rounded-full border border-slate-300 bg-white py-4 pr-14 pl-14 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-sol-400 focus:ring-4 focus:ring-sol-400/20 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-navy-900"
                aria-label="Limpiar búsqueda"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-slate-500">Temas:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                  normalize(query) === normalize(s) ? 'bg-navy-900 text-cream' : 'bg-white text-navy-800 ring-1 ring-slate-200 hover:ring-sol-400',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Bloques del plan"
            className={cn('-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0', searching && 'opacity-50')}
          >
            {TABS.map((t, i) => {
              const Icon = t.icon
              const selected = !searching && filter === t.id
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`block-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="pillars-panel"
                  tabIndex={filter === t.id ? 0 : -1}
                  onClick={() => {
                    setFilter(t.id)
                    setQuery('')
                  }}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors',
                    selected ? 'text-cream' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:text-navy-900 hover:ring-sol-400',
                  )}
                >
                  {selected && (
                    <motion.span layoutId="block-pill" className="absolute inset-0 rounded-full bg-navy-900 shadow-lg shadow-navy-900/25" transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }} />
                  )}
                  <Icon className={cn('relative size-5', selected ? 'text-sol-400' : 'text-navy-700')} aria-hidden="true" />
                  <span className="relative whitespace-nowrap">{t.short}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id="pillars-panel"
          role="tabpanel"
          aria-labelledby={searching ? undefined : `block-tab-${filter}`}
          aria-label={searching ? 'Resultados de búsqueda' : undefined}
          className="mt-10"
        >
          <div aria-live="polite" className="mb-8 text-center">
            {searching ? (
              <p className="text-slate-600">
                <strong className="text-navy-900">{results.length}</strong> {results.length === 1 ? 'pilar encontrado' : 'pilares encontrados'} para «{deferred.trim()}»
              </p>
            ) : block ? (
              <div className="mx-auto max-w-3xl">
                <h3 className="font-display text-2xl font-bold text-navy-900">{block.label}</h3>
                <p className="mt-2 text-slate-600">{block.description}</p>
              </div>
            ) : (
              <ViaLegend />
            )}
          </div>

          <motion.div layout className="grid gap-6 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <PillarCard key={p.number} pillar={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {searching && results.length === 0 && (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <Search className="mx-auto size-8 text-slate-400" aria-hidden="true" />
              <p className="mt-3 font-semibold text-navy-900">No encontramos ese término en el plan</p>
              <p className="mt-1 text-sm text-slate-600">Probá con otra palabra o elegí uno de los temas sugeridos.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ViaLegend() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-600" aria-label="Referencias de vías de ejecución">
      {VIAS.map((v) => (
        <li key={v.id} className="flex items-center gap-2">
          <span className={cn('flex size-6 items-center justify-center rounded-md text-xs font-bold', VIA_STYLE[v.id])}>{v.id}</span>
          Vía {v.name}
        </li>
      ))}
    </ul>
  )
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = pillar.icon
  const block = BLOCKS.find((b) => b.id === pillar.block)!
  const notesId = `pillar-notes-${pillar.number}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: Math.min(index, 6) * 0.05, duration: 0.4 } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy-900/10"
    >
      <header className="flex items-start gap-4 border-b border-slate-100 p-6">
        <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-sol-400">
          <span className="text-[10px] font-semibold tracking-widest uppercase">Pilar</span>
          <span className="font-display text-xl leading-none font-bold">{pillar.number}</span>
        </span>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-sol-600 uppercase">
            <Icon className="size-3.5" aria-hidden="true" />
            {block.label}
          </p>
          <h4 className="mt-1 font-display text-xl leading-snug font-bold text-navy-900">{pillar.title}</h4>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="rounded-xl border-l-4 border-sol-400 bg-cream/60 p-4">
          <p className="text-xs font-bold tracking-wider text-sol-600 uppercase">La promesa</p>
          <p className="mt-1 leading-relaxed text-navy-900">{pillar.promise}</p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Acciones en los primeros 100 días</p>
          <ul className="mt-3 space-y-3">
            {pillar.actions.map((a) => (
              <li key={a.text} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                <span className="flex shrink-0 gap-1 pt-0.5">
                  {a.vias.map((v) => (
                    <span key={v} title={`Vía ${v}: ${VIAS.find((x) => x.id === v)!.name}`} className={cn('flex size-6 items-center justify-center rounded-md text-xs font-bold', VIA_STYLE[v])}>
                      <span className="sr-only">Vía </span>
                      {v}
                    </span>
                  ))}
                </span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={notesId}
            className="flex w-full items-center justify-between gap-2 rounded-lg py-1 text-left text-sm font-semibold text-navy-800 hover:text-navy-950"
          >
            <span className="flex items-center gap-2">
              <Scale className="size-4 text-sol-600" aria-hidden="true" />
              Fundamentos legales y estratégicos
            </span>
            <ChevronDown className={cn('size-5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.dl
                id={notesId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-4">
                  {pillar.notes.map((n) => (
                    <div key={n.title} className="rounded-lg bg-paper p-3">
                      <dt className="text-sm font-semibold text-navy-900">{n.title}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-slate-600">{n.text}</dd>
                    </div>
                  ))}
                </div>
              </motion.dl>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}
