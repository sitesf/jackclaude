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
        'linear-gradient(180deg, rgba(180,245,255,0.95) 0%, #00DDFF 30%, #00AACC 65%, rgba(0,140,175,0.55) 100%)',
      borderRadius: '2px',
      boxShadow:
        '0 0 3px 1px #00EEFF, 0 0 9px 3px rgba(0,210,255,0.65), 0 0 20px 5px rgba(0,180,255,0.28)',
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
      className={`inline-flex items-baseline select-none ${className}`}
      style={{ gap }}
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
            'brightness(1.4)',
            'brightness(0.85)',
            'brightness(1.25)',
            'brightness(1)',
          ],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
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
