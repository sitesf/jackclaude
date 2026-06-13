import React from 'react';
import { motion } from 'framer-motion';
import robot from '../assets/robot-nexas.webp';

/**
 * Robotul NEXAS, local (webp), cu plutire continuă, halou luminos
 * și inel orbital. 100% local — fără request extern.
 */
export const RobotVisual: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {/* fundal radial */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 50% 42%, rgba(182,0,168,0.32), transparent 58%), radial-gradient(circle at 50% 85%, rgba(0,212,255,0.14), transparent 60%)',
      }}
    />

    {/* halou pulsatoriu în spatele robotului */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: '62%',
        height: '62%',
        top: '20%',
        background: 'radial-gradient(circle, rgba(255,91,238,0.5), rgba(108,99,255,0.18) 45%, transparent 70%)',
        filter: 'blur(28px)',
      }}
      animate={{ scale: [0.92, 1.1, 0.92], opacity: [0.55, 0.9, 0.55] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* inel orbital subtil */}
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: '78%',
        height: '78%',
        borderColor: 'rgba(0,212,255,0.45)',
        transform: 'rotateX(72deg)',
        boxShadow: '0 0 22px rgba(0,212,255,0.4)',
      }}
      animate={{ rotateZ: [0, 360] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
    />

    {/* robotul */}
    <motion.img
      src={robot}
      alt="Robotul NEXAS"
      className="relative z-10 h-[88%] w-auto object-contain"
      style={{ filter: 'drop-shadow(0 18px 40px rgba(24,1,31,0.6)) drop-shadow(0 0 28px rgba(182,0,168,0.35))' }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      loading="lazy"
    />
  </div>
);
