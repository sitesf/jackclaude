import React from 'react';
import { FadeIn } from './FadeIn';
import { SiteFooter } from './SiteFooter';

interface PageLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { label: 'Acasă', href: '#/' },
  { label: 'Proiecte', href: '#/#projects' },
  { label: 'Prețuri', href: '#/preturi' },
  { label: 'Contact', href: '#/contact' },
];

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0C0C0C]">
      <FadeIn delay={0} duration={0.7} y={-20} as="nav" className="w-full px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#/" className="font-black tracking-[0.2em] hover:opacity-70 transition-opacity duration-200">
            NE<span className="text-[#B600A8]">X</span>AS
          </a>
          <div className="flex gap-6 md:gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-70 transition-opacity duration-200">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};
