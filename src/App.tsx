import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PredictionsSection } from './components/PredictionsSection';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';

const getRoute = () => window.location.hash.replace(/^#/, '') || '/';

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === '/pricing') return <PricingPage />;
  if (route === '/contact') return <ContactPage />;

  return (
    <div className="w-full overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <PredictionsSection />
    </div>
  );
}

export default App;
