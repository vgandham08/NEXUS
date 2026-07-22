import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Package,
  FileSpreadsheet,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

export type NavItemKey =
  | 'dashboard'
  | 'customers'
  | 'inventory'
  | 'challans'
  | 'reports';

interface SidebarProps {
  activeTab: NavItemKey;
  setActiveTab: (tab: NavItemKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, switchRole, logout } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems: Array<{ key: NavItemKey; label: string; icon: any; role: string; badge?: string }> = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, role: 'ALL' },
    { key: 'customers', label: 'Customer CRM', icon: Users, role: 'ALL' },
    { key: 'inventory', label: 'Products & Stock', icon: Package, role: 'ALL' },
    { key: 'challans', label: 'Sales Challans', icon: FileSpreadsheet, role: 'ALL' },
    { key: 'reports', label: 'Analytics & Reports', icon: BarChart3, role: 'ALL' },
  ];

  const roleColors = {
    ADMIN: 'purple',
    SALES: 'info',
    WAREHOUSE: 'warning',
    ACCOUNTS: 'success',
  } as const;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="no-print relative z-30 h-screen sticky top-0 glass-panel border-r border-white/10 flex flex-col shrink-0 select-none"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center shadow-glow-primary shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-base font-extrabold text-white tracking-tight">
                NexusERP
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Ops Platform</span>
            </motion.div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          const isRestricted = item.role !== 'ALL' && user?.role !== item.role;

          if (isRestricted) return null;

          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-[#5B5FFF]/20 to-[#7C3AED]/10 text-white border border-[#5B5FFF]/40 shadow-glow-primary'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'text-[#00D4FF] scale-110' : 'group-hover:scale-110'}`} />

              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <Badge variant="purple" className="text-[10px] py-0 px-1.5">
                  {item.badge}
                </Badge>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#00D4FF] rounded-r-full shadow-glow-accent"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Switcher & User Profile Footer */}
      <div className="p-3 border-t border-white/10 relative">
        {roleMenuOpen && !collapsed && (
          <div className="absolute bottom-20 left-3 right-3 glass-panel rounded-xl p-2 border border-white/20 shadow-2xl space-y-1 z-40 bg-[#0B1020]/95 backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2.5 py-1">Switch Role Demo</p>
            {(['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  switchRole(r);
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  user?.role === r ? 'bg-[#5B5FFF]/20 text-white border border-[#5B5FFF]/30' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{r}</span>
                {user?.role === r && <UserCheck className="w-3.5 h-3.5 text-[#00D4FF]" />}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-9 h-9 rounded-xl bg-slate-700 ring-2 ring-[#5B5FFF]/40 shrink-0 flex items-center justify-center text-[11px] font-semibold text-white uppercase">
            {user?.name
              .split(' ')
              .map(word => word[0] || '')
              .join('')
              .slice(0, 2)}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Badge variant={roleColors[user?.role || 'ADMIN']} className="text-[9px] py-0 px-1">
                    {user?.role}
                  </Badge>
                </button>
              </div>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={logout}
              title="Logout"
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
