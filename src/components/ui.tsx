import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  id?: string
}

export function SectionHeader({ eyebrow, title, description, align = 'center', dark, id }: SectionHeaderProps) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <p
        className={cn(
          'mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]',
          dark ? 'text-sol-400' : 'text-sol-600',
        )}
      >
        <span className="h-px w-6 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl',
          dark ? 'text-cream' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed text-pretty sm:text-lg', dark ? 'text-slate-300' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface FieldErrorProps {
  id: string
  message?: string
}

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  )
}

export const inputClass = (hasError?: boolean) =>
  cn(
    'block w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400',
    'focus:border-celeste-500 focus:ring-4 focus:ring-celeste-100 focus:outline-none',
    hasError ? 'border-red-400' : 'border-slate-300',
  )

export const labelClass = 'mb-1.5 block text-sm font-semibold text-navy-900'
