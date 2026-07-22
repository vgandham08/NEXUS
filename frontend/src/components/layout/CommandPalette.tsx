import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  Sparkles,
  Users,
  Package,
  FileSpreadsheet,
  ArrowRight,
  Zap,
  CornerDownLeft,
} from 'lucide-react';
import { NavItemKey } from './Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavItemKey) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickActions = [
    { label: 'Go to Customer CRM', tab: 'customers' as NavItemKey, icon: Users, shortcut: 'G C' },
    { label: 'Go to Product & Inventory', tab: 'inventory' as NavItemKey, icon: Package, shortcut: 'G P' },
    { label: 'Create New Sales Challan', tab: 'challans' as NavItemKey, icon: FileSpreadsheet, shortcut: 'G S' },
    { label: 'View AI Predictive Analytics', tab: 'ai' as NavItemKey, icon: Sparkles, shortcut: 'G A' },
  ];

  const handleAiQuery = () => {
    if (!query.trim()) return;
    setLoadingAi(true);
    setAiResponse(null);

    setTimeout(() => {
      setLoadingAi(false);
      if (query.toLowerCase().includes('stock') || query.toLowerCase().includes('inventory')) {
        setAiResponse('AI Analysis: 8-Port Ethernet Switches (NET-002) are running low (12 units left). Suggested reorder: 35 units to avoid fulfillment delays.');
      } else if (query.toLowerCase().includes('customer') || query.toLowerCase().includes('churn')) {
        setAiResponse('AI Analysis: Starlight Retailers has a High Churn Risk (88%). No order in 45 days. Re-engagement recommendation generated.');
      } else if (query.toLowerCase().includes('revenue') || query.toLowerCase().includes('sales')) {
        setAiResponse('AI Forecast: Predicted Q3 revenue growth is +18.4%, driven by Server Blade X86 enterprise orders.');
      } else {
        setAiResponse(`AI Assistant: Processing command "${query}". Navigating to optimal workflow view.`);
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl glass-panel rounded-2xl border border-white/20 shadow-2xl z-10 overflow-hidden bg-[#0B1020]/95 backdrop-blur-2xl"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
              placeholder="Type a command, search data, or ask AI..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-medium"
              autoFocus
            />
            {query && (
              <button
                onClick={handleAiQuery}
                className="px-2.5 py-1 rounded-lg bg-[#5B5FFF]/20 border border-[#5B5FFF]/40 text-xs font-semibold text-[#00D4FF] flex items-center gap-1 hover:bg-[#5B5FFF]/30 transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-400 border border-white/10 font-mono">
              ESC
            </kbd>
          </div>

          {/* AI Response Output Card */}
          {loadingAi && (
            <div className="p-4 border-b border-white/10 flex items-center gap-3 text-xs text-[#00D4FF]">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Nexus AI is thinking...</span>
            </div>
          )}

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-[#5B5FFF]/15 to-[#00D4FF]/10 border-b border-[#00D4FF]/30 flex items-start gap-3"
            >
              <Zap className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-slate-200 leading-relaxed">{aiResponse}</p>
            </motion.div>
          )}

          {/* Quick Actions List */}
          <div className="p-3 max-h-80 overflow-y-auto space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 flex items-center gap-1.5">
              <Command className="w-3 h-3 text-[#5B5FFF]" /> Quick Navigation & Actions
            </p>
            {quickActions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.tab}
                  onClick={() => {
                    onSelectTab(act.tab);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors group text-xs font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#00D4FF] group-hover:scale-110 transition-transform" />
                    <span>{act.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{act.shortcut}</span>
                    <CornerDownLeft className="w-3 h-3 text-slate-500 group-hover:text-white" />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};