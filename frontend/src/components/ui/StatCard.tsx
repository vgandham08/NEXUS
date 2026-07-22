import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtext?: string;
  glowColor?: 'purple' | 'cyan' | 'emerald' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtext,
  glowColor = 'purple',
}) => {
  const glowStyles = {
    purple: 'from-[#5B5FFF]/20 via-[#7C3AED]/10 to-transparent',
    cyan: 'from-[#00D4FF]/20 via-blue-500/10 to-transparent',
    emerald: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    amber: 'from-amber-500/20 via-orange-500/10 to-transparent',
  };

  const iconBgStyles = {
    purple: 'bg-[#5B5FFF]/15 text-[#5B5FFF] border-[#5B5FFF]/30',
    cyan: 'bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  };

  return (
    <GlassCard className="relative overflow-hidden group">
      {/* Background Gradient Glow */}
      <div
        className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${glowStyles[glowColor]} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
          <h3 className="text-2xl font-extrabold text-white mt-2 tracking-tight">{value}</h3>
        </div>

        <div className={`p-3 rounded-xl border ${iconBgStyles[glowColor]} backdrop-blur-md`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between relative z-10 text-xs">
        {change && (
          <span
            className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
              isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {change}
          </span>
        )}
        {subtext && <span className="text-slate-400">{subtext}</span>}
      </div>
    </GlassCard>
  );
};
