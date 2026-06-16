import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { projects, ProjectData } from '../data/projects';
import { projectVisuals } from './ProjectVisuals';

/* Tag-uri tehnologii per proiect (pentru chip-urile din card) */
const techTags: Record<string, string[]> = {
  niro: ['Agent AI', 'WhatsApp', 'Automatizare'],
  neo: ['AI', 'SEO', 'PageSpeed'],
  hr: ['React', 'AI Scoring', 'Dashboard'],
  stiri: ['AI', 'Auto-publish', 'SEO'],
  alex: ['Agent AI', 'Integrări', 'Memorie'],
  sport: ['AI', 'Predicții', 'Auto-publish'],
  logistik: ['Web', 'WhatsApp', 'Conversie'],
};

const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards, scrollYProgress }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1]);
  const Visual = projectVisuals[project.slug];

  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.5 });
  const [interactive] = useState(hasFinePointer);
  const [hover, setHover] = useState(false);

  // Tur la scroll: ecranul „se derulează" în device
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const panY = useTransform(cardProgress, [0.1, 0.9], ['0%', '-20%']);

  // Tilt 3D + spotlight (doar desktop)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useMotionValue(150);
  const sy = useMotionValue(120);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${sx}px ${sy}px, rgba(255,255,255,0.16), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
    sx.set(e.clientX - rect.left);
    sy.set(e.clientY - rect.top);
  };
  const handleLeave = () => {
    setHover(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, top: `${index * 24}px` }}
      className="sticky top-20 md:top-28 min-h-[80vh] flex items-center justify-center px-4 sm:px-6"
    >
      {/* glow de brand pe cardul activ — gradient radial (fără filtru de blur = ieftin) */}
      <motion.div
        aria-hidden
        className="absolute w-full max-w-5xl h-[80%] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${project.accent}55, transparent 70%)` }}
        animate={{ opacity: inView ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.a
        href={project.externalLink ?? `/proiect/${project.slug}`}
        target={project.externalLink ? '_blank' : undefined}
        rel={project.externalLink ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => interactive && setHover(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.985 }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="relative block w-full max-w-6xl rounded-[34px] sm:rounded-[44px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-5 sm:p-8 md:p-10 transition-colors duration-300 hover:border-white group"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Text */}
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex items-baseline gap-4">
              <span className="text-[#D7E2EA] font-black text-[clamp(2.5rem,8vw,100px)] leading-none">
                {project.number}
              </span>
              <p className="text-[#D7E2EA] font-light text-xs sm:text-sm uppercase opacity-60 tracking-widest">
                {project.category}
              </p>
            </div>
            <h3 className="text-[#D7E2EA] font-black uppercase text-[clamp(1.5rem,3.5vw,2.8rem)] leading-tight tracking-tight">
              {project.name}
            </h3>
            <p className="text-[#D7E2EA]/60 font-light leading-relaxed text-sm sm:text-base max-w-md">
              {project.tagline}
            </p>
            {/* tag-uri tehnologii */}
            <div className="flex flex-wrap gap-2 mt-1">
              {(techTags[project.slug] ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D7E2EA]/80"
                  style={{ borderColor: `${project.accent}55`, background: `${project.accent}1a` }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-3 mt-2 text-[#D7E2EA] text-xs sm:text-sm font-medium uppercase tracking-widest">
              <span className="rounded-full border-2 border-[#D7E2EA] px-7 py-3 transition-colors duration-300 group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C]">
                Vezi proiectul
              </span>
            </span>
          </div>

          {/* Device frame cu turul la scroll */}
          <div className="w-full">
            <div className="relative rounded-[20px] overflow-hidden border border-white/15 bg-[#070708] shadow-2xl">
              {/* bara de browser */}
              <div className="flex items-center px-3 py-2 bg-[#15161a] border-b border-white/10">
                <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-[9px] font-mono text-[#D7E2EA]/50 truncate">
                  nexas.ro/{project.slug}
                </div>
              </div>

              {/* ecranul: mockup-ul se „derulează" la scroll */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div style={{ y: panY }} className="absolute inset-x-0 top-0 h-[125%]">
                  {Visual && <Visual />}
                </motion.div>

                {/* spotlight pe cursor (desktop) */}
                {interactive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: spotlight, opacity: hover ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const ProjectGroup: React.FC<{ projects: ProjectData[]; startIndex: number }> = ({ projects: group, startIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <div ref={containerRef} className="relative">
      {group.map((project, idx) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={idx}
          totalCards={group.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
      <div className="h-[200vh]" />
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const group1 = projects.slice(0, 3);
  const group2 = projects.slice(3);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-6">
        Proiecte
      </FadeIn>
      <FadeIn delay={0.15} duration={0.7} y={20} as="p" className="text-center text-[#D7E2EA]/50 font-light max-w-xl mx-auto px-6 mb-16 sm:mb-24">
        Produse reale, construite de la zero: agenți AI, automatizări și platforme web. Apasă pe oricare pentru detalii complete.
      </FadeIn>

      <ProjectGroup projects={group1} startIndex={0} />

      <div className="h-24 sm:h-32" />

      <ProjectGroup projects={group2} startIndex={3} />
    </section>
  );
};
