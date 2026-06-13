import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Animație 3D originală, locală — un „nucleu AI" luminos cu inele orbitale,
 * particule și halou pulsatoriu. Fără assets externe (100% local / GDPR-safe).
 */
export const AICore: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        angle: (i / 18) * Math.PI * 2,
        radius: 32 + (i % 4) * 9,
        size: 2 + (i % 3),
        duration: 5 + (i % 5),
        delay: (i % 7) * 0.4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* fundal radial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(182,0,168,0.28), transparent 55%), radial-gradient(circle at 50% 80%, rgba(0,212,255,0.16), transparent 60%)',
        }}
      />

      {/* grid de podea în perspectivă */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[45%] opacity-30"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent 0 38px, rgba(182,0,168,0.4) 38px 39px), repeating-linear-gradient(0deg, transparent 0 38px, rgba(120,33,176,0.35) 38px 39px)',
          transform: 'perspective(420px) rotateX(68deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      {/* scena nucleului */}
      <div className="relative" style={{ width: 'min(70%, 340px)', aspectRatio: '1' }}>
        {/* halou pulsatoriu */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,91,238,0.55), rgba(108,99,255,0.15) 45%, transparent 70%)',
            filter: 'blur(24px)',
          }}
          animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* inele orbitale */}
        {[
          { tilt: 70, dur: 14, color: 'rgba(0,212,255,0.9)', scale: 1 },
          { tilt: 60, dur: 10, color: 'rgba(255,91,238,0.9)', scale: 0.82, reverse: true },
          { tilt: 78, dur: 18, color: 'rgba(120,33,176,0.9)', scale: 1.15 },
        ].map((ring, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: ring.color,
              transform: `rotateX(${ring.tilt}deg) scale(${ring.scale})`,
              boxShadow: `0 0 18px ${ring.color}`,
            }}
            animate={{ rotateZ: ring.reverse ? [360, 0] : [0, 360] }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* particule orbitale */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-1/2 left-1/2 rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              boxShadow: '0 0 6px rgba(255,255,255,0.9), 0 0 12px rgba(255,91,238,0.8)',
            }}
            animate={{
              x: [
                Math.cos(p.angle) * p.radius + '%',
                Math.cos(p.angle + Math.PI) * p.radius + '%',
                Math.cos(p.angle + Math.PI * 2) * p.radius + '%',
              ],
              y: [
                Math.sin(p.angle) * p.radius * 0.4 + '%',
                Math.sin(p.angle + Math.PI) * p.radius * 0.4 + '%',
                Math.sin(p.angle + Math.PI * 2) * p.radius * 0.4 + '%',
              ],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

        {/* nucleul central */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: '42%',
            height: '42%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle at 35% 30%, #ffffff, #00D4FF 28%, #B600A8 62%, #7621B0 88%)',
            boxShadow:
              '0 0 40px rgba(255,91,238,0.8), 0 0 90px rgba(0,212,255,0.45), inset -8px -8px 24px rgba(24,1,31,0.6), inset 6px 6px 18px rgba(255,255,255,0.5)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* reflexie lucioasă pe nucleu */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: '14%',
            height: '10%',
            transform: 'translate(-130%, -150%)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)',
            filter: 'blur(1px)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};
