import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { CAMPAIGN, QUOTES } from '../data/campaign'
import { IDEAS_FUERZA } from '../data/plan'
import { Reveal, SectionHeader } from './ui'

export function Candidate() {
  return (
    <section id="candidato" aria-labelledby="candidato-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-sol-600 uppercase">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              El candidato
            </p>
            <h2 id="candidato-title" className="mt-3 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {CAMPAIGN.candidate}
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              “{CAMPAIGN.alias}” · {CAMPAIGN.movement}
            </p>
            <div className="relative mt-8 overflow-hidden rounded-3xl bg-navy-900 p-8 text-white shadow-xl">
              <div className="gold-frame !inset-2.5" aria-hidden="true" />
              <p className="relative text-xs tracking-[0.3em] text-sol-400 uppercase">La idea central</p>
              <p className="relative mt-3 font-display text-3xl leading-tight font-bold text-cream">
                “Un argentino es un argentino que <span className="text-sol-400">trabaja</span>.”
              </p>
              <p className="relative mt-3 font-display text-lg text-slate-300">
                Un argentino <span className="text-sol-400">bien alimentado</span> es mejor para su país.
              </p>
              <div className="relative my-6 h-0.5 w-16 bg-sol-400" aria-hidden="true" />
              <Quote className="relative size-6 text-sol-400" aria-hidden="true" />
              <p className="relative mt-2 leading-relaxed text-slate-300">{CAMPAIGN.intro}</p>
              <p className="relative mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
                {CAMPAIGN.candidateFull} — {CAMPAIGN.planTitle}, {CAMPAIGN.planDate}
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Las 5 ideas fuerza"
              title="Los principios que ordenan todo el plan"
              description="Cinco ideas que guían cada decisión de gobierno, de la Constitución al último trámite."
            />
            <ol className="mt-10 space-y-4">
              {IDEAS_FUERZA.map((idea, i) => {
                const Icon = idea.icon
                return (
                  <motion.li
                    key={idea.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    whileHover={{ x: 4 }}
                    className="group flex gap-5 rounded-2xl border border-slate-200 bg-paper p-6 transition-colors hover:border-sol-400/60 hover:bg-white hover:shadow-lg hover:shadow-navy-900/5"
                  >
                    <span className="font-display text-3xl font-bold text-sol-400" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-900">
                        <Icon className="size-5 text-navy-700" aria-hidden="true" />
                        {idea.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-slate-600">{idea.text}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </div>

        <ul className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {QUOTES.map((q, i) => (
            <motion.li
              key={q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border-t-4 border-sol-400 bg-paper p-6"
            >
              <Quote className="size-6 text-sol-400" aria-hidden="true" />
              <p className="mt-3 font-display text-lg leading-snug text-navy-900">{q}</p>
              <p className="mt-4 text-sm font-semibold text-sol-600">— {CAMPAIGN.candidate}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
