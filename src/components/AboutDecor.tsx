import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative premium — aspect de render 3D de studio.
 * Crom lichid / metal lustruit: reflexie de orizont (cer / bandă întunecată / bounce),
 * highlight specular, rim light, ocluzie de contact. Paletă platină / oțel / grafit,
 * cu un suflu cald + rece (HDRI) și o șoaptă discretă de magenta pentru brand.
 * 100% local, fără assets terțe.
 */

const shadow = {
  filter:
    'drop-shadow(0 30px 40px rgba(0,0,0,0.6)) drop-shadow(0 6px 14px rgba(0,0,0,0.45)) drop-shadow(0 0 30px rgba(215,226,234,0.10))',
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

/* ── Sferă crom lichid cu reflexie de orizont ── */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5}>
    <svg viewBox="0 0 140 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        {/* Bază metalică profundă */}
        <radialGradient id="orb-base" cx="0.4" cy="0.36" r="0.9">
          <stop offset="0" stopColor="#F4F7FA" />
          <stop offset="0.3" stopColor="#C3CDD6" />
          <stop offset="0.6" stopColor="#6E7783" />
          <stop offset="0.85" stopColor="#2B3036" />
          <stop offset="1" stopColor="#15181C" />
        </radialGradient>
        {/* Reflexia de orizont (cer luminos / bandă întunecată / bounce de jos) */}
        <linearGradient id="orb-horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBFDFF" stopOpacity="0.95" />
          <stop offset="0.34" stopColor="#C9D6E2" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#1A1E24" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#3A4149" stopOpacity="0.6" />
          <stop offset="0.82" stopColor="#AEB9C4" stopOpacity="0.5" />
          <stop offset="1" stopColor="#E7EEF4" stopOpacity="0.3" />
        </linearGradient>
        {/* Suflu cald HDRI (dreapta-jos) */}
        <radialGradient id="orb-warm" cx="0.72" cy="0.74" r="0.4">
          <stop offset="0" stopColor="#F3E6D6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#F3E6D6" stopOpacity="0" />
        </radialGradient>
        {/* Rim light rece + șoaptă magenta */}
        <radialGradient id="orb-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.8" stopColor="transparent" />
          <stop offset="0.93" stopColor="#EAF1F8" stopOpacity="0.8" />
          <stop offset="0.99" stopColor="#B600A8" stopOpacity="0.18" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        {/* Hotspot specular */}
        <radialGradient id="orb-spec" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="orb-clip">
          <circle cx="70" cy="68" r="58" />
        </clipPath>
        <filter id="orb-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* Umbră de contact */}
      <ellipse cx="70" cy="120" rx="42" ry="13" fill="#000" opacity="0.45" filter="url(#orb-soft)" />

      <g clipPath="url(#orb-clip)">
        <circle cx="70" cy="68" r="58" fill="url(#orb-base)" />
        <rect x="12" y="10" width="116" height="116" fill="url(#orb-horizon)" />
        <rect x="12" y="10" width="116" height="116" fill="url(#orb-warm)" />
      </g>

      <circle cx="70" cy="68" r="58" fill="url(#orb-rim)" />
      <ellipse cx="52" cy="42" rx="20" ry="13" fill="url(#orb-spec)" transform="rotate(-26 52 42)" filter="url(#orb-soft)" />
      <circle cx="92" cy="96" r="5" fill="#FFFFFF" opacity="0.45" filter="url(#orb-soft)" />
    </svg>
  </Floaty>
);

/* ── Cub obsidian/sticlă lustruită cu muchii teșite ── */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <svg viewBox="0 0 140 150" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cube-top2" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#FBFDFF" />
          <stop offset="0.45" stopColor="#D2DCE5" />
          <stop offset="1" stopColor="#9AA6B1" />
        </linearGradient>
        <linearGradient id="cube-left2" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#5A636E" />
          <stop offset="0.5" stopColor="#363C44" />
          <stop offset="1" stopColor="#191D22" />
        </linearGradient>
        <linearGradient id="cube-right2" x1="1" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#9DA8B3" />
          <stop offset="0.45" stopColor="#646D78" />
          <stop offset="1" stopColor="#2E343B" />
        </linearGradient>
        <linearGradient id="cube-edge2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#D7E2EA" stopOpacity="0.5" />
          <stop offset="1" stopColor="#B600A8" stopOpacity="0.22" />
        </linearGradient>
        <filter id="cube-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      <ellipse cx="70" cy="138" rx="40" ry="11" fill="#000" opacity="0.4" filter="url(#cube-soft)" />

      <path d="M70 14l52 28-52 28-52-28 52-28Z" fill="url(#cube-top2)" />
      <path d="M18 42l52 28v64l-52-28V42Z" fill="url(#cube-left2)" />
      <path d="M122 42l-52 28v64l52-28V42Z" fill="url(#cube-right2)" />

      {/* Reflexie lustruită pe fața dreaptă */}
      <path d="M122 50l-44 24v18l44-24V50Z" fill="#FFFFFF" opacity="0.10" />
      {/* Highlight pe fața de sus */}
      <path d="M70 20l36 19-36 19-36-19 36-19Z" fill="#FFFFFF" opacity="0.16" filter="url(#cube-soft)" />

      {/* Muchii teșite, luminoase */}
      <path d="M70 14l52 28-52 28-52-28 52-28Z" stroke="url(#cube-edge2)" strokeWidth="2.2" />
      <path d="M70 70v64" stroke="url(#cube-edge2)" strokeWidth="1.6" opacity="0.5" />
      <path d="M18 42l52 28" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    </svg>
  </Floaty>
);

/* ── Inel metal periat cu highlight anizotropic ── */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <svg viewBox="0 0 150 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="torus-body" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
          <stop offset="0" stopColor="#F1F6FA" />
          <stop offset="0.32" stopColor="#BDC8D2" />
          <stop offset="0.6" stopColor="#727B86" />
          <stop offset="0.85" stopColor="#363C43" />
          <stop offset="1" stopColor="#1B1F24" />
        </linearGradient>
        <linearGradient id="torus-aniso" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#B600A8" stopOpacity="0.2" />
        </linearGradient>
        <filter id="torus-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      <ellipse cx="75" cy="118" rx="46" ry="9" fill="#000" opacity="0.38" filter="url(#torus-soft)" />

      {/* Corpul inelului */}
      <ellipse cx="75" cy="62" rx="58" ry="38" fill="none" stroke="url(#torus-body)" strokeWidth="26" />
      {/* Ocluzie interioară (jos) */}
      <ellipse cx="75" cy="67" rx="58" ry="38" fill="none" stroke="#0C0C0C" strokeWidth="9" opacity="0.32" />
      {/* Highlight periat (sus) */}
      <path d="M22 48a58 38 0 0 1 106-10" stroke="url(#torus-aniso)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#torus-soft)" />
      <circle cx="126" cy="64" r="4" fill="#FFFFFF" opacity="0.6" />
    </svg>
  </Floaty>
);

/* ── Cursor platină lustruit ── */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <svg viewBox="0 0 130 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cur-body" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#EDF2F7" />
          <stop offset="0.35" stopColor="#9AA5B0" />
          <stop offset="0.7" stopColor="#444B53" />
          <stop offset="1" stopColor="#22272D" />
        </linearGradient>
        <linearGradient id="cur-edge2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#C7D2DC" stopOpacity="0.7" />
          <stop offset="1" stopColor="#B600A8" stopOpacity="0.2" />
        </linearGradient>
        <filter id="cur-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <ellipse cx="60" cy="120" rx="30" ry="8" fill="#000" opacity="0.38" filter="url(#cur-soft)" />

      <path
        d="M28 18l72 33-31 10-10 31L28 18Z"
        fill="url(#cur-body)"
        stroke="url(#cur-edge2)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Reflexie lustruită */}
      <path d="M35 27l50 23" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" strokeLinecap="round" filter="url(#cur-soft)" />
      <path d="M36 28l27 12-12 4-4 12L36 28Z" fill="#FFFFFF" opacity="0.18" />
    </svg>
  </Floaty>
);
