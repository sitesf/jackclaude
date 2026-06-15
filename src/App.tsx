import React, { useEffect } from 'react';
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
import { PrivacyPage, TermsPage, CookiesPage } from './pages/LegalPages';
import { NeoPage } from './pages/NeoPage';
import { getProject } from './data/projects';

const HomePage = () => (
  <div className="w-full overflow-x-clip bg-[#0C0C0C]">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
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
