import React from 'react';
import { motion } from 'framer-motion';
import robotPng from '../assets/robot-nexas.png';
import robotWebp from '../assets/robot-nexas.webp';

/*
 * Robotul NEXAS — portretul oficial al brandului, încadrat într-un inel
 * metalic rotativ cu aură în culorile site-ului.
 */
export const HeroRobot: React.FC = () => {
  return (
    <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[470px] lg:h-[470px] flex items-center justify-center">
      {/* Aură */}
      <div
        className="absolute inset-[-6%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(182,0,168,.4) 0%, rgba(118,33,176,.22) 45%, transparent 72%)',
          filter: 'blur(34px)',
        }}
      />

      {/* Inel metalic */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 210deg, #f5f7fa, #9aa4ad 18%, #e8edf2 36%, #7d878f 55%, #ffffff 72%, #aab4bd 88%, #f5f7fa)',
          boxShadow:
            '0 0 40px rgba(182,0,168,.35), 0 18px 60px rgba(0,0,0,.55), inset 0 0 18px rgba(0,0,0,.35)',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
      />

      {/* Interior cu robotul */}
      <div
        className="absolute inset-[4.5%] rounded-full overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, #d4359f 0%, #a91d86 42%, #571f63 100%)',
        }}
      >
        <picture>
          <source srcSet={robotWebp} type="image/webp" />
          <motion.img
            src={robotPng}
            alt="Robotul NEXAS"
            className="w-full h-full object-cover object-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          />
        </picture>
      </div>

      {/* Satelit luminos pe inel */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 12 }}
      >
        <span
          className="absolute top-[1%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B600A8]"
          style={{ boxShadow: '0 0 16px #B600A8, 0 0 30px rgba(182,0,168,.6)' }}
        />
      </motion.div>
    </div>
  );
};
