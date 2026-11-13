import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, FileText, Users } from 'lucide-react'
import { CAMPAIGN, HERO_STATS } from '../data/campaign'
import { TechBackground, WireGlobe } from './TechBackground'

interface HeroProps {
  onOpenFiscal: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ onOpenFiscal }: HeroProps) {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-900 pt-[4.25rem] lg:pt-[4.75rem]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#16336a_0%,#0b1f42_45%,#061430_100%)]" aria-hidden="true" />
      <WireGlobe className="absolute -bottom-40 -left-40 size-[34rem] opacity-60" />
      <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-sol-400/15 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[24rem] w-[60rem] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(232,197,120,0.35),transparent_65%)]" aria-hidden="true" />
      <TechBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pt-20 lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-sol-400/40 bg-sol-400/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-sol-400 uppercase"
          >
            <span className="size-2 rounded-full bg-sol-400" aria-hidden="true" />
            Elecciones Presidenciales 2027 • República Argentina
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mt-8 text-sm font-semibold tracking-[0.2em] text-celeste-400 uppercase"
          >
            {CAMPAIGN.planTitle}
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="mt-3 font-display text-5xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl lg:text-7xl"
          >
            El Cambio
            <br />
            de <span className="text-gold-gradient">Raíz.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-300"
          >
            <strong className="font-semibold text-cream">{CAMPAIGN.candidate}</strong>, candidato a Presidente de la Nación por el{' '}
            {CAMPAIGN.movement}. Un plan de ejecución integral y simultánea para transformar la raíz institucional, fiscal,
            judicial y productiva de la Nación desde el primer día.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#plan"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-bold text-navy-900 shadow-lg shadow-navy-950/30 transition-colors hover:bg-white"
            >
              <FileText className="size-5" aria-hidden="true" />
              Leer Plan de Gobierno
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>
            <motion.button
              type="button"
              onClick={onOpenFiscal}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sol-400 px-7 py-3 text-base font-bold text-sol-400 transition-colors hover:bg-sol-400 hover:text-navy-950"
            >
              <Users className="size-5" aria-hidden="true" />
              Sumate a Fiscalizar
            </motion.button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-gold-gradient sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <Portrait />

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="absolute -bottom-20 -left-2 max-w-[15rem] rounded-2xl bg-cream p-4 shadow-2xl shadow-navy-950/50 sm:-left-8 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sol-400">
                <CalendarCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg leading-tight font-bold text-navy-900">Día 1: 8 decretos y 7 leyes</p>
                <p className="mt-1 text-sm leading-snug text-slate-700">Desde el {CAMPAIGN.inauguration}. Ningún camino espera al otro.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/** Retrato del candidato con marco dorado */
function Portrait() {
  return (
    <figure className="relative">
      <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-sol-400/40 via-transparent to-celeste-400/30 blur-2xl" aria-hidden="true" />
      <div className="glow-gold relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
        <img
          src={CAMPAIGN.portrait}
          alt={`${CAMPAIGN.candidate}, ${CAMPAIGN.role}`}
          width={800}
          height={752}
          fetchPriority="high"
          className="size-full object-cover object-[50%_20%]"
        />
        <div className="gold-frame !inset-3" aria-hidden="true" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent px-7 pt-24 pb-7 text-right">
          <p className="text-xs font-semibold tracking-[0.25em] text-sol-400 uppercase">{CAMPAIGN.role}</p>
          <p className="mt-1 font-display text-3xl font-bold text-cream">{CAMPAIGN.candidate}</p>
          <p className="mt-1 font-display text-sm text-slate-300 italic">{CAMPAIGN.slogan}</p>
        </figcaption>
      </div>
    </figure>
  )
}
