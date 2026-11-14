import { SUPABASE_KEY, SUPABASE_URL } from '../lib/api'

export interface Reporte {
  totales: {
    visitantes: number
    sesiones: number
    inscripciones: number
    fiscales: number
    voluntarios: number
    propuestas: number
    descargas_pdf: number
    clics_instagram: number
    pendientes_contacto: number
  }
  embudo: { visitaron: number; vieron_formulario: number; abrieron_formulario: number; empezaron: number; enviaron: number }
  por_dia: { dia: string; visitantes: number; inscripciones: number }[]
  por_provincia: { provincia: string; total: number; fiscales: number; voluntarios: number; propuestas: number }[]
  por_dispositivo: Record<string, number>
  por_fuente: { fuente: string; sesiones: number }[]
  secciones: { seccion: string; sesiones: number }[]
  clics: { boton: string; clics: number }[]
  formularios: { formulario: string; abiertos: number; iniciados: number; enviados: number; errores: number }[]
}

export interface Inscripto {
  id: number
  codigo: string
  tipo: 'fiscal' | 'voluntario' | 'propuesta'
  origen: 'modal' | 'formulario'
  nombre: string
  apellido: string | null
  dni: string | null
  email: string
  telefono: string | null
  provincia: string
  localidad: string | null
  propuesta: string | null
  contactado: boolean
  created_at: string
}

export class AuthError extends Error {}

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Sin conexión con el servidor. Revisá tu internet.')
  }
  if (!res.ok) throw new Error('El servidor respondió con un error. Probá de nuevo en un momento.')
  const data = (await res.json()) as T & { error?: string }
  if (data && typeof data === 'object' && 'error' in data && data.error) {
    if (data.error === 'bloqueado') throw new AuthError('Demasiados intentos fallidos. Esperá 15 minutos.')
    throw new AuthError('Clave incorrecta.')
  }
  return data
}

export const getReporte = (clave: string, desde: string | null, hasta: string | null) =>
  rpc<Reporte>('reporte_campania', { p_clave: clave, p_desde: desde, p_hasta: hasta })

export const getListado = (clave: string, desde: string | null, hasta: string | null) =>
  rpc<{ filas: Inscripto[] }>('reporte_listado', { p_clave: clave, p_desde: desde, p_hasta: hasta }).then((r) => r.filas)

export const setContactado = (clave: string, id: number, valor: boolean) =>
  rpc<{ ok: boolean }>('reporte_marcar_contactado', { p_clave: clave, p_id: id, p_valor: valor })
