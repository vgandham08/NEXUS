import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Filter,
  Pin,
  Star,
  Building2,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Customer, INITIAL_CUSTOMERS } from '../services/mockData';
import { fetchCustomers, createCustomer } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'NEW' as Customer['status'],
    tags: 'Enterprise, Tech',
    notes: '',
  });

  useEffect(() => {
    fetchCustomers()
      .then((result) => {
        setCustomers(result);
      })
      .catch(() => {
        addToast('warning', 'Customer API unavailable', 'Loaded cached customer data.');
      })
      .finally(() => setLoading(false));
  }, [addToast]);

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomers(prev =>
      prev.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
    addToast('info', 'Customer Pin Updated');
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      status: formData.status,
      tags: formData.tags.split(',').map(t => t.trim()),
      avatar: '',
      pinned: false,
      totalSpent: 0,
      lastActive: 'Just now',
      churnRisk: 'LOW',
      notes: formData.notes,
    };

    createCustomer(newCust)
      .then((saved) => {
        setCustomers([saved, ...customers]);
        addToast('success', 'Customer Added', `${saved.name} added to CRM pipeline.`);
      })
      .catch(() => {
        setCustomers([newCust, ...customers]);
        addToast('warning', 'Customer queued locally', 'Added customer to preview list.');
      })
      .finally(() => {
        setIsAddModalOpen(false);
        setFormData({ name: '', email: '', phone: '', company: '', status: 'NEW', tags: 'Enterprise', notes: '' });
      });
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusVariants = {
    NEW: 'info',
    QUALIFIED: 'purple',
    PROPOSAL: 'warning',
    WON: 'success',
    LOST: 'danger',
  } as const;

  return (
    <div className="space-y-6">
      {/* CRM Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#5B5FFF]" /> Customer CRM
          </h2>
          <p className="text-xs text-slate-400">Manage business profiles, lead pipeline & engagement history</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2 rounded-xl glass-input text-xs font-medium w-60"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Pipeline Statuses</option>
            <option value="NEW">New Lead</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL">Proposal Sent</option>
            <option value="WON">Closed Won</option>
            <option value="LOST">Lost</option>
          </select>

          <Button variant="primary" icon={<Plus className="w-4 h-4" />} size="sm" onClick={() => setIsAddModalOpen(true)}>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <GlassCard
            key={customer.id}
            className="relative flex flex-col justify-between group"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors">
                    {customer.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500" /> {customer.company}
                  </p>
                </div>

                <button
                  onClick={e => togglePin(customer.id, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    customer.pinned ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Status Badge & Churn Indicator */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={statusVariants[customer.status]}>{customer.status}</Badge>
                {customer.churnRisk === 'HIGH' && (
                  <Badge variant="danger" className="text-[10px]">
                    HIGH CHURN RISK
                  </Badge>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> {customer.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> {customer.phone}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {customer.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Lifetime Stats */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Spend</span>
                <span className="font-extrabold text-white font-mono">
                  ₹{customer.totalSpent.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Active {customer.lastActive}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New CRM Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. Robert Ford"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. Delos Inc"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. rford@delos.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Lead Pipeline Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Customer['status'] })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                <option value="NEW">New Lead</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL">Proposal Sent</option>
                <option value="WON">Closed Won</option>
                <option value="LOST">Lost</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Customer Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              placeholder="Add key account executive details..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
