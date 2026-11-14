import { useId, useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'

const MARK = '#2f73bf' // un solo tono por gráfico (contraste 4,6:1 sobre blanco)
const MARK_HOVER = '#1f5596'
const GRID = '#e2e8f0'
const INK_MUTED = '#475569'

const nf = new Intl.NumberFormat('es-AR')
export const fmt = (n: number) => nf.format(n)
export const pct = (v: number) => `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: v < 10 ? 1 : 0 }).format(v)}%`

function niceMax(v: number) {
  if (v <= 4) return 4
  const p = Math.pow(10, Math.floor(Math.log10(v)))
  const n = v / p
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p
}

const fmtDay = (iso: string) => {
  const [, m, d] = iso.split('-')
  return `${Number(d)}/${Number(m)}`
}

/** Línea de una serie diaria con cruz que sigue al puntero y tooltip */
export function DailyLine({ data, label }: { data: { dia: string; valor: number }[]; label: string }) {
  const W = 640
  const H = 220
  const pad = { l: 36, r: 12, t: 12, b: 28 }
  const ref = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const gid = useId()
  const max = niceMax(Math.max(1, ...data.map((d) => d.valor)))
  const x = (i: number) => pad.l + (data.length <= 1 ? (W - pad.l - pad.r) / 2 : (i * (W - pad.l - pad.r)) / (data.length - 1))
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max)
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.valor).toFixed(1)}`).join(' ')
  const area = data.length ? `${path} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z` : ''
  const ticks = [0, max / 2, max]
  const step = Math.max(1, Math.ceil(data.length / 7))

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = ref.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    let best = 0
    data.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i
    })
    setHover(best)
  }

  if (!data.length) return <p className="py-10 text-center text-sm text-slate-500">Sin datos en el período.</p>
  const h = hover !== null ? data[hover] : null

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none select-none"
        role="img"
        aria-label={`${label} por día`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={MARK} stopOpacity="0.18" />
            <stop offset="1" stopColor={MARK} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={GRID} />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill={INK_MUTED}>
              {fmt(Math.round(t))}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % step === 0 || i === data.length - 1 ? (
            <text key={d.dia} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={INK_MUTED}>
              {fmtDay(d.dia)}
            </text>
          ) : null,
        )}
        <path d={area} fill={`url(#${gid})`} />
        <path d={path} fill="none" stroke={MARK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {data.length <= 31 &&
          data.map((d, i) => <circle key={d.dia} cx={x(i)} cy={y(d.valor)} r="3" fill="#fff" stroke={MARK} strokeWidth="2" />)}
        {h && hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={y(0)} stroke="#94a3b8" strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(h.valor)} r="5" fill={MARK} stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </svg>
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg bg-navy-950 px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > data.length / 2 ? '-105%' : '5%'})` }}
        >
          <p className="text-sm font-bold">{fmt(h.valor)}</p>
          <p className="text-slate-300">
            {label} · {fmtDay(h.dia)}
          </p>
        </div>
      )}
    </div>
  )
}

/** Barras horizontales de una sola serie, con el valor escrito al final de cada barra */
export function HBars({
  rows,
  unit,
  empty = 'Sin datos en el período.',
  extra,
}: {
  rows: { label: string; value: number }[]
  unit: string
  empty?: string
  extra?: (i: number) => string | null
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(1, ...rows.map((r) => r.value))
  if (!rows.length || rows.every((r) => r.value === 0)) return <p className="py-6 text-center text-sm text-slate-500">{empty}</p>
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li
          key={r.label}
          tabIndex={0}
          onPointerEnter={() => setHover(i)}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(null)}
          className="group rounded-md outline-offset-2"
          title={`${r.label}: ${fmt(r.value)} ${unit}`}
        >
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-slate-700">{r.label}</span>
            <span className="shrink-0 font-semibold text-navy-900 tabular-nums">
              {fmt(r.value)}
              {extra?.(i) && <span className="ml-1.5 font-normal text-slate-500">{extra(i)}</span>}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-[width,background-color] duration-500"
              style={{ width: `${Math.max(2, (r.value / max) * 100)}%`, background: hover === i ? MARK_HOVER : MARK }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Embudo: cada paso como barra, con % sobre el primero y caída respecto del anterior */
export function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const first = Math.max(1, steps[0]?.value ?? 1)
  const rows = useMemo(
    () =>
      steps.map((s, i) => {
        const prev = i === 0 ? s.value : steps[i - 1].value
        return { ...s, pct: (s.value / first) * 100, step: prev ? (s.value / prev) * 100 : 0 }
      }),
    [steps, first],
  )
  return (
    <ol className="space-y-3">
      {rows.map((r, i) => (
        <li key={r.label} tabIndex={0} className="rounded-md outline-offset-2" title={`${r.label}: ${fmt(r.value)}`}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-slate-700">
              <span className="mr-2 font-semibold text-slate-500 tabular-nums">{i + 1}</span>
              {r.label}
            </span>
            <span className="shrink-0 tabular-nums">
              <strong className="text-navy-900">{fmt(r.value)}</strong>
              <span className="ml-2 text-slate-500">{pct(r.pct)}</span>
            </span>
          </div>
          <div className="h-7 w-full rounded-md bg-slate-100">
            <div className="h-full rounded-md transition-[width] duration-500" style={{ width: `${Math.max(1.5, r.pct)}%`, background: MARK }} />
          </div>
          {i > 0 && (
            <p className="mt-1 text-xs text-slate-500">
              {pct(Math.round(r.step))} de quienes llegaron al paso anterior
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
