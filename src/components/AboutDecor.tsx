import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative 3D originale (local, 100% legal — fără assets terțe).
 * Redare apropiată de render-uri: gradiente radiale, highlight specular,
 * rim light, ocluzie ambientală și plutire continuă.
 */

const shadow = {
  filter: 'drop-shadow(0 26px 34px rgba(24,1,31,0.5)) drop-shadow(0 0 30px rgba(182,0,168,0.3))',
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

/** Sferă de sticlă realistă */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5}>
    <svg viewBox="0 0 130 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="orb-fill" cx="0.38" cy="0.34" r="0.85">
          <stop offset="0" stopColor="#FF9DF2" />
          <stop offset="0.25" stopColor="#D24BC8" />
          <stop offset="0.6" stopColor="#8A0E80" />
          <stop offset="0.92" stopColor="#2A0633" />
        </radialGradient>
        <radialGradient id="orb-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.78" stopColor="transparent" />
          <stop offset="0.97" stopColor="#E48BE0" stopOpacity="0.9" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="orb-spec" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="65" cy="66" r="56" fill="url(#orb-fill)" />
      {/* ocluzie jos */}
      <ellipse cx="65" cy="92" rx="40" ry="22" fill="#18011F" opacity="0.35" />
      {/* rim light */}
      <circle cx="65" cy="66" r="56" fill="url(#orb-rim)" />
      {/* specular mare */}
      <ellipse cx="46" cy="40" rx="22" ry="15" fill="url(#orb-spec)" transform="rotate(-28 46 40)" />
      {/* specular mic */}
      <circle cx="84" cy="92" r="6" fill="white" opacity="0.5" />
    </svg>
  </Floaty>
);

/** Cub 3D cu fețe iluminate diferit */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <svg viewBox="0 0 130 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cube-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB3F6" />
          <stop offset="1" stopColor="#C04AD0" />
        </linearGradient>
        <linearGradient id="cube-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A1273" />
          <stop offset="1" stopColor="#2A0633" />
        </linearGradient>
        <linearGradient id="cube-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B600A8" />
          <stop offset="1" stopColor="#4A0A52" />
        </linearGradient>
        <linearGradient id="cube-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4FBFF" />
          <stop offset="0.5" stopColor="#E48BE0" />
          <stop offset="1" stopColor="#41B7E8" />
        </linearGradient>
      </defs>
      {/* fețe */}
      <path d="M65 12l50 27-50 27-50-27 50-27Z" fill="url(#cube-top)" />
      <path d="M15 39l50 27v62l-50-27V39Z" fill="url(#cube-left)" />
      <path d="M115 39l-50 27v62l50-27V39Z" fill="url(#cube-right)" />
      {/* muchii luminoase */}
      <path d="M65 12l50 27-50 27-50-27 50-27Z" stroke="url(#cube-edge)" strokeWidth="2" opacity="0.7" />
      <path d="M65 66v62" stroke="url(#cube-edge)" strokeWidth="1.5" opacity="0.5" />
      {/* highlight pe fața de sus */}
      <path d="M65 18l34 18-34 18-34-18 34-18Z" fill="white" opacity="0.12" />
    </svg>
  </Floaty>
);

/** Inel/torus 3D cu volum */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="torus-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#41B7E8" />
          <stop offset="0.4" stopColor="#B600A8" />
          <stop offset="1" stopColor="#2A0633" />
        </linearGradient>
        <linearGradient id="torus-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.85" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="60" rx="56" ry="36" fill="none" stroke="url(#torus-fill)" strokeWidth="24" />
      {/* umbra interioară jos */}
      <ellipse cx="70" cy="64" rx="56" ry="36" fill="none" stroke="#18011F" strokeWidth="8" opacity="0.35" />
      {/* highlight sus */}
      <path d="M22 46a56 36 0 0 1 96-8" stroke="url(#torus-hi)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="118" cy="64" r="4" fill="white" opacity="0.6" />
    </svg>
  </Floaty>
);

/** Cursor 3D cu volum și muchii crom */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <svg viewBox="0 0 120 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cur-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A0A45" />
          <stop offset="0.55" stopColor="#18011F" />
          <stop offset="1" stopColor="#6E0F66" />
        </linearGradient>
        <linearGradient id="cur-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9DD8F2" />
          <stop offset="0.5" stopColor="#E48BE0" />
          <stop offset="1" stopColor="#7621B0" />
        </linearGradient>
      </defs>
      <path
        d="M26 16l68 31-29 9.5-9.5 29L26 16Z"
        fill="url(#cur-fill)"
        stroke="url(#cur-edge)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* highlight muchie */}
      <path d="M32 24l50 23" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M33 25l26 11-11 3.5-3.5 11L33 25Z" fill="white" opacity="0.14" />
    </svg>
  </Floaty>
);
