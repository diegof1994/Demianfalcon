// Medición anónima: sin cookies, sin IP y sin datos personales.
// "visitante" es un id aleatorio guardado en este navegador; "sesion" dura hasta cerrar la pestaña.
import { SUPABASE_KEY, SUPABASE_URL } from './api'

export type EventType =
  | 'visita'
  | 'seccion'
  | 'clic'
  | 'form_abierto'
  | 'form_iniciado'
  | 'form_enviado'
  | 'form_error'
  | 'descarga_pdf'
  | 'instagram'

const rid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`

function stored(storage: () => Storage, key: string): string {
  try {
    const s = storage()
    let v = s.getItem(key)
    if (!v) {
      v = rid()
      s.setItem(key, v)
    }
    return v
  } catch {
    return rid()
  }
}

let visitor = ''
let session = ''
let source: string | null = null
const sent = new Set<string>()

const device = () => {
  const w = window.innerWidth
  return w < 768 ? 'movil' : w < 1024 ? 'tablet' : 'escritorio'
}

function detectSource(): string | null {
  const params = new URLSearchParams(location.search)
  const utm = params.get('utm_source') || params.get('fuente')
  if (utm) return utm.toLowerCase().slice(0, 60)
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\.|^l\.|^m\.|^lm\./, '')
      if (host && host !== location.hostname) return host
    }
  } catch {
    /* referrer inválido */
  }
  return null
}

const isBot = () => /bot|crawler|spider|headless|lighthouse/i.test(navigator.userAgent)

export function track(type: EventType, detail?: string) {
  if (!visitor || isBot()) return
  // Secciones y visitas se cuentan una vez por sesión (la base también lo garantiza)
  if (type === 'visita' || type === 'seccion') {
    const key = `${type}:${detail ?? ''}`
    if (sent.has(key)) return
    sent.add(key)
  }
  try {
    void fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_evento`, {
      method: 'POST',
      keepalive: true,
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_tipo: type,
        p_detalle: detail ?? null,
        p_visitante: visitor,
        p_sesion: session,
        p_dispositivo: device(),
        p_fuente: type === 'visita' ? source : null,
      }),
    }).catch(() => {})
  } catch {
    /* la medición nunca debe romper la web */
  }
}

/** Inicia la medición: visita, secciones vistas y clics en elementos con data-track */
export function initAnalytics() {
  if (visitor) return
  visitor = stored(() => localStorage, 'df_v')
  session = stored(() => sessionStorage, 'df_s')
  source = detectSource()
  track('visita')

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          track('seccion', (e.target as HTMLElement).id)
          io.unobserve(e.target)
        }
      }
    },
    { threshold: 0.35 },
  )
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))

  document.addEventListener(
    'click',
    (ev) => {
      const el = (ev.target as HTMLElement).closest<HTMLElement>('[data-track], a[href*="instagram.com"]')
      if (!el) return
      if (el.matches('a[href*="instagram.com"]')) track('instagram', el.dataset.track ?? 'enlace')
      else track('clic', el.dataset.track)
    },
    { capture: true },
  )
}
