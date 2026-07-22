import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { INITIAL_AI_PREDICTIONS } from '../services/mockData';
import { fetchAiPredictions } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const AiInsightsView: React.FC = () => {
  const { addToast } = useToast();
  const [aiData, setAiData] = useState(INITIAL_AI_PREDICTIONS);

  useEffect(() => {
    fetchAiPredictions()
      .then(setAiData)
      .catch(() => {
        addToast('warning', 'Insights unavailable', 'Loaded demo recommendations.');
      });
  }, [addToast]);

  const handleExecuteAction = (title: string) => {
    addToast('success', 'Action Completed', `Automation routine triggered for: ${title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard className="relative overflow-hidden bg-gradient-to-r from-[#00D4FF]/20 via-[#5B5FFF]/20 to-[#7C3AED]/20 border-[#00D4FF]/30">
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="purple" className="text-[10px]">
                Simple Insights
              </Badge>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
              Easy Business Tips
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Quick and easy notes about customers, stock, and sales that are simple to understand.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-8 h-8 text-[#00D4FF] animate-pulse" />
          </div>
        </div>
      </GlassCard>

      {/* Top 3 Insight Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Churn Risk Predictor */}
        <GlassCard className="border-rose-500/20 bg-rose-500/5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-rose-400" /> Customers Who May Leave
          </h3>
          <p className="text-xs text-slate-400 mb-4">Simple notes about customers who might stop buying soon</p>

          <div className="space-y-3">
            {aiData.churnAlerts.map(alert => (
              <div key={alert.customerId} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{alert.customerName}</span>
                  <Badge variant="danger" className="text-[10px]">
                    Risk {alert.riskScore}%
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-300">{alert.reason}</p>
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[10px] py-1 px-2.5"
                    onClick={() => handleExecuteAction(`Offer help to ${alert.customerName}`)}
                  >
                    Send Offer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Restock Prediction Engine */}
        <GlassCard className="border-amber-500/20 bg-amber-500/5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Stock Need Suggestions
          </h3>
          <p className="text-xs text-slate-400 mb-4">Easy advice on what to order next</p>

          <div className="space-y-3">
            {aiData.restockRecommendations?.map((item: any) => (
              <div key={item.productId} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.productName}</span>
                  <Badge variant={item.daysUntilDepletion === 0 ? 'danger' : 'warning'} className="text-[10px]">
                    {item.daysUntilDepletion === 0 ? 'DEPLETED' : `${item.daysUntilDepletion} DAYS LEFT`}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-300">
                  Suggested Purchase Order: <span className="font-mono text-[#00D4FF] font-bold">{item.recommendedOrderQty} units</span>
                </p>
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-[10px] py-1 px-2.5"
                    onClick={() => handleExecuteAction(`Order ${item.recommendedOrderQty} units for ${item.productName}`)}
                  >
                    Make Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Smart Recommendations */}
        <GlassCard className="border-[#00D4FF]/20 bg-[#00D4FF]/5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[#00D4FF]" /> Simple Action Ideas
          </h3>
          <p className="text-xs text-slate-400 mb-4">Short and clear suggestions for the next steps</p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Bulk Discount Strategy</span>
                <Badge variant="purple" className="text-[9px]">
                  CRM
                </Badge>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Offer a 5% discount on enterprise router bundles for high-volume accounts to prevent churn.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Reorder Point Safety</span>
                <Badge variant="purple" className="text-[9px]">
                  Inventory
                </Badge>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Increase minimum safety threshold for Switches to 15 units due to lead time changes.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Revenue Forecast Area Chart */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00D4FF]" /> Sales Forecast
              </h3>
              <p className="text-xs text-slate-400">A simple chart showing recent and expected sales.</p>
            </div>
            <Badge variant="info">Easy View</Badge>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={INITIAL_AI_PREDICTIONS.salesForecast} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="actualRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(11, 16, 32, 0.95)',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
              <Area type="monotone" dataKey="actualRevenue" name="Actual Revenue (₹)" stroke="#5B5FFF" fill="url(#actualRev)" strokeWidth={3} />
              <Area type="monotone" dataKey="predictedRevenue" name="Projected Revenue (₹)" stroke="#00D4FF" strokeDasharray="5 5" fill="url(#predRev)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
