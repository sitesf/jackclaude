import React from 'react';
import { motion } from 'framer-motion';

const MAGENTA = '#B600A8';
const VIOLET = '#7621B0';

const float = (duration: number, delta = 12) => ({
  animate: { y: [0, -delta, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
});

/** Bulă de chat AI cu trei puncte care „tastează" — agenți AI */
export const ChatBubbleDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div className={className} {...float(5)}>
    <svg viewBox="0 0 120 110" fill="none" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="doodle-chat" x1="0" y1="0" x2="120" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor={MAGENTA} />
          <stop offset="1" stopColor={VIOLET} />
        </linearGradient>
      </defs>
      <path
        d="M14 16C14 9.4 19.4 4 26 4h68c6.6 0 12 5.4 12 12v50c0 6.6-5.4 12-12 12H56L34 98V78h-8c-6.6 0-12-5.4-12-12V16Z"
        fill="url(#doodle-chat)"
        opacity="0.92"
      />
      {[40, 60, 80].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={41}
          r={6}
          fill="white"
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  </motion.div>
);

/** Două roți dințate care se rotesc în sensuri opuse — automatizări / RPA */
const GearShape: React.FC<{ color: string }> = ({ color }) => {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="-50 -50 100 100" className="w-full h-auto" fill="none" aria-hidden="true">
      {teeth.map((angle) => (
        <rect key={angle} x={-7} y={-46} width={14} height={16} rx={4} fill={color} transform={`rotate(${angle})`} />
      ))}
      <circle r={32} fill={color} />
      <circle r={13} fill="white" />
    </svg>
  );
};

export const GearsDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div className={className} {...float(6)}>
    <div className="relative" style={{ width: '100%', paddingBottom: '78%' }}>
      <motion.div
        className="absolute left-0 top-0 w-[62%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <GearShape color={MAGENTA} />
      </motion.div>
      <motion.div
        className="absolute right-0 bottom-0 w-[46%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
      >
        <GearShape color={VIOLET} />
      </motion.div>
    </div>
  </motion.div>
);

/** Fereastră de browser cu linii care „se încarcă" și cursor plutitor — aplicații & site-uri */
export const BrowserDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div className={className} {...float(5.5)}>
    <svg viewBox="0 0 130 100" fill="none" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="doodle-browser" x1="0" y1="0" x2="130" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor={MAGENTA} />
          <stop offset="1" stopColor={VIOLET} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="122" height="88" rx="12" fill="url(#doodle-browser)" opacity="0.92" />
      <circle cx="20" cy="18" r="4" fill="white" opacity="0.9" />
      <circle cx="33" cy="18" r="4" fill="white" opacity="0.6" />
      <circle cx="46" cy="18" r="4" fill="white" opacity="0.35" />
      <line x1="4" y1="30" x2="126" y2="30" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
      {[44, 58, 72].map((y, i) => (
        <motion.rect
          key={y}
          x="18"
          y={y}
          height="7"
          rx="3.5"
          fill="white"
          animate={{ width: [20, 94 - i * 18, 20] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
      <motion.path
        d="M0 0l14 5.2-6 2.4-2.4 6L0 0Z"
        fill="white"
        stroke={VIOLET}
        strokeWidth="1.5"
        animate={{ x: [86, 100, 92, 86], y: [56, 70, 78, 56] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  </motion.div>
);

/** Lupă cu grafic crescător — SEO & optimizare */
export const SeoDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div className={className} {...float(6.5)}>
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="doodle-seo" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor={MAGENTA} />
          <stop offset="1" stopColor={VIOLET} />
        </linearGradient>
      </defs>
      <circle cx="52" cy="52" r="40" fill="white" stroke="url(#doodle-seo)" strokeWidth="10" />
      <motion.rect
        x="84"
        y="78"
        width="13"
        height="40"
        rx="6.5"
        fill="url(#doodle-seo)"
        transform="rotate(-45 84 78)"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[
        { x: 34, h: 16, delay: 0 },
        { x: 47, h: 26, delay: 0.3 },
        { x: 60, h: 36, delay: 0.6 },
      ].map((bar) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          width="9"
          rx="4"
          fill="url(#doodle-seo)"
          initial={{ y: 70 - bar.h, height: bar.h }}
          animate={{ height: [bar.h * 0.45, bar.h, bar.h * 0.45], y: [70 - bar.h * 0.45, 70 - bar.h, 70 - bar.h * 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: bar.delay, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  </motion.div>
);
