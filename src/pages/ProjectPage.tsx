import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PageLayout } from '../components/PageLayout';
import { projectVisuals, HR_DEMO_URL } from '../components/ProjectVisuals';
import { ProjectData } from '../data/projects';

const gradientButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: `
    0px 4px 4px rgba(181, 1, 167, 0.25),
    inset 4px 4px 12px #7721B1,
    inset -2px -2px 4px rgba(181, 1, 167, 0.2)
  `,
  outline: '2px solid white',
  outlineOffset: '-3px',
};

export const ProjectPage: React.FC<{ project: ProjectData }> = ({ project }) => {
  const Visual = projectVisuals[project.slug];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} duration={0.6} y={20} as="div">
            <a href="#/" className="inline-flex items-center gap-2 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Înapoi la proiecte
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeIn delay={0.1} duration={0.7} y={30} as="div">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs text-[#D7E2EA]/80 mb-7"
                  style={{ borderColor: `${project.accent}55`, background: project.accentSoft }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.accent, boxShadow: `0 0 10px ${project.accent}` }} />
                  {project.badge}
                </span>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.7} y={40} as="h1" className="font-black uppercase tracking-tight leading-[0.95] text-[clamp(2.2rem,6vw,4.5rem)] text-[#D7E2EA]">
                {project.heroTitle}{' '}
                <span style={{ background: `linear-gradient(135deg, #fff, ${project.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {project.heroHighlight}
                </span>
              </FadeIn>
              <FadeIn delay={0.3} duration={0.7} y={20} as="p" className="text-[#D7E2EA]/70 font-light leading-relaxed mt-7 max-w-xl text-[clamp(0.95rem,1.6vw,1.15rem)]">
                {project.heroText}
              </FadeIn>
              <FadeIn delay={0.4} duration={0.7} y={20} as="div" className="mt-9">
                <motion.a
                  href="#/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block rounded-full px-10 py-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-white"
                  style={gradientButtonStyle}
                >
                  Vreau un proiect similar
                </motion.a>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} duration={0.8} y={40} as="div" className="aspect-[4/3] w-full">
              {Visual && <Visual />}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Demo interactiv — doar pentru HR Dashboard */}
      {project.slug === 'hr' && (
        <section className="px-5 sm:px-8 md:px-10 pb-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} duration={0.7} y={30} as="div" className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: project.accent }}>
                Demo live
              </span>
              <h2 className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(1.8rem,4.5vw,3.2rem)] mt-4">
                Încearcă platforma
              </h2>
              <p className="text-[#D7E2EA]/55 font-light leading-relaxed mt-4 max-w-xl mx-auto text-sm sm:text-base">
                Un demo complet, interactiv — navighează prin dashboard, candidați și calendar, direct aici.
              </p>
            </FadeIn>
            <FadeIn delay={0.15} duration={0.8} y={40} as="div">
              <div className="rounded-[24px] overflow-hidden border border-white/12 bg-[#0a0a0a] shadow-2xl">
                <iframe
                  src={HR_DEMO_URL}
                  title="NEXAS HR — Demo interactiv"
                  loading="lazy"
                  className="w-full"
                  style={{ height: 'min(78vh, 760px)', border: 0, display: 'block' }}
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Funcții */}
      <section className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} duration={0.7} y={30} as="div" className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: project.accent }}>
              Funcții
            </span>
            <h2 className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(1.8rem,4.5vw,3.2rem)] mt-4">
              Ce face {project.name}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.features.map((f, idx) => (
              <FadeIn key={f.title} delay={idx * 0.08} duration={0.7} y={30} as="div">
                <div className="h-full rounded-[28px] bg-[#141414] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-10 h-1 rounded-full mb-5" style={{ background: project.accent }} />
                  <h3 className="text-[#D7E2EA] font-bold text-lg mb-3">{f.title}</h3>
                  <p className="text-[#D7E2EA]/55 font-light text-sm leading-relaxed">{f.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proces */}
      <section className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} duration={0.7} y={30} as="div" className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: project.accent }}>
              Proces
            </span>
            <h2 className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(1.8rem,4.5vw,3.2rem)] mt-4">
              Cum funcționează
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {project.steps.map((s, idx) => (
              <FadeIn key={s.title} delay={idx * 0.1} duration={0.7} y={30} as="div">
                <div className="h-full rounded-[28px] border border-white/10 p-7 relative overflow-hidden" style={{ background: project.accentSoft }}>
                  <span className="absolute top-3 right-5 font-black text-5xl text-white/10">{idx + 1}</span>
                  <h3 className="text-[#D7E2EA] font-bold text-base mb-3 pr-8">{s.title}</h3>
                  <p className="text-[#D7E2EA]/55 font-light text-sm leading-relaxed">{s.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Prețuri (doar dacă proiectul are pachete) */}
      {project.plans && (
        <section className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} duration={0.7} y={30} as="div" className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: project.accent }}>
                Prețuri
              </span>
              <h2 className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(1.8rem,4.5vw,3.2rem)] mt-4">
                Pachete simple și transparente
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {project.plans.map((plan, idx) => (
                <FadeIn key={plan.name} delay={idx * 0.12} duration={0.7} y={30} as="div" className="h-full">
                  <div
                    className={`h-full flex flex-col rounded-[28px] p-8 border transition-transform duration-300 hover:-translate-y-2 ${
                      plan.featured ? 'bg-white text-[#0C0C0C] border-white' : 'bg-[#141414] text-[#D7E2EA] border-white/10'
                    }`}
                  >
                    {plan.featured && (
                      <span className="self-start text-[10px] font-bold uppercase tracking-widest text-white rounded-full px-4 py-1.5 mb-5" style={gradientButtonStyle}>
                        Cel mai popular
                      </span>
                    )}
                    <h3 className="font-black uppercase tracking-widest text-sm">{plan.name}</h3>
                    <div className="mt-4 flex items-end gap-2">
                      <span className="font-black leading-none text-4xl sm:text-5xl">{plan.price}</span>
                      <span className="font-light text-sm opacity-60 mb-1">{plan.unit}</span>
                    </div>
                    <p className={`mt-4 font-light text-sm leading-relaxed ${plan.featured ? 'opacity-70' : 'opacity-55'}`}>{plan.description}</p>
                    <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 font-light text-sm">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.featured ? '#B600A8' : project.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <motion.a
                      href="#/contact"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="mt-8 inline-block text-center rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-white"
                      style={gradientButtonStyle}
                    >
                      Solicită oferta
                    </motion.a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="px-5 sm:px-8 md:px-10 py-20 sm:py-28">
        <FadeIn delay={0} duration={0.7} y={30} as="div" className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-[#D7E2EA] font-black uppercase tracking-tight leading-tight text-[clamp(1.8rem,4.5vw,3.2rem)]">
            {project.ctaTitle}
          </h2>
          <p className="text-[#D7E2EA]/60 font-light leading-relaxed max-w-xl">{project.ctaText}</p>
          <motion.a
            href="#/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full px-10 py-4 text-sm font-medium uppercase tracking-widest text-white"
            style={gradientButtonStyle}
          >
            Hai să discutăm
          </motion.a>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
