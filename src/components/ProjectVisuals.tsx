import React from 'react';

const NiroVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none"
    style={{ background: 'radial-gradient(ellipse at 60% 40%, #0a2a6e 0%, #061535 45%, #020b1e 100%)' }}>

    {/* Glow orbs */}
    <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(30,100,255,0.18)', filter: 'blur(50px)', top: '10%', left: '30%', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(0,150,255,0.12)', filter: 'blur(40px)', bottom: '10%', right: '25%', pointerEvents: 'none' }} />

    {/* Network icons right */}
    <div style={{ position: 'absolute', right: '46%', top: '10%', bottom: '30%', width: '12%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', pointerEvents: 'none' }}>
      {['📅', '🕐', '💬'].map((icon, i) => (
        <div key={i} style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '1.5px solid rgba(80,160,255,0.7)',
          boxShadow: '0 0 10px rgba(80,160,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, background: 'rgba(10,40,120,0.5)',
        }}>{icon}</div>
      ))}
    </div>

    {/* Left content */}
    <div style={{ position: 'absolute', left: '4%', top: '6%', bottom: '24%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', maxWidth: '48%' }}>
      <div style={{ fontSize: 'clamp(30px, 7vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 0 30px rgba(80,160,255,0.4)' }}>01</div>
      <div style={{ fontSize: 'clamp(10px, 2.4vw, 18px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginTop: 6 }}>
        AGENT<br />WHATSAPP:
      </div>
      <div style={{ fontSize: 'clamp(7px, 1.5vw, 11px)', color: 'rgba(180,210,255,0.85)', marginTop: 8, lineHeight: 1.6 }}>
        Soluția AI Integrată pe WhatsApp<br />pentru Servicii &amp; Programări.
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        {[{ icon: '🚗', label: 'AUTO' }, { icon: '💈', label: 'BARBER' }, { icon: '🦷', label: 'STOMA' }, { icon: '💄', label: 'SALON' }].map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid rgba(80,160,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, background: 'rgba(10,40,120,0.4)' }}>{icon}</div>
            <span style={{ fontSize: 6, color: 'rgba(150,200,255,0.85)', fontWeight: 700, letterSpacing: '0.04em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Phone mockup */}
    <div style={{ position: 'absolute', right: '2%', top: '3%', bottom: '2%', width: '42%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '88%', height: '95%', borderRadius: 24, background: 'linear-gradient(160deg,#1c1c1e,#111)', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#075e54', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff' }}>N</div>
          <div>
            <div style={{ color: '#fff', fontSize: 8.5, fontWeight: 700 }}>AGENT WHATSAPP</div>
            <div style={{ color: '#80cbc4', fontSize: 7 }}>online</div>
          </div>
        </div>
        <div style={{ flex: 1, background: '#e5ddd5', padding: '8px 7px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ alignSelf: 'center', background: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: '2px 8px', fontSize: 7, color: '#666' }}>Today</div>
          {[
            { l: true, t: 'Salut! Te pot ajuta cu o programare la salon. Alege o oră.' },
            { l: false, t: '10:30 ✓' },
            { l: true, t: 'Confirmare: Oct 26, 10:00 AM.' },
            { l: false, t: 'Mulțumesc! ✓✓' },
          ].map((m, i) => (
            <div key={i} style={{ alignSelf: m.l ? 'flex-start' : 'flex-end', background: m.l ? '#fff' : '#dcf8c6', borderRadius: 8, padding: '4px 7px', fontSize: 7.5, color: '#111', maxWidth: '78%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', lineHeight: 1.5 }}>{m.t}</div>
          ))}
        </div>
        <div style={{ background: '#f0f0f0', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '3px 9px', fontSize: 7, color: '#999' }}>Type a message</div>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🎤</div>
        </div>
      </div>
    </div>
  </div>
);

const NeoVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#3B82F6] mb-2">NEO Audit</div>
      <p className="text-[#D7E2EA]/50">Audit SEO instant</p>
    </div>
  </div>
);

const HRVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#5DA9FF] mb-2">HR Dashboard</div>
      <p className="text-[#D7E2EA]/50">Recrutare cu AI</p>
    </div>
  </div>
);

const StiriVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#B600A8] mb-2">Știri AI</div>
      <p className="text-[#D7E2EA]/50">Portal de știri automat</p>
    </div>
  </div>
);

const AlexVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#6C63FF] mb-2">Alex AI</div>
      <p className="text-[#D7E2EA]/50">Asistent AI</p>
    </div>
  </div>
);

const SportVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#22C55E] mb-2">Sport AI</div>
      <p className="text-[#D7E2EA]/50">Predicții sportive</p>
    </div>
  </div>
);

const LogistikVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#EF4444] mb-2">Logistik Auto</div>
      <p className="text-[#D7E2EA]/50">Site service auto</p>
    </div>
  </div>
);

export const projectVisuals: Record<string, React.FC> = {
  niro: NiroVisual,
  neo: NeoVisual,
  hr: HRVisual,
  stiri: StiriVisual,
  alex: AlexVisual,
  sport: SportVisual,
  logistik: LogistikVisual,
};
