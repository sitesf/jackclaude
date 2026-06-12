import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PageLayout } from '../components/PageLayout';

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

const plans = [
  {
    name: 'Landing Page',
    price: '290',
    tagline: 'Perfect pentru lansarea rapidă a unui produs, a unei campanii sau a unui brand personal.',
    featured: false,
    features: [
      'Design personalizat, o singură pagină',
      'Layout responsive, mobile-first',
      'Animații fluide la scroll',
      'Formular de contact integrat',
      'SEO on-page de bază',
      'Livrare în 5-7 zile',
      '14 zile de suport gratuit',
    ],
  },
  {
    name: 'Site de prezentare',
    price: '590',
    tagline: 'Un site complet de prezentare care scoate afacerea ta din anonimat.',
    featured: true,
    features: [
      'Până la 6 pagini cu design unic',
      'Identitate vizuală personalizată',
      'Elemente 3D & motion design',
      'Secțiune de blog / noutăți',
      'SEO on-page avansat',
      'Configurare Google Analytics',
      'Livrare în 2-3 săptămâni',
      '30 de zile de suport gratuit',
    ],
  },
  {
    name: 'Magazin online',
    price: '990',
    tagline: 'O experiență e-commerce orientată spre conversie, construită ca să vândă.',
    featured: false,
    features: [
      'Configurare e-commerce completă',
      'Catalog de produse & categorii',
      'Plăți online & facturare',
      'Gestiune comenzi & stocuri',
      'Design personalizat pe fiecare pagină',
      'Optimizare SEO & performanță',
      'Livrare în 3-5 săptămâni',
      '60 de zile de suport gratuit',
    ],
  },
];

const addons = [
  { name: 'Mentenanță lunară', price: '€35 / lună', description: 'Actualizări, backup-uri, monitorizare de securitate și modificări mici de conținut.' },
  { name: 'Logo & identitate de brand', price: 'de la €120', description: 'Design de logo, paletă de culori, tipografie și ghid de brand.' },
  { name: 'Optimizare SEO', price: 'de la €150', description: 'Cercetare de cuvinte cheie, audit SEO tehnic și optimizare de conținut.' },
  { name: 'Agent AI personalizat', price: 'de la €200', description: 'Agent AI pentru programări, vânzări sau suport — configurat pe afacerea ta.' },
  { name: 'Copywriting', price: 'de la €80', description: 'Texte persuasive, prietenoase cu motoarele de căutare, scrise pentru publicul tău.' },
  { name: 'Hosting & domeniu', price: '€60 / an', description: 'Hosting rapid, certificat SSL și adrese de email profesionale.' },
];

export const PricingPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Header */}
      <section className="px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-12 text-center">
        <FadeIn delay={0} duration={0.7} y={40} as="h1" className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
          Prețuri
        </FadeIn>
        <FadeIn delay={0.2} duration={0.7} y={20} as="p" className="text-[#D7E2EA] font-light max-w-2xl mx-auto mt-8 leading-relaxed text-[clamp(1rem,2vw,1.25rem)]">
          Pachete transparente, fără costuri ascunse. Fiecare proiect începe cu o
          discuție gratuită despre obiectivele tale &mdash; și se termină cu un produs de care ești mândru.
        </FadeIn>
      </section>

      {/* Plans */}
      <section className="px-5 sm:px-8 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <FadeIn key={plan.name} delay={idx * 0.15} duration={0.7} y={40} as="div" className="h-full">
              <div
                className={`h-full flex flex-col rounded-[32px] p-8 sm:p-10 border transition-transform duration-300 hover:-translate-y-2 ${
                  plan.featured
                    ? 'bg-white text-[#0C0C0C] border-white'
                    : 'bg-[#141414] text-[#D7E2EA] border-[rgba(215,226,234,0.12)]'
                }`}
              >
                {plan.featured && (
                  <span className="self-start text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white rounded-full px-4 py-1.5 mb-6" style={gradientButtonStyle}>
                    Cel mai popular
                  </span>
                )}
                <h2 className="font-black uppercase tracking-tight text-2xl sm:text-3xl">{plan.name}</h2>
                <p className={`mt-3 font-light leading-relaxed text-sm sm:text-base ${plan.featured ? 'opacity-70' : 'opacity-60'}`}>
                  {plan.tagline}
                </p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-light text-xl sm:text-2xl opacity-70">de la</span>
                  <span className="font-black leading-none text-5xl sm:text-6xl">&euro;{plan.price}</span>
                </div>
                <ul className="mt-8 flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-light text-sm sm:text-base">
                      <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${plan.featured ? 'text-[#B600A8]' : 'text-[#D7E2EA]'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-10 inline-block text-center rounded-full px-8 py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-white"
                  style={gradientButtonStyle}
                >
                  Începe acum
                </motion.a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24">
        <FadeIn delay={0} duration={0.7} y={40} as="h2" className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight text-[clamp(2.2rem,8vw,100px)] mb-14 sm:mb-20">
          Servicii extra
        </FadeIn>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
          {addons.map((addon, idx) => (
            <FadeIn key={addon.name} delay={idx * 0.08} duration={0.7} y={20} as="div" className="py-6 border-b border-[rgba(12,12,12,0.15)]">
              <div className="flex justify-between items-baseline gap-4">
                <h3 className="text-[#0C0C0C] font-medium uppercase text-base sm:text-lg leading-tight">{addon.name}</h3>
                <span className="text-[#0C0C0C] font-black whitespace-nowrap text-base sm:text-lg">{addon.price}</span>
              </div>
              <p className="text-[#0C0C0C] font-light opacity-60 mt-2 text-sm sm:text-base leading-relaxed">{addon.description}</p>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.2} duration={0.7} y={30} as="div" className="flex flex-col items-center gap-6 mt-16 sm:mt-20 text-center">
          <p className="text-[#0C0C0C] font-medium text-lg sm:text-2xl max-w-xl">
            Nu știi ce pachet ți se potrivește? Spune-mi despre proiectul tău și îți recomand gratuit varianta corectă.
          </p>
          <motion.a
            href="#/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full px-10 py-4 text-sm md:text-base font-medium uppercase tracking-widest text-white"
            style={gradientButtonStyle}
          >
            Cere o ofertă gratuită
          </motion.a>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
