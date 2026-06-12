import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { HeroRobot } from './HeroRobot';

export const HeroSection: React.FC = () => {
  const heroVisual = (
    <Magnet padding={150} strength={3}>
      <HeroRobot />
    </Magnet>
  );

  return (
    <section className="h-auto sm:h-screen w-full flex flex-col overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} duration={0.7} y={-20} as="nav" className="w-full px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">
            Despre
          </a>
          <a href="#/preturi" className="hover:opacity-70 transition-opacity duration-200">
            Prețuri
          </a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">
            Proiecte
          </a>
          <a href="#/contact" className="hover:opacity-70 transition-opacity duration-200">
            Contact
          </a>
        </div>
      </FadeIn>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col justify-start gap-8 py-8 sm:py-0 sm:justify-between sm:gap-0 relative">
        {/* Hero Heading */}
        <FadeIn delay={0.15} duration={0.7} y={40} as="div" className="overflow-hidden">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.92] w-full text-center text-[13vw] sm:text-[10.5vw] md:text-[11vw] mt-6 sm:mt-4">
            Descoperă
            <br />
            NEXAS.ro
          </h1>
        </FadeIn>

        {/* Mobile visual - sits right under the heading, in normal flow */}
        <FadeIn delay={0.6} duration={0.7} y={30} as="div" className="flex justify-center sm:hidden">
          {heroVisual}
        </FadeIn>

        {/* Bottom bar */}
        <FadeIn delay={0.35} duration={0.7} y={20} as="div" className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-1">
          {/* Left text */}
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            NEXAS — agenți AI, automatizări și site-uri care nu seamănă cu nimic altceva
          </p>

          {/* Right button */}
          <FadeIn delay={0.5} duration={0.7} y={20} as="div">
            <ContactButton />
          </FadeIn>
        </FadeIn>

        {/* Desktop/Tablet visual - magnetic digital core anchored to bottom */}
        <FadeIn delay={0.6} duration={0.7} y={30} as="div" className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-10 bottom-0">
          {heroVisual}
        </FadeIn>
      </div>
    </section>
  );
};
