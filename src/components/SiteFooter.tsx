import React from 'react';
import { NexasLogo } from './NexasLogo';

const legalLinks = [
  { label: 'Confidențialitate', href: '#/confidentialitate' },
  { label: 'Cookies', href: '#/cookies' },
  { label: 'Termeni și condiții', href: '#/termeni' },
  { label: 'Contact', href: '#/contact' },
];

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0C0C0C] px-6 md:px-10 py-10 border-t border-[rgba(215,226,234,0.1)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5 text-center">
        <a href="#/" className="block">
          <NexasLogo fontSize="1.25rem" gap="0.08em" />
        </a>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/60">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#D7E2EA] transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-[#D7E2EA]/40 text-xs">
          &copy; {new Date().getFullYear()} NEXAS Digital &middot; București, România &middot;{' '}
          <a href="mailto:contact@nexas.ro" className="hover:text-[#D7E2EA] transition-colors duration-200">
            contact@nexas.ro
          </a>
        </p>
      </div>
    </footer>
  );
};
