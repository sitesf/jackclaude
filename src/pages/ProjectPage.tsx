import React from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { FadeIn } from '../components/FadeIn';
import { ProjectData } from '../data/projects';

interface ProjectPageProps {
  project: ProjectData;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <div className="w-full overflow-x-clip bg-[#0C0C0C]">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-3xl text-center">
          <FadeIn as="span" className="text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
            {project.category}
          </FadeIn>
          <FadeIn delay={0.1} as="h1" className="hero-heading font-black uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4rem)] mt-4 max-w-4xl">
            {project.heroTitle} <span style={{ color: project.accent }}>{project.heroHighlight}</span>
          </FadeIn>
          <FadeIn delay={0.2} as="p" className="text-[#D7E2EA]/70 font-light text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            {project.heroText}
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="relative w-full py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn as="h2" className="text-3xl font-black uppercase mb-12 text-[#D7E2EA]">
            Caracteristici
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.features.map((feature, i) => (
              <FadeIn
                key={feature.title}
                delay={0.1 + i * 0.05}
                className="p-6 rounded-lg border border-[#D7E2EA]/20 bg-white/5"
              >
                <h3 className="font-bold text-lg text-[#D7E2EA] mb-2">{feature.title}</h3>
                <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">{feature.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative w-full py-20 px-4 sm:px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn as="h2" className="text-3xl font-black uppercase mb-12 text-[#D7E2EA]">
            Cum funcționează
          </FadeIn>
          <div className="space-y-6">
            {project.steps.map((step, i) => (
              <FadeIn key={step.title} delay={0.1 + i * 0.05} className="p-6 rounded-lg border border-[#D7E2EA]/20">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: project.accent }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#D7E2EA] mb-1">{step.title}</h3>
                    <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn as="h2" className="text-3xl font-black uppercase mb-4 text-[#D7E2EA]">
            {project.ctaTitle}
          </FadeIn>
          <FadeIn as="p" className="text-[#D7E2EA]/70 text-lg leading-relaxed mb-8">
            {project.ctaText}
          </FadeIn>
          <FadeIn as="div">
            <Link
              to="/contact"
              className="glass-btn inline-block text-white font-semibold uppercase tracking-widest px-8 py-4 rounded-full"
            >
              Contactează-ne
            </Link>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};
