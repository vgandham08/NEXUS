import React from 'react';
import { Printer, Download, CheckCircle2, Building2, Calendar, FileText, QrCode } from 'lucide-react';
import { SalesChallan } from '../../services/mockData';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  challan: SalesChallan | null;
}

export const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  isOpen,
  onClose,
  challan,
}) => {
  if (!challan) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="space-y-6 text-slate-200 printable-area">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center font-bold text-white text-sm shadow-glow-primary">
                NX
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">NexusERP</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Smart Business Operations Platform</p>
          </div>

          <div className="text-left sm:text-right">
            <h2 className="text-2xl font-black text-white tracking-wider">SALES CHALLAN</h2>
            <p className="text-sm font-mono text-[#00D4FF] font-semibold">{challan.challanNumber}</p>
            <div className="mt-1">
              <Badge variant={challan.status === 'CONFIRMED' ? 'success' : challan.status === 'DRAFT' ? 'warning' : 'danger'}>
                {challan.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bill To & Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#5B5FFF]" /> Customer Details
            </span>
            <h4 className="text-sm font-bold text-white mt-1">{challan.customerName}</h4>
            <p className="text-slate-300">{challan.customerCompany}</p>
            <p className="text-slate-400 mt-1">GSTIN: 27AAAAA0000A1Z5</p>
          </div>

          <div className="sm:text-right space-y-1">
            <div>
              <span className="text-slate-400">Date: </span>
              <span className="font-medium text-white">{challan.date}</span>
            </div>
            <div>
              <span className="text-slate-400">Created By: </span>
              <span className="font-medium text-white">{challan.createdBy}</span>
            </div>
            <div>
              <span className="text-slate-400">Dispatch Location: </span>
              <span className="font-medium text-white">Central Warehouse Rack A</span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/10 text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {challan.items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="p-3 text-slate-400">{idx + 1}</td>
                  <td className="p-3 font-semibold text-white">{item.productName}</td>
                  <td className="p-3 text-right font-mono text-slate-300">{item.quantity}</td>
                  <td className="p-3 text-right font-mono text-slate-300">₹{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 text-right font-mono font-bold text-[#00D4FF]">₹{item.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Totals & QR */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2 rounded-lg bg-white/10 text-[#00D4FF]">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification Hash</p>
              <p className="text-[10px] font-mono text-slate-300 truncate max-w-[180px]">e9f8a3b2c1d0-nexus-ver</p>
            </div>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono text-white">₹{challan.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax (GST 18%)</span>
              <span className="font-mono text-white">₹{challan.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
              <span>Grand Total</span>
              <span className="font-mono text-[#00D4FF]">₹{challan.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 no-print">
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />} size="sm" onClick={() => alert('Challan exported as PDF!')}>
            Download PDF
          </Button>
          <Button variant="primary" icon={<Printer className="w-4 h-4" />} size="sm" onClick={handlePrint}>
            Print Challan
          </Button>
        </div>
      </div>
    </Modal>
  );
};
