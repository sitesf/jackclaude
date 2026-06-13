import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projectVisuals } from './ProjectVisuals';

const visuals = Object.entries(projectVisuals).map(([slug, Component]) => ({ slug, Component }));
const row1 = [visuals[0], visuals[1], visuals[2], visuals[3], visuals[4]];
const row2 = [visuals[2], visuals[4], visuals[0], visuals[3], visuals[1]];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const scrollOffset = (window.scrollY - (sectionTop + window.scrollY) + window.innerHeight) * 0.3;
      setOffset1(scrollOffset - 200);
      setOffset2(-(scrollOffset - 200));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderRow = (items: typeof row1, offset: number) => (
    <motion.div className="flex gap-3 will-change-transform" style={{ x: offset, transform: `translateX(${offset}px)` }}>
      {[...items, ...items, ...items].map((item, i) => {
        const Visual = item.Component;
        return (
          <a
            key={i}
            href={`#/proiect/${item.slug}`}
            className="flex-shrink-0 w-[320px] h-[230px] sm:w-[420px] sm:h-[270px] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
          >
            <Visual />
          </a>
        );
      })}
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        {renderRow(row1, offset1)}
        {renderRow(row2, offset2)}
      </div>
    </section>
  );
};
