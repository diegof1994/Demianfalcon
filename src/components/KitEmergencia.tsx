import { motion } from 'framer-motion'
import { HandHeart, Mail, ShieldPlus } from 'lucide-react'
import { CAMPAIGN } from '../data/campaign'
import { KIT } from '../data/tokeniza'
import { Reveal } from './ui'

export function KitEmergencia() {
  return (
    <section id="convocatoria" aria-labelledby="kit-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="absolute -inset-3 -rotate-2 rounded-3xl bg-gradient-to-br from-celeste-400/40 to-sol-400/40" aria-hidden="true" />
          <motion.img
            whileHover={{ rotate: -1, scale: 1.01 }}
            src={KIT.image}
            alt="Afiche de la Convocatoria Nacional: un kit de emergencia para cada familia, con mochila, agua, linterna, radio y botiquín"
            loading="lazy"
            width={800}
            height={1000}
            className="relative w-full rounded-3xl shadow-2xl"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-sol-600 uppercase">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {KIT.kicker} · Pilar 9
            </p>
            <h2 id="kit-title" className="mt-3 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {KIT.title}
            </h2>
            <p className="mt-4 font-display text-xl text-sol-600 italic">{KIT.tagline}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {KIT.body} La acción concreta del Plan de Emergencia Climática empieza hoy, antes de gobernar.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {KIT.partners.map((p) => (
              <li key={p.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-paper p-5">
                <ShieldPlus className="size-7 shrink-0 text-navy-700" aria-hidden="true" />
                <div>
                  <p className="font-display font-bold text-navy-900">{p.name}</p>
                  <p className="text-sm text-slate-600">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#sumate" className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 font-bold text-cream hover:bg-navy-800">
              <HandHeart className="size-5" aria-hidden="true" /> Quiero ser voluntario
            </a>
            <a
              href={`mailto:${CAMPAIGN.email}?subject=${encodeURIComponent('Convocatoria Nacional - Kit de emergencia')}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-900 px-7 py-3 font-bold text-navy-900 hover:bg-navy-900 hover:text-cream"
            >
              <Mail className="size-5" aria-hidden="true" /> Donar o colaborar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
