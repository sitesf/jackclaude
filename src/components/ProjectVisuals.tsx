import React from 'react';

/*
 * Vizualuri generate pentru fiecare proiect — mockup-uri CSS/SVG care
 * reproduc interfața reală a proiectului, fără imagini externe.
 */

const Frame: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 select-none pointer-events-none"
    style={style}
  >
    {children}
  </div>
);

/* ── NIRO: telefon cu chat WhatsApp ── */
export const NiroVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(circle at 20% 10%, rgba(143,92,255,.25), transparent 45%), radial-gradient(circle at 85% 90%, rgba(92,107,255,.2), transparent 40%), #06070c',
    }}
  >
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-[68%] max-w-[260px] rounded-[22px] bg-[#0d1117] border border-white/10 p-2 shadow-2xl">
        <div className="rounded-[16px] overflow-hidden bg-[#0a0f14] border border-white/5">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#161f28] border-b border-white/5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[7px] font-black text-white" style={{ background: 'linear-gradient(135deg,#8F5CFF,#5C6BFF)' }}>
              NIRO
            </div>
            <div>
              <div className="text-white text-[9px] font-bold leading-tight">NIRO Agent</div>
              <div className="text-[#8ee5be] text-[7px]">online acum</div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 p-2.5 pb-4" style={{ background: 'linear-gradient(180deg, rgba(11,18,26,.96), rgba(7,12,18,.98))' }}>
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-[#1d2733] px-2 py-1.5 text-[8px] leading-snug text-[#f0f3ff]">
              Bună, sunt NIRO, consultantul virtual al service-ului. Cu ce te pot ajuta?
            </div>
            <div className="max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-2 py-1.5 text-[8px] leading-snug text-white">
              Vreau o programare pentru schimb plăcuțe.
            </div>
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-[#1d2733] px-2 py-1.5 text-[8px] leading-snug text-[#f0f3ff]">
              Vă pot programa mâine la 11:00 sau 14:30. Ce alegeți?
            </div>
            <div className="max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-2 py-1.5 text-[8px] leading-snug text-white">
              11:00.
            </div>
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-[#1d2733] px-2 py-1.5 text-[8px] leading-snug text-[#f0f3ff]">
              Programarea a fost salvată. Vă așteptăm mâine!
            </div>
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ── NEO: raport audit SEO cu scor ── */
export const NeoVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(circle at 80% 0%, rgba(59,130,246,.2), transparent 45%), radial-gradient(circle at 0% 100%, rgba(29,78,216,.18), transparent 40%), #07090e',
    }}
  >
    <div className="w-full h-full flex flex-col justify-center gap-2.5 p-6 sm:p-8">
      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">Nexas · Agent NEO</div>
      <div className="flex items-center justify-between rounded-2xl bg-[#0d1117] border border-white/10 px-4 py-3">
        <div>
          <div className="text-[9px] text-[#6b7280] font-mono">Site analizat</div>
          <div className="text-white text-[11px] font-bold">site-ul-tau.ro</div>
        </div>
        <div className="text-center">
          <div className="text-[#22c55e] text-2xl font-black leading-none">87</div>
          <div className="text-[7px] text-[#6b7280] font-mono uppercase tracking-widest mt-0.5">Scor SEO</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          ['92', 'Perf.'],
          ['87', 'SEO'],
          ['78', 'Acces.'],
          ['95', 'Bune pr.'],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-[#0d1117] border border-white/10 px-1 py-2 text-center">
            <div className="text-[#3B82F6] text-sm font-black">{v}</div>
            <div className="text-[6.5px] text-[#6b7280] uppercase tracking-wider mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border px-3 py-2 text-[8px]" style={{ background: 'rgba(239,68,68,.08)', borderColor: 'rgba(239,68,68,.2)', color: '#fca5a5' }}>
        <span className="font-black text-[6.5px] uppercase tracking-widest mr-1.5">Critică</span>
        Imagini fără compresie încetinesc LCP
      </div>
      <div className="rounded-xl border px-3 py-2 text-[8px]" style={{ background: 'rgba(16,185,129,.07)', borderColor: 'rgba(16,185,129,.18)', color: '#a7f3d0' }}>
        Convertește imaginile în WebP <span className="ml-1 font-mono text-[6.5px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(16,185,129,.15)', color: '#22c55e' }}>UȘOARĂ</span>
      </div>
    </div>
  </Frame>
);

/* ── HR: dashboard real (demo live al platformei) ── */
export const HR_DEMO_URL = '/jackclaude/hr-demo.html';

export const HrVisual: React.FC = () => (
  <div className="w-full h-full overflow-hidden relative bg-[#0c0c0c]">
    {/* Iframe randat la o lățime mai mare apoi scalat → arată layout-ul desktop ca preview */}
    <iframe
      src={HR_DEMO_URL}
      title="NEXAS HR — Dashboard"
      loading="lazy"
      scrolling="no"
      className="pointer-events-none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '250%',
        height: '250%',
        transform: 'scale(0.4)',
        transformOrigin: 'top left',
        border: 0,
      }}
    />
  </div>
);


/* ── Știri: grilă de articole ── */
export const StiriVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(circle at 90% 5%, rgba(182,0,168,.2), transparent 40%), radial-gradient(circle at 5% 95%, rgba(118,33,176,.22), transparent 45%), #08080d',
    }}
  >
    <div className="w-full h-full flex flex-col gap-2.5 p-5 sm:p-7 justify-center">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00d98b]" style={{ boxShadow: '0 0 8px #00d98b' }} />
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
        {[
          ['ECONOMIE', 'Piețele europene în creștere după decizia BCE'],
          ['TEHNOLOGIE', 'Noua generație de modele AI schimbă industria'],
          ['ROMÂNIA', 'Investiții record în infrastructura digitală'],
          ['SPORT', 'Calificare istorică pentru naționala de fotbal'],
        ].map(([cat, title]) => (
          <div key={title} className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
            <div className="text-[6px] font-black tracking-[0.18em] text-[#e879f9] mb-1">{cat}</div>
            <div className="text-[8px] font-bold text-white/85 leading-snug">{title}</div>
            <div className="mt-1.5 h-0.5 w-7 rounded-full" style={{ background: 'linear-gradient(90deg,#B600A8,#7621B0)' }} />
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ── Alex: orb AI cu chat ── */
export const AlexVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(ellipse 70% 55% at 50% 30%, #1a0a3e 0%, #0A0A0F 70%)',
    }}
  >
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-5">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute w-16 h-16 rounded-full border border-[#6C63FF]/30" style={{ transform: 'rotateX(70deg)' }} />
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #00D4FF, #6C63FF, #2a0a4e)',
            boxShadow: '0 0 30px rgba(108,99,255,.7), 0 0 60px rgba(0,212,255,.3)',
          }}
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
      <div className="w-[82%] max-w-[250px] rounded-xl bg-[#0F0F1A]/95 border border-white/10 p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
          <span className="text-[7px] text-white/60 font-bold">Alex · Online · Disponibil</span>
        </div>
        <div className="self-end max-w-[88%] rounded-lg px-2 py-1 text-[7.5px] text-white" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
          Rezumat al emailurilor de azi?
        </div>
        <div className="max-w-[88%] rounded-lg px-2 py-1 text-[7.5px] text-white/85 border" style={{ background: 'rgba(108,99,255,.1)', borderColor: 'rgba(108,99,255,.18)' }}>
          Am găsit 12 emailuri. 3 necesită atenția ta ✓
        </div>
      </div>
    </div>
  </Frame>
);

/* ── Sport AI: predicții + știri sportive (verde) ── */
export const SportVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(circle at 80% 0%, rgba(34,197,94,.18), transparent 45%), linear-gradient(135deg,#04130b,#06200f 60%,#04130b)',
    }}
  >
    <div className="w-full h-full flex flex-col justify-center gap-2.5 p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md" style={{ background: 'linear-gradient(135deg,#22C55E,#15803d)' }} />
          <span className="text-white text-[9px] font-black tracking-wide">
            NEXAS <span className="text-[#4ade80]">AI</span>
          </span>
        </div>
        <span className="rounded-full px-2 py-1 text-[7px] font-black text-[#04130b]" style={{ background: '#22C55E' }}>
          Generează bilet
        </span>
      </div>
      <div className="text-[7px] font-mono uppercase tracking-[0.2em] text-[#4ade80]/70">Automatizare sportivă</div>
      <div className="text-white font-black leading-tight text-[clamp(0.9rem,2.4vw,1.35rem)]">
        Sursa ta de sport,
        <br />
        validată <span className="text-[#4ade80]">100% de AI</span>.
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-1">
        {[
          ['Fotbal', 'Japonia revine în Cupa Mondială'],
          ['Fotbal', 'Scoția, victorie istorică'],
          ['Fotbal', 'FIFA explică decizia VAR'],
        ].map(([c, t]) => (
          <div key={t} className="rounded-lg bg-white/[0.05] border border-white/10 p-2">
            <div className="text-[6px] font-black text-[#4ade80] mb-1 uppercase tracking-wider">{c}</div>
            <div className="text-[7px] font-semibold text-white/85 leading-snug">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ── Logistik Auto: service auto (roșu) ── */
export const LogistikVisual: React.FC = () => (
  <Frame
    style={{
      background:
        'radial-gradient(circle at 80% 10%, rgba(239,68,68,.2), transparent 45%), linear-gradient(135deg,#141414,#1b1b1b 60%,#0e0e0e)',
    }}
  >
    <div className="w-full h-full flex flex-col justify-center gap-2 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="text-white text-[9px] font-black tracking-wide">
          LOGISTIK <span className="text-[#ef4444]">AUTO</span>
        </div>
        <span className="rounded-full px-2 py-1 text-[7px] font-black text-white" style={{ background: '#ef4444' }}>
          Sună acum
        </span>
      </div>
      <div className="text-[7px] font-mono uppercase tracking-[0.2em] text-[#ef4444]/80">Service auto · București</div>
      <div className="text-white font-black uppercase leading-tight text-[clamp(0.9rem,2.4vw,1.25rem)]">
        Mașina ta,
        <br />
        în <span className="text-[#ef4444]">mâini sigure</span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {['Sună', 'WhatsApp', 'Waze'].map((b, i) => (
          <span
            key={b}
            className="rounded-full px-2 py-0.5 text-[7px] font-bold text-white"
            style={{ background: i === 0 ? '#ef4444' : i === 1 ? '#22c55e' : '#3b82f6' }}
          >
            {b}
          </span>
        ))}
      </div>
      <div
        className="rounded-lg overflow-hidden border border-white/10 mt-0.5 h-[34%] relative flex items-center justify-center"
        style={{ background: 'radial-gradient(circle at 70% 50%, rgba(239,68,68,.28), #0a0a0a)' }}
      >
        <span
          className="text-[#ff6b6b] font-black uppercase text-[8px] tracking-wider text-center px-2"
          style={{ textShadow: '0 0 8px rgba(239,68,68,.8)' }}
        >
          Performanță în fiecare detaliu
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {['Revizie & întreținere', 'Mecanică auto', 'Diagnoză', 'Tractări'].map((s) => (
          <div key={s} className="rounded-md bg-white/[0.05] border border-white/10 px-2 py-1 text-[7px] font-semibold text-white/85">
            {s}
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

export const projectVisuals: Record<string, React.FC> = {
  niro: NiroVisual,
  neo: NeoVisual,
  hr: HrVisual,
  stiri: StiriVisual,
  alex: AlexVisual,
  sport: SportVisual,
  logistik: LogistikVisual,
};
