import React from 'react';
import { motion } from 'framer-motion';

/*
 * Nucleul digital — înlocuiește portretul clasic cu o piesă generativă:
 * orb cu gradient de brand, inele orbitale 3D și particule în rotație.
 */

const ringTransition = (duration: number) => ({
  repeat: Infinity,
  ease: 'linear' as const,
  duration,
});

export const HeroOrb: React.FC = () => {
  return (
    <div
      className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] flex items-center justify-center"
      style={{ perspective: '900px' }}
    >
      {/* Aura difuză */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(182,0,168,.35) 0%, rgba(118,33,176,.22) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Inele orbitale */}
      <motion.div
        className="absolute inset-[6%] rounded-full border border-[#B600A8]/40"
        style={{ transform: 'rotateX(68deg)', transformStyle: 'preserve-3d' }}
        animate={{ rotateZ: 360 }}
        transition={ringTransition(14)}
      >
        <span
          className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#B600A8]"
          style={{ boxShadow: '0 0 14px #B600A8' }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-[14%] rounded-full border border-[#D7E2EA]/25"
        style={{ transform: 'rotateX(62deg) rotateY(28deg)', transformStyle: 'preserve-3d' }}
        animate={{ rotateZ: -360 }}
        transition={ringTransition(20)}
      >
        <span
          className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#D7E2EA]"
          style={{ boxShadow: '0 0 10px #D7E2EA' }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-[2%] rounded-full border border-[#BE4C00]/30"
        style={{ transform: 'rotateX(74deg) rotateY(-18deg)', transformStyle: 'preserve-3d' }}
        animate={{ rotateZ: 360 }}
        transition={ringTransition(28)}
      >
        <span
          className="absolute -bottom-1 left-[20%] w-2.5 h-2.5 rounded-full bg-[#BE4C00]"
          style={{ boxShadow: '0 0 12px #BE4C00' }}
        />
      </motion.div>

      {/* Nucleul */}
      <motion.div
        className="relative w-[44%] h-[44%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 32% 30%, #D7E2EA 0%, #B600A8 38%, #7621B0 68%, #18011F 100%)',
          boxShadow:
            '0 0 60px rgba(182,0,168,.65), 0 0 130px rgba(118,33,176,.35), inset 0 0 34px rgba(255,255,255,.18)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
      >
        {/* Reflexie */}
        <div
          className="absolute top-[12%] left-[16%] w-[30%] h-[18%] rounded-full"
          style={{ background: 'rgba(255,255,255,.5)', filter: 'blur(8px)' }}
        />
      </motion.div>

      {/* Particule plutitoare */}
      {[
        { size: 6, top: '12%', left: '18%', delay: 0, color: '#B600A8' },
        { size: 4, top: '24%', left: '78%', delay: 0.8, color: '#D7E2EA' },
        { size: 5, top: '72%', left: '12%', delay: 1.6, color: '#7621B0' },
        { size: 4, top: '82%', left: '70%', delay: 0.4, color: '#BE4C00' },
        { size: 3, top: '48%', left: '90%', delay: 1.2, color: '#D7E2EA' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};
