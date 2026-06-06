import React from 'react';
import { FadeIn } from './FadeIn';

const services = [
  {
    number: '01',
    name: '3D Modeling',
    description: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
        Services
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, idx) => (
          <FadeIn
            key={idx}
            delay={idx * 0.1}
            duration={0.7}
            y={20}
            as="div"
            className={`flex gap-8 md:gap-12 py-8 sm:py-10 md:py-12 ${idx !== services.length - 1 ? 'border-b border-[rgba(12,12,12,0.15)]' : ''}`}
          >
            {/* Number */}
            <div className="flex-shrink-0">
              <span className="text-[#0C0C0C] font-black text-[clamp(3rem,10vw,140px)] leading-none">
                {service.number}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-tight">
                {service.name}
              </h3>
              <p className="text-[#0C0C0C] font-light leading-relaxed opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)] max-w-2xl">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
