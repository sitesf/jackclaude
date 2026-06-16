import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SiteFooter } from './components/SiteFooter';
import { CookieConsent } from './components/CookieConsent';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectPage } from './pages/ProjectPage';
import { NiroPage } from './pages/NiroPage';
import { PrivacyPage, TermsPage, CookiesPage } from './pages/LegalPages';
import { getProject } from './data/projects';

const CHROMATIC_LETTERS = [1, 2]; // E and X

const NexasAnimation: React.FC = () => {
  const letters = 'NEXAS'.split('');

  return (
    <div className="w-full py-20 sm:py-28 flex justify-center px-4 overflow-hidden select-none">
      <div className="flex items-baseline">
        {letters.map((letter, i) => {
          const hasChromatic = CHROMATIC_LETTERS.includes(i);
          const repeatDelay = 5 + i * 1.8;

          return (
            <motion.span
              key={i}
              className="relative font-black uppercase text-[#D7E2EA]"
              style={{ fontSize: 'clamp(5rem, 18vw, 180px)', lineHeight: 1, letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
              {hasChromatic && (
                <>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 font-black uppercase"
                    style={{ letterSpacing: '-0.03em', color: '#00D8FF', mixBlendMode: 'screen' }}
                    animate={{ x: [0, 0, 7, -4, 7, 0, 0], opacity: [0, 0, 0.9, 0.6, 0.9, 0, 0] }}
                    transition={{ duration: 0.45, delay: 2 + i * 0.35, repeat: Infinity, repeatDelay, ease: 'linear' }}
                  >
                    {letter}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 font-black uppercase"
                    style={{ letterSpacing: '-0.03em', color: '#B600A8', mixBlendMode: 'screen' }}
                    animate={{ x: [0, 0, -7, 4, -7, 0, 0], opacity: [0, 0, 0.9, 0.6, 0.9, 0, 0] }}
                    transition={{ duration: 0.45, delay: 2 + i * 0.35, repeat: Infinity, repeatDelay, ease: 'linear' }}
                  >
                    {letter}
                  </motion.span>
                </>
              )}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

const HomePage = () => (
  <div className="w-full overflow-x-clip bg-[#0C0C0C]">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <NexasAnimation />
    <SiteFooter />
  </div>
);

const NotFound = () => (
  <div className="w-full overflow-x-clip bg-[#0C0C0C]">
    <HeroSection />
    <SiteFooter />
  </div>
);

function AppRoutes() {
  // Handle anchor scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    // Scroll on mount if there's a hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preturi" element={<PricingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/confidentialitate" element={<PrivacyPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/termeni" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/proiect/niro" element={<NiroPage />} />
      <Route path="/proiect/:slug" element={<ProjectPageWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const ProjectPageWrapper = () => {
  const slug = window.location.pathname.split('/').pop();
  const project = getProject(slug || '');
  
  if (!project) {
    return <NotFound />;
  }
  
  return <ProjectPage project={project} />;
};

function App() {
  return (
    <>
      <AppRoutes />
      <CookieConsent />
    </>
  );
}

export default App;
