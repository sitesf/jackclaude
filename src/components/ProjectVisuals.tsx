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
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src="/sport-news-preview.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
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
