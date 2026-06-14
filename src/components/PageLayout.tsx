import React from 'react';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0C0C0C]">
      <SiteNav />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};
