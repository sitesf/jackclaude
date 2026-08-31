import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

/**
 * Text care se „albește" la scroll, pe cuvinte (nu pe caractere) — mult mai
 * puține elemente animate, deci fluid pe telefon. Albirea se completează rapid,
 * cât timp formele decorative intră în ecran.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // interval scurt: albirea e gata când secțiunea e bine intrată în ecran
    offset: ['start 0.85', 'start 0.35'],
  });

  const words = text.split(' ');
  const FLOOR = 0.3; // gri de pornire (mai albit decât înainte)

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const threshold = (i / words.length) * 0.85;
        const opacity = useTransform(scrollYProgress, (p) =>
          p < threshold ? FLOOR : Math.min(1, FLOOR + (p - threshold) * 7),
        );
        return (
          <motion.span key={i} style={{ opacity, display: 'inline-block', willChange: 'opacity' }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        );
      })}
    </div>
  );
};
