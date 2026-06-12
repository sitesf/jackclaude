import React, { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import BoomerangVideoBg from './BoomerangVideoBg';
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

const navLinks = [
  { href: '#about', label: 'Despre' },
  { href: '#/preturi', label: 'Prețuri' },
  { href: '#projects', label: 'Proiecte' },
  { href: '#/contact', label: 'Contact' },
];

export const HeroSection: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#0C0C0C]">
      <BoomerangVideoBg src={heroVideo} className="absolute inset-0 w-full h-full" />
      {/* Lizibilitate peste video */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-[#0C0C0C]/35 to-[#0C0C0C]/85 pointer-events-none" />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <a href="#/" className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#D7E2EA]">
          NE<span className="text-[#B600A8]">X</span>AS
        </a>

        <div className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/15">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm px-3 py-2 font-medium uppercase tracking-wider text-[#D7E2EA]/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#/contact"
            className="ml-2 text-white text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-full transition-transform hover:scale-105"
            style={gradientButtonStyle}
          >
            Începe un proiect
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D7E2EA] transition-all duration-300 hover:bg-white/20"
          aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={menuOpen}
        >
          <Menu
            className={`w-5 h-5 absolute transition-all duration-300 ${
              menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`w-5 h-5 absolute transition-all duration-300 ${
              menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            }`}
          />
        </button>
      </nav>

      {/* Overlay meniu mobil */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#0C0C0C]/60 backdrop-blur-sm" />
      </div>

      {/* Drawer meniu mobil */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-[#141414]/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-bold uppercase tracking-wide text-[#D7E2EA] py-4 border-b border-white/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <a
              href="#/contact"
              onClick={() => setMenuOpen(false)}
              className="text-center text-white text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full"
              style={gradientButtonStyle}
            >
              Începe un proiect
            </a>
          </div>
        </div>
      </div>

      {/* Titlu hero */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">
        <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.95] text-[#D7E2EA] text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] max-w-5xl">
          Descoperă
          <br />
          <span className="text-[#B600A8]">NEXAS</span>.ro
        </h1>
        <p className="mt-6 sm:mt-8 text-[#D7E2EA]/85 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
          Agenți AI, automatizări și site-uri care lucrează pentru afacerea ta — nonstop.
        </p>
      </div>

      {/* Bloc CTA jos-stânga */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-[#D7E2EA] mb-3">
          <Sparkles className="w-4 h-4 text-[#B600A8]" />
          <span className="text-sm font-semibold uppercase tracking-wider">NEXAS AI</span>
        </div>
        <p className="text-[#D7E2EA]/75 text-xs leading-relaxed mb-6 max-w-xs font-light">
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
            href="#projects"
            className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            Vezi proiectele
          </a>
        </div>
      </div>
    </section>
  );
};
