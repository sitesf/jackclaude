import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <div ref={containerRef} className={className}>
      {characters.map((char, i) => {
        const charScrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
        const charIndex = i / characters.length;

        const opacity = useTransform(charScrollProgress, (progress) => {
          const threshold = charIndex;
          if (progress < threshold) {
            return 0.2;
          }
          return Math.min(1, 0.2 + (progress - threshold) * 5);
        });

        return (
          <motion.span key={i} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};
