import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ClipboardCheck, HandHeart, Lightbulb, Loader2, Send } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PROVINCE_NAMES } from '../data/federal'
import { track } from '../lib/analytics'
import { registrarInscripcion } from '../lib/api'
import { cn, isValidDni, isValidEmail, isValidPhone } from '../lib/utils'
import type { ParticipationType } from '../types'
import { FieldError, inputClass, labelClass, SectionHeader } from './ui'

const OPTIONS: { id: ParticipationType; title: string; detail: string; icon: typeof ClipboardCheck }[] = [
  { id: 'fiscal', title: 'Quiero ser Fiscal de Mesa', detail: 'Cuidá el voto en tu escuela. Te capacitamos.', icon: ClipboardCheck },
  { id: 'voluntario', title: 'Quiero ser Voluntario', detail: 'Sumate a la campaña en tu barrio o en redes.', icon: HandHeart },
  { id: 'propuesta', title: 'Enviar una propuesta', detail: 'Contanos qué necesita tu provincia.', icon: Lightbulb },
]

interface FormState {
  type: ParticipationType
  firstName: string
  lastName: string
  dni: string
  email: string
  phone: string
  province: string
  city: string
  message: string
  consent: boolean
}

type Errors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  type: 'fiscal',
  firstName: '',
  lastName: '',
  dni: '',
  email: '',
  phone: '',
  province: '',
  city: '',
  message: '',
  consent: false,
}

function validate(f: FormState): Errors {
  const e: Errors = {}
  if (f.firstName.trim().length < 2) e.firstName = 'Ingresá tu nombre.'
  if (f.lastName.trim().length < 2) e.lastName = 'Ingresá tu apellido.'
  if (f.type === 'fiscal' && !isValidDni(f.dni)) e.dni = 'Ingresá un DNI válido (7 u 8 números, sin puntos).'
  if (f.type !== 'fiscal' && f.dni && !isValidDni(f.dni)) e.dni = 'El DNI debe tener 7 u 8 números.'
  if (!isValidEmail(f.email)) e.email = 'Ingresá un correo electrónico válido.'
  if (f.type !== 'propuesta' && !isValidPhone(f.phone)) e.phone = 'Ingresá un teléfono de contacto con código de área.'
  if (!f.province) e.province = 'Seleccioná tu provincia.'
  if (f.type === 'propuesta' && f.message.trim().length < 30)
    e.message = 'Contanos tu propuesta en al menos 30 caracteres.'
  if (!f.consent) e.consent = 'Necesitamos tu consentimiento para contactarte.'
  return e
}

export function Participation() {
  const uid = useId()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [code, setCode] = useState('')
  const [submitError, setSubmitError] = useState('')
  const opened = useRef(false)
  const started = useRef(false)

  const onFormFocus = () => {
    if (opened.current) return
    opened.current = true
    track('form_abierto', 'formulario_sumate')
  }

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!started.current) {
      started.current = true
      track('form_iniciado', 'formulario_sumate')
    }
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (status === 'sending') return
    const found = validate(form)
    setErrors(found)
    const firstKey = Object.keys(found)[0]
    if (firstKey) {
      document.getElementById(`${uid}-${firstKey}`)?.focus()
      return
    }
    setStatus('sending')
    setSubmitError('')
    registrarInscripcion({
      tipo: form.type,
      origen: 'formulario',
      nombre: form.firstName,
      apellido: form.lastName,
      dni: form.dni,
      email: form.email,
      telefono: form.phone,
      provincia: form.province,
      localidad: form.city,
      propuesta: form.type === 'propuesta' ? form.message : undefined,
    })
      .then((c) => {
        setCode(c)
        setStatus('done')
        track('form_enviado', 'formulario_sumate')
        document.getElementById('sumate')?.scrollIntoView({ block: 'start' })
      })
      .catch((err: Error) => {
        track('form_error', 'formulario_sumate')
        setSubmitError(err.message)
        setStatus('idle')
      })
  }

  const reset = () => {
    setForm(INITIAL)
    setErrors({})
    setSubmitError('')
    setStatus('idle')
  }

  // Al cambiar el tipo de participación, los errores anteriores pueden no aplicar más
  const changeType = (type: ParticipationType) => {
    setForm((f) => ({ ...f, type }))
    setErrors({})
    setSubmitError('')
  }

  const fid = (k: keyof FormState) => `${uid}-${k}`
  const describedBy = (k: keyof FormState) => (errors[k] ? `${fid(k)}-error` : undefined)
  const selected = OPTIONS.find((o) => o.id === form.type)!

  return (
    <section id="sumate" aria-labelledby="sumate-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="sumate-title"
          eyebrow="Participación ciudadana"
          title="Sumate: cuidá el voto, militá o proponé"
          description="La Argentina que queremos se construye con la participación de todos. Elegí cómo querés sumarte y completá tus datos."
        />

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-navy-900/5">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-16 text-center sm:px-12"
                role="status"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100"
                >
                  <CheckCircle2 className="size-11 text-emerald-600" aria-hidden="true" />
                </motion.span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  ¡Gracias, {form.firstName.trim()}!
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-slate-600">
                  {form.type === 'fiscal' &&
                    `Recibimos tu inscripción como Fiscal de Mesa en ${form.province}. El equipo de fiscalización te va a escribir a ${form.email} con la fecha de capacitación.`}
                  {form.type === 'voluntario' &&
                    `Ya sos parte del voluntariado en ${form.province}. Te vamos a contactar por WhatsApp o correo para coordinar tu primera actividad.`}
                  {form.type === 'propuesta' &&
                    `Tu propuesta para ${form.province} fue enviada al equipo técnico. Vas a recibir una respuesta en ${form.email}.`}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                  Código de seguimiento: <strong className="font-mono text-navy-900">{code}</strong>
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border-2 border-navy-900 px-6 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
                  >
                    Enviar otra inscripción
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} onFocus={onFormFocus} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <fieldset className="border-b border-slate-200 bg-paper p-6 sm:p-8">
                  <legend className="sr-only">¿Cómo querés participar?</legend>
                  <p className="mb-4 text-sm font-semibold text-navy-900" aria-hidden="true">
                    ¿Cómo querés participar?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {OPTIONS.map((o) => {
                      const Icon = o.icon
                      const checked = form.type === o.id
                      return (
                        <label
                          key={o.id}
                          className={cn(
                            'relative flex cursor-pointer flex-col rounded-2xl border-2 bg-white p-4 transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-celeste-200',
                            checked ? 'border-navy-900 shadow-md' : 'border-slate-200 hover:border-slate-300',
                          )}
                        >
                          <input
                            type="radio"
                            name={`${uid}-type`}
                            value={o.id}
                            checked={checked}
                            onChange={() => changeType(o.id)}
                            className="sr-only"
                          />
                          <span className="flex items-center justify-between">
                            <Icon className={cn('size-6', checked ? 'text-navy-900' : 'text-slate-400')} aria-hidden="true" />
                            <span
                              className={cn(
                                'flex size-5 items-center justify-center rounded-full border-2',
                                checked ? 'border-navy-900 bg-navy-900' : 'border-slate-300',
                              )}
                              aria-hidden="true"
                            >
                              {checked && <span className="size-2 rounded-full bg-white" />}
                            </span>
                          </span>
                          <span className="mt-3 font-semibold text-navy-900">{o.title}</span>
                          <span className="mt-1 text-sm text-slate-600">{o.detail}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                  <div>
                    <label htmlFor={fid('firstName')} className={labelClass}>Nombre *</label>
                    <input id={fid('firstName')} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} autoComplete="given-name" aria-invalid={!!errors.firstName} aria-describedby={describedBy('firstName')} className={inputClass(!!errors.firstName)} />
                    <FieldError id={`${fid('firstName')}-error`} message={errors.firstName} />
                  </div>
                  <div>
                    <label htmlFor={fid('lastName')} className={labelClass}>Apellido *</label>
                    <input id={fid('lastName')} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} autoComplete="family-name" aria-invalid={!!errors.lastName} aria-describedby={describedBy('lastName')} className={inputClass(!!errors.lastName)} />
                    <FieldError id={`${fid('lastName')}-error`} message={errors.lastName} />
                  </div>
                  <div>
                    <label htmlFor={fid('dni')} className={labelClass}>DNI {form.type === 'fiscal' ? '*' : '(opcional)'}</label>
                    <input id={fid('dni')} value={form.dni} onChange={(e) => set('dni', e.target.value.replace(/[^\d.]/g, ''))} inputMode="numeric" placeholder="Sin puntos" maxLength={10} aria-invalid={!!errors.dni} aria-describedby={describedBy('dni')} className={inputClass(!!errors.dni)} />
                    <FieldError id={`${fid('dni')}-error`} message={errors.dni} />
                  </div>
                  <div>
                    <label htmlFor={fid('email')} className={labelClass}>Correo electrónico *</label>
                    <input id={fid('email')} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" placeholder="nombre@correo.com" aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={inputClass(!!errors.email)} />
                    <FieldError id={`${fid('email')}-error`} message={errors.email} />
                  </div>
                  <div>
                    <label htmlFor={fid('phone')} className={labelClass}>Celular {form.type === 'propuesta' ? '(opcional)' : '*'}</label>
                    <input id={fid('phone')} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="11 2345-6789" aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} className={inputClass(!!errors.phone)} />
                    <FieldError id={`${fid('phone')}-error`} message={errors.phone} />
                  </div>
                  <div>
                    <label htmlFor={fid('province')} className={labelClass}>Provincia *</label>
                    <select id={fid('province')} value={form.province} onChange={(e) => set('province', e.target.value)} aria-invalid={!!errors.province} aria-describedby={describedBy('province')} className={inputClass(!!errors.province)}>
                      <option value="">Seleccioná una de las 24 jurisdicciones</option>
                      {PROVINCE_NAMES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <FieldError id={`${fid('province')}-error`} message={errors.province} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={fid('city')} className={labelClass}>Localidad (opcional)</label>
                    <input id={fid('city')} value={form.city} onChange={(e) => set('city', e.target.value)} autoComplete="address-level2" className={inputClass()} />
                  </div>

                  <AnimatePresence initial={false}>
                    {form.type === 'propuesta' && (
                      <motion.div key="msg" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden sm:col-span-2">
                        <label htmlFor={fid('message')} className={labelClass}>Tu propuesta para la provincia *</label>
                        <textarea id={fid('message')} rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} maxLength={1200} placeholder="Ej.: Pavimentar la ruta provincial que conecta nuestra zona productiva con el puerto…" aria-invalid={!!errors.message} aria-describedby={describedBy('message')} className={inputClass(!!errors.message)} />
                        <div className="mt-1 flex justify-between">
                          <FieldError id={`${fid('message')}-error`} message={errors.message} />
                          <span className="ml-auto text-xs text-slate-500">{form.message.length}/1200</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
                      <input id={fid('consent')} type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')} className="mt-0.5 size-5 shrink-0 rounded border-slate-300 accent-navy-900" />
                      <span>
                        Acepto que el equipo de campaña de Demian Borello Falcón me contacte por esta inscripción. Mis datos serán tratados conforme a la Ley 25.326 de Protección de Datos Personales.
                      </span>
                    </label>
                    <FieldError id={`${fid('consent')}-error`} message={errors.consent} />
                  </div>
                </div>

                {submitError && (
                  <p role="alert" className="mx-6 mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 sm:mx-8">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {submitError}
                  </p>
                )}
                <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200 bg-paper px-6 py-5 sm:flex-row sm:px-8">
                  <p className="text-xs text-slate-600">* Campos obligatorios</p>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-8 py-3.5 font-bold text-white shadow-lg shadow-navy-900/20 transition-colors hover:bg-navy-800 disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="size-5" aria-hidden="true" />
                        {selected.id === 'propuesta' ? 'Enviar propuesta' : 'Confirmar inscripción'}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
