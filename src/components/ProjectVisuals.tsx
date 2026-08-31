import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, CheckCircle2, Newspaper, Trophy, Wrench } from 'lucide-react';

/* ───────── helpers comune ───────── */

const Backdrop: React.FC<{ accent: string; children: React.ReactNode }> = ({ accent, children }) => (
  <div
    className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden px-6 sm:px-10"
    style={{ background: `radial-gradient(circle at 50% 28%, ${accent}26, #0a0a0a 72%)` }}
  >
    {children}
  </div>
);

const TypingDots: React.FC<{ color: string }> = ({ color }) => (
  <span className="inline-flex gap-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
      />
    ))}
  </span>
);

/* ───────── chat mockup (folosit de NIRO și Alex) ───────── */

const ChatMock: React.FC<{ accent: string; bubbles: { side: 'left' | 'right'; text: string }[] }> = ({
  accent,
  bubbles,
}) => (
  <Backdrop accent={accent}>
    <div className="w-full max-w-[280px] flex flex-col gap-2.5">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[11px] sm:text-xs font-medium ${
            b.side === 'right' ? 'self-end text-white' : 'self-start text-[#D7E2EA]'
          }`}
          style={{ background: b.side === 'right' ? accent : 'rgba(255,255,255,0.06)' }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, 12] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1.1, times: [0, 0.06, 0.8, 1], ease: 'easeOut' }}
        >
          {b.text}
        </motion.div>
      ))}
      <motion.div
        className="self-start flex items-center gap-1.5 rounded-2xl px-3.5 py-2"
        style={{ background: 'rgba(255,255,255,0.06)' }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: bubbles.length * 1.1, times: [0, 0.05, 0.85, 1] }}
      >
        <TypingDots color="#D7E2EA" />
      </motion.div>
    </div>
    <MessageCircle className="absolute top-5 right-5 w-5 h-5 opacity-30" style={{ color: accent }} />
  </Backdrop>
);

/* ───────── 01 — NIRO: chat WhatsApp ───────── */

const NiroVisual: React.FC = () => (
  <ChatMock
    accent="#8F5CFF"
    bubbles={[
      { side: 'left', text: 'Bună! Vreau o programare.' },
      { side: 'right', text: 'Sigur, pentru ce mașină?' },
      { side: 'left', text: 'Dacia Logan, 2019.' },
    ]}
  />
);

/* ───────── 02 — NEO: scor SEO circular ───────── */

const NeoVisual: React.FC = () => {
  const accent = '#3B82F6';
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <Backdrop accent={accent}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={accent}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * 0.08 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Search className="w-4 h-4 mb-1 opacity-60" style={{ color: accent }} />
            <span className="text-[#D7E2EA] font-black text-xl">92</span>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-8">
          {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
            <motion.span
              key={i}
              className="w-2 rounded-full"
              style={{ background: accent }}
              animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 30}%`] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </Backdrop>
  );
};

/* ───────── 03 — HR: calendar de interviuri ───────── */

const HrVisual: React.FC = () => {
  const accent = '#5DA9FF';
  const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const filled = [2, 5, 9, 13, 16, 20];
  return (
    <Backdrop accent={accent}>
      <div className="w-full max-w-[260px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#D7E2EA] text-xs font-semibold uppercase tracking-wider opacity-70">Interviuri · Iunie</span>
          <CheckCircle2 className="w-4 h-4" style={{ color: accent }} />
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {weekdays.map((d, i) => (
            <span key={i} className="text-center text-[9px] text-[#D7E2EA]/40 font-semibold">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, i) => (
            <motion.div
              key={day}
              className="aspect-square rounded-md flex items-center justify-center text-[9px] font-bold"
              style={{
                background: filled.includes(i) ? accent : 'rgba(255,255,255,0.05)',
                color: filled.includes(i) ? '#0C0C0C' : 'rgba(215,226,234,0.45)',
              }}
              animate={filled.includes(i) ? { opacity: [0.5, 1, 0.5], scale: [0.94, 1, 0.94] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' }}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </div>
    </Backdrop>
  );
};

/* ───────── 04 — Știri AI: articol care se scrie singur ───────── */

const StiriVisual: React.FC = () => {
  const accent = '#B600A8';
  const headline = 'AI-ul care reduce costurile operaționale cu până la 30%';
  const excerptLines = ['Companiile care adoptă automatizări AI', 'raportează economii semnificative...'];
  return (
    <Backdrop accent={accent}>
      <div className="w-full max-w-[280px] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4" style={{ color: accent }} />
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22C55E' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">Live</span>
        </div>
        <motion.div
          className="overflow-hidden"
          animate={{ width: ['0%', '100%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.85, 1], ease: 'easeInOut' }}
        >
          <span className="block whitespace-nowrap text-[#D7E2EA] font-bold text-sm sm:text-base leading-snug">
            {headline}
          </span>
        </motion.div>
        <div className="flex flex-col gap-2.5 mt-1">
          {excerptLines.map((line, i) => (
            <motion.div
              key={i}
              className="overflow-hidden"
              animate={{ width: ['0%', '100%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.7 + i * 0.5, times: [0, 0.2, 0.85, 1], ease: 'easeInOut' }}
            >
              <span className="block whitespace-nowrap text-[#D7E2EA]/50 text-[11px] font-light">{line}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Backdrop>
  );
};

/* ───────── 05 — Alex: asistent conversațional ───────── */

const AlexVisual: React.FC = () => (
  <ChatMock
    accent="#6C63FF"
    bubbles={[
      { side: 'left', text: 'Ce servicii oferiți?' },
      { side: 'right', text: 'Site-uri, agenți AI și automatizări.' },
      { side: 'left', text: 'Cât costă un site?' },
    ]}
  />
);

/* ───────── 06 — Sport: predicții live ───────── */

const SportVisual: React.FC = () => {
  const accent = '#22C55E';
  const rows = [
    { teams: 'FCSB — CFR Cluj', odds: '1.85' },
    { teams: 'Real — Barca', odds: '2.40' },
    { teams: 'PSG — Lyon', odds: '1.60' },
  ];
  return (
    <Backdrop accent={accent}>
      <div className="w-full max-w-[280px] flex flex-col gap-2.5">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-4 h-4" style={{ color: accent }} />
          <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">Bilet zilnic</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          >
            <span className="text-[11px] text-[#D7E2EA]/80 font-medium">{r.teams}</span>
            <span className="text-[11px] font-bold" style={{ color: accent }}>{r.odds}</span>
          </motion.div>
        ))}
      </div>
    </Backdrop>
  );
};

/* ───────── 07 — Service auto ───────── */

const LogistikVisual: React.FC = () => {
  const accent = '#EF4444';
  return (
    <Backdrop accent={accent}>
      <div className="flex flex-col items-center gap-5">
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}40` }}
          animate={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Wrench className="w-8 h-8" style={{ color: accent }} />
        </motion.div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accent }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Programare rapidă</span>
      </div>
    </Backdrop>
  );
};

export const projectVisuals: Record<string, React.FC> = {
  niro: NiroVisual,
  neo: NeoVisual,
  hr: HrVisual,
  stiri: StiriVisual,
  alex: AlexVisual,
  sport: SportVisual,
  logistik: LogistikVisual,
};
