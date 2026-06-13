import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { projects, ProjectData } from '../data/projects';
import { projectVisuals } from './ProjectVisuals';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  scrollYProgress: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards, scrollYProgress }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1]);
  const Visual = projectVisuals[project.slug];

  return (
    <motion.div
      style={{
        scale,
        top: `${index * 24}px`,
      }}
      className="sticky top-20 md:top-28 min-h-[80vh] flex items-center justify-center px-4 sm:px-6"
    >
      <a
        href={`#/proiect/${project.slug}`}
        className="block w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 md:p-10 transition-colors duration-300 hover:border-white group"
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
            <span className="inline-flex items-center gap-3 mt-2 text-[#D7E2EA] text-xs sm:text-sm font-medium uppercase tracking-widest">
              <span className="rounded-full border-2 border-[#D7E2EA] px-7 py-3 transition-colors duration-300 group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C]">
                Vezi proiectul
              </span>
            </span>
          </div>

          {/* Vizual generat */}
          <div className="aspect-[4/3] w-full">{Visual && <Visual />}</div>
        </div>
      </a>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-6">
        Proiecte
      </FadeIn>
      <FadeIn delay={0.15} duration={0.7} y={20} as="p" className="text-center text-[#D7E2EA]/50 font-light max-w-xl mx-auto px-6 mb-16 sm:mb-24">
        Cinci produse reale, construite de la zero: agenți AI, automatizări și platforme web. Apasă pe oricare pentru detalii complete.
      </FadeIn>

      <div className="relative">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={idx}
            totalCards={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
        {/* Spacer pentru scroll */}
        <div className="h-[250vh]" />
      </div>
    </section>
  );
};
