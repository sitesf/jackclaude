import React, { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteNav } from './SiteNav';
import { FadeIn } from './FadeIn';
import { Spotlight } from './Spotlight';
import { SpotlightCursor } from './SpotlightCursor';
import { RobotBoundary } from './RobotBoundary';
import { prefetchContact } from '../lib/prefetchContact';

const RobotVisual = React.lazy(() =>
  import('./RobotVisual').then((m) => ({ default: m.RobotVisual })),
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#0C0C0C] overflow-hidden">
      <SiteNav overlay />

      <div className="px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-28 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Stânga: Text + CTA */}
          <div className="order-2 lg:order-1">
            <FadeIn delay={0} duration={0.7} y={40} as="h1" className="hero-heading font-black uppercase tracking-tight leading-[1.05] text-[clamp(2rem,6vw,3.8rem)]">
              Construim viitorul <span className="text-[#B600A8]">digital</span>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.7} y={30} as="p" className="text-[#D7E2EA] font-light leading-relaxed text-[clamp(0.95rem,2vw,1.15rem)] mt-6 max-w-lg opacity-75">
              Nexas construiește sisteme inteligente de ultimă generație — agenți AI, automatizări complexe și site-uri performante — toate create și optimizate exact după nevoile afacerii tale.
            </FadeIn>

            <FadeIn delay={0.4} duration={0.7} y={20} as="div" className="flex items-center gap-4 flex-wrap mt-10">
              <Link
                to="/contact"
                onMouseEnter={prefetchContact}
                onTouchStart={prefetchContact}
                className="glass-btn text-white text-sm md:text-base font-semibold uppercase tracking-widest px-8 py-3 rounded-full"
              >
                Contactează-ne
              </Link>
              <a
                href="/#projects"
                className="text-[#D7E2EA] text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                Vezi proiectele →
              </a>
            </FadeIn>

            <FadeIn delay={0.6} duration={0.7} y={20} as="div" className="flex items-center gap-2 text-[#D7E2EA] mt-12 pt-8 border-t border-[rgba(215,226,234,0.1)]">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span className="text-xs font-semibold uppercase tracking-wider">NEXAS AI</span>
            </FadeIn>
          </div>

          {/* Dreapta: Robot 3D */}
          <div className="order-1 lg:order-2">
            <FadeIn delay={0.1} duration={0.8} y={30} as="div">
              <div className="relative overflow-hidden rounded-[28px] border border-[rgba(215,226,234,0.12)] bg-[#0a0a0a] h-[380px] sm:h-[480px] lg:h-[520px]">
                <Spotlight className="-top-40 -right-40 md:right-0 md:-top-20" fill="#B600A8" />
                <SpotlightCursor size={300} color="rgba(255,255,255,0.6)" />
                <RobotBoundary>
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-2 border-[#B600A8] border-t-transparent animate-spin" />
                      </div>
                    }
                  >
                    <RobotVisual />
                  </Suspense>
                </RobotBoundary>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
