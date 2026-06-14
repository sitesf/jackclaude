import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative 3D originale (local, 100% legal — fără assets terțe).
 * Paletă gri / alb / crom (metalic), redare apropiată de render:
 * gradiente complexe, SVG filters, highlight specular, rim light, ocluzie ambientală.
 */

const shadow = {
  filter: 'drop-shadow(0 26px 34px rgba(0,0,0,0.55)) drop-shadow(0 0 26px rgba(215,226,234,0.18))',
};

const Floaty: React.FC<{ children: React.ReactNode; duration?: number; tilt?: number }> = ({
  children,
  duration = 6,
  tilt = 6,
}) => (
  <motion.div
    style={shadow}
    animate={{ y: [0, -14, 0], rotateZ: [-tilt / 2, tilt / 2, -tilt / 2] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/** Sferă metalică (argintiu) */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5}>
    <svg viewBox="0 0 130 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <filter id="orb-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>
        <radialGradient id="orb-fill" cx="0.38" cy="0.34" r="0.88">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.15" stopColor="#E8EFF6" />
          <stop offset="0.35" stopColor="#D7E2EA" />
          <stop offset="0.55" stopColor="#96A4B2" />
          <stop offset="0.75" stopColor="#5A6270" />
          <stop offset="0.92" stopColor="#2C3138" />
          <stop offset="1" stopColor="#1A1E24" />
        </radialGradient>
        <radialGradient id="orb-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.75" stopColor="transparent" />
          <stop offset="0.88" stopColor="#F5FAFB" stopOpacity="0.95" />
          <stop offset="0.96" stopColor="#D7E2EA" stopOpacity="0.4" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="orb-spec1" cx="0.35" cy="0.32" r="0.45">
          <stop offset="0" stopColor="white" stopOpacity="0.98" />
          <stop offset="0.25" stopColor="white" stopOpacity="0.6" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orb-spec2" cx="0.25" cy="0.25" r="0.35">
          <stop offset="0" stopColor="white" stopOpacity="0.4" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="65" cy="66" r="56" fill="url(#orb-fill)" />
      <ellipse cx="65" cy="94" rx="38" ry="18" fill="#0C0C0C" opacity="0.4" />
      <ellipse cx="65" cy="96" rx="32" ry="12" fill="#0C0C0C" opacity="0.15" />
      <circle cx="65" cy="66" r="56" fill="url(#orb-rim)" />
      <ellipse cx="46" cy="38" rx="24" ry="17" fill="url(#orb-spec1)" transform="rotate(-25 46 38)" filter="url(#orb-filter)" />
      <ellipse cx="52" cy="32" rx="14" ry="10" fill="url(#orb-spec2)" transform="rotate(-20 52 32)" />
      <circle cx="84" cy="92" r="5" fill="white" opacity="0.6" />
    </svg>
  </Floaty>
);

/** Cub 3D metalic (fețe gri iluminate diferit) */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <svg viewBox="0 0 130 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <filter id="cube-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
        </filter>
        <linearGradient id="cube-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#E8EEF4" />
          <stop offset="0.7" stopColor="#C2CDD6" />
          <stop offset="1" stopColor="#A8B4BD" />
        </linearGradient>
        <linearGradient id="cube-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A8290" />
          <stop offset="0.3" stopColor="#5B636D" />
          <stop offset="0.8" stopColor="#3A3F46" />
          <stop offset="1" stopColor="#23272D" />
        </linearGradient>
        <linearGradient id="cube-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A5AEB9" />
          <stop offset="0.35" stopColor="#8E99A4" />
          <stop offset="0.65" stopColor="#5A626A" />
          <stop offset="1" stopColor="#3A4047" />
        </linearGradient>
        <linearGradient id="cube-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#D7DFE7" />
          <stop offset="1" stopColor="#AEB9C3" />
        </linearGradient>
      </defs>
      <path d="M65 12l50 27-50 27-50-27 50-27Z" fill="url(#cube-top)" />
      <path d="M15 39l50 27v62l-50-27V39Z" fill="url(#cube-left)" />
      <path d="M115 39l-50 27v62l50-27V39Z" fill="url(#cube-right)" />
      <path d="M65 101v0" stroke="url(#cube-edge)" strokeWidth="1" opacity="0.2" />
      <path d="M65 12l50 27-50 27-50-27 50-27Z" stroke="url(#cube-edge)" strokeWidth="2.5" opacity="0.6" />
      <path d="M65 66v62" stroke="url(#cube-edge)" strokeWidth="2" opacity="0.35" />
      <path d="M15 39l100 54" stroke="url(#cube-edge)" strokeWidth="1.5" opacity="0.25" />
      <path d="M65 18l34 18-34 18-34-18 34-18Z" fill="white" opacity="0.18" filter="url(#cube-filter)" />
      <path d="M68 24l18 10-18 10-18-10 18-10Z" fill="white" opacity="0.08" />
    </svg>
  </Floaty>
);

/** Inel/torus 3D metalic */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <filter id="torus-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" />
        </filter>
        <linearGradient id="torus-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5FAFB" />
          <stop offset="0.18" stopColor="#EDF3F8" />
          <stop offset="0.38" stopColor="#B5BFCA" />
          <stop offset="0.58" stopColor="#8A949F" />
          <stop offset="0.75" stopColor="#4D555E" />
          <stop offset="0.9" stopColor="#2A2F35" />
          <stop offset="1" stopColor="#1F2329" />
        </linearGradient>
        <linearGradient id="torus-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="torus-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D7E2EA" stopOpacity="0.6" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="60" rx="56" ry="36" fill="none" stroke="url(#torus-fill)" strokeWidth="24" />
      <ellipse cx="70" cy="68" rx="54" ry="34" fill="none" stroke="#0C0C0C" strokeWidth="10" opacity="0.35" />
      <ellipse cx="70" cy="66" rx="54" ry="34" fill="none" stroke="#0C0C0C" strokeWidth="5" opacity="0.15" />
      <path d="M22 46a56 36 0 0 1 96-8" stroke="url(#torus-hi)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#torus-filter)" />
      <path d="M26 50a52 32 0 0 1 88-6" stroke="url(#torus-rim)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="116" cy="62" r="5" fill="white" opacity="0.7" />
      <circle cx="24" cy="48" r="3" fill="white" opacity="0.4" />
    </svg>
  </Floaty>
);

/** Cursor 3D metalic */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <svg viewBox="0 0 120 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <filter id="cur-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
        </filter>
        <linearGradient id="cur-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A9199" />
          <stop offset="0.25" stopColor="#7A8390" />
          <stop offset="0.5" stopColor="#6B747E" />
          <stop offset="0.72" stopColor="#3A4047" />
          <stop offset="0.88" stopColor="#2A2F35" />
          <stop offset="1" stopColor="#4A525B" />
        </linearGradient>
        <linearGradient id="cur-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#D7DFE7" />
          <stop offset="1" stopColor="#9FAAB4" />
        </linearGradient>
        <linearGradient id="cur-spec" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M26 16l68 31-29 9.5-9.5 29L26 16Z"
        fill="url(#cur-fill)"
        stroke="url(#cur-edge)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <ellipse cx="40" cy="30" rx="16" ry="12" fill="url(#cur-spec)" transform="rotate(-35 40 30)" filter="url(#cur-filter)" opacity="0.6" />
      <path d="M32 24l50 23" stroke="white" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
      <path d="M33 25l26 11-11 3.5-3.5 11L33 25Z" fill="white" opacity="0.12" />
      <path d="M45 45l16 7" stroke="white" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
    </svg>
  </Floaty>
);
