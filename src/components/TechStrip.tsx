import { motion } from 'framer-motion'
import { Cpu, Globe2, Sprout, Zap } from 'lucide-react'
import { TECH_AXES } from '../data/campaign'

const ICONS = [Cpu, Zap, Sprout, Globe2]
const WORDS = ['Tecnología', 'Energía', 'Desarrollo', 'Integración regional', 'Inteligencia Artificial', 'Activos reales', 'Transparencia']

/** Franja de ejes tecnológicos + marquesina, en la línea gráfica de la alianza con Cubo Dorado */
export function TechStrip() {
  return (
    <section aria-label="Ejes de tecnología y desarrollo" className="relative overflow-hidden border-y border-sol-400/30 bg-navy-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {TECH_AXES.map((label, i) => {
          const Icon = ICONS[i]
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex min-w-0 items-center gap-3 sm:gap-4"
            >
              <span className="glow-gold flex size-11 shrink-0 sm:size-14 items-center justify-center rounded-full bg-navy-900 text-sol-400">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 font-display text-xs leading-tight font-bold tracking-[0.06em] text-cream uppercase sm:text-sm sm:tracking-[0.12em]">{label}</span>
            </motion.div>
          )
        })}
      </div>
      <div className="border-t border-white/10 bg-gradient-to-r from-sol-500 via-sol-400 to-sol-500 py-3" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="font-display text-sm font-bold tracking-[0.25em] text-navy-950 uppercase">
              {w} <span className="ml-10">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
