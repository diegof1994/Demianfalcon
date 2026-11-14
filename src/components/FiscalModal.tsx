import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ClipboardCheck, Loader2, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PROVINCE_NAMES } from '../data/federal'
import { track } from '../lib/analytics'
import { registrarInscripcion } from '../lib/api'
import { isValidDni, isValidEmail, isValidPhone } from '../lib/utils'
import { FieldError, inputClass, labelClass } from './ui'

interface FiscalModalProps {
  open: boolean
  onClose: () => void
}

interface Fields {
  name: string
  dni: string
  phone: string
  email: string
  province: string
}

const EMPTY: Fields = { name: '', dni: '', phone: '', email: '', province: '' }

export function FiscalModal({ open, onClose }: FiscalModalProps) {
  const uid = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [code, setCode] = useState('')
  const [submitError, setSubmitError] = useState('')
  const doneRef = useRef<HTMLButtonElement>(null)
  const started = useRef(false)

  // Bloqueo de scroll, foco inicial, Escape y trampa de foco
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement
    track('form_abierto', 'modal_fiscal')
    started.current = false
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus(), 60)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex]:not([tabindex="-1"])')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocused.current?.focus()
    }
  }, [open, onClose])

  // Al cerrar, se reinicia el formulario
  useEffect(() => {
    if (open) return
    const t = window.setTimeout(() => {
      setF(EMPTY)
      setErrors({})
      setSubmitError('')
      setStatus('idle')
    }, 300)
    return () => window.clearTimeout(t)
  }, [open])

  const set = (k: keyof Fields, v: string) => {
    if (!started.current) {
      started.current = true
      track('form_iniciado', 'modal_fiscal')
    }
    setF((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    const errs: Partial<Record<keyof Fields, string>> = {}
    if (f.name.trim().split(/\s+/).length < 2) errs.name = 'Ingresá nombre y apellido.'
    if (!isValidDni(f.dni)) errs.dni = 'DNI de 7 u 8 números, sin puntos.'
    if (!isValidPhone(f.phone)) errs.phone = 'Ingresá un celular válido.'
    if (!isValidEmail(f.email)) errs.email = 'Ingresá un correo válido.'
    if (!f.province) errs.province = 'Seleccioná tu provincia.'
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    setStatus('sending')
    setSubmitError('')
    const [nombre, ...resto] = f.name.trim().split(/\s+/)
    registrarInscripcion({
      tipo: 'fiscal',
      origen: 'modal',
      nombre,
      apellido: resto.join(' '),
      dni: f.dni,
      email: f.email,
      telefono: f.phone,
      provincia: f.province,
    })
      .then((c) => {
        setCode(c)
        setStatus('done')
        track('form_enviado', 'modal_fiscal')
      })
      .catch((err: Error) => {
        track('form_error', 'modal_fiscal')
        setSubmitError(err.message)
        setStatus('idle')
      })
  }

  // Tras confirmar, el foco pasa al botón "Listo" para que el teclado y los lectores de pantalla no se pierdan
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus()
  }, [status])

  const id = (k: keyof Fields) => `${uid}-${k}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Cerrar" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="relative bg-navy-900 px-6 pt-6 pb-5 text-white sm:px-8">
              <button type="button" onClick={onClose} aria-label="Cerrar ventana" className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
                <X className="size-5" />
              </button>
              <span className="flex size-11 items-center justify-center rounded-xl bg-sol-400 text-navy-950">
                <ClipboardCheck className="size-6" aria-hidden="true" />
              </span>
              <h2 id={`${uid}-title`} className="mt-4 font-display text-2xl font-bold">Fiscalizá: cuidemos cada voto</h2>
              <p className="mt-1 text-sm text-slate-300">Inscripción rápida para ser fiscal de mesa en 2027. Te capacitamos.</p>
            </div>

            {status === 'done' ? (
              <div className="px-6 py-10 text-center sm:px-8" role="status">
                <CheckCircle2 className="mx-auto size-14 text-emerald-600" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-bold text-navy-900">¡Inscripción confirmada!</p>
                <p className="mt-2 text-slate-600">
                  Te enviamos los detalles de la capacitación a <strong>{f.email}</strong>.
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Código: <strong className="font-mono text-navy-900">{code}</strong>
                </p>
                <button ref={doneRef} type="button" onClick={onClose} className="mt-8 w-full rounded-full bg-navy-900 py-3 font-bold text-white hover:bg-navy-800">
                  Listo
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="space-y-4 px-6 py-6 sm:px-8">
                <div>
                  <label htmlFor={id('name')} className={labelClass}>Nombre y apellido</label>
                  <input id={id('name')} value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id('name')}-e` : undefined} className={inputClass(!!errors.name)} />
                  <FieldError id={`${id('name')}-e`} message={errors.name} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={id('dni')} className={labelClass}>DNI</label>
                    <input id={id('dni')} value={f.dni} onChange={(e) => set('dni', e.target.value.replace(/[^\d.]/g, ''))} inputMode="numeric" maxLength={10} aria-invalid={!!errors.dni} aria-describedby={errors.dni ? `${id('dni')}-e` : undefined} className={inputClass(!!errors.dni)} />
                    <FieldError id={`${id('dni')}-e`} message={errors.dni} />
                  </div>
                  <div>
                    <label htmlFor={id('phone')} className={labelClass}>Celular</label>
                    <input id={id('phone')} type="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id('phone')}-e` : undefined} className={inputClass(!!errors.phone)} />
                    <FieldError id={`${id('phone')}-e`} message={errors.phone} />
                  </div>
                </div>
                <div>
                  <label htmlFor={id('email')} className={labelClass}>Correo electrónico</label>
                  <input id={id('email')} type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id('email')}-e` : undefined} className={inputClass(!!errors.email)} />
                  <FieldError id={`${id('email')}-e`} message={errors.email} />
                </div>
                <div>
                  <label htmlFor={id('province')} className={labelClass}>Provincia donde votás</label>
                  <select id={id('province')} value={f.province} onChange={(e) => set('province', e.target.value)} aria-invalid={!!errors.province} aria-describedby={errors.province ? `${id('province')}-e` : undefined} className={inputClass(!!errors.province)}>
                    <option value="">Seleccioná…</option>
                    {PROVINCE_NAMES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <FieldError id={`${id('province')}-e`} message={errors.province} />
                </div>
                {submitError && (
                  <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {submitError}
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-sol-400 py-3.5 font-bold text-navy-950 shadow-md transition-colors hover:bg-sol-500 disabled:opacity-70">
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Enviando…
                    </>
                  ) : (
                    'Quiero ser fiscal'
                  )}
                </button>
                <p className="text-center text-xs text-slate-600">Tus datos se usan solo para coordinar la fiscalización (Ley 25.326).</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
