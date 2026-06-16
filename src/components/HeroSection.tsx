import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SiteNav } from './SiteNav';
import heroVideo from '../assets/hero-bg.mp4';

/* Nor moale (div cu blur) — doar translatează, deci ieftin pe mobil */
const Cloud: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div
    className={className}
    style={{
      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(150,175,210,0.35), rgba(150,175,210,0))',
      filter: 'blur(8px)',
      ...style,
    }}
  />
);

/* Nor care curge continuu prin geam — senzație de avion în zbor */
const DriftingCloud: React.FC<{
  left: string;
  w: string;
  h: string;
  duration: number;
  delay: number;
}> = ({ left, w, h, duration, delay }) => (
  <motion.div
    className="absolute"
    style={{ left, width: w, height: h }}
    initial={{ y: '-30%' }}
    animate={{ y: ['-30%', '130%'] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    <Cloud className="w-full h-full" />
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const [done, setDone] = useState(false);
  const playing = useRef(false);

  const windowCtrl = useAnimationControls();
  const cloudLeftCtrl = useAnimationControls();
  const cloudRightCtrl = useAnimationControls();
  const introTextCtrl = useAnimationControls();
  const overlayCtrl = useAnimationControls();
  const flashCtrl = useAnimationControls();
  const heroCtrl = useAnimationControls();

  useEffect(() => {
    // Blochează scroll-ul cât timp rulează intro-ul
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const play = () => {
      if (playing.current) return;
      playing.current = true;

      // Geamul se mărește ca și cum „treci" prin el
      windowCtrl.start({ scale: 12, transition: { duration: 1.9, ease: [0.6, 0, 0.4, 1] } });
      cloudLeftCtrl.start({ x: -520, opacity: 0.4, transition: { duration: 1.7, ease: 'easeIn' } });
      cloudRightCtrl.start({ x: 520, opacity: 0.4, transition: { duration: 1.7, ease: 'easeIn' } });
      introTextCtrl.start({ opacity: 0, y: 14, transition: { duration: 0.4 } });
      // Flash alb la „spargerea" geamului
      flashCtrl.start({ opacity: [0, 0.55, 0], transition: { duration: 1.1, delay: 0.95, times: [0, 0.5, 1] } });
      // Dezvăluie hero-ul
      heroCtrl.start({ opacity: 1, scale: 1, transition: { duration: 0.9, delay: 1.2, ease: 'easeOut' } });
      // Cabina + geamul dispar
      overlayCtrl
        .start({ opacity: 0, transition: { duration: 0.45, delay: 1.55 } })
        .then(() => {
          setDone(true);
          document.body.style.overflow = prevOverflow;
        });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) play();
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) play();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', play, { passive: true });
    window.addEventListener('touchmove', play, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', play);
      window.removeEventListener('touchmove', play);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [windowCtrl, cloudLeftCtrl, cloudRightCtrl, introTextCtrl, overlayCtrl, flashCtrl, heroCtrl]);

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#0C0C0C]">
      {/* ── HERO REAL (se dezvăluie după animație) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.12 }}
        animate={heroCtrl}
        className="absolute inset-0"
      >
        <video
          src={heroVideo}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-[#0C0C0C]/35 to-[#0C0C0C]/85 pointer-events-none" />

        <SiteNav overlay />

        <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[1.05] text-[clamp(1.7rem,5vw,3.6rem)] max-w-3xl">
            Agenți AI și automatizări care lucrează <span className="text-[#B600A8]">24/7</span> pentru afacerea ta.
          </h1>
        </div>

        <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-16 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
          <div className="flex items-center gap-2 text-[#D7E2EA] mb-3">
            <Sparkles className="w-4 h-4 text-[#B600A8]" />
            <span className="text-sm font-semibold uppercase tracking-wider">NEXAS AI</span>
          </div>
          <p className="text-[#D7E2EA] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] mb-6 max-w-xs">
            Nexas construiește sisteme inteligente de ultimă generație — agenți AI, automatizări complexe și site-uri performante — toate create și optimizate exact după nevoile afacerii tale.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="glass-btn text-white text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full"
            >
              Contactează-ne
            </Link>
            <a
              href="/#projects"
              className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Vezi proiectele
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── INTRO: cabina + geam de avion + nori ── */}
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={overlayCtrl}
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={() => {
            // click/tap pe ecran pornește și el animația
            const ev = new Event('touchstart');
            window.dispatchEvent(ev);
          }}
        >
          {/* Peretele cabinei — panou de avion, lumină de noapte */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(120% 100% at 50% 28%, #7c848f 0%, #565d68 40%, #383e49 74%, #23272f 100%)' }}
          />
          {/* mood light albastru cald sub plafonieră */}
          <div
            className="absolute inset-x-0 top-0 h-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(120,165,225,0.38) 0%, rgba(120,165,225,0) 100%)' }}
          />
          {/* lumină de citit, caldă, dinspre tavan */}
          <div
            className="absolute pointer-events-none"
            style={{ left: '50%', top: '-10%', width: '60%', height: '55%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,224,170,0.22), rgba(255,224,170,0) 70%)' }}
          />
          {/* seam-uri orizontale de panou */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0, transparent 84px, rgba(255,255,255,0.06) 85px, rgba(0,0,0,0.10) 86px, transparent 87px)' }}
          />
          {/* curbura fuzelajului = vignete laterale */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(0,0,0,0.45) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 160px rgba(0,0,0,0.4)' }} />

          {/* Grupul geam (se mărește la trigger) */}
          <motion.div initial={{ scale: 1 }} animate={windowCtrl} className="absolute inset-0 flex items-center justify-center">
            {/* turbulență subtilă continuă */}
            <motion.div
              animate={{ x: [0, 1.5, -1, 0], y: [0, -1.5, 1, 0], rotate: [0, 0.3, -0.3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[clamp(220px,62vw,360px)] aspect-[3/4.2]"
            >
              {/* Adâncitura geamului în panou (window well) */}
              <div
                className="absolute -inset-[7%] pointer-events-none"
                style={{
                  borderRadius: '46% / 38%',
                  background: 'linear-gradient(160deg, #5a626e 0%, #434a55 50%, #333944 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 3px 8px rgba(255,255,255,0.10), inset 0 -6px 14px rgba(0,0,0,0.45)',
                }}
              />
              {/* Sticla + cerul de noapte + stele + luminile orașului + norii */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: '46% / 38%', background: 'linear-gradient(180deg, #03050b 0%, #060b18 45%, #0c1730 78%, #1c2138 100%)' }}
              >
                {/* stele */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(1px 1px at 20% 28%, #fff, transparent), radial-gradient(1px 1px at 62% 18%, #cfe0ff, transparent), radial-gradient(1px 1px at 80% 38%, #fff, transparent), radial-gradient(1.5px 1.5px at 35% 52%, #fff, transparent), radial-gradient(1px 1px at 72% 60%, #dde6ff, transparent), radial-gradient(1px 1px at 14% 64%, #fff, transparent)',
                    opacity: 0.85,
                  }}
                />
                {/* luminile orașului de jos (seară) */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{ background: 'linear-gradient(0deg, rgba(255,150,60,0.40) 0%, rgba(255,150,60,0.08) 50%, transparent 100%)' }}
                />
                <motion.div initial={{ x: 0 }} animate={cloudLeftCtrl} className="absolute inset-0">
                  <DriftingCloud left="-12%" w="70%" h="22%" duration={7} delay={0} />
                  <DriftingCloud left="-4%" w="50%" h="17%" duration={10} delay={2.5} />
                  <DriftingCloud left="6%" w="40%" h="14%" duration={8.5} delay={5} />
                </motion.div>
                <motion.div initial={{ x: 0 }} animate={cloudRightCtrl} className="absolute inset-0">
                  <DriftingCloud left="45%" w="65%" h="20%" duration={9} delay={1.2} />
                  <DriftingCloud left="58%" w="44%" h="16%" duration={11} delay={3.8} />
                  <DriftingCloud left="50%" w="36%" h="13%" duration={7.5} delay={6} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: 'linear-gradient(120deg, transparent 32%, rgba(200,220,255,0.18) 48%, transparent 60%)' }}
                />
              </div>

              {/* Rama de plastic */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '46% / 38%',
                  border: '16px solid #2b2f37',
                  boxShadow: '0 18px 50px rgba(0,0,0,0.6), inset 0 0 0 6px #1a1d23, inset 0 6px 18px rgba(0,0,0,0.5), inset 0 0 30px rgba(70,110,180,0.12)',
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-3 h-3 rounded-full"
                style={{ background: '#3a3e46', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.7)' }}
              />
            </motion.div>
          </motion.div>

          {/* Text intro + scroll/tap hint */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={introTextCtrl}
            className="absolute inset-x-0 bottom-10 sm:bottom-14 flex flex-col items-center text-center px-6 z-10"
          >
            <h2 className="font-black uppercase tracking-tight leading-none text-white text-[clamp(1.6rem,6vw,3.2rem)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Descoperă <span className="text-[#B600A8]">nexas.ro</span>
            </h2>
            <div className="mt-4 flex flex-col items-center gap-1 text-white/70">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Scroll sau atinge</span>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Flash alb la „spargerea" geamului */}
      {!done && (
        <motion.div initial={{ opacity: 0 }} animate={flashCtrl} className="absolute inset-0 z-30 pointer-events-none" style={{ backgroundColor: '#ffe9c2' }} />
      )}
    </section>
  );
};
