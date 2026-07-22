import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Search,
  ShoppingCart,
  AlertTriangle,
  FileText,
  Send,
} from 'lucide-react';
import { SalesChallan, INITIAL_CHALLANS, INITIAL_CUSTOMERS, INITIAL_PRODUCTS, SalesItem } from '../services/mockData';
import { fetchChallans, createChallan } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { InvoicePreviewModal } from '../components/layout/InvoicePreviewModal';
import { useToast } from '../context/ToastContext';

export const SalesChallanView: React.FC = () => {
  const [challans, setChallans] = useState<SalesChallan[]>(INITIAL_CHALLANS);
  const [loading, setLoading] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [previewChallan, setPreviewChallan] = useState<SalesChallan | null>(null);
  const { addToast } = useToast();

  // Builder Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState(INITIAL_CUSTOMERS[0].id);
  const [items, setItems] = useState<SalesItem[]>([
    {
      id: 'builder-1',
      productId: INITIAL_PRODUCTS[0].id,
      productName: INITIAL_PRODUCTS[0].name,
      quantity: 2,
      unitPrice: INITIAL_PRODUCTS[0].price,
      totalPrice: INITIAL_PRODUCTS[0].price * 2,
    },
  ]);
  const [notes, setNotes] = useState('Standard dispatch terms via FedEx.');
  const [challanStatus, setChallanStatus] = useState<SalesChallan['status']>('CONFIRMED');

  const selectedCustomer = INITIAL_CUSTOMERS.find(c => c.id === selectedCustomerId) || INITIAL_CUSTOMERS[0];

  React.useEffect(() => {
    fetchChallans()
      .then((result) => setChallans(result))
      .catch(() => {
        addToast('warning', 'Challan API unavailable', 'Loaded cached challan preview.');
      })
      .finally(() => setLoading(false));
  }, [addToast]);

  const addItemToChallan = (prodId: string) => {
    const prod = INITIAL_PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    const existingIndex = items.findIndex(i => i.productId === prodId);
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice = updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setItems(updated);
    } else {
      setItems([
        ...items,
        {
          id: `item-${Date.now()}-${Math.random()}`,
          productId: prod.id,
          productName: prod.name,
          quantity: 1,
          unitPrice: prod.price,
          totalPrice: prod.price,
        },
      ]);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.id === itemId) {
            const newQty = Math.max(1, i.quantity + delta);
            return { ...i, quantity: newQty, totalPrice: newQty * i.unitPrice };
          }
          return i;
        })
        .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);
  const taxAmount = subtotal * 0.18;
  const grandTotal = subtotal + taxAmount;

  const handleCreateChallan = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      addToast('error', 'Empty Order', 'Please add at least one product to the sales challan.');
      return;
    }

    // Check negative stock validation
    for (const item of items) {
      const prod = INITIAL_PRODUCTS.find(p => p.id === item.productId);
      if (prod && item.quantity > prod.stockQuantity && challanStatus === 'CONFIRMED') {
        addToast(
          'error',
          'Insufficient Stock',
          `Cannot confirm order: Requested ${item.quantity} units of ${prod.name}, but only ${prod.stockQuantity} in stock.`
        );
        return;
      }
    }

    const newChallan: SalesChallan = {
      id: `ch-${Date.now()}`,
      challanNumber: `CH-2026-00${900 + challans.length + 1}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerCompany: selectedCustomer.company,
      status: challanStatus,
      items: items,
      subtotal: subtotal,
      taxAmount: taxAmount,
      grandTotal: grandTotal,
      notes: notes,
      createdBy: 'Alex',
      date: new Date().toISOString().split('T')[0],
    };

    createChallan(newChallan)
      .then((saved) => {
        setChallans([saved, ...challans]);
        addToast('success', 'Sales Challan Created', `${saved.challanNumber} has been generated.`);
      })
      .catch(() => {
        setChallans([newChallan, ...challans]);
        addToast('warning', 'Challan queued locally', 'Created challan preview in the UI.');
      })
      .finally(() => {
        setIsBuilderOpen(false);
      });
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#7C3AED]" /> Sales Challan & Order Invoicing
          </h2>
          <p className="text-xs text-slate-400">Create delivery challans, calculate live taxes & verify stock allocation</p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          size="sm"
          onClick={() => setIsBuilderOpen(true)}
        >
          Create Sales Challan
        </Button>
      </div>

      {/* Challan List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challans.map(ch => (
          <GlassCard key={ch.id} className="flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#00D4FF]">{ch.challanNumber}</span>
                <Badge variant={ch.status === 'CONFIRMED' ? 'success' : ch.status === 'DRAFT' ? 'warning' : 'danger'}>
                  {ch.status}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors">
                {ch.customerName}
              </h3>
              <p className="text-xs text-slate-400">{ch.customerCompany}</p>

              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-end text-slate-300">
                  <div>
                    <div className="text-[10px] text-slate-400">Item Count</div>
                    <div className="font-mono font-bold text-white">{ch.items.length} {ch.items.length === 1 ? 'item' : 'items'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Grand Total</div>
                    <div className="font-mono font-bold text-white">₹{ch.grandTotal.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500">{ch.date}</span>
              <Button
                variant="outline"
                size="sm"
                icon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => setPreviewChallan(ch)}
              >
                Preview Invoice
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Interactive Order Builder Modal */}
      <Modal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} title="Interactive Sales Challan Order Builder" maxWidth="max-w-4xl">
        <form onSubmit={handleCreateChallan} className="space-y-6">
          {/* Customer Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Account / Customer</label>
              <select
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-medium"
              >
                {INITIAL_CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.company})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Challan Execution Status</label>
              <select
                value={challanStatus}
                onChange={e => setChallanStatus(e.target.value as SalesChallan['status'])}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-medium"
              >
                <option value="CONFIRMED">CONFIRMED (Auto Reduce Inventory)</option>
                <option value="DRAFT">DRAFT (Hold Stock Reserve)</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          {/* Add Product Selector Bar */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Quick Add Product Line</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {INITIAL_PRODUCTS.map(p => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => addItemToChallan(p.id)}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D4FF] text-xs font-medium text-slate-200 hover:text-white shrink-0 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>{p.name}</span>
                  <span className="font-mono text-slate-400">₹{p.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Items Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/10 text-slate-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Product Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Subtotal</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{item.productName}</td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2 border border-white/10 rounded-lg p-1 bg-black/40">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-white px-1">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">₹{item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-bold text-[#00D4FF]">₹{item.totalPrice.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (GST 18%)</span>
                <span className="font-mono text-white">₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                <span>Grand Total</span>
                <span className="font-mono text-[#00D4FF]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <Button variant="ghost" size="sm" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm" icon={<Send className="w-4 h-4" />}>
              Generate Challan & Update Stock
            </Button>
          </div>
        </form>
      </Modal>

      {/* Invoice Modal */}
      <InvoicePreviewModal
        isOpen={!!previewChallan}
        onClose={() => setPreviewChallan(null)}
        challan={previewChallan}
      />
    </div>
  );
};
