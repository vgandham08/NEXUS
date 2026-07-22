import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, FileText, FileSpreadsheet, Printer, TrendingUp, Users, Package } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const ReportsView: React.FC = () => {
  const { addToast } = useToast();

  const handleExport = (type: 'PDF' | 'CSV' | 'EXCEL', reportName: string) => {
    addToast('success', `${type} Report Generated`, `Downloaded ${reportName} in ${type} format.`);
  };

  const reportModules = [
    { title: 'Executive Revenue & Tax Statement', desc: 'Quarterly breakdown of gross sales, net margins, GST taxation, and operational expenses.', icon: TrendingUp, records: '1,420 rows' },
    { title: 'Warehouse Inventory Audit Log', desc: 'SKU stock levels, rack location mapping, reorder points, and shrinkage telemetry.', icon: Package, records: '48 SKUs' },
    { title: 'Customer Lead Conversion Matrix', desc: 'CRM pipeline velocity, win rates, churn scoring, and enterprise lifetime value.', icon: Users, records: '254 Accounts' },
    { title: 'Sales Challan Fulfillment Summary', desc: 'Itemized order dispatches, delivery statuses, invoice balances, and payment logs.', icon: FileSpreadsheet, records: '904 Orders' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#5B5FFF]" /> Operations Analytics & Export Reports
          </h2>
          <p className="text-xs text-slate-400">Generate executive PDF summaries, CSV raw exports, and tax statements</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<Printer className="w-4 h-4" />} size="sm" onClick={() => window.print()}>
            Print Page
          </Button>
          <Button variant="primary" icon={<Download className="w-4 h-4" />} size="sm" onClick={() => handleExport('EXCEL', 'Full Operations Master')}>
            Export Full Master (Excel)
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportModules.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <GlassCard key={idx} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#00D4FF]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="purple" className="text-[10px]">
                    {rep.records}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-white">{rep.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" icon={<FileText className="w-3.5 h-3.5" />} onClick={() => handleExport('PDF', rep.title)}>
                  PDF
                </Button>
                <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-3.5 h-3.5" />} onClick={() => handleExport('CSV', rep.title)}>
                  CSV
                </Button>
                <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => handleExport('EXCEL', rep.title)}>
                  Excel
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
