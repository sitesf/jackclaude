import React from 'react';
import { motion } from 'framer-motion';

/**
 * Elemente decorative din sticlă 3D translucidă, cu miez luminos.
 * Fiecare iconiță are culoarea ei discretă (albastru / gri / alb / mov-roz fin),
 * în acord cu formele din secțiunea „Despre NEXAS".
 */

interface Theme {
  bodyA: string; // sticlă deschisă (sus)
  bodyB: string; // sticlă închisă (jos)
  rim: string; // muchie/reflexie rece
  core: string; // miez luminos / accent
  glow: string; // drop-shadow
}

const themes: Record<string, Theme> = {
  blue: { bodyA: '#7FB0E8', bodyB: '#16294A', rim: '#EAF4FF', core: '#9CC6F5', glow: 'rgba(94,150,224,0.3)' },
  gray: { bodyA: '#C2CCD6', bodyB: '#23272D', rim: '#FFFFFF', core: '#EAF0F6', glow: 'rgba(180,192,204,0.28)' },
  white: { bodyA: '#E8EEF4', bodyB: '#5C6670', rim: '#FFFFFF', core: '#FFFFFF', glow: 'rgba(230,238,244,0.3)' },
  violet: { bodyA: '#B98AD0', bodyB: '#2E2138', rim: '#EAD8F2', core: '#D9A8E0', glow: 'rgba(186,138,208,0.3)' },
};

const Floaty: React.FC<{
  children: React.ReactNode;
  className?: string;
  duration?: number;
  tilt?: number;
  glow: string;
}> = ({ children, className, duration = 6, tilt = 6, glow }) => (
  <motion.div
    className={className}
    style={{ filter: `drop-shadow(0 22px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 24px ${glow})` }}
    animate={{ y: [0, -14, 0], rotateZ: [-tilt / 2, tilt / 2, -tilt / 2] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/** Gradiente comune de sticlă, parametrizate pe temă de culoare */
const Defs: React.FC<{ id: string; t: Theme }> = ({ id, t }) => (
  <defs>
    <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={t.bodyA} stopOpacity="0.92" />
      <stop offset="0.5" stopColor={t.bodyA} stopOpacity="0.5" />
      <stop offset="1" stopColor={t.bodyB} stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.5" stopColor={t.rim} stopOpacity="0.7" />
      <stop offset="1" stopColor={t.bodyA} stopOpacity="0.5" />
    </linearGradient>
    <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="white" stopOpacity="0.85" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <radialGradient id={`${id}-glow`} cx="0.4" cy="0.4" r="0.8">
      <stop offset="0" stopColor={t.core} stopOpacity="0.85" />
      <stop offset="0.55" stopColor={t.core} stopOpacity="0.3" />
      <stop offset="1" stopColor={t.bodyB} stopOpacity="0" />
    </radialGradient>
  </defs>
);

/** Bulă de chat din sticlă albastră cu puncte care „tastează" */
export const ChatBubbleDoodle: React.FC<{ className?: string }> = ({ className }) => {
  const t = themes.blue;
  return (
    <Floaty className={className} duration={5.5} glow={t.glow}>
      <svg viewBox="0 0 130 120" fill="none" className="w-full h-auto" aria-hidden="true">
        <Defs id="cb" t={t} />
        <path
          d="M16 20C16 11.2 23.2 4 32 4h66c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H62L38 106V84h-6c-8.8 0-16-7.2-16-16V20Z"
          fill="url(#cb-body)"
        />
        <path
          d="M16 20C16 11.2 23.2 4 32 4h66c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H62L38 106V84h-6c-8.8 0-16-7.2-16-16V20Z"
          stroke="url(#cb-chrome)"
          strokeWidth="3.5"
        />
        <path d="M24 12h82c5 0 9 4 9 9v6c-32-8-72-8-100 0v-6c0-5 4-9 9-9Z" fill="url(#cb-shine)" opacity="0.5" />
        <ellipse cx="42" cy="68" rx="26" ry="14" fill="url(#cb-glow)" opacity="0.5" />
        {[44, 65, 86].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={46}
            r={7}
            fill={t.core}
            stroke="white"
            strokeWidth="1.5"
            style={{ filter: `drop-shadow(0 0 6px ${t.core})` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.75, 1.15, 0.75] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </Floaty>
  );
};

/** Roată dințată din sticlă gri, în rotație continuă */
export const GearsDoodle: React.FC<{ className?: string }> = ({ className }) => {
  const t = themes.gray;
  const teeth = Array.from({ length: 9 }, (_, i) => i * 40);
  return (
    <Floaty className={className} duration={6.5} tilt={0} glow={t.glow}>
      <motion.svg
        viewBox="-60 -60 120 120"
        fill="none"
        className="w-full h-auto"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <Defs id="gr" t={t} />
        {teeth.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <rect x={-9} y={-58} width={18} height={22} rx={6} fill="url(#gr-body)" stroke="url(#gr-chrome)" strokeWidth="2.5" />
          </g>
        ))}
        <circle r={40} fill="url(#gr-body)" stroke="url(#gr-chrome)" strokeWidth="3.5" />
        <circle r={31} fill="none" stroke="url(#gr-chrome)" strokeOpacity="0.45" strokeWidth="1.5" />
        <circle r={17} fill="url(#gr-glow)" stroke="url(#gr-chrome)" strokeWidth="3" />
        <path d="M-30 -22a37 37 0 0 1 52-10c-14-2-40 2-52 10Z" fill="url(#gr-shine)" opacity="0.55" />
      </motion.svg>
    </Floaty>
  );
};

/** Fereastră de browser din sticlă albă cu cursor 3D */
export const BrowserDoodle: React.FC<{ className?: string }> = ({ className }) => {
  const t = themes.white;
  return (
    <Floaty className={className} duration={6} glow={t.glow}>
      <svg viewBox="0 0 140 108" fill="none" className="w-full h-auto" aria-hidden="true">
        <Defs id="br" t={t} />
        <rect x="4" y="4" width="132" height="100" rx="16" fill="url(#br-body)" stroke="url(#br-chrome)" strokeWidth="3.5" />
        <line x1="6" y1="32" x2="134" y2="32" stroke="url(#br-chrome)" strokeOpacity="0.6" strokeWidth="2" />
        <circle cx="22" cy="18" r="4.5" fill="#9FB3C8" style={{ filter: 'drop-shadow(0 0 4px #9FB3C8)' }} />
        <circle cx="36" cy="18" r="4.5" fill="#C7D2DC" style={{ filter: 'drop-shadow(0 0 4px #C7D2DC)' }} />
        <circle cx="50" cy="18" r="4.5" fill="#7E8894" style={{ filter: 'drop-shadow(0 0 4px #7E8894)' }} />
        <path d="M30 4h26L16 104h-2c-6 0-10-4-10-10v-8L30 4Z" fill="url(#br-shine)" opacity="0.25" />
        <path d="M70 4h12L42 104H30L70 4Z" fill="url(#br-shine)" opacity="0.18" />
        <ellipse cx="100" cy="84" rx="30" ry="16" fill="url(#br-glow)" opacity="0.45" />
        {[46, 62, 78].map((y, i) => (
          <motion.rect
            key={y}
            x="20"
            y={y}
            height="8"
            rx="4"
            fill="url(#br-chrome)"
            animate={{ width: [22, 100 - i * 20, 22] }}
            transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
          />
        ))}
        <motion.g
          animate={{ x: [88, 104, 94, 88], y: [58, 74, 82, 58] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
        >
          <path d="M0 0l18 6.8-7.8 3.1-3.1 7.8L0 0Z" fill="url(#br-chrome)" stroke="white" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </Floaty>
  );
};

/** Lupă din sticlă mov-roz discretă, cu grafic crescător */
export const SeoDoodle: React.FC<{ className?: string }> = ({ className }) => {
  const t = themes.violet;
  const bars = [
    { x: 36, h: 18, delay: 0 },
    { x: 51, h: 28, delay: 0.3 },
    { x: 66, h: 38, delay: 0.6 },
  ];
  return (
    <Floaty className={className} duration={7} glow={t.glow}>
      <svg viewBox="0 0 130 130" fill="none" className="w-full h-auto" aria-hidden="true">
        <Defs id="se" t={t} />
        <rect x="88" y="82" width="16" height="48" rx="8" transform="rotate(-45 88 82)" fill="url(#se-body)" stroke="url(#se-chrome)" strokeWidth="2.5" />
        <circle cx="56" cy="56" r="44" fill="url(#se-body)" />
        <circle cx="56" cy="56" r="44" fill="url(#se-glow)" opacity="0.55" />
        <circle cx="56" cy="56" r="44" stroke="url(#se-chrome)" strokeWidth="7" />
        <path d="M24 36a39 39 0 0 1 50-12c-16-1-40 2-50 12Z" fill="url(#se-shine)" opacity="0.7" />
        <ellipse cx="34" cy="74" rx="10" ry="5" fill="white" opacity="0.18" />
        {bars.map((bar) => (
          <motion.rect
            key={bar.x}
            x={bar.x}
            width="10"
            rx="5"
            fill={t.core}
            style={{ filter: `drop-shadow(0 0 6px ${t.core})` }}
            initial={{ y: 76 - bar.h, height: bar.h }}
            animate={{ height: [bar.h * 0.4, bar.h, bar.h * 0.4], y: [76 - bar.h * 0.4, 76 - bar.h, 76 - bar.h * 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: bar.delay, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </Floaty>
  );
};
