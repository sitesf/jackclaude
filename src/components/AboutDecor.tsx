import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative premium — sticlă 3D translucidă cu miez luminos.
 * Fiecare formă are culoarea ei discretă (albastru / gri / alb / mov-roz fin),
 * efect de sticlă reală (corp translucid + bandă de strălucire + muchie refractată +
 * miez luminos) și animație internă subtilă. 100% local, fără assets terțe.
 */

const Floaty: React.FC<{
  children: React.ReactNode;
  duration?: number;
  tilt?: number;
  glow?: string;
}> = ({ children, duration = 6, tilt = 6, glow = 'rgba(215,226,234,0.25)' }) => (
  <motion.div
    style={{
      filter: `drop-shadow(0 28px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 26px ${glow})`,
    }}
    animate={{ y: [0, -14, 0], rotateZ: [-tilt / 2, tilt / 2, -tilt / 2] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/* ── Sferă din sticlă albastră cu miez luminos ── */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5} glow="rgba(94,150,224,0.32)">
    <svg viewBox="0 0 140 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ob-glass" cx="0.4" cy="0.36" r="0.9">
          <stop offset="0" stopColor="#CFE6FF" stopOpacity="0.95" />
          <stop offset="0.32" stopColor="#7FB0E8" stopOpacity="0.8" />
          <stop offset="0.62" stopColor="#3A66A8" stopOpacity="0.85" />
          <stop offset="0.88" stopColor="#162A4A" />
          <stop offset="1" stopColor="#0B1424" />
        </radialGradient>
        <radialGradient id="ob-core" cx="0.5" cy="0.55" r="0.4">
          <stop offset="0" stopColor="#EAF4FF" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#9CC6F5" stopOpacity="0.4" />
          <stop offset="1" stopColor="#9CC6F5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ob-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.8" stopColor="transparent" />
          <stop offset="0.93" stopColor="#EAF4FF" stopOpacity="0.85" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="ob-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ob-clip">
          <circle cx="70" cy="68" r="58" />
        </clipPath>
        <filter id="ob-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <ellipse cx="70" cy="122" rx="42" ry="12" fill="#000" opacity="0.4" filter="url(#ob-blur)" />

      <g clipPath="url(#ob-clip)">
        <circle cx="70" cy="68" r="58" fill="url(#ob-glass)" />
        {/* miez luminos care respiră */}
        <motion.circle
          cx="70"
          cy="74"
          r="34"
          fill="url(#ob-core)"
          animate={{ opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* reflex pe sticlă — pulsează doar opacitatea (ieftin pe mobil) */}
        <motion.ellipse
          cx="56"
          cy="60"
          rx="16"
          ry="46"
          fill="url(#ob-shine)"
          filter="url(#ob-blur)"
          transform="rotate(28 56 60)"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      <circle cx="70" cy="68" r="58" fill="url(#ob-rim)" />
      <ellipse cx="52" cy="42" rx="18" ry="12" fill="url(#ob-shine)" transform="rotate(-26 52 42)" filter="url(#ob-blur)" />
    </svg>
  </Floaty>
);

/* ── Cub din sticlă fumurie gri ── */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4} glow="rgba(180,192,204,0.28)">
    <svg viewBox="0 0 140 150" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cb-top" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#EEF3F8" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#C2CCD6" stopOpacity="0.8" />
          <stop offset="1" stopColor="#8E99A4" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cb-left" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#5A636E" stopOpacity="0.78" />
          <stop offset="0.5" stopColor="#333941" stopOpacity="0.82" />
          <stop offset="1" stopColor="#171B20" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="cb-right" x1="1" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#AEB9C4" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#69727D" stopOpacity="0.82" />
          <stop offset="1" stopColor="#2A3037" stopOpacity="0.88" />
        </linearGradient>
        <radialGradient id="cb-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F4F8FC" stopOpacity="0.8" />
          <stop offset="1" stopColor="#F4F8FC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cb-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C7D2DC" stopOpacity="0.4" />
        </linearGradient>
        <filter id="cb-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      <ellipse cx="70" cy="138" rx="40" ry="11" fill="#000" opacity="0.38" filter="url(#cb-blur)" />

      <path d="M70 14l52 28-52 28-52-28 52-28Z" fill="url(#cb-top)" />
      <path d="M18 42l52 28v64l-52-28V42Z" fill="url(#cb-left)" />
      <path d="M122 42l-52 28v64l52-28V42Z" fill="url(#cb-right)" />

      {/* miez luminos care pulsează prin sticlă */}
      <motion.ellipse
        cx="70"
        cy="86"
        rx="22"
        ry="26"
        fill="url(#cb-core)"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* reflexie lustruită pe fața dreaptă */}
      <path d="M122 50l-44 24v18l44-24V50Z" fill="#FFFFFF" opacity="0.1" />
      <path d="M70 20l36 19-36 19-36-19 36-19Z" fill="#FFFFFF" opacity="0.18" filter="url(#cb-blur)" />

      {/* muchii refractate */}
      <path d="M70 14l52 28-52 28-52-28 52-28Z" stroke="url(#cb-edge)" strokeWidth="2.2" />
      <path d="M70 70v64" stroke="url(#cb-edge)" strokeWidth="1.6" opacity="0.5" />
    </svg>
  </Floaty>
);

/* ── Inel din sticlă albă mată cu highlight care se rotește ── */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8} glow="rgba(230,238,244,0.3)">
    <svg viewBox="0 0 150 130" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="tr-glass" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#DCE4EC" stopOpacity="0.85" />
          <stop offset="0.7" stopColor="#A6B1BC" stopOpacity="0.82" />
          <stop offset="1" stopColor="#5C6670" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="tr-hi" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="tr-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      <ellipse cx="75" cy="118" rx="46" ry="9" fill="#000" opacity="0.34" filter="url(#tr-blur)" />

      <ellipse cx="75" cy="62" rx="58" ry="38" fill="none" stroke="url(#tr-glass)" strokeWidth="26" />
      <ellipse cx="75" cy="67" rx="58" ry="38" fill="none" stroke="#0C0C0C" strokeWidth="9" opacity="0.18" />

      {/* highlight care se plimbă pe inel */}
      <motion.path
        d="M22 48a58 38 0 0 1 106-10"
        stroke="url(#tr-hi)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        filter="url(#tr-blur)"
        animate={{ opacity: [0.4, 0.95, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="126" cy="64" r="4" fill="#FFFFFF" opacity="0.7" />
    </svg>
  </Floaty>
);

/* ── Cursor din sticlă mov-roz discretă, cu pulse de „click" ── */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5} glow="rgba(186,138,208,0.3)">
    <svg viewBox="0 0 130 140" className="w-full h-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cu-glass" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#EAD8F2" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#B98AD0" stopOpacity="0.82" />
          <stop offset="0.72" stopColor="#6E4A86" stopOpacity="0.85" />
          <stop offset="1" stopColor="#2E2138" />
        </linearGradient>
        <linearGradient id="cu-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#E8D6F0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#B98AD0" stopOpacity="0.4" />
        </linearGradient>
        <filter id="cu-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <ellipse cx="60" cy="120" rx="30" ry="8" fill="#000" opacity="0.36" filter="url(#cu-blur)" />

      {/* undă de „click" care pulsează */}
      <motion.circle
        cx="40"
        cy="32"
        fill="none"
        stroke="#D9A8E0"
        strokeWidth="2"
        animate={{ r: [10, 30], opacity: [0.6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />

      <path
        d="M28 18l72 33-31 10-10 31L28 18Z"
        fill="url(#cu-glass)"
        stroke="url(#cu-edge)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M35 27l50 23" stroke="#FFFFFF" strokeWidth="2" opacity="0.45" strokeLinecap="round" filter="url(#cu-blur)" />
      <path d="M36 28l27 12-12 4-4 12L36 28Z" fill="#FFFFFF" opacity="0.2" />
    </svg>
  </Floaty>
);
