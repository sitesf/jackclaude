import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

const projects = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
  scrollYProgress: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards, scrollYProgress }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1]);

  return (
    <motion.div
      style={{
        scale,
        top: `${index * 28}px`,
      }}
      className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center"
    >
      <div className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="text-[#D7E2EA] font-black text-[clamp(3rem,10vw,140px)] leading-none">
              {project.number}
            </span>
            <div>
              <p className="text-[#D7E2EA] font-light text-sm uppercase opacity-60 tracking-widest">
                {project.category}
              </p>
              <h3 className="text-[#D7E2EA] font-black text-[clamp(1.5rem,3vw,2.5rem)] leading-tight">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-[40%_60%] gap-4 md:gap-6 h-[calc(100%-140px)]">
          {/* Left column - 2 stacked images */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
              <img
                src={project.images.col1[0]}
                alt={`${project.name} 1`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden min-h-[clamp(160px,22vw,340px)]">
              <img
                src={project.images.col1[1]}
                alt={`${project.name} 2`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column - 1 tall image */}
          <div className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
            <img
              src={project.images.col2}
              alt={`${project.name} 3`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
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
      <FadeIn delay={0} duration={0.7} y={40} as="h2" className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-20 sm:mb-28 md:mb-32">
        Project
      </FadeIn>

      <div className="relative">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            index={idx}
            totalCards={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
        {/* Spacer pentru scroll */}
        <div className="h-[200vh]" />
      </div>
    </section>
  );
};
