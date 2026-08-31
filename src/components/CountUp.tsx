import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
  /** re-declanșează animația când se schimbă (ex: la toggle) */
  triggerKey?: string | number;
}

export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1.2, className, triggerKey }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px' });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(0);
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [inView, value, triggerKey, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString('ro-RO');
      }
    });
    return unsubscribe;
  }, [spring]);

  return <span ref={ref} className={className}>0</span>;
};
