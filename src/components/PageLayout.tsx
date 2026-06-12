import React from 'react';
import { FadeIn } from './FadeIn';

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
          <a href="#/" className="font-black hover:opacity-70 transition-opacity duration-200">
            Jack
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

      <footer className="w-full px-6 md:px-10 py-8 border-t border-[rgba(215,226,234,0.1)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[#D7E2EA] opacity-60 text-xs sm:text-sm uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Jack &mdash; Creator digital &amp; AI</span>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-100 transition-opacity duration-200">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
