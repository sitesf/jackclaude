import React from 'react';
import { motion } from 'framer-motion';

/**
 * Forme decorative 3D ultra-moderne: glassmorphism + holographic iridescence +
 * neon glow + 3D parallax depth + animated gradient mesh. Trend-forward, impact maxim.
 */

const neonGlow = {
  filter: 'drop-shadow(0 0 8px rgba(182,0,168,0.8)) drop-shadow(0 0 20px rgba(182,0,168,0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
};

const Floaty: React.FC<{ children: React.ReactNode; duration?: number; tilt?: number }> = ({
  children,
  duration = 6,
  tilt = 6,
}) => (
  <motion.div
    style={neonGlow}
    animate={{
      y: [0, -14, 0],
      rotateZ: [-tilt / 2, tilt / 2, -tilt / 2],
      scale: [1, 1.02, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    className="drop-shadow-2xl"
  >
    {children}
  </motion.div>
);

/** Sferă 3D holographic + glassmorphism + neon */
export const OrbDecor: React.FC = () => (
  <Floaty duration={6.5}>
    <div className="relative w-full h-auto">
      <style>{`
        @keyframes orbHolo {
          0%, 100% { filter: hue-rotate(0deg) saturate(1); }
          25% { filter: hue-rotate(60deg) saturate(1.1); }
          50% { filter: hue-rotate(120deg) saturate(1); }
          75% { filter: hue-rotate(300deg) saturate(1.05); }
        }
        @keyframes orbGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        .orb-holographic {
          animation: orbHolo 6s ease-in-out infinite;
        }
        .orb-glow {
          animation: orbGlow 3s ease-in-out infinite;
        }
      `}</style>
      <svg viewBox="0 0 130 130" className="w-full h-auto orb-holographic" fill="none" aria-hidden="true">
        <defs>
          {/* Intense neon glow filter */}
          <filter id="orb-intense-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Holographic gradient mesh */}
          <radialGradient id="orb-holo" cx="0.35" cy="0.32" r="0.92">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.12" stopColor="#E8F4FF" />
            <stop offset="0.28" stopColor="#B600A8" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="#00D9FF" stopOpacity="0.8" />
            <stop offset="0.62" stopColor="#FF00FF" stopOpacity="0.7" />
            <stop offset="0.8" stopColor="#4D00B8" stopOpacity="0.8" />
            <stop offset="0.95" stopColor="#1A0033" />
            <stop offset="1" stopColor="#0C0C0C" />
          </radialGradient>

          {/* Iridescent rim */}
          <radialGradient id="orb-iridescent" cx="0.5" cy="0.5" r="0.52">
            <stop offset="0.7" stopColor="transparent" />
            <stop offset="0.82" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="0.91" stopColor="#FF00FF" stopOpacity="0.7" />
            <stop offset="0.98" stopColor="#B600A8" stopOpacity="0.4" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>

          {/* Neon specular */}
          <radialGradient id="orb-neon-spec" cx="0.32" cy="0.3" r="0.42">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="0.15" stopColor="#E8F4FF" stopOpacity="0.8" />
            <stop offset="0.4" stopColor="#00D9FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glassmorphic base */}
        <circle cx="65" cy="66" r="56" fill="url(#orb-holo)" opacity="0.95" />

        {/* Shadow layers for depth */}
        <ellipse cx="65" cy="96" rx="38" ry="16" fill="#0C0C0C" opacity="0.5" />
        <ellipse cx="65" cy="98" rx="32" ry="10" fill="#B600A8" opacity="0.15" />

        {/* Iridescent rim glow */}
        <circle cx="65" cy="66" r="56" fill="url(#orb-iridescent)" />

        {/* Neon specular highlights */}
        <ellipse cx="48" cy="36" rx="26" ry="18" fill="url(#orb-neon-spec)" transform="rotate(-22 48 36)" filter="url(#orb-intense-glow)" className="orb-glow" />
        <circle cx="88" cy="50" r="7" fill="#00D9FF" opacity="0.4" filter="url(#orb-intense-glow)" className="orb-glow" />
        <circle cx="82" cy="90" r="5" fill="#FF00FF" opacity="0.5" filter="url(#orb-intense-glow)" />
      </svg>
    </div>
  </Floaty>
);

/** Cub 3D holographic + neon edges + glassmorphism */
export const CubeDecor: React.FC = () => (
  <Floaty duration={7} tilt={4}>
    <div className="relative w-full h-auto">
      <style>{`
        @keyframes cubeHolo {
          0% { filter: hue-rotate(0deg); }
          33% { filter: hue-rotate(120deg); }
          66% { filter: hue-rotate(240deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes cubeEdgeGlow {
          0%, 100% { stroke-width: 2.8px; opacity: 0.8; }
          50% { stroke-width: 3.2px; opacity: 1; }
        }
        .cube-holographic {
          animation: cubeHolo 8s linear infinite;
        }
      `}</style>
      <svg viewBox="0 0 130 140" className="w-full h-auto cube-holographic" fill="none" aria-hidden="true">
        <defs>
          {/* Neon glow for edges */}
          <filter id="cube-neon-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Holographic face gradients */}
          <linearGradient id="cube-top-holo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.2" stopColor="#E8F4FF" />
            <stop offset="0.4" stopColor="#00D9FF" stopOpacity="0.8" />
            <stop offset="0.6" stopColor="#B600A8" stopOpacity="0.7" />
            <stop offset="0.85" stopColor="#FF00FF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#8B00FF" />
          </linearGradient>

          <linearGradient id="cube-left-holo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4D00B8" />
            <stop offset="0.3" stopColor="#B600A8" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#00D9FF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#1A0033" />
          </linearGradient>

          <linearGradient id="cube-right-holo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="0.4" stopColor="#B600A8" stopOpacity="0.8" />
            <stop offset="0.8" stopColor="#FF00FF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#3A0066" />
          </linearGradient>

          {/* Neon edge stroke */}
          <linearGradient id="cube-edge-neon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00D9FF" />
            <stop offset="0.5" stopColor="#FF00FF" />
            <stop offset="1" stopColor="#B600A8" />
          </linearGradient>
        </defs>

        {/* Glassmorphic faces with holographic gradients */}
        <path d="M65 12l50 27-50 27-50-27 50-27Z" fill="url(#cube-top-holo)" opacity="0.92" />
        <path d="M15 39l50 27v62l-50-27V39Z" fill="url(#cube-left-holo)" opacity="0.88" />
        <path d="M115 39l-50 27v62l50-27V39Z" fill="url(#cube-right-holo)" opacity="0.88" />

        {/* Neon edge glow */}
        <path d="M65 12l50 27-50 27-50-27 50-27Z" stroke="url(#cube-edge-neon)" strokeWidth="3" opacity="0.7" filter="url(#cube-neon-glow)" />
        <path d="M65 66v62" stroke="url(#cube-edge-neon)" strokeWidth="2.5" opacity="0.5" filter="url(#cube-neon-glow)" />
        <path d="M15 39l50 27" stroke="url(#cube-edge-neon)" strokeWidth="2.2" opacity="0.4" filter="url(#cube-neon-glow)" />
        <path d="M115 39l-50 27" stroke="url(#cube-edge-neon)" strokeWidth="2.2" opacity="0.4" filter="url(#cube-neon-glow)" />

        {/* Inner highlight for depth */}
        <path d="M65 18l34 18-34 18-34-18 34-18Z" fill="white" opacity="0.14" filter="url(#cube-neon-glow)" />
      </svg>
    </div>
  </Floaty>
);

/** Inel/torus holographic + neon + glassmorphism */
export const TorusDecor: React.FC = () => (
  <Floaty duration={6} tilt={8}>
    <div className="relative w-full h-auto">
      <style>{`
        @keyframes torusHolo {
          0%, 100% { filter: hue-rotate(0deg) saturate(1); }
          25% { filter: hue-rotate(90deg) saturate(1.2); }
          50% { filter: hue-rotate(180deg) saturate(1); }
          75% { filter: hue-rotate(270deg) saturate(1.1); }
        }
        @keyframes torusNeonPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .torus-holographic {
          animation: torusHolo 7s ease-in-out infinite;
        }
        .torus-neon {
          animation: torusNeonPulse 2.5s ease-in-out infinite;
        }
      `}</style>
      <svg viewBox="0 0 140 120" className="w-full h-auto torus-holographic" fill="none" aria-hidden="true">
        <defs>
          {/* Intense neon glow */}
          <filter id="torus-intense-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Holographic torus stroke */}
          <linearGradient id="torus-holo-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00D9FF" />
            <stop offset="0.25" stopColor="#B600A8" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#FF00FF" stopOpacity="0.9" />
            <stop offset="0.65" stopColor="#00D9FF" stopOpacity="0.85" />
            <stop offset="0.8" stopColor="#8B00FF" />
            <stop offset="1" stopColor="#B600A8" />
          </linearGradient>

          {/* Bright neon highlight */}
          <linearGradient id="torus-neon-hi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00FFFF" stopOpacity="1" />
            <stop offset="0.2" stopColor="#FF00FF" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#00D9FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Rim iridescence */}
          <linearGradient id="torus-rim-iridescent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00D9FF" stopOpacity="0.7" />
            <stop offset="0.5" stopColor="#FF00FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Glassmorphic main body with holographic gradient */}
        <ellipse cx="70" cy="60" rx="56" ry="36" fill="none" stroke="url(#torus-holo-fill)" strokeWidth="26" opacity="0.85" />

        {/* Neon shadow layers */}
        <ellipse cx="70" cy="70" rx="54" ry="34" fill="none" stroke="#B600A8" strokeWidth="12" opacity="0.25" filter="url(#torus-intense-glow)" />
        <ellipse cx="70" cy="68" rx="54" ry="34" fill="none" stroke="#0C0C0C" strokeWidth="8" opacity="0.4" />

        {/* Bright neon highlight */}
        <path
          d="M22 46a56 36 0 0 1 96-8"
          stroke="url(#torus-neon-hi)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter="url(#torus-intense-glow)"
          className="torus-neon"
        />

        {/* Iridescent rim */}
        <path
          d="M26 52a52 32 0 0 1 88-6"
          stroke="url(#torus-rim-iridescent)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          filter="url(#torus-intense-glow)"
        />

        {/* Neon accents */}
        <circle cx="116" cy="62" r="6" fill="#FF00FF" opacity="0.8" filter="url(#torus-intense-glow)" className="torus-neon" />
        <circle cx="24" cy="48" r="4" fill="#00D9FF" opacity="0.6" filter="url(#torus-intense-glow)" />
      </svg>
    </div>
  </Floaty>
);

/** Cursor holographic + neon cyberpunk + glassmorphism */
export const CursorDecor: React.FC = () => (
  <Floaty duration={5.5} tilt={5}>
    <div className="relative w-full h-auto">
      <style>{`
        @keyframes cursorHolo {
          0% { filter: hue-rotate(-60deg); }
          50% { filter: hue-rotate(120deg); }
          100% { filter: hue-rotate(-60deg); }
        }
        @keyframes cursorShine {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .cursor-holographic {
          animation: cursorHolo 5s ease-in-out infinite;
        }
        .cursor-shine {
          animation: cursorShine 2s ease-in-out infinite;
        }
      `}</style>
      <svg viewBox="0 0 120 130" className="w-full h-auto cursor-holographic" fill="none" aria-hidden="true">
        <defs>
          {/* Intense neon glow for cyberpunk vibe */}
          <filter id="cur-neon-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Holographic fill gradient */}
          <linearGradient id="cur-holo-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00D9FF" />
            <stop offset="0.3" stopColor="#B600A8" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#FF00FF" stopOpacity="0.9" />
            <stop offset="0.8" stopColor="#4D00B8" />
            <stop offset="1" stopColor="#0C0C0C" />
          </linearGradient>

          {/* Neon edge glow */}
          <linearGradient id="cur-neon-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00FFFF" />
            <stop offset="0.5" stopColor="#FF00FF" />
            <stop offset="1" stopColor="#B600A8" />
          </linearGradient>

          {/* Bright specular highlight */}
          <linearGradient id="cur-neon-spec" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00FFFF" stopOpacity="0.95" />
            <stop offset="0.3" stopColor="#FF00FF" stopOpacity="0.6" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Glassmorphic main body with holographic gradient */}
        <path
          d="M26 16l68 31-29 9.5-9.5 29L26 16Z"
          fill="url(#cur-holo-fill)"
          opacity="0.9"
          stroke="url(#cur-neon-edge)"
          strokeWidth="5"
          strokeLinejoin="round"
          filter="url(#cur-neon-glow)"
        />

        {/* Bright neon specular highlight */}
        <ellipse
          cx="38" cy="28" rx="18" ry="13"
          fill="url(#cur-neon-spec)"
          transform="rotate(-32 38 28)"
          filter="url(#cur-neon-glow)"
          className="cursor-shine"
        />

        {/* Center glow accent */}
        <circle cx="45" cy="40" r="6" fill="#00D9FF" opacity="0.7" filter="url(#cur-neon-glow)" className="cursor-shine" />

        {/* Neon edge lines */}
        <path d="M32 24l50 23" stroke="#FF00FF" strokeWidth="2.8" opacity="0.6" strokeLinecap="round" filter="url(#cur-neon-glow)" />
        <path d="M45 45l16 7" stroke="#00D9FF" strokeWidth="2" opacity="0.5" strokeLinecap="round" filter="url(#cur-neon-glow)" />

        {/* Inner triangle accent */}
        <path d="M33 25l26 11-11 3.5-3.5 11L33 25Z" fill="#FF00FF" opacity="0.15" filter="url(#cur-neon-glow)" />
      </svg>
    </div>
  </Floaty>
);
