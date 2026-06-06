import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '', onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] bg-transparent transition-colors hover:bg-[#D7E2EA]/10 ${className}`}
    >
      Live Project
    </motion.button>
  );
};
