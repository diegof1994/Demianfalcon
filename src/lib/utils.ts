/** Normaliza texto para búsquedas: minúsculas y sin tildes */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isValidDni = (v: string) => /^\d{7,8}$/.test(v.replace(/\./g, '').trim())
export const isValidPhone = (v: string) => /^[\d\s()+-]{8,20}$/.test(v.trim())
