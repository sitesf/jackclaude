import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  const decorativeImages = [
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
      alt: 'moon',
      sizes: 'w-[120px] sm:w-[160px] md:w-[210px]',
      position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
      delay: 0.1,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
      alt: '3d-object',
      sizes: 'w-[100px] sm:w-[140px] md:w-[180px]',
      position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
      delay: 0.25,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
      alt: 'lego',
      sizes: 'w-[120px] sm:w-[160px] md:w-[210px]',
      position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
      delay: 0.15,
      x: 80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
      alt: '3d-group',
      sizes: 'w-[130px] sm:w-[170px] md:w-[220px]',
      position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
      delay: 0.3,
      x: 80,
    },
  ];

  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]">
      {/* Decorative images */}
      {decorativeImages.map((img, idx) => (
        <FadeIn
          key={idx}
          delay={img.delay}
          duration={0.9}
          x={img.x}
          y={0}
          as="div"
          className={`absolute ${img.sizes} ${img.position} z-0`}
        >
          <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
        </FadeIn>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-2xl">
        {/* Heading */}
        <FadeIn delay={0} duration={0.7} y={40} as="h2" className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] text-center">
          Despre mine
        </FadeIn>

        {/* Animated paragraph */}
        <FadeIn delay={0.2} duration={0.7} y={20} as="div">
          <AnimatedText
            text="Construiesc produse digitale care lucrează pentru tine: agenți AI, automatizări, aplicații și site-uri care nu seamănă cu nimic altceva. Îmi place să lucrez cu afaceri care vor să iasă din tipar și să arate cea mai bună versiune a lor. Hai să construim ceva incredibil împreună!"
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
