import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative 3D originale (local, 100% legal — fără assets terțe).
 * Paletă gri / alb / crom (metalic), redare apropiată de render:
 * gradiente radiale, highlight specular, rim light, ocluzie ambientală.
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
        <radialGradient id="orb-fill" cx="0.38" cy="0.34" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.28" stopColor="#D7E2EA" />
          <stop offset="0.62" stopColor="#7E8894" />
          <stop offset="0.92" stopColor="#2C3138" />
        </radialGradient>
        <radialGradient id="orb-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.78" stopColor="transparent" />
          <stop offset="0.97" stopColor="#EDF3F8" stopOpacity="0.85" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="orb-spec" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="65" cy="66" r="56" fill="url(#orb-fill)" />
      <ellipse cx="65" cy="92" rx="40" ry="22" fill="#0C0C0C" opacity="0.35" />
      <circle cx="65" cy="66" r="56" fill="url(#orb-rim)" />
      <ellipse cx="46" cy="40" rx="22" ry="15" fill="url(#orb-spec)" transform="rotate(-28 46 40)" />
      <circle cx="84" cy="92" r="6" fill="white" opacity="0.5" />
    </svg>
  </Floaty>
);

/** Cub 3D metalic (fețe gri iluminate diferit) */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <svg viewBox="0 0 130 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cube-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C2CDD6" />
        </linearGradient>
        <linearGradient id="cube-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B636D" />
          <stop offset="1" stopColor="#23272D" />
        </linearGradient>
        <linearGradient id="cube-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8E99A4" />
          <stop offset="1" stopColor="#3A4047" />
        </linearGradient>
        <linearGradient id="cube-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#AEB9C3" />
        </linearGradient>
      </defs>
      <path d="M65 12l50 27-50 27-50-27 50-27Z" fill="url(#cube-top)" />
      <path d="M15 39l50 27v62l-50-27V39Z" fill="url(#cube-left)" />
      <path d="M115 39l-50 27v62l50-27V39Z" fill="url(#cube-right)" />
      <path d="M65 12l50 27-50 27-50-27 50-27Z" stroke="url(#cube-edge)" strokeWidth="2" opacity="0.7" />
      <path d="M65 66v62" stroke="url(#cube-edge)" strokeWidth="1.5" opacity="0.45" />
      <path d="M65 18l34 18-34 18-34-18 34-18Z" fill="white" opacity="0.14" />
    </svg>
  </Floaty>
);

/** Inel/torus 3D metalic */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="torus-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EDF3F8" />
          <stop offset="0.45" stopColor="#8A949F" />
          <stop offset="1" stopColor="#2A2F35" />
        </linearGradient>
        <linearGradient id="torus-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="60" rx="56" ry="36" fill="none" stroke="url(#torus-fill)" strokeWidth="24" />
      <ellipse cx="70" cy="64" rx="56" ry="36" fill="none" stroke="#0C0C0C" strokeWidth="8" opacity="0.3" />
      <path d="M22 46a56 36 0 0 1 96-8" stroke="url(#torus-hi)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="118" cy="64" r="4" fill="white" opacity="0.6" />
    </svg>
  </Floaty>
);

/** Cursor 3D metalic */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <svg viewBox="0 0 120 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cur-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6B747E" />
          <stop offset="0.55" stopColor="#2A2F35" />
          <stop offset="1" stopColor="#4A525B" />
        </linearGradient>
        <linearGradient id="cur-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#9FAAB4" />
        </linearGradient>
      </defs>
      <path
        d="M26 16l68 31-29 9.5-9.5 29L26 16Z"
        fill="url(#cur-fill)"
        stroke="url(#cur-edge)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path d="M32 24l50 23" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M33 25l26 11-11 3.5-3.5 11L33 25Z" fill="white" opacity="0.16" />
    </svg>
  </Floaty>
);
