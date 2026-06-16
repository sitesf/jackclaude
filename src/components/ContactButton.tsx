import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = '', onClick }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={onClick ?? (() => navigate('/contact'))}
      whileTap={{ scale: 0.95 }}
      className={`glass-btn rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white ${className}`}
    >
      Contactează-mă
    </motion.button>
  );
};
