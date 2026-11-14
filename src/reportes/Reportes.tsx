import {
  ArrowDownToLine,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileDown,
  HandHeart,
  Lightbulb,
  Loader2,
  LockKeyhole,
  LogOut,
  MousePointerClick,
  RefreshCw,
  Search,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Logo } from '../components/Logo'
import { PROVINCE_NAMES } from '../data/federal'
import { AuthError, getListado, getReporte, setContactado } from './api'
import type { Inscripto, Reporte } from './api'
import { DailyLine, Funnel, HBars, fmt, pct } from './charts'

const KEY = 'df_reportes_clave'

const SECCIONES: Record<string, string> = {
  inicio: 'Inicio',
  candidato: 'El Candidato',
  plan: 'Plan de Gobierno',
  'cien-dias': '100 Días',
  tokeniza: 'Argentina Tokeniza',
  federal: 'República Federal',
  convocatoria: 'Kit de emergencia',
  transparencia: 'Transparencia',
  sumate: 'Sumate (formulario)',
}

const BOTONES: Record<string, string> = {
  menu_fiscaliza: 'Barra · Fiscalizá',
  menu_movil_fiscaliza: 'Menú celular · Fiscalizá',
  inicio_leer_plan: 'Inicio · Leer Plan de Gobierno',
  inicio_sumate_fiscalizar: 'Inicio · Sumate a Fiscalizar',
  kit_voluntario: 'Kit · Quiero ser voluntario',
  kit_donar: 'Kit · Donar o colaborar',
}
const botonLabel = (b: string) =>
  BOTONES[b] ??
  (b?.startsWith('menu_movil_') ? `Menú celular · ${SECCIONES[b.slice(11)] ?? b.slice(11)}` : b?.startsWith('menu_') ? `Barra · ${SECCIONES[b.slice(5)] ?? b.slice(5)}` : b ?? 'Otro')

const FORMULARIOS: Record<string, string> = { modal_fiscal: 'Modal Fiscalizá', formulario_sumate: 'Formulario Sumate' }
const TIPOS: Record<Inscripto['tipo'], string> = { fiscal: 'Fiscal', voluntario: 'Voluntario', propuesta: 'Propuesta' }

type Rango = 'hoy' | '7' | '30' | 'todo'
const iso = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' })
function rangeDates(r: Rango): [string | null, string | null] {
  const today = new Date()
  if (r === 'todo') return [null, iso(today)]
  const from = new Date(today)
  from.setDate(today.getDate() - (r === 'hoy' ? 0 : Number(r) - 1))
  return [iso(from), iso(today)]
}

export function Reportes() {
  const [clave, setClave] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [authed, setAuthed] = useState(false)

  const logout = () => {
    try {
      sessionStorage.removeItem(KEY)
    } catch {
      /* noop */
    }
    setClave('')
    setAuthed(false)
  }

  if (!authed)
    return (
      <Login
        initial={clave}
        onOk={(c) => {
          try {
            sessionStorage.setItem(KEY, c)
          } catch {
            /* noop */
          }
          setClave(c)
          setAuthed(true)
        }}
      />
    )
  return <Dashboard clave={clave} onLogout={logout} />
}

function Login({ initial, onOk }: { initial: string; onOk: (c: string) => void }) {
  const [value, setValue] = useState(initial)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const onOkRef = useRef(onOk)
  onOkRef.current = onOk

  const tryLogin = useCallback(
    async (c: string) => {
      setLoading(true)
      setError('')
      try {
        await getReporte(c, ...rangeDates('hoy'))
        onOkRef.current(c)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // Si la clave ya estaba guardada en esta pestaña, entra directo
  useEffect(() => {
    if (initial) void tryLogin(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim()) void tryLogin(value.trim())
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-navy-950 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="font-display text-lg font-bold text-navy-900">Panel de reportes</p>
            <p className="text-sm text-slate-600">Campaña Demian Borello Falcón</p>
          </div>
        </div>
        <label htmlFor="clave" className="mt-8 mb-1.5 block text-sm font-semibold text-navy-900">
          Clave de acceso
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="clave"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'clave-error' : undefined}
            className="w-full rounded-xl border border-slate-300 py-3 pr-4 pl-11 text-base focus:border-celeste-500 focus:ring-4 focus:ring-celeste-100 focus:outline-none"
          />
        </div>
        {error && (
          <p id="clave-error" role="alert" className="mt-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 py-3 font-bold text-cream hover:bg-navy-800 disabled:opacity-70"
        >
          {loading && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
          Entrar
        </button>
        <p className="mt-4 text-center text-xs text-slate-500">Acceso restringido. Contiene datos personales (Ley 25.326).</p>
      </form>
    </main>
  )
}

function Dashboard({ clave, onLogout }: { clave: string; onLogout: () => void }) {
  const [rango, setRango] = useState<Rango>('30')
  const [rep, setRep] = useState<Reporte | null>(null)
  const [filas, setFilas] = useState<Inscripto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState<Date | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const [d, h] = rangeDates(rango)
    try {
      const [r, l] = await Promise.all([getReporte(clave, d, h), getListado(clave, d, h)])
      setRep(r)
      setFilas(l)
      setUpdated(new Date())
    } catch (e) {
      if (e instanceof AuthError) onLogout()
      else setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [clave, rango, onLogout])

  useEffect(() => {
    void load()
    const t = window.setInterval(() => void load(), 60_000)
    return () => window.clearInterval(t)
  }, [load])

  const t = rep?.totales
  const conversion = rep && rep.embudo.visitaron ? (rep.embudo.enviaron / rep.embudo.visitaron) * 100 : 0
  const disp = rep?.por_dispositivo ?? {}
  const dispTotal = Object.values(disp).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-20 bg-navy-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo className="h-9" />
            <div>
              <p className="font-display font-bold text-cream">Reportes de campaña</p>
              <p className="text-xs text-slate-400">
                {updated ? `Actualizado ${updated.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} · se refresca cada minuto` : 'Cargando…'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div role="group" aria-label="Período" className="flex rounded-full bg-white/10 p-1">
              {(
                [
                  ['hoy', 'Hoy'],
                  ['7', '7 días'],
                  ['30', '30 días'],
                  ['todo', 'Todo'],
                ] as [Rango, string][]
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={rango === k}
                  onClick={() => setRango(k)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${rango === k ? 'bg-sol-400 text-navy-950' : 'text-slate-200 hover:bg-white/10'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => void load()} aria-label="Actualizar" className="flex size-10 items-center justify-center rounded-full hover:bg-white/10">
              <RefreshCw className={`size-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button type="button" onClick={onLogout} aria-label="Salir" className="flex size-10 items-center justify-center rounded-full hover:bg-white/10">
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
            {error}
          </p>
        )}
        {!rep ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-8 animate-spin text-navy-700" aria-label="Cargando" />
          </div>
        ) : (
          <>
            <section aria-label="Indicadores principales" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi icon={<Eye />} label="Visitantes únicos" value={fmt(t!.visitantes)} sub={`${fmt(t!.sesiones)} visitas`} />
              <Kpi icon={<Users />} label="Inscripciones" value={fmt(t!.inscripciones)} sub={`${fmt(t!.pendientes_contacto)} sin contactar`} highlight />
              <Kpi icon={<MousePointerClick />} label="Conversión" value={pct(conversion)} sub="visitas que terminan en inscripción" />
              <Kpi icon={<FileDown />} label="Descargas del plan" value={fmt(t!.descargas_pdf)} sub={`${fmt(t!.clics_instagram)} clics a Instagram`} />
              <Kpi icon={<ClipboardCheck />} label="Fiscales" value={fmt(t!.fiscales)} />
              <Kpi icon={<HandHeart />} label="Voluntarios" value={fmt(t!.voluntarios)} />
              <Kpi icon={<Lightbulb />} label="Propuestas" value={fmt(t!.propuestas)} />
              <Kpi
                icon={<Eye />}
                label="Dispositivo"
                value={dispTotal ? `${pct(Math.round(((disp.movil ?? 0) / dispTotal) * 100))} celular` : '—'}
                sub={dispTotal ? `${fmt(disp.escritorio ?? 0)} compu · ${fmt(disp.tablet ?? 0)} tablet` : undefined}
              />
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Visitantes únicos por día">
                <DailyLine data={rep.por_dia.map((d) => ({ dia: d.dia, valor: d.visitantes }))} label="Visitantes" />
              </Card>
              <Card title="Inscripciones por día">
                <DailyLine data={rep.por_dia.map((d) => ({ dia: d.dia, valor: d.inscripciones }))} label="Inscripciones" />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Embudo de conversión" note="Sesiones únicas en cada paso">
                <Funnel
                  steps={[
                    { label: 'Entraron a la web', value: rep.embudo.visitaron },
                    { label: 'Llegaron a la sección Sumate', value: rep.embudo.vieron_formulario },
                    { label: 'Abrieron un formulario', value: rep.embudo.abrieron_formulario },
                    { label: 'Empezaron a completarlo', value: rep.embudo.empezaron },
                    { label: 'Enviaron la inscripción', value: rep.embudo.enviaron },
                  ]}
                />
              </Card>
              <Card title="Inscripciones por provincia">
                <HBars
                  rows={rep.por_provincia.map((p) => ({ label: p.provincia, value: p.total }))}
                  unit="inscripciones"
                  empty="Todavía no hay inscripciones en el período."
                  extra={(i) => {
                    const p = rep.por_provincia[i]
                    return `F ${p.fiscales} · V ${p.voluntarios} · P ${p.propuestas}`
                  }}
                />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card title="De dónde llegan" note="Visitas por origen">
                <HBars rows={rep.por_fuente.map((f) => ({ label: f.fuente, value: f.sesiones }))} unit="visitas" />
              </Card>
              <Card title="Secciones más vistas" note="Visitas que llegaron a cada sección">
                <HBars rows={rep.secciones.map((s) => ({ label: SECCIONES[s.seccion] ?? s.seccion, value: s.sesiones }))} unit="visitas" />
              </Card>
              <Card title="Botones más tocados">
                <HBars rows={rep.clics.map((c) => ({ label: botonLabel(c.boton), value: c.clics }))} unit="clics" />
              </Card>
            </div>

            <Card title="Formularios">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="text-xs tracking-wide text-slate-500 uppercase">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Formulario</th>
                      <th className="py-2 pr-4 text-right font-semibold">Abiertos</th>
                      <th className="py-2 pr-4 text-right font-semibold">Empezados</th>
                      <th className="py-2 pr-4 text-right font-semibold">Enviados</th>
                      <th className="py-2 pr-4 text-right font-semibold">Con error</th>
                      <th className="py-2 text-right font-semibold">Tasa de envío</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {['modal_fiscal', 'formulario_sumate'].map((k) => {
                      const f = rep.formularios.find((x) => x.formulario === k) ?? { abiertos: 0, iniciados: 0, enviados: 0, errores: 0 }
                      return (
                        <tr key={k}>
                          <td className="py-2.5 pr-4 font-medium text-navy-900">{FORMULARIOS[k]}</td>
                          <td className="py-2.5 pr-4 text-right tabular-nums">{fmt(f.abiertos)}</td>
                          <td className="py-2.5 pr-4 text-right tabular-nums">{fmt(f.iniciados)}</td>
                          <td className="py-2.5 pr-4 text-right font-semibold tabular-nums">{fmt(f.enviados)}</td>
                          <td className="py-2.5 pr-4 text-right tabular-nums">{fmt(f.errores)}</td>
                          <td className="py-2.5 text-right tabular-nums">{f.abiertos ? pct(Math.round((f.enviados / f.abiertos) * 100)) : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <Listado clave={clave} filas={filas} onChange={setFilas} />
          </>
        )}
      </main>
    </div>
  )
}

function Kpi({ icon, label, value, sub, highlight }: { icon: ReactNode; label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 shadow-sm sm:p-5 ${highlight ? 'bg-navy-900 text-white' : 'border border-slate-200 bg-white'}`}>
      <p className={`flex items-center gap-2 text-xs font-semibold tracking-wide uppercase ${highlight ? 'text-sol-400' : 'text-slate-500'} [&_svg]:size-4`}>
        {icon}
        {label}
      </p>
      <p className={`mt-2 font-display text-3xl font-bold tabular-nums ${highlight ? 'text-cream' : 'text-navy-900'}`}>{value}</p>
      {sub && <p className={`mt-1 text-xs ${highlight ? 'text-slate-300' : 'text-slate-500'}`}>{sub}</p>}
    </div>
  )
}

function Card({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-lg font-bold text-navy-900">{title}</h2>
      {note && <p className="text-xs text-slate-500">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

function toCsv(rows: Inscripto[]) {
  const cols: [string, (r: Inscripto) => string | number | boolean | null][] = [
    ['Fecha', (r) => new Date(r.created_at).toLocaleString('es-AR')],
    ['Código', (r) => r.codigo],
    ['Tipo', (r) => TIPOS[r.tipo]],
    ['Nombre', (r) => r.nombre],
    ['Apellido', (r) => r.apellido],
    ['DNI', (r) => r.dni],
    ['Email', (r) => r.email],
    ['Celular', (r) => r.telefono],
    ['Provincia', (r) => r.provincia],
    ['Localidad', (r) => r.localidad],
    ['Propuesta', (r) => r.propuesta],
    ['Contactado', (r) => (r.contactado ? 'Sí' : 'No')],
    ['Origen', (r) => (r.origen === 'modal' ? 'Modal Fiscalizá' : 'Formulario Sumate')],
  ]
  const esc = (v: unknown) => {
    let s = v === null || v === undefined ? '' : String(v)
    if (/^[=+\-@]/.test(s)) s = `'${s}` // evita fórmulas al abrir en Excel
    return `"${s.replace(/"/g, '""')}"`
  }
  return '﻿' + [cols.map((c) => esc(c[0])).join(';'), ...rows.map((r) => cols.map((c) => esc(c[1](r))).join(';'))].join('\r\n')
}

function Listado({ clave, filas, onChange }: { clave: string; filas: Inscripto[]; onChange: (f: Inscripto[]) => void }) {
  const [tipo, setTipo] = useState<'' | Inscripto['tipo']>('')
  const [prov, setProv] = useState('')
  const [estado, setEstado] = useState<'' | 'pendiente' | 'contactado'>('')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<number | null>(null)
  const [saving, setSaving] = useState<number | null>(null)

  const visibles = useMemo(() => {
    const term = q.trim().toLowerCase()
    return filas.filter(
      (r) =>
        (!tipo || r.tipo === tipo) &&
        (!prov || r.provincia === prov) &&
        (!estado || (estado === 'contactado') === r.contactado) &&
        (!term || [r.nombre, r.apellido, r.email, r.dni, r.telefono, r.codigo, r.localidad].some((v) => v?.toLowerCase().includes(term))),
    )
  }, [filas, tipo, prov, estado, q])

  const toggle = async (r: Inscripto) => {
    setSaving(r.id)
    try {
      await setContactado(clave, r.id, !r.contactado)
      onChange(filas.map((x) => (x.id === r.id ? { ...x, contactado: !r.contactado } : x)))
    } catch {
      /* el próximo refresco muestra el estado real */
    } finally {
      setSaving(null)
    }
  }

  const exportar = () => {
    const blob = new Blob([toCsv(visibles)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `inscripciones-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const sel = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-celeste-500 focus:outline-none'

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
        <div>
          <h2 className="font-display text-lg font-bold text-navy-900">Personas inscriptas</h2>
          <p className="text-xs text-slate-500">
            {fmt(visibles.length)} de {fmt(filas.length)} en el período · marcá a quién ya contactaron
          </p>
        </div>
        <button type="button" onClick={exportar} disabled={!visibles.length} className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-bold text-cream hover:bg-navy-800 disabled:opacity-50">
          <ArrowDownToLine className="size-4" aria-hidden="true" /> Exportar a Excel (CSV)
        </button>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4 sm:px-6">
        <div className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, DNI, mail, código…" aria-label="Buscar" className={`${sel} w-full pl-9`} />
        </div>
        <select aria-label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className={sel}>
          <option value="">Todos los tipos</option>
          <option value="fiscal">Fiscales</option>
          <option value="voluntario">Voluntarios</option>
          <option value="propuesta">Propuestas</option>
        </select>
        <select aria-label="Provincia" value={prov} onChange={(e) => setProv(e.target.value)} className={sel}>
          <option value="">Todas las provincias</option>
          {PROVINCE_NAMES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select aria-label="Estado" value={estado} onChange={(e) => setEstado(e.target.value as typeof estado)} className={sel}>
          <option value="">Todos</option>
          <option value="pendiente">Sin contactar</option>
          <option value="contactado">Contactados</option>
        </select>
      </div>
      {visibles.length === 0 ? (
        <p className="p-10 text-center text-sm text-slate-500">No hay inscripciones con estos filtros.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-paper text-xs tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-2.5 font-semibold sm:pl-6">Contactado</th>
                <th className="px-4 py-2.5 font-semibold">Fecha</th>
                <th className="px-4 py-2.5 font-semibold">Persona</th>
                <th className="px-4 py-2.5 font-semibold">Tipo</th>
                <th className="px-4 py-2.5 font-semibold">Contacto</th>
                <th className="px-4 py-2.5 font-semibold">Provincia</th>
                <th className="px-4 py-2.5 font-semibold">Código</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibles.map((r) => (
                <FilaInscripto key={r.id} r={r} saving={saving === r.id} open={open === r.id} onToggle={() => void toggle(r)} onOpen={() => setOpen(open === r.id ? null : r.id)} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function FilaInscripto({ r, saving, open, onToggle, onOpen }: { r: Inscripto; saving: boolean; open: boolean; onToggle: () => void; onOpen: () => void }) {
  const wa = r.telefono ? `https://wa.me/${r.telefono.replace(/\D/g, '').replace(/^0/, '').replace(/^(?!54)/, '549')}` : null
  return (
    <>
      <tr className={r.contactado ? 'bg-emerald-50/40' : ''}>
        <td className="px-4 py-3 sm:pl-6">
          <button
            type="button"
            onClick={onToggle}
            disabled={saving}
            aria-pressed={r.contactado}
            aria-label={`Marcar a ${r.nombre} como ${r.contactado ? 'no contactado' : 'contactado'}`}
            className={`flex size-8 items-center justify-center rounded-full border-2 ${r.contactado ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-transparent hover:border-emerald-500'}`}
          >
            {saving ? <Loader2 className="size-4 animate-spin text-slate-500" /> : <CheckCircle2 className="size-5" />}
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-slate-600 tabular-nums">
          {new Date(r.created_at).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
        </td>
        <td className="px-4 py-3">
          <p className="font-semibold text-navy-900">
            {r.nombre} {r.apellido}
          </p>
          {r.dni && <p className="text-xs text-slate-500">DNI {r.dni}</p>}
        </td>
        <td className="px-4 py-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-900">{TIPOS[r.tipo]}</span>
          {r.propuesta && (
            <button type="button" onClick={onOpen} aria-expanded={open} className="ml-2 text-xs font-semibold text-celeste-700 underline">
              {open ? 'Ocultar' : 'Ver propuesta'}
            </button>
          )}
        </td>
        <td className="px-4 py-3">
          <a href={`mailto:${r.email}`} className="block text-celeste-700 hover:underline">
            {r.email}
          </a>
          {r.telefono &&
            (wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 hover:underline">
                WhatsApp {r.telefono}
              </a>
            ) : (
              <span className="text-xs text-slate-500">{r.telefono}</span>
            ))}
        </td>
        <td className="px-4 py-3 text-slate-700">
          {r.provincia}
          {r.localidad && <span className="block text-xs text-slate-500">{r.localidad}</span>}
        </td>
        <td className="px-4 py-3 font-mono text-xs text-slate-600">{r.codigo}</td>
      </tr>
      {open && r.propuesta && (
        <tr>
          <td colSpan={7} className="bg-paper px-6 py-4 text-sm leading-relaxed text-slate-700">
            {r.propuesta}
          </td>
        </tr>
      )}
    </>
  )
}
