import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverGlow = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hoverGlow ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
        hoverGlow ? 'hover:border-[#5B5FFF]/40 hover:shadow-glow-primary' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
