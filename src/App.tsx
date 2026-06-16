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

const NEXAS_FS = 'clamp(3rem, 10vw, 110px)';
const NEXAS_LS = '-0.03em';

const NeonE: React.FC<{ index: number }> = ({ index }) => (
  <motion.span
    className="relative inline-block font-black uppercase"
    style={{ fontSize: NEXAS_FS, lineHeight: 1, letterSpacing: NEXAS_LS }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay: index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* invisible E keeps correct width in flow */}
    <span style={{ visibility: 'hidden' }}>E</span>
    <motion.span
      aria-hidden
      className="absolute inset-0 flex flex-col justify-between"
      style={{ padding: '0.07em 0.05em 0.07em 0' }}
      animate={{ filter: ['brightness(1)', 'brightness(1.35)', 'brightness(0.85)', 'brightness(1.2)', 'brightness(1)'] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {[0, 1, 2].map(bar => (
        <span
          key={bar}
          style={{
            display: 'block',
            height: '11%',
            width: bar === 1 ? '72%' : '100%',
            background: 'linear-gradient(90deg, #007FA8 0%, #00EEFF 50%, #007FA8 100%)',
            borderRadius: '3px',
            boxShadow: '0 0 5px 2px #00CCFF, 0 0 14px 5px rgba(0,200,255,0.6), 0 0 28px 8px rgba(0,200,255,0.25)',
          }}
        />
      ))}
    </motion.span>
  </motion.span>
);

const ShimmerLetter: React.FC<{ letter: string; index: number }> = ({ letter, index }) => (
  <motion.span
    className="font-black uppercase"
    style={{
      fontSize: NEXAS_FS,
      lineHeight: 1,
      letterSpacing: NEXAS_LS,
      background: 'linear-gradient(105deg, #4a5a6a 0%, #8a9aaa 22%, #D7E2EA 44%, #ffffff 50%, #D7E2EA 56%, #8a9aaa 78%, #4a5a6a 100%)',
      backgroundSize: '260% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: `nexas-shimmer ${5.5 + index * 0.6}s ${index * 0.85}s linear infinite`,
    }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay: index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {letter}
  </motion.span>
);

const NexasAnimation: React.FC = () => (
  <div className="w-full py-16 sm:py-20 flex justify-center px-4 overflow-hidden select-none">
    <style>{`
      @keyframes nexas-shimmer {
        0%   { background-position: 260% center; }
        100% { background-position: -260% center; }
      }
    `}</style>
    <div className="flex items-baseline">
      <ShimmerLetter letter="N" index={0} />
      <NeonE index={1} />
      <ShimmerLetter letter="X" index={2} />
      <ShimmerLetter letter="A" index={3} />
      <ShimmerLetter letter="S" index={4} />
    </div>
  </div>
);

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
