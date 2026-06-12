import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import jackPortrait from '../assets/jack-portrait.png';
import jackPortraitWebp from '../assets/jack-portrait.webp';

export const HeroSection: React.FC = () => {
  const portraitImage = (
    <picture>
      <source srcSet={jackPortraitWebp} type="image/webp" />
      <img
        src={jackPortrait}
        alt="Portret Jack"
        className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-square object-contain"
        loading="lazy"
      />
    </picture>
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
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[11vw] sm:text-[11.5vw] md:text-[12vw] lg:text-[12.5vw] mt-6 sm:mt-4 md:-mt-2">
            Salut, sunt Jack
          </h1>
        </FadeIn>

        {/* Mobile Portrait - sits right under the heading, in normal flow */}
        <FadeIn delay={0.6} duration={0.7} y={30} as="div" className="flex justify-center sm:hidden">
          <Magnet padding={150} strength={3}>
            {portraitImage}
          </Magnet>
        </FadeIn>

        {/* Bottom bar */}
        <FadeIn delay={0.35} duration={0.7} y={20} as="div" className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          {/* Left text */}
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            creator digital & AI, dedicat proiectelor spectaculoase și memorabile
          </p>

          {/* Right button */}
          <FadeIn delay={0.5} duration={0.7} y={20} as="div">
            <ContactButton />
          </FadeIn>
        </FadeIn>

        {/* Desktop/Tablet Portrait - magnetic floating portrait anchored to bottom */}
        <FadeIn delay={0.6} duration={0.7} y={30} as="div" className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-10 bottom-0">
          <Magnet padding={150} strength={3}>
            {portraitImage}
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
