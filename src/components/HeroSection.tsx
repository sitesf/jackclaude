import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

export const HeroSection: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} duration={0.7} y={-20} as="nav" className="w-full px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">
            About
          </a>
          <a href="#services" className="hover:opacity-70 transition-opacity duration-200">
            Price
          </a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">
            Projects
          </a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">
            Contact
          </a>
        </div>
      </FadeIn>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col justify-between relative">
        {/* Hero Heading */}
        <FadeIn delay={0.15} duration={0.7} y={40} as="div" className="overflow-hidden">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>

        {/* Bottom bar */}
        <FadeIn delay={0.35} duration={0.7} y={20} as="div" className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          {/* Left text */}
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>

          {/* Right button */}
          <FadeIn delay={0.5} duration={0.7} y={20} as="div">
            <ContactButton />
          </FadeIn>
        </FadeIn>

        {/* Hero Portrait */}
        <FadeIn delay={0.6} duration={0.7} y={30} as="div" className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
          <Magnet padding={150} strength={3}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack Portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] rounded-[40px] object-cover"
              loading="lazy"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
