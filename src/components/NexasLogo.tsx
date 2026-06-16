import React from 'react';
import { motion } from 'framer-motion';

interface NexasLogoProps {
  fontSize?: string;
  gap?: string;
  className?: string;
}

const shimmerStyle = (delay: number, duration: number, fs: string, ls: string): React.CSSProperties => ({
  fontSize: fs,
  lineHeight: 1,
  letterSpacing: ls,
  fontWeight: 900,
  textTransform: 'uppercase' as const,
  background:
    'linear-gradient(105deg, #3a4a5a 0%, #7a8a9a 18%, #c8d8e4 42%, #ffffff 50%, #c8d8e4 58%, #7a8a9a 82%, #3a4a5a 100%)',
  backgroundSize: '280% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: `nexas-shimmer ${duration}s ${delay}s linear infinite`,
});

const NeonBar: React.FC<{ middle?: boolean }> = ({ middle }) => (
  <span
    style={{
      display: 'block',
      height: '13%',
      width: middle ? '68%' : '100%',
      background:
        'linear-gradient(180deg, rgba(150,225,240,0.85) 0%, #00C4E0 32%, #0092AC 68%, rgba(0,110,135,0.4) 100%)',
      borderRadius: '2px',
      boxShadow:
        '0 0 2px 1px rgba(0,210,235,0.6), 0 0 6px 2px rgba(0,190,225,0.35), 0 0 12px 3px rgba(0,165,210,0.15)',
    }}
  />
);

export const NexasLogo: React.FC<NexasLogoProps> = ({
  fontSize = '1em',
  gap = '0.08em',
  className = '',
}) => {
  const fs = fontSize;
  const ls = '-0.025em';

  return (
    <span
      className={`inline-flex items-baseline select-none flex-wrap justify-center ${className}`}
      style={{ gap, fontSize: fs }}
    >
      {/* N */}
      <span style={shimmerStyle(0, 5.5, fs, ls)}>N</span>

      {/* E — neon tubes */}
      <motion.span
        className="relative inline-block"
        style={{ fontSize: fs, lineHeight: 1, letterSpacing: ls, fontWeight: 900 }}
        animate={{
          filter: [
            'brightness(1)',
            'brightness(1.12)',
            'brightness(0.92)',
            'brightness(1.08)',
            'brightness(1)',
          ],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ visibility: 'hidden', fontWeight: 900, textTransform: 'uppercase' }}>E</span>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0.08em 0.06em 0.08em 0',
          }}
        >
          <NeonBar />
          <NeonBar middle />
          <NeonBar />
        </span>
      </motion.span>

      {/* X */}
      <span style={shimmerStyle(1.7, 6.7, fs, ls)}>X</span>

      {/* A */}
      <span style={shimmerStyle(2.55, 7.3, fs, ls)}>A</span>

      {/* S */}
      <span style={shimmerStyle(3.4, 8.0, fs, ls)}>S</span>
    </span>
  );
};
