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
    tagline: 'Perfect for launching a product, campaign, or personal brand fast.',
    featured: false,
    features: [
      'One-page custom design',
      'Mobile-first responsive layout',
      'Smooth scroll animations',
      'Contact form integration',
      'Basic on-page SEO',
      'Delivery in 5-7 days',
      '14 days of free support',
    ],
  },
  {
    name: 'Business Website',
    price: '590',
    tagline: 'A complete presentation website that makes your business stand out.',
    featured: true,
    features: [
      'Up to 6 custom-designed pages',
      'Unique visual identity & layout',
      '3D elements & motion design',
      'Blog / news section',
      'Advanced on-page SEO',
      'Google Analytics setup',
      'Delivery in 2-3 weeks',
      '30 days of free support',
    ],
  },
  {
    name: 'Online Store',
    price: '990',
    tagline: 'A conversion-focused e-commerce experience, built to sell.',
    featured: false,
    features: [
      'Full e-commerce setup',
      'Product catalog & categories',
      'Online payments & invoicing',
      'Order & stock management',
      'Custom design on every page',
      'SEO & performance optimization',
      'Delivery in 3-5 weeks',
      '60 days of free support',
    ],
  },
];

const addons = [
  { name: 'Monthly maintenance', price: '€35 / month', description: 'Updates, backups, security monitoring, and small content changes.' },
  { name: 'Logo & brand identity', price: 'from €120', description: 'Logo design, color palette, typography, and brand guidelines.' },
  { name: 'SEO optimization', price: 'from €150', description: 'Keyword research, technical SEO audit, and content optimization.' },
  { name: '3D visuals & animation', price: 'from €200', description: 'Custom 3D models, renders, and motion design for your brand.' },
  { name: 'Copywriting', price: 'from €80', description: 'Persuasive, search-friendly texts written for your audience.' },
  { name: 'Hosting & domain setup', price: '€60 / year', description: 'Fast hosting, SSL certificate, and professional email addresses.' },
];

export const PricingPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Header */}
      <section className="px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-12 text-center">
        <FadeIn delay={0} duration={0.7} y={40} as="h1" className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
          Pricing
        </FadeIn>
        <FadeIn delay={0.2} duration={0.7} y={20} as="p" className="text-[#D7E2EA] font-light max-w-2xl mx-auto mt-8 leading-relaxed text-[clamp(1rem,2vw,1.25rem)]">
          Transparent packages, no hidden costs. Every project starts with a free
          discussion about your goals &mdash; and ends with a website you are proud of.
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
                    Most popular
                  </span>
                )}
                <h2 className="font-black uppercase tracking-tight text-2xl sm:text-3xl">{plan.name}</h2>
                <p className={`mt-3 font-light leading-relaxed text-sm sm:text-base ${plan.featured ? 'opacity-70' : 'opacity-60'}`}>
                  {plan.tagline}
                </p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-light text-xl sm:text-2xl opacity-70">from</span>
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
                  Get started
                </motion.a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24">
        <FadeIn delay={0} duration={0.7} y={40} as="h2" className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight text-[clamp(2.2rem,8vw,100px)] mb-14 sm:mb-20">
          Extra services
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
            Not sure which package fits you? Tell me about your project and I&apos;ll recommend the right one &mdash; for free.
          </p>
          <motion.a
            href="#/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full px-10 py-4 text-sm md:text-base font-medium uppercase tracking-widest text-white"
            style={gradientButtonStyle}
          >
            Request a free quote
          </motion.a>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
