import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative 3D originale (local, 100% legal — fără assets terțe).
 * Stil sticlă + crom magenta/violet, plutire continuă.
 */

const Defs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#2A0633" />
      <stop offset="0.45" stopColor="#18011F" />
      <stop offset="0.75" stopColor="#6E0F66" />
      <stop offset="1" stopColor="#B600A8" />
    </linearGradient>
    <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#F4FBFF" />
      <stop offset="0.3" stopColor="#9DD8F2" />
      <stop offset="0.55" stopColor="#E48BE0" />
      <stop offset="0.8" stopColor="#7621B0" />
      <stop offset="1" stopColor="#41B7E8" />
    </linearGradient>
    <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="white" stopOpacity="0.85" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <radialGradient id={`${id}-glow`} cx="0.35" cy="0.3" r="0.9">
      <stop offset="0" stopColor="#FF5BEE" stopOpacity="0.9" />
      <stop offset="0.55" stopColor="#B600A8" stopOpacity="0.35" />
      <stop offset="1" stopColor="#18011F" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const shadow = { filter: 'drop-shadow(0 22px 30px rgba(24,1,31,0.35)) drop-shadow(0 0 24px rgba(182,0,168,0.25))' };

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

/** Sferă de sticlă (înlocuiește „luna") */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5}>
    <svg viewBox="0 0 120 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <Defs id="orb" />
      <circle cx="60" cy="60" r="50" fill="url(#orb-body)" />
      <circle cx="60" cy="60" r="50" fill="url(#orb-glow)" opacity="0.6" />
      <circle cx="60" cy="60" r="50" stroke="url(#orb-chrome)" strokeWidth="4" />
      <ellipse cx="44" cy="40" rx="20" ry="12" fill="url(#orb-shine)" opacity="0.7" transform="rotate(-25 44 40)" />
    </svg>
  </Floaty>
);

/** Cub 3D (înlocuiește „lego") */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <svg viewBox="0 0 120 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <Defs id="cube" />
      <path d="M60 8l48 26v52L60 122 12 86V34L60 8Z" fill="url(#cube-body)" stroke="url(#cube-chrome)" strokeWidth="3" />
      <path d="M60 8l48 26-48 26-48-26L60 8Z" fill="url(#cube-chrome)" opacity="0.55" />
      <path d="M60 60v62L12 86V34l48 26Z" fill="#18011F" opacity="0.35" />
      <ellipse cx="40" cy="30" rx="16" ry="6" fill="url(#cube-shine)" opacity="0.6" />
    </svg>
  </Floaty>
);

/** Torus / inel 3D (înlocuiește obiectul abstract) */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <svg viewBox="0 0 130 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <Defs id="torus" />
      <ellipse cx="65" cy="60" rx="52" ry="34" fill="none" stroke="url(#torus-body)" strokeWidth="22" />
      <ellipse cx="65" cy="60" rx="52" ry="34" fill="none" stroke="url(#torus-chrome)" strokeWidth="4" />
      <path d="M28 44a52 34 0 0 1 60-14c-18 0-44 4-60 14Z" fill="url(#torus-shine)" opacity="0.5" />
    </svg>
  </Floaty>
);

/** Cursor 3D (înlocuiește cursorul) */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <svg viewBox="0 0 110 120" className="w-full h-auto" fill="none" aria-hidden="true">
      <Defs id="cursor" />
      <path
        d="M24 16l66 30-28 9-9 28-29-67Z"
        fill="url(#cursor-body)"
        stroke="url(#cursor-chrome)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M30 24l34 15-14 4-5 14-15-33Z" fill="url(#cursor-shine)" opacity="0.45" />
    </svg>
  </Floaty>
);
