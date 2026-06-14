import React, { useRef } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BoomerangVideoBg from './BoomerangVideoBg';
import { SiteNav } from './SiteNav';
import heroVideo from '../assets/hero-bg.mp4';

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

/* Nor moale (div cu blur) — doar translatează, deci ieftin pe mobil */
const Cloud: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div
    className={className}
    style={{
      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0))',
      filter: 'blur(8px)',
      ...style,
    }}
  />
);

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Coregrafia „treci prin geam" (totul pe transform/opacity = fluid)
  const windowScale = useTransform(scrollYProgress, [0, 0.5], [1, 11]);
  const windowOpacity = useTransform(scrollYProgress, [0.36, 0.5], [1, 0]);
  const introTextOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const cloudLeftX = useTransform(scrollYProgress, [0, 0.5], [0, -420]);
  const cloudRightX = useTransform(scrollYProgress, [0, 0.5], [0, 420]);
  const flash = useTransform(scrollYProgress, [0.4, 0.48, 0.56], [0, 0.85, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.38, 0.54], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0.3, 0.6], [1.12, 1]);

  return (
    <section ref={ref} className="relative w-full h-[230vh] bg-[#0C0C0C]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ── HERO REAL (se dezvăluie după ce treci prin geam) ── */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <BoomerangVideoBg src={heroVideo} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-[#0C0C0C]/35 to-[#0C0C0C]/85 pointer-events-none" />

          <SiteNav overlay />

          <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)]">
              Descoperă
              <br />
              <span className="text-[#B600A8]">NEXAS</span>.ro
            </h1>
            <p className="mt-6 sm:mt-8 text-[#D7E2EA] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] max-w-md px-2">
              Agenți AI, automatizări și site-uri care lucrează pentru afacerea ta — nonstop.
            </p>
          </div>

          <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-16 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
            <div className="flex items-center gap-2 text-[#D7E2EA] mb-3">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span className="text-sm font-semibold uppercase tracking-wider">NEXAS AI</span>
            </div>
            <p className="text-[#D7E2EA] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] mb-6 max-w-xs">
              NEXAS construiește agenți AI, automatizări și produse digitale care nu seamănă cu
              nimic altceva — configurate exact pe afacerea ta.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#/contact"
                className="text-white text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-transform hover:scale-105"
                style={gradientButtonStyle}
              >
                Contactează-ne
              </a>
              <a
                href="#/#projects"
                className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                Vezi proiectele
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── INTRO: cabina + geam de avion + nori ── */}
        <motion.div style={{ opacity: windowOpacity }} className="absolute inset-0 z-20">
          {/* Peretele cabinei */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 40%, #efece7 0%, #dcd8d2 45%, #b9b4ad 100%)',
            }}
          />
          {/* umbră moale interior cabină */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 160px rgba(0,0,0,0.35)' }}
          />

          {/* Grupul geam (se mărește la scroll, până „intri" în el) */}
          <motion.div
            style={{ scale: windowScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* turbulență subtilă continuă */}
            <motion.div
              animate={{ x: [0, 1.5, -1, 0], y: [0, -1.5, 1, 0], rotate: [0, 0.3, -0.3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[clamp(220px,62vw,360px)] aspect-[3/4.2]"
            >
              {/* Sticla + cerul + norii (interiorul geamului) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: '46% / 38%',
                  background: 'linear-gradient(180deg, #5b97d6 0%, #92bfe8 45%, #cfe2f3 100%)',
                }}
              >
                {/* nori care se dau la o parte */}
                <motion.div style={{ x: cloudLeftX }} className="absolute inset-0">
                  <Cloud className="absolute w-[70%] h-[22%] left-[-10%] top-[24%]" />
                  <Cloud className="absolute w-[55%] h-[18%] left-[2%] top-[58%]" />
                </motion.div>
                <motion.div style={{ x: cloudRightX }} className="absolute inset-0">
                  <Cloud className="absolute w-[65%] h-[20%] right-[-12%] top-[40%]" />
                  <Cloud className="absolute w-[45%] h-[16%] right-[4%] top-[12%]" />
                </motion.div>
                {/* reflexie de soare pe sticlă */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background:
                      'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 60%)',
                  }}
                />
              </div>

              {/* Rama de plastic a geamului */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '46% / 38%',
                  border: '16px solid #e7e4df',
                  boxShadow:
                    '0 18px 50px rgba(0,0,0,0.35), inset 0 0 0 6px #cfcbc4, inset 0 6px 18px rgba(0,0,0,0.25)',
                }}
              />
              {/* găurica de jos a geamului */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-3 h-3 rounded-full"
                style={{ background: '#9a958d', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}
              />
            </motion.div>
          </motion.div>

          {/* Text intro + scroll hint */}
          <motion.div
            style={{ opacity: introTextOpacity }}
            className="absolute inset-x-0 bottom-10 sm:bottom-14 flex flex-col items-center text-center px-6 z-10"
          >
            <h2 className="font-black uppercase tracking-tight leading-none text-[#1b1b1b] text-[clamp(1.6rem,6vw,3.2rem)] drop-shadow-sm">
              Descoperă <span className="text-[#B600A8]">nexas.ro</span>
            </h2>
            <div className="mt-4 flex flex-col items-center gap-1 text-[#3a3a3a]">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Flash alb la „spargerea" geamului */}
        <motion.div style={{ opacity: flash }} className="absolute inset-0 z-30 bg-white pointer-events-none" />
      </div>
    </section>
  );
};
