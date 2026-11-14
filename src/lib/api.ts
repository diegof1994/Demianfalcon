import type { ParticipationType } from '../types'

// Clave publicable de Supabase: está pensada para el navegador. La tabla no se puede leer
// desde la web; solo se puede llamar a la función registrar_inscripcion.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://sxmeuknzducvoxmiljzc.supabase.co'
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? 'sb_publishable_qlGoAFAJB22yg4K5CJh7Cw_Yt2LDBt7'

export interface Inscripcion {
  tipo: ParticipationType
  origen: 'modal' | 'formulario'
  nombre: string
  apellido?: string
  dni?: string
  email: string
  telefono?: string
  provincia: string
  localidad?: string
  propuesta?: string
}

export class InscripcionError extends Error {}

/** Guarda la inscripción y devuelve el código de seguimiento real generado por la base. */
export async function registrarInscripcion(data: Inscripcion): Promise<string> {
  const ctrl = new AbortController()
  const timer = window.setTimeout(() => ctrl.abort(), 15000)
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_inscripcion`, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_tipo: data.tipo,
        p_origen: data.origen,
        p_nombre: data.nombre.trim(),
        p_apellido: data.apellido?.trim() || null,
        p_dni: data.dni?.trim() || null,
        p_email: data.email.trim(),
        p_telefono: data.telefono?.trim() || null,
        p_provincia: data.provincia,
        p_localidad: data.localidad?.trim() || null,
        p_propuesta: data.propuesta?.trim() || null,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      if (body.includes('demasiados_envios')) throw new InscripcionError('Recibimos varios envíos con este correo. Probá de nuevo en un rato.')
      throw new InscripcionError('No pudimos registrar tu inscripción. Revisá los datos y volvé a intentar.')
    }
    return (await res.json()) as string
  } catch (e) {
    if (e instanceof InscripcionError) throw e
    throw new InscripcionError('No hay conexión con el servidor. Revisá tu internet y volvé a intentar.')
  } finally {
    window.clearTimeout(timer)
  }
}
