import type { Province } from '../types'

/** Las 24 jurisdicciones, con posición en un mapa de mosaicos (cartograma) */
export const PROVINCES: Province[] = [
  { code: 'JY', name: 'Jujuy', col: 1, row: 0 },
  { code: 'SA', name: 'Salta', col: 2, row: 0 },
  { code: 'FO', name: 'Formosa', col: 3, row: 0 },
  { code: 'MI', name: 'Misiones', col: 4, row: 0 },
  { code: 'CA', name: 'Catamarca', col: 1, row: 1 },
  { code: 'TU', name: 'Tucumán', col: 2, row: 1 },
  { code: 'CH', name: 'Chaco', col: 3, row: 1 },
  { code: 'CN', name: 'Corrientes', col: 4, row: 1 },
  { code: 'SJ', name: 'San Juan', col: 0, row: 2 },
  { code: 'LR', name: 'La Rioja', col: 1, row: 2 },
  { code: 'SE', name: 'Santiago del Estero', col: 2, row: 2 },
  { code: 'SF', name: 'Santa Fe', col: 3, row: 2 },
  { code: 'ER', name: 'Entre Ríos', col: 4, row: 2 },
  { code: 'MZ', name: 'Mendoza', col: 0, row: 3 },
  { code: 'SL', name: 'San Luis', col: 1, row: 3 },
  { code: 'CB', name: 'Córdoba', col: 2, row: 3 },
  { code: 'BA', name: 'Buenos Aires', col: 3, row: 3 },
  { code: 'CABA', name: 'Ciudad Autónoma de Buenos Aires', col: 4, row: 3 },
  { code: 'LP', name: 'La Pampa', col: 1, row: 4 },
  { code: 'NQ', name: 'Neuquén', col: 0, row: 5 },
  { code: 'RN', name: 'Río Negro', col: 1, row: 5 },
  { code: 'CT', name: 'Chubut', col: 1, row: 6 },
  { code: 'SC', name: 'Santa Cruz', col: 1, row: 7 },
  { code: 'TF', name: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', col: 2, row: 8 },
]

export const PROVINCE_NAMES = [...PROVINCES.map((p) => p.name)].sort((a, b) => a.localeCompare(b, 'es'))
