import React from 'react';

// Placeholder visual components for each project
const NiroVisual: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#0C0C0C] to-[#1a1a1a] flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl font-bold text-[#8F5CFF] mb-2">NIRO Agent</div>
      <p className="text-[#D7E2EA]/50">Recepționer AI pe WhatsApp</p>
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
