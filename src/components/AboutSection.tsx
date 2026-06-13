import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { OrbDecor, CubeDecor, TorusDecor, CursorDecor } from './AboutDecor';

export const AboutSection: React.FC = () => {
  const decor = [
    { Component: OrbDecor, sizes: 'w-[120px] sm:w-[160px] md:w-[210px]', position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', delay: 0.1, x: -80 },
    { Component: TorusDecor, sizes: 'w-[100px] sm:w-[140px] md:w-[180px]', position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', delay: 0.25, x: -80 },
    { Component: CubeDecor, sizes: 'w-[120px] sm:w-[160px] md:w-[210px]', position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', delay: 0.15, x: 80 },
    { Component: CursorDecor, sizes: 'w-[130px] sm:w-[170px] md:w-[220px]', position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', delay: 0.3, x: 80 },
  ];

  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]">
      {/* Forme decorative locale (originale) */}
      {decor.map(({ Component, sizes, position, delay, x }, idx) => (
        <FadeIn
          key={idx}
          delay={delay}
          duration={0.9}
          x={x}
          y={0}
          as="div"
          className={`absolute ${sizes} ${position} z-0`}
        >
          <Component />
        </FadeIn>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-2xl">
        {/* Heading */}
        <FadeIn delay={0} duration={0.7} y={40} as="h2" className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] text-center">
          Despre NEXAS
        </FadeIn>

        {/* Animated paragraph */}
        <FadeIn delay={0.2} duration={0.7} y={20} as="div">
          <AnimatedText
            text="NEXAS construiește produse digitale care lucrează pentru tine: agenți AI, automatizări, aplicații și site-uri care nu seamănă cu nimic altceva. Lucrăm cu afaceri care vor să iasă din tipar și să arate cea mai bună versiune a lor. Hai să construim ceva incredibil împreună!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />
        </FadeIn>

        {/* Contact button */}
        <FadeIn delay={0.4} duration={0.7} y={20} as="div">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
