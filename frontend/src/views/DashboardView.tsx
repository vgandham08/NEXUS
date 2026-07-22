import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  Clock,
  Plus,
  FileSpreadsheet,
  BarChart2,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { StatCard } from '../components/ui/StatCard';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { NavItemKey } from '../components/layout/Sidebar';
import { fetchDashboardStats } from '../services/api';
import { useToast } from '../context/ToastContext';

interface DashboardViewProps {
  onNavigate: (tab: NavItemKey) => void;
  onOpenChallanBuilder: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenChallanBuilder,
}) => {
  const { addToast } = useToast();
  const [stats, setStats] = useState({
    revenueToday: 18000,
    activeOrders: 48,
    totalCustomers: 1248,
    lowStockCount: 3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch(() => {
        addToast('error', 'Backend unavailable', 'Dashboard stats loaded from cached preview data.');
      })
      .finally(() => setLoading(false));
  }, [addToast]);

  const salesData = [
    { day: 'Mon', revenue: 14200, orders: 12 },
    { day: 'Tue', revenue: 21500, orders: 18 },
    { day: 'Wed', revenue: 18900, orders: 15 },
    { day: 'Thu', revenue: 32400, orders: 24 },
    { day: 'Fri', revenue: 28700, orders: 21 },
    { day: 'Sat', revenue: 39100, orders: 30 },
    { day: 'Sun', revenue: 45200, orders: 36 },
  ];

  const inventoryDistribution = [
    { name: 'Hardware Gateways', value: 45, color: '#5B5FFF' },
    { name: 'Sensors & IoT', value: 25, color: '#00D4FF' },
    { name: 'Servers & Racks', value: 20, color: '#7C3AED' },
    { name: 'Networking Fiber', value: 10, color: '#F59E0B' },
  ];

  const recentActivities = [
    { id: 1, text: 'Sales Challan #CH-2026-00902 confirmed by Rajesh', time: '12 min ago', tag: 'Challan' },
    { id: 2, text: 'Dispatched 10 units of Nexus Gateway Pro to Aisha Kumar', time: '45 min ago', tag: 'Logistics' },
    { id: 3, text: 'Churn risk trigger for Neha Sharma', time: '2 hours ago', tag: 'Insight' },
    { id: 4, text: 'New Lead Priya Mehta requested contract renewal proposal', time: '4 hours ago', tag: 'CRM' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <GlassCard className="relative overflow-hidden bg-gradient-to-r from-[#5B5FFF]/20 via-[#7C3AED]/15 to-transparent border-[#5B5FFF]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="purple" className="text-[10px]">
                Operational Center
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Real-time Telemetry</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
              WELCOME
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" icon={<Plus className="w-4 h-4" />} size="sm" onClick={() => onNavigate('customers')}>
              Add Customer
            </Button>
            <Button variant="primary" icon={<FileSpreadsheet className="w-4 h-4" />} size="sm" onClick={onOpenChallanBuilder}>
              Create Sales Challan
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value={`₹${stats.revenueToday.toLocaleString()}`}
          change="+18.4%"
          isPositive={true}
          icon={<span className="text-xl font-bold">₹</span>}
          subtext="vs ₹17.2k last month"
          glowColor="purple"
        />
        <StatCard
          title="Active Orders"
          value={`${stats.activeOrders} Orders`}
          change="+12.2%"
          isPositive={true}
          icon={<ShoppingCart className="w-5 h-5" />}
          subtext="12 pending dispatch"
          glowColor="cyan"
        />
        <StatCard
          title="CRM Customers"
          value={`${stats.totalCustomers.toLocaleString()}`}
          change="+8.1%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          subtext="5 high value leads"
          glowColor="emerald"
        />
        <StatCard
          title="Low Stock Alert"
          value={`${stats.lowStockCount} Products`}
          change="Action Required"
          isPositive={false}
          icon={<AlertTriangle className="w-5 h-5" />}
          subtext="Restock recommended"
          glowColor="amber"
        />
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Recharts Line/Area */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#00D4FF]" /> Revenue & Sales Trend
              </h3>
              <p className="text-xs text-slate-400">Weekly revenue trajectory with predictive smoothing</p>
            </div>
            <Badge variant="info">Live Stream</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 16, 32, 0.95)',
                    borderColor: 'rgba(91, 95, 255, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00D4FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Inventory Split Pie Chart */}
        <GlassCard className="flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-[#7C3AED]" /> Stock Distribution
            </h3>
            <p className="text-xs text-white mb-4">By category allocation</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inventoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 16, 32, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {inventoryDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-white truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        <GlassCard>
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#5B5FFF]" /> Operations Feed
          </h3>

          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {recentActivities.map((act) => (
              <div key={act.id} className="relative pl-7 text-xs">
                <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-[#5B5FFF] border-2 border-[#0B1020]" />
                <p className="font-semibold text-slate-200 leading-snug">{act.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400">{act.time}</span>
                  <Badge variant="purple" className="text-[9px] py-0">
                    {act.tag}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
