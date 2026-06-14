import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/*
 * Vizualuri ANIMATE pentru fiecare proiect — micro-demo-uri vii care reproduc
 * interfața reală a produsului. Se animează când cardul intră în viewport:
 * chat care se scrie singur, scoruri care urcă, bare care se umplu, articole
 * care alunecă. 100% CSS/SVG, fără imagini sau assets externe.
 */

/* ── Frame cu ref pentru detecția în viewport ── */
const Frame = forwardRef<HTMLDivElement, { children: React.ReactNode; style?: React.CSSProperties }>(
  ({ children, style }, ref) => (
    <div
      ref={ref}
      className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 select-none pointer-events-none relative"
      style={style}
    >
      {children}
    </div>
  ),
);
Frame.displayName = 'Frame';

/* ── Hook: secvență care se reia în buclă cât timp e în viewport ── */
function useLoopSequence(steps: number, active: boolean, stepMs = 850, pauseMs = 2600) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    const timers: number[] = [];
    const run = () => {
      for (let i = 1; i <= steps; i++) {
        timers.push(window.setTimeout(() => setShown(i), i * stepMs));
      }
      timers.push(
        window.setTimeout(() => {
          setShown(0);
          run();
        }, steps * stepMs + pauseMs),
      );
    };
    run();
    return () => timers.forEach((t) => clearTimeout(t));
  }, [active, steps, stepMs, pauseMs]);
  return shown;
}

/* ── Număr care urcă spre valoare când e activ ── */
const CountNumber: React.FC<{ to: number; suffix?: string; active: boolean; duration?: number }> = ({
  to,
  suffix = '',
  active,
  duration = 1.3,
}) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
};

/* ── Indicator „scrie..." (3 puncte) ── */
const TypingDots: React.FC = () => (
  <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-[#1d2733] px-2.5 py-2 flex gap-1 items-center">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1 h-1 rounded-full bg-white/70"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

/* ════════════════ NIRO: chat WhatsApp care se scrie singur ════════════════ */
const niroMessages = [
  { from: 'bot', text: 'Bună, sunt NIRO, consultantul virtual al service-ului. Cu ce te pot ajuta?' },
  { from: 'user', text: 'Vreau o programare pentru schimb plăcuțe.' },
  { from: 'bot', text: 'Vă pot programa mâine la 11:00 sau 14:30. Ce alegeți?' },
  { from: 'user', text: '11:00.' },
  { from: 'bot', text: 'Programarea a fost salvată. Vă așteptăm mâine! ✅' },
];

export const NiroVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const shown = useLoopSequence(niroMessages.length, inView, 900, 2200);
  const nextIsBot = shown < niroMessages.length && niroMessages[shown].from === 'bot';

  return (
    <Frame
      ref={ref}
      style={{
        background:
          'radial-gradient(circle at 20% 10%, rgba(143,92,255,.25), transparent 45%), radial-gradient(circle at 85% 90%, rgba(92,107,255,.2), transparent 40%), #06070c',
      }}
    >
      <div className="w-full h-full flex items-center justify-center p-5">
        <div className="w-[72%] max-w-[270px] rounded-[22px] bg-[#0d1117] border border-white/10 p-2 shadow-2xl">
          <div className="rounded-[16px] overflow-hidden bg-[#0a0f14] border border-white/5">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#161f28] border-b border-white/5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[7px] font-black text-white"
                style={{ background: 'linear-gradient(135deg,#8F5CFF,#5C6BFF)' }}
              >
                NIRO
              </div>
              <div>
                <div className="text-white text-[9px] font-bold leading-tight">NIRO Agent</div>
                <div className="flex items-center gap-1">
                  <motion.span
                    className="w-1 h-1 rounded-full bg-[#8ee5be]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span className="text-[#8ee5be] text-[7px]">online acum</span>
                </div>
              </div>
            </div>
            {/* Chat — mesajele se adună de jos */}
            <div
              className="flex flex-col gap-1.5 p-2.5 pb-3 min-h-[150px] justify-end"
              style={{ background: 'linear-gradient(180deg, rgba(11,18,26,.96), rgba(7,12,18,.98))' }}
            >
              <AnimatePresence mode="popLayout">
                {niroMessages.slice(0, shown).map((m, i) => (
                  <motion.div
                    key={`${shown >= niroMessages.length ? 'a' : 'b'}-${i}`}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={
                      m.from === 'bot'
                        ? 'max-w-[85%] rounded-xl rounded-tl-sm bg-[#1d2733] px-2 py-1.5 text-[8px] leading-snug text-[#f0f3ff]'
                        : 'max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-2 py-1.5 text-[8px] leading-snug text-white'
                    }
                  >
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {nextIsBot && <TypingDots />}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ════════════════ NEO: audit SEO cu scor care urcă + scanare ════════════════ */
const neoMetrics: [number, string][] = [
  [92, 'Perf.'],
  [87, 'SEO'],
  [78, 'Acces.'],
  [95, 'Bune pr.'],
];

export const NeoVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  return (
    <Frame
      ref={ref}
      style={{
        background:
          'radial-gradient(circle at 80% 0%, rgba(59,130,246,.2), transparent 45%), radial-gradient(circle at 0% 100%, rgba(29,78,216,.18), transparent 40%), #07090e',
      }}
    >
      {/* Linie de scanare */}
      {inView && (
        <motion.div
          className="absolute left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)', boxShadow: '0 0 12px #3B82F6' }}
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="w-full h-full flex flex-col justify-center gap-2.5 p-6 sm:p-8">
        <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ boxShadow: '0 0 8px #3B82F6' }}
          />
          Nexas · Agent NEO
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#0d1117] border border-white/10 px-4 py-3">
          <div>
            <div className="text-[9px] text-[#6b7280] font-mono">Site analizat</div>
            <div className="text-white text-[11px] font-bold">site-ul-tau.ro</div>
          </div>
          <div className="text-center">
            <div className="text-[#22c55e] text-2xl font-black leading-none">
              <CountNumber to={87} active={inView} />
            </div>
            <div className="text-[7px] text-[#6b7280] font-mono uppercase tracking-widest mt-0.5">Scor SEO</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {neoMetrics.map(([v, l], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="rounded-xl bg-[#0d1117] border border-white/10 px-1 py-2 text-center"
            >
              <div className="text-[#3B82F6] text-sm font-black">
                <CountNumber to={v} active={inView} duration={1} />
              </div>
              <div className="text-[6.5px] text-[#6b7280] uppercase tracking-wider mt-0.5">{l}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="rounded-xl border px-3 py-2 text-[8px]"
          style={{ background: 'rgba(239,68,68,.08)', borderColor: 'rgba(239,68,68,.2)', color: '#fca5a5' }}
        >
          <span className="font-black text-[6.5px] uppercase tracking-widest mr-1.5">Critică</span>
          Imagini fără compresie încetinesc LCP
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="rounded-xl border px-3 py-2 text-[8px]"
          style={{ background: 'rgba(16,185,129,.07)', borderColor: 'rgba(16,185,129,.18)', color: '#a7f3d0' }}
        >
          Convertește imaginile în WebP{' '}
          <span className="ml-1 font-mono text-[6.5px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(16,185,129,.15)', color: '#22c55e' }}>
            UȘOARĂ
          </span>
        </motion.div>
      </div>
    </Frame>
  );
};

/* ════════════════ HR: dashboard cu KPI care urcă + bare care se umplu ════════════════ */
const hrKpis: [number, string, string][] = [
  [128, 'Candidați', ''],
  [14, 'Interviuri', ''],
  [6, 'Posturi', ''],
  [92, 'Potrivire', '%'],
];
const hrCandidates: [string, number, string][] = [
  ['Maria P.', 95, '#22c7b8'],
  ['Andrei V.', 82, '#5da9ff'],
  ['Ioana D.', 64, '#f59e0b'],
];

export const HrVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  return (
    <Frame
      ref={ref}
      style={{
        background:
          'radial-gradient(circle at 10% 8%, rgba(93,169,255,.16), transparent 35%), linear-gradient(135deg,#121827,#171f33 50%,#1d263d)',
      }}
    >
      <div className="w-full h-full flex p-4 sm:p-5 gap-3">
        <div className="hidden sm:flex w-[26%] flex-col gap-1.5 rounded-2xl bg-[#101825] border border-white/10 p-3">
          <div className="text-white font-black text-[11px] mb-2">
            NEXAS <span className="text-[#7cc4ff]">HR</span>
          </div>
          {['Dashboard', 'Candidați', 'Statistici', 'Posturi', 'Calendar'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className={`rounded-lg px-2 py-1.5 text-[8px] font-bold ${i === 0 ? 'text-white' : 'text-white/40'}`}
              style={i === 0 ? { background: 'rgba(93,169,255,.14)' } : undefined}
            >
              {item}
            </motion.div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          <div className="text-white font-black text-[11px]">Bun venit înapoi 👋</div>
          <div className="grid grid-cols-2 gap-2">
            {hrKpis.map(([v, l, suffix], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-[#1a2238] border border-white/10 px-3 py-2.5"
              >
                <div className="text-[6.5px] font-black text-white/40 uppercase tracking-widest">{l}</div>
                <div className="text-white text-base font-black leading-tight">
                  <CountNumber to={v} suffix={suffix} active={inView} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex-1 rounded-xl bg-[#1a2238] border border-white/10 p-3 flex flex-col gap-2 justify-center">
            {hrCandidates.map(([name, score, color], i) => (
              <div key={name} className="flex items-center gap-2">
                <span className="text-[8px] font-bold text-white/80 w-12 shrink-0">{name}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${score}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[8px] font-black text-white">
                  <CountNumber to={score} active={inView} duration={1} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ════════════════ Știri: articole care alunecă în secvență ════════════════ */
const stiriArticles: [string, string][] = [
  ['ECONOMIE', 'Piețele europene în creștere după decizia BCE'],
  ['TEHNOLOGIE', 'Noua generație de modele AI schimbă industria'],
  ['ROMÂNIA', 'Investiții record în infrastructura digitală'],
  ['SPORT', 'Calificare istorică pentru naționala de fotbal'],
];

export const StiriVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const shown = useLoopSequence(stiriArticles.length, inView, 700, 3000);

  return (
    <Frame
      ref={ref}
      style={{
        background:
          'radial-gradient(circle at 90% 5%, rgba(182,0,168,.2), transparent 40%), radial-gradient(circle at 5% 95%, rgba(118,33,176,.22), transparent 45%), #08080d',
      }}
    >
      <div className="w-full h-full flex flex-col gap-2.5 p-5 sm:p-7 justify-center">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#00d98b]"
            style={{ boxShadow: '0 0 8px #00d98b' }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/50">Actualizat zilnic automat</span>
        </div>
        <div className="text-white font-black text-sm sm:text-base leading-tight">
          Perspectivă globală.
          <br />
          Selecție inteligentă.
        </div>
        <div className="flex gap-1.5">
          {['Toate', 'Economie', 'Tech', 'Sport'].map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-2 py-0.5 text-[7px] font-bold border ${i === 0 ? 'text-white border-[#B600A8]' : 'text-white/40 border-white/15'}`}
              style={i === 0 ? { background: 'rgba(182,0,168,.25)' } : undefined}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {stiriArticles.map(([cat, title], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={i < shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5"
            >
              <div className="text-[6px] font-black tracking-[0.18em] text-[#e879f9] mb-1">{cat}</div>
              <div className="text-[8px] font-bold text-white/85 leading-snug">{title}</div>
              <motion.div
                className="mt-1.5 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg,#B600A8,#7621B0)' }}
                initial={{ width: 0 }}
                animate={i < shown ? { width: 28 } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

/* ════════════════ Alex: orb AI care respiră + chat ════════════════ */
const alexMessages = [
  { from: 'user', text: 'Rezumat al emailurilor de azi?' },
  { from: 'bot', text: 'Am găsit 12 emailuri. 3 necesită atenția ta ✓' },
];

export const AlexVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const shown = useLoopSequence(alexMessages.length, inView, 1100, 2600);
  const nextIsBot = shown < alexMessages.length && alexMessages[shown].from === 'bot';

  return (
    <Frame ref={ref} style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 30%, #1a0a3e 0%, #0A0A0F 70%)' }}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-5">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            className="absolute w-16 h-16 rounded-full border border-[#6C63FF]/30"
            style={{ transform: 'rotateX(70deg)' }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-10 h-10 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 35%, #00D4FF, #6C63FF, #2a0a4e)' }}
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 24px rgba(108,99,255,.6), 0 0 48px rgba(0,212,255,.25)',
                '0 0 40px rgba(108,99,255,.9), 0 0 70px rgba(0,212,255,.45)',
                '0 0 24px rgba(108,99,255,.6), 0 0 48px rgba(0,212,255,.25)',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="text-center">
          <div
            className="font-black text-base sm:text-lg leading-tight"
            style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            El este Alex.
          </div>
          <div className="text-white/50 text-[8px] mt-0.5">Agentul tău AI, mereu disponibil</div>
        </div>
        <div className="w-[82%] max-w-[250px] rounded-xl bg-[#0F0F1A]/95 border border-white/10 p-2.5 flex flex-col gap-1.5 min-h-[64px] justify-end">
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[7px] text-white/60 font-bold">Alex · Online · Disponibil</span>
          </div>
          <AnimatePresence mode="popLayout">
            {alexMessages.slice(0, shown).map((m, i) => (
              <motion.div
                key={`${shown >= alexMessages.length ? 'a' : 'b'}-${i}`}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={
                  m.from === 'user'
                    ? 'self-end max-w-[88%] rounded-lg px-2 py-1 text-[7.5px] text-white'
                    : 'max-w-[88%] rounded-lg px-2 py-1 text-[7.5px] text-white/85 border'
                }
                style={
                  m.from === 'user'
                    ? { background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }
                    : { background: 'rgba(108,99,255,.1)', borderColor: 'rgba(108,99,255,.18)' }
                }
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
          {nextIsBot && (
            <div className="max-w-[88%] rounded-lg px-2 py-1.5 flex gap-1 items-center border" style={{ background: 'rgba(108,99,255,.1)', borderColor: 'rgba(108,99,255,.18)' }}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#00D4FF]"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
};

export const projectVisuals: Record<string, React.FC> = {
  niro: NiroVisual,
  neo: NeoVisual,
  hr: HrVisual,
  stiri: StiriVisual,
  alex: AlexVisual,
};
