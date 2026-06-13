import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface AgentCard {
  slug: string;
  name: string;
  title: string;
  description: string;
  accentColor: string;
  accentLight: string;
  icon: string;
}

const agents: AgentCard[] = [
  {
    slug: 'niro',
    name: 'NIRO Agent',
    title: 'Recepționer AI pe WhatsApp',
    description: 'Preia automat programări, răspunde clienților instant, salvează date în CRM.',
    accentColor: '#8F5CFF',
    accentLight: 'rgba(143,92,255,0.2)',
    icon: '📱',
  },
  {
    slug: 'alex',
    name: 'Alex AI',
    title: 'Asistent AI Multifuncțional',
    description: 'Gestionează sarcini, automatizări și conversații — integrări cu Slack, Notion, Calendar.',
    accentColor: '#6C63FF',
    accentLight: 'rgba(108,99,255,0.2)',
    icon: '🤖',
  },
  {
    slug: 'neo',
    name: 'NEO Audit SEO',
    title: 'Audit SEO Complet în Secunde',
    description: 'Analizează site-uri, identifică probleme, generează recomandări prioritizate cu AI.',
    accentColor: '#3B82F6',
    accentLight: 'rgba(59,130,246,0.2)',
    icon: '📊',
  },
  {
    slug: 'hr',
    name: 'HR Dashboard',
    title: 'Recrutare Modernă cu AI',
    description: 'Evaluează CV-uri automat, programează interviuri, statistici live pe fiecare post.',
    accentColor: '#5DA9FF',
    accentLight: 'rgba(93,169,255,0.2)',
    icon: '👥',
  },
  {
    slug: 'stiri',
    name: 'Știri AI',
    title: 'Portal cu Conținut Automat',
    description: 'Redactor AI care citește sursele, selectează, traduce și publică știri zilnic singur.',
    accentColor: '#B600A8',
    accentLight: 'rgba(182,0,168,0.2)',
    icon: '📰',
  },
];

const AgentCard: React.FC<{ agent: AgentCard }> = ({ agent }) => (
  <motion.a
    href={`#/proiect/${agent.slug}`}
    className="relative flex-shrink-0 w-80 sm:w-96 h-72 sm:h-80 rounded-3xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
    whileHover={{ y: -8 }}
  >
    {/* Background gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, #0C0C0C 0%, ${agent.accentLight} 100%)`,
      }}
    />

    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${agent.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={agent.accentColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${agent.slug})`} />
      </svg>
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
      {/* Top — Icon & Badge */}
      <div className="flex items-start justify-between">
        <span className="text-5xl">{agent.icon}</span>
        <span
          className="text-xs font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full"
          style={{ backgroundColor: agent.accentColor }}
        >
          Agent AI
        </span>
      </div>

      {/* Bottom — Text */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-white">
            {agent.name}
          </h3>
          <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-white/70 mt-1">
            {agent.title}
          </p>
        </div>
        <p className="text-xs sm:text-sm font-light leading-relaxed text-white/75 line-clamp-2">
          {agent.description}
        </p>
        <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-widest pt-2">
          <span>Descoperă</span>
          <span className="text-lg">→</span>
        </div>
      </div>
    </div>

    {/* Hover glow */}
    <div
      className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10"
      style={{ backgroundColor: agent.accentColor }}
    />
  </motion.a>
);

export const ProjectsSection: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="text-[#D7E2EA] font-black uppercase text-center text-[clamp(2.5rem,10vw,120px)] leading-none tracking-tight mb-16 sm:mb-20">
        Agenți AI & Platforme
      </FadeIn>

      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {agents.map((agent, idx) => (
            <FadeIn key={agent.slug} delay={idx * 0.1} duration={0.7} x={40} y={0} as="div">
              <AgentCard agent={agent} />
            </FadeIn>
          ))}
        </div>

        {/* Fade edges pe desktop */}
        <div className="hidden sm:block absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#0C0C0C] to-transparent pointer-events-none" />
        <div className="hidden sm:block absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#0C0C0C] to-transparent pointer-events-none" />
      </div>

      {/* Info text */}
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-[#D7E2EA] font-light text-sm sm:text-base opacity-60 max-w-2xl mx-auto">
          Scroll orizontal ca să descoperi toți agenții și platformele construite de NEXAS.
          Fiecare poate fi personalizat pe fluxul tău de lucru.
        </p>
      </div>
    </section>
  );
};
