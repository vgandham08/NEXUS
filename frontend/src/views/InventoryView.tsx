import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  MapPin,
  History,
  TrendingDown,
  TrendingUp,
  Layers,
  BarChart3,
  Box,
  Warehouse,
} from 'lucide-react';
import { Product, INITIAL_PRODUCTS, INITIAL_STOCK_LOGS, StockLog } from '../services/mockData';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export const InventoryView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [stockLogs, setStockLogs] = useState<StockLog[]>(INITIAL_STOCK_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Routers',
    price: 75,
    stockQuantity: 50,
    minStockLevel: 15,
    warehouseLocation: 'Shelf A - 01',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
      minStockLevel: Number(formData.minStockLevel),
      warehouseLocation: formData.warehouseLocation,
      status: Number(formData.stockQuantity) <= Number(formData.minStockLevel) ? 'LOW_STOCK' : 'IN_STOCK',
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    addToast('success', 'Product Registered', `${newProd.name} (${newProd.sku}) added to warehouse database.`);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.warehouseLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['ALL', 'Routers', 'Networking', 'Cables', 'Adapters', 'Power Supplies'];

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-[#00D4FF]" /> Product Catalog & Warehouse Inventory
          </h2>
          <p className="text-xs text-slate-400">Warehouse location mapping, live stock meters & movement logs</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search SKU, item or rack..."
              className="pl-9 pr-4 py-2 rounded-xl glass-input text-xs font-medium w-60"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-medium focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'ALL' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <Button variant="secondary" icon={<History className="w-4 h-4" />} size="sm" onClick={() => setIsLogModalOpen(true)}>
            Stock History Log
          </Button>

          <Button variant="primary" icon={<Plus className="w-4 h-4" />} size="sm" onClick={() => setIsAddModalOpen(true)}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Warehouse Visual Quick Rack Status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total SKU Types', val: products.length, icon: Box, color: 'text-[#5B5FFF]' },
          { label: 'Units In Stock', val: products.reduce((acc, p) => acc + p.stockQuantity, 0), icon: Warehouse, color: 'text-[#00D4FF]' },
          { label: 'Low Stock SKU Alerts', val: products.filter(p => p.stockQuantity <= p.minStockLevel && p.stockQuantity > 0).length, icon: AlertTriangle, color: 'text-amber-400' },
          { label: 'Out of Stock', val: products.filter(p => p.stockQuantity === 0).length, icon: TrendingDown, color: 'text-rose-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard key={idx} className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-black text-white">{item.val}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const percent = Math.min(100, Math.round((product.stockQuantity / (product.minStockLevel * 3)) * 100));
          const isLow = product.stockQuantity <= product.minStockLevel;
          const isOut = product.stockQuantity === 0;

          return (
            <GlassCard key={product.id} className="flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <Badge variant={isOut ? 'danger' : isLow ? 'warning' : 'success'}>
                    {isOut ? 'OUT OF STOCK' : isLow ? 'LOW STOCK' : 'IN STOCK'}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-[#00D4FF]">
                    ${product.price.toLocaleString()}
                  </span>
                </div>

                {/* Product Name & SKU */}
                <h3 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">SKU: {product.sku}</p>

                {/* Location */}
                <p className="text-xs text-slate-300 mt-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5B5FFF]" /> {product.warehouseLocation}
                </p>

                {/* Stock Level Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Stock Available</span>
                    <span className={`font-mono font-bold ${isOut ? 'text-rose-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {product.stockQuantity} units
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOut ? 'bg-rose-500' : isLow ? 'bg-amber-400' : 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Min Threshold: {product.minStockLevel} units</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-slate-400 text-[10px]">{product.category}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(product);
                  }}
                >
                  Adjust Stock
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Stock History Log Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="Warehouse Stock Movement History Log" maxWidth="max-w-3xl">
        <div className="space-y-4 text-xs">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Ref No</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stockLogs.map(log => (
                  <tr key={log.id} className="hover:bg-white/5">
                    <td className="p-3 font-mono text-[#00D4FF] font-semibold">{log.referenceNo}</td>
                    <td className="p-3 font-bold text-white">{log.productName}</td>
                    <td className="p-3">
                      <Badge variant={log.type === 'IN' ? 'success' : log.type === 'OUT' ? 'danger' : 'purple'}>
                        {log.type}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-white">{log.quantity}</td>
                    <td className="p-3 text-slate-300">{log.reason}</td>
                    <td className="p-3 text-slate-400">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Inventory Product">
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. Wi-Fi Router"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">SKU Code</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. NET-006"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Unit Price ($)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Initial Quantity</label>
              <input
                type="number"
                required
                value={formData.stockQuantity}
                onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Min Threshold Alert</label>
              <input
                type="number"
                required
                value={formData.minStockLevel}
                onChange={e => setFormData({ ...formData, minStockLevel: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                {categories.filter(c => c !== 'ALL').map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Warehouse Bin Location</label>
              <input
                type="text"
                required
                value={formData.warehouseLocation}
                onChange={e => setFormData({ ...formData, warehouseLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. Shelf B - 02"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Save Inventory Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};