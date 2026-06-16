import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

const glassButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.10)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.20)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
};

export const ContactButton: React.FC<ContactButtonProps> = ({ className = '', onClick }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={onClick ?? (() => navigate('/contact'))}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-white/[0.15] ${className}`}
      style={glassButtonStyle}
    >
      Contactează-mă
    </motion.button>
  );
};
