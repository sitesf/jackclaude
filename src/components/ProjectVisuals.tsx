import React from 'react';

const NiroVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/niro-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

const NeoVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/neo-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

const HRVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/hr-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

const StiriVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/nexas-news-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

const AlexVisual: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/alex-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
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
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/service-auto-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
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
