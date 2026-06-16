import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const glassButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.10)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.20)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
};

type NavLink = { to: string; label: string } | { href: string; label: string };

const navLinks: NavLink[] = [
  { href: '/#about', label: 'Despre' },
  { to: '/preturi', label: 'Prețuri' },
  { href: '/#projects', label: 'Proiecte' },
  { to: '/contact', label: 'Contact' },
];

interface SiteNavProps {
  /** true = poziționat absolut peste hero; false = în fluxul paginii */
  overlay?: boolean;
}

export const SiteNav: React.FC<SiteNavProps> = ({ overlay = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${
          overlay ? 'absolute top-0 left-0 right-0' : 'relative w-full'
        } z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6`}
      >
        <Link to="/" className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#D7E2EA]">
          NE<span className="text-[#B600A8]">X</span>AS
        </Link>

        <div className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/15">
          {navLinks.map((link) =>
            'to' in link ? (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm px-3 py-2 font-medium uppercase tracking-wider text-[#D7E2EA]/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm px-3 py-2 font-medium uppercase tracking-wider text-[#D7E2EA]/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to="/contact"
            className="ml-2 text-white text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-full transition-transform hover:scale-105"
            style={glassButtonStyle}
          >
            Începe un proiect
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D7E2EA] transition-all duration-300 hover:bg-white/20"
          aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={menuOpen}
        >
          <Menu
            className={`w-5 h-5 absolute transition-all duration-300 ${
              menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`w-5 h-5 absolute transition-all duration-300 ${
              menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            }`}
          />
        </button>
      </nav>

      {/* Overlay meniu mobil */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#0C0C0C]/60 backdrop-blur-sm" />
      </div>

      {/* Drawer meniu mobil */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-[#141414]/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) =>
              'to' in link ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-bold uppercase tracking-wide text-[#D7E2EA] py-4 border-b border-white/10 transition-all duration-500 ${
                    menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-bold uppercase tracking-wide text-[#D7E2EA] py-4 border-b border-white/10 transition-all duration-500 ${
                    menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-center text-white text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full"
              style={glassButtonStyle}
            >
              Începe un proiect
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
