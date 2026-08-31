import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SiteFooter } from './components/SiteFooter';
import { CookieConsent } from './components/CookieConsent';
import { NexasLogo } from './components/NexasLogo';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectPage } from './pages/ProjectPage';
import { NiroPage } from './pages/NiroPage';
import { PrivacyPage, TermsPage, CookiesPage } from './pages/LegalPages';
import { getProject } from './data/projects';

const NexasAnimation: React.FC = () => (
  <motion.div
    className="w-full py-16 sm:py-20 flex justify-center px-4 overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <NexasLogo fontSize="clamp(3rem, 10vw, 110px)" gap="0.12em" />
  </motion.div>
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

    handleHashChange();
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
