import React from 'react';
import { Sparkles } from 'lucide-react';
import BoomerangVideoBg from './BoomerangVideoBg';
import { SiteNav } from './SiteNav';
import heroVideo from '../assets/hero-bg.mp4';

const gradientButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: `
    0px 4px 4px rgba(181, 1, 167, 0.25),
    inset 4px 4px 12px #7721B1,
    inset -2px -2px 4px rgba(181, 1, 167, 0.2)
  `,
  outline: '2px solid white',
  outlineOffset: '-3px',
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#0C0C0C]">
      <BoomerangVideoBg src={heroVideo} className="absolute inset-0 w-full h-full" />
      {/* Lizibilitate peste video */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-[#0C0C0C]/35 to-[#0C0C0C]/85 pointer-events-none" />

      <SiteNav overlay />

      {/* Titlu hero */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)]">
          Descoperă
          <br />
          <span className="text-[#B600A8]">NEXAS</span>.ro
        </h1>
        <p className="mt-6 sm:mt-8 text-[#D7E2EA] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] max-w-md px-2">
          Agenți AI, automatizări și site-uri care lucrează pentru afacerea ta — nonstop.
        </p>
      </div>

      {/* Bloc CTA jos-stânga / jos pe mobile */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-16 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-[#D7E2EA] mb-3">
          <Sparkles className="w-4 h-4 text-[#B600A8]" />
          <span className="text-sm font-semibold uppercase tracking-wider">NEXAS AI</span>
        </div>
        <p className="text-[#D7E2EA] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] mb-6 max-w-xs">
          NEXAS construiește agenți AI, automatizări și produse digitale care nu seamănă cu
          nimic altceva — configurate exact pe afacerea ta.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="#/contact"
            className="text-white text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-transform hover:scale-105"
            style={gradientButtonStyle}
          >
            Contactează-ne
          </a>
          <a
            href="#/#projects"
            className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            Vezi proiectele
          </a>
        </div>
      </div>
    </section>
  );
};
