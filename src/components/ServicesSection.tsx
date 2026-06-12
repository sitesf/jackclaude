import React from 'react';
import { FadeIn } from './FadeIn';
import { ChatBubbleDoodle, GearsDoodle, BrowserDoodle, SeoDoodle } from './ServiceDoodles';

const doodles = [
  { Component: ChatBubbleDoodle, sizes: 'w-[90px] sm:w-[130px] md:w-[170px]', position: 'top-[5%] left-[2%] sm:left-[3%] md:left-[5%]', delay: 0.1, x: -80 },
  { Component: GearsDoodle, sizes: 'w-[100px] sm:w-[150px] md:w-[190px]', position: 'top-[5%] right-[2%] sm:right-[3%] md:right-[5%]', delay: 0.2, x: 80 },
  { Component: BrowserDoodle, sizes: 'w-[100px] sm:w-[150px] md:w-[190px]', position: 'bottom-[6%] left-[2%] sm:left-[4%] md:left-[6%]', delay: 0.25, x: -80 },
  { Component: SeoDoodle, sizes: 'w-[90px] sm:w-[130px] md:w-[170px]', position: 'bottom-[6%] right-[2%] sm:right-[4%] md:right-[6%]', delay: 0.35, x: 80 },
];

const services = [
  {
    number: '01',
    name: 'Agenți AI',
    description: 'Recepționeri virtuali, asistenți de vânzări și agenți de programări care lucrează nonstop pe WhatsApp sau pe site-ul tău — ca NIRO și Alex.',
  },
  {
    number: '02',
    name: 'Automatizări',
    description: 'Fluxuri de lucru care rulează singure: de la publicare automată de conținut la rapoarte, integrări și pipeline-uri complete cu AI.',
  },
  {
    number: '03',
    name: 'Aplicații web',
    description: 'Dashboard-uri și unelte interne construite pe fluxul tău real de lucru — recrutare, programări, statistici, orice ai nevoie.',
  },
  {
    number: '04',
    name: 'Web design',
    description: 'Site-uri moderne, rapide și orientate spre conversie, cu atenție la layout, tipografie și experiența utilizatorului.',
  },
  {
    number: '05',
    name: 'Branding & 3D',
    description: 'Identități vizuale coerente — de la logo la sisteme complete de brand — plus elemente 3D și motion design care te fac de neuitat.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Animații decorative pe colțuri */}
      {doodles.map(({ Component, sizes, position, delay, x }, idx) => (
        <FadeIn key={idx} delay={delay} duration={0.9} x={x} y={0} as="div" className={`hidden md:block absolute ${sizes} ${position} z-0 pointer-events-none`}>
          <Component />
        </FadeIn>
      ))}

      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
        Servicii
      </FadeIn>

      <div className="relative z-10 max-w-5xl mx-auto">
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
