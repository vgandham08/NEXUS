import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, User, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { User as UserType } from '../services/mockData';
import { Button } from '../components/ui/Button';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserType['role']>('ADMIN');
  const [email, setEmail] = useState('alex@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(selectedRole, email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const roles: Array<{ role: UserType['role']; label: string; desc: string; icon: string }> = [
    { role: 'ADMIN', label: 'Executive Admin', desc: 'Full System & Security Access', icon: '👑' },
    { role: 'SALES', label: 'Sales Executive', desc: 'CRM, Leads & Sales Orders', icon: '🚀' },
    { role: 'WAREHOUSE', label: 'Warehouse Manager', desc: 'Stock Racks & Inventory Logs', icon: '📦' },
    { role: 'ACCOUNTS', label: 'Accounts Lead', desc: 'Financial Challans & Invoicing', icon: '📊' },
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#0B1020] overflow-hidden select-none">
      {/* Background Floating Orbs */}
      <div className="gradient-orb-1 top-10 left-10 animate-float" />
      <div className="gradient-orb-2 bottom-10 right-10 animate-float" style={{ animationDelay: '2s' }} />
      <div className="gradient-orb-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl z-10 relative bg-[#0B1020]/80 backdrop-blur-2xl"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shadow-glow-primary mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">NexusERP</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Enterprise Smart Business Operations</p>
        </div>

        {/* Role Selector Grid */}
        <div className="mb-6 space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select User Role Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => {
                  setSelectedRole(r.role);
                  const roleEmailMap = {
                    ADMIN: 'alex@gmail.com',
                    SALES: 'sarah@gmail.com',
                    WAREHOUSE: 'mike@gmail.com',
                    ACCOUNTS: 'nina@gmail.com',
                  } as const;
                  setEmail(roleEmailMap[r.role]);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedRole === r.role
                    ? 'bg-gradient-to-r from-[#5B5FFF]/25 to-[#7C3AED]/20 border-[#5B5FFF] text-white shadow-glow-primary'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{r.icon}</span>
                  {selectedRole === r.role && <CheckCircle className="w-3.5 h-3.5 text-[#00D4FF]" />}
                </div>
                <p className="text-xs font-bold mt-1.5">{r.label}</p>
                <p className="text-[9px] text-slate-400 truncate mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium focus:outline-none"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-sm font-bold mt-2"
            loading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate & Access Portal
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-[10px] text-slate-500 font-medium">
          Protected by JWT RBAC & Nexus Security Shield 2.0
        </div>
      </motion.div>
    </div>
  );
};
