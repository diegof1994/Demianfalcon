import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ExternalLink, Gavel, Info, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { CAMPAIGN } from '../data/campaign'
import { TOKENIZA as T } from '../data/tokeniza'
import { Reveal } from './ui'

export function Tokeniza() {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section id="tokeniza" aria-labelledby="tokeniza-title" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#16336a_0%,#061430_60%)]" aria-hidden="true" />
      <div className="gold-frame hidden md:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Encabezado */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-[0.3em] uppercase">
          <span className="text-sol-400">Nuevo Paradigma</span>
          <span className="hidden text-celeste-400 sm:inline">Pilar 10 · Fondo Nacional Digital</span>
        </div>
        <Reveal className="mt-14 max-w-5xl">
          <p className="text-sm tracking-[0.3em] text-slate-300 uppercase">{T.kicker}</p>
          <h2 id="tokeniza-title" className="mt-4 font-display text-6xl leading-[0.95] font-bold tracking-tight text-cream sm:text-7xl lg:text-8xl">
            ARGENTINA
            <br />
            <span className="text-sol-400">TOKENIZA</span>
          </h2>
          <div className="mt-8 h-1 w-24 bg-sol-400" aria-hidden="true" />
          <p className="mt-8 font-display text-2xl leading-snug text-slate-200 sm:text-3xl">
            {T.headline[0]}
            <br />
            {T.headline[1]}
            <br />
            <span className="font-bold text-sol-400">{T.headline[2]}</span>
          </p>
        </Reveal>

        {/* Mensaje + sectores */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">El mensaje</p>
            <h3 className="mt-4 font-display text-4xl leading-tight font-bold text-cream">
              Convertir <span className="text-sol-400">proyectos reales</span> en inversión transparente
            </h3>
            <p className="mt-6 font-display text-lg leading-relaxed text-slate-300">{T.message.body}</p>
            <div className="my-6 h-0.5 w-16 bg-sol-400" aria-hidden="true" />
            <p className="font-display text-lg leading-relaxed text-slate-300">
              Falta una infraestructura que los haga <strong className="text-sol-400">financiables, auditables y conectados</strong> con capital nacional e internacional.
            </p>
          </Reveal>
          <div>
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">La oportunidad · cinco sectores, una plataforma</p>
            <ol className="mt-5 space-y-3">
              {T.sectors.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-5 border-l-[3px] border-sol-400 bg-white/[0.04] px-5 py-4"
                  >
                    <span className="font-display text-lg font-bold text-sol-400">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <p className="font-display text-lg text-cream">{s.name}</p>
                      <p className="text-sm text-celeste-400">{s.detail}</p>
                    </div>
                    <Icon className="size-6 text-sol-400/70" aria-hidden="true" />
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* Regla de oro */}
        <Reveal className="mt-24 rounded-3xl bg-cream p-8 sm:p-14">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-sol-600 uppercase">
            <Sparkles className="size-4" aria-hidden="true" /> La regla de oro
          </p>
          <p className="mt-6 font-display text-3xl leading-tight font-bold text-navy-900 sm:text-5xl">
            No tokenizar <span className="text-sol-600">el recurso.</span> Tokenizar, cuando corresponda, el{' '}
            <span className="text-sol-600">derecho económico</span> válidamente constituido.
          </p>
          <p className="mt-6 max-w-3xl font-display text-lg text-slate-700">
            Sin criptomonedas especulativas. Con <strong className="text-navy-900">seguridad jurídica</strong>, contratos exigibles y trazabilidad.
          </p>
        </Reveal>

        {/* Cómo funciona */}
        <div className="mt-24">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">Cómo funciona</p>
            <h3 className="mt-3 font-display text-4xl font-bold text-cream">
              Del activo a la <span className="text-sol-400">inversión</span>
            </h3>
          </Reveal>
          <ol className="mt-10 grid gap-3 lg:grid-cols-6 lg:gap-2">
            {T.flow.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="relative flex lg:flex-col"
              >
                <div
                  className={`flex w-full items-center gap-4 border px-5 py-4 lg:min-h-36 lg:flex-col lg:items-start lg:justify-between ${i === T.flow.length - 1 ? 'border-sol-400 bg-sol-400/10' : 'border-white/20 bg-white/[0.03]'}`}
                >
                  <span className="font-display text-sm font-bold text-sol-400">{String(i + 1).padStart(2, '0')}</span>
                  <p className={`font-display text-sm font-bold tracking-wide uppercase ${i === T.flow.length - 1 ? 'text-sol-400' : 'text-cream'}`}>{step}</p>
                </div>
                {i < T.flow.length - 1 && (
                  <>
                    <ArrowDown className="absolute -bottom-3 left-1/2 z-10 size-5 -translate-x-1/2 text-sol-400 lg:hidden" aria-hidden="true" />
                    <ArrowRight className="absolute top-1/2 -right-3 z-10 hidden size-5 -translate-y-1/2 text-sol-400 lg:block" aria-hidden="true" />
                  </>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Marco regulatorio + Confianza medible */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Reveal className="border border-white/10 bg-white/[0.03] p-8">
            <p className="flex items-center gap-2 text-xs tracking-[0.3em] text-sol-400 uppercase">
              <Gavel className="size-4" aria-hidden="true" /> Marco regulatorio
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold text-cream">
              La CNV ya abrió <span className="text-sol-400">la puerta</span>
            </h3>
            <ul className="mt-6 space-y-3">
              {T.regulation.map((r) => (
                <li key={r.code} className="flex gap-5 border-l-[3px] border-sol-400 bg-white/[0.04] px-5 py-4">
                  <span className="font-display font-bold text-sol-400">{r.year}</span>
                  <div>
                    <p className="font-display text-lg text-cream">{r.code}</p>
                    <p className="text-sm text-celeste-400">{r.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-400">{T.regulationNote}</p>
          </Reveal>
          <Reveal delay={0.1} className="border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">Tecnología e inteligencia artificial</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-cream">
              Confianza <span className="text-sol-400">medible</span>
            </h3>
            <ul className="mt-6 space-y-3">
              {T.trust.map((t) => {
                const Icon = t.icon
                return (
                  <li key={t.text} className="flex items-center gap-4 border-l-[3px] border-sol-400 bg-white/[0.04] px-5 py-4 font-display text-lg text-cream">
                    <Icon className="size-5 shrink-0 text-sol-400" aria-hidden="true" />
                    {t.text}
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-sm text-slate-400">{T.trustNote}</p>
          </Reveal>
        </div>

        {/* Escala */}
        <Reveal className="mt-8 grid gap-8 border border-sol-400/40 bg-gradient-to-r from-sol-400/10 to-transparent p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">Vaca Muerta e infraestructura</p>
            <h3 className="mt-3 font-display text-4xl font-bold text-cream">
              Financiar <span className="text-sol-400">la escala</span>
            </h3>
          </div>
          <div className="space-y-4 font-display text-lg leading-relaxed text-slate-300">
            <p>{T.scale.body}</p>
            <p className="text-cream">{T.scale.reference}</p>
            <p className="font-sans text-sm text-slate-400">{T.scale.caveat}</p>
          </div>
        </Reveal>

        {/* Hoja de ruta */}
        <div className="mt-24">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">Hoja de ruta indicativa</p>
            <h3 className="mt-3 font-display text-4xl font-bold text-cream">
              Del diseño a <span className="text-sol-400">la escala</span>
            </h3>
          </Reveal>
          <div className="relative mt-12">
          <div className="absolute top-3 right-0 left-0 hidden h-px bg-gradient-to-r from-sol-400 via-sol-400/60 to-transparent md:block" aria-hidden="true" />
          <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
            {T.roadmap.map((r, i) => (
              <motion.li
                key={r.period}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-4 md:block"
              >
                <span className="relative z-10 mt-1 block size-6 shrink-0 rounded-full border-4 border-navy-950 bg-sol-400 md:mt-0" aria-hidden="true" />
                <div className="md:mt-5">
                  <p className="font-display text-xl font-bold text-sol-400">{r.period}</p>
                  <p className="mt-1 font-display text-cream">{r.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          </div>
        </div>

        {/* Carrusel original de Instagram */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-sol-400 uppercase">El carrusel completo</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-cream">Guardá · Compartí · Sumate al movimiento</h3>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Placas anteriores" className="flex size-11 items-center justify-center rounded-full border border-white/20 text-cream hover:bg-white/10">
                <ArrowRight className="size-5 rotate-180" />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Placas siguientes" className="flex size-11 items-center justify-center rounded-full border border-white/20 text-cream hover:bg-white/10">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
          <div ref={scroller} className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:px-0">
            {T.slides.map((src, i) => (
              <a
                key={src}
                href={CAMPAIGN.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[75%] shrink-0 snap-start overflow-hidden shadow-2xl ring-1 ring-sol-400/30 sm:w-[42%] lg:w-[28%]"
              >
                <img src={src} alt={`Argentina Tokeniza, placa ${i + 1} de 10`} loading="lazy" width={640} height={809} className="block w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {CAMPAIGN.hashtags.map((h) => (
              <span key={h} className="border border-white/30 px-4 py-2 text-sm tracking-widest text-cream">
                {h}
              </span>
            ))}
            <a href={CAMPAIGN.socials.instagram} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-2 bg-sol-400 px-5 py-2.5 text-sm font-bold tracking-wide text-navy-950 uppercase hover:bg-sol-500">
              Ver en Instagram <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-12 flex gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-400">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {T.disclaimer}
        </p>
      </div>
    </section>
  )
}
