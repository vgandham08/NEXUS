export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SALES' | 'WAREHOUSE' | 'ACCOUNTS';
  avatar: string;
  department: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'NEW' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';
  tags: string[];
  avatar: string;
  pinned: boolean;
  totalSpent: number;
  lastActive: string;
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  notes: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  minStockLevel: number;
  warehouseLocation: string;
  imageUrl: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface StockLog {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  referenceNo: string;
  reason: string;
  date: string;
  user: string;
}

export interface SalesItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SalesChallan {
  id: string;
  challanNumber: string;
  customerId: string;
  customerName: string;
  customerCompany: string;
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELLED';
  items: SalesItem[];
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  notes: string;
  createdBy: string;
  date: string;
}

export interface FollowUp {
  id: string;
  customerId: string;
  customerName: string;
  note: string;
  dueDate: string;
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AiPrediction {
  churnAlerts: Array<{ customerId: string; customerName: string; riskScore: number; reason: string }>;
  restockAlerts: Array<{ productId: string; productName: string; daysRemaining: number; suggestedOrder: number }>;
  salesForecast: Array<{ month: string; predictedRevenue: number; actualRevenue?: number }>;
  recommendations: Array<{ id: string; title: string; category: string; impact: 'HIGH' | 'MEDIUM'; description: string }>;
}

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex',
    email: 'alex@gmail.com',
    role: 'ADMIN',
    avatar: '',
    department: 'Executive Management',
  },
  {
    id: 'usr-2',
    name: 'Rajesh',
    email: 'sarah@gmail.com',
    role: 'SALES',
    avatar: '',
    department: 'Sales & Growth',
  },
  {
    id: 'usr-3',
    name: 'John',
    email: 'mike@gmail.com',
    role: 'WAREHOUSE',
    avatar: '',
    department: 'Logistics & Stock',
  },
  {
    id: 'usr-4',
    name: 'Siri',
    email: 'nina@gmail.com',
    role: 'ACCOUNTS',
    avatar: '',
    department: 'Finance & Taxation',
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Aisha Kumar',
    email: 'aisha.kumar@example.com',
    phone: '+91 98765 43210',
    company: 'Kumar Trading Co',
    status: 'WON',
    tags: ['Enterprise', 'VIP', 'Annual Contract'],
    avatar: '',
    pinned: true,
    totalSpent: 142500,
    lastActive: '2 hours ago',
    churnRisk: 'LOW',
    notes: 'Key account. Requested quarterly inventory reports.',
  },
  {
    id: 'cust-103',
    name: 'Priya Mehta',
    email: 'priya.mehta@example.com',
    phone: '+91 99887 66554',
    company: 'Mehta IoT Works',
    status: 'QUALIFIED',
    tags: ['Robotics', 'Mid-Market'],
    avatar: '',
    pinned: false,
    totalSpent: 34200,
    lastActive: '3 hours ago',
    churnRisk: 'LOW',
    notes: 'Interested in inventory sync modules.',
  },
  {
    id: 'cust-104',
    name: 'Aman Gupta',
    email: 'aman.gupta@example.com',
    phone: '+91 99900 11223',
    company: 'Gupta Electronics',
    status: 'WON',
    tags: ['Hardware', 'Strategic Partner'],
    avatar: '',
    pinned: true,
    totalSpent: 215000,
    lastActive: 'Just now',
    churnRisk: 'LOW',
    notes: 'Primary customer for rack and server units.',
  },
  {
    id: 'cust-105',
    name: 'Neha Sharma',
    email: 'neha.sharma@example.com',
    phone: '+91 94455 66778',
    company: 'Sharma Retail',
    status: 'LOST',
    tags: ['Retail', 'Price Sensitive'],
    avatar: '',
    pinned: false,
    totalSpent: 12400,
    lastActive: '2 weeks ago',
    churnRisk: 'HIGH',
    notes: 'Chose a local competitor due to freight costs. Re-evaluate in 6 months.',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Nexus Core Gateway Pro',
    sku: 'NX-GW-900',
    category: 'Hardware & Routers',
    price: 1299.00,
    stockQuantity: 84,
    minStockLevel: 25,
    warehouseLocation: 'Rack A - Bin 04',
    imageUrl: '',
    status: 'IN_STOCK',
  },
  {
    id: 'prod-2',
    name: 'Quantum Thermal Sensor Unit',
    sku: 'TS-Q200',
    category: 'IoT Sensors',
    price: 349.50,
    stockQuantity: 12,
    minStockLevel: 20,
    warehouseLocation: 'Rack B - Bin 12',
    imageUrl: '',
    status: 'LOW_STOCK',
  },
  {
    id: 'prod-3',
    name: 'Enterprise Server Blade X86',
    sku: 'SB-X86-ENT',
    category: 'Servers',
    price: 4850.00,
    stockQuantity: 42,
    minStockLevel: 10,
    warehouseLocation: 'Rack C - Bin 01',
    imageUrl: '',
    status: 'IN_STOCK',
  },
  {
    id: 'prod-4',
    name: 'Fiber Optic Transceiver 100G',
    sku: 'FO-100G-SFP',
    category: 'Networking',
    price: 189.00,
    stockQuantity: 5,
    minStockLevel: 15,
    warehouseLocation: 'Rack D - Bin 08',
    imageUrl: '',
    status: 'LOW_STOCK',
  },
  {
    id: 'prod-5',
    name: 'Industrial Smart Battery Wall',
    sku: 'BAT-IND-48V',
    category: 'Power Management',
    price: 2490.00,
    stockQuantity: 0,
    minStockLevel: 5,
    warehouseLocation: 'Rack E - Bin 02',
    imageUrl: '',
    status: 'OUT_OF_STOCK',
  },
];

export const INITIAL_CHALLANS: SalesChallan[] = [
  {
    id: 'ch-901',
    challanNumber: 'CH-2026-00901',
    customerId: 'cust-101',
    customerName: 'TechCorp Industries',
    customerCompany: 'TechCorp Global LLC',
    status: 'CONFIRMED',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Nexus Core AI Gateway Pro',
        quantity: 10,
        unitPrice: 1299.00,
        totalPrice: 12990.00,
      },
      {
        id: 'item-2',
        productId: 'prod-3',
        productName: 'Enterprise Server Blade X86',
        quantity: 2,
        unitPrice: 4850.00,
        totalPrice: 9700.00,
      },
    ],
    subtotal: 22690.00,
    taxAmount: 4084.20,
    grandTotal: 26774.20,
    notes: 'Priority dispatch requested via FedEx Express.',
    createdBy: 'Alex Vance',
    date: '2026-07-20',
  },
  {
    id: 'ch-902',
    challanNumber: 'CH-2026-00902',
    customerId: 'cust-104',
    customerName: 'Cyberdyne Systems',
    customerCompany: 'Cyberdyne AI Hardware',
    status: 'CONFIRMED',
    items: [
      {
        id: 'item-3',
        productId: 'prod-1',
        productName: 'Nexus Core AI Gateway Pro',
        quantity: 5,
        unitPrice: 1299.00,
        totalPrice: 6495.00,
      },
    ],
    subtotal: 6495.00,
    taxAmount: 1169.10,
    grandTotal: 7664.10,
    notes: 'Standard delivery terms apply.',
    createdBy: 'Sarah Connor',
    date: '2026-07-21',
  },
  {
    id: 'ch-903',
    challanNumber: 'CH-2026-00903',
    customerId: 'cust-103',
    customerName: 'Priya Mehta',
    customerCompany: 'Mehta IoT Works',
    status: 'DRAFT',
    items: [
      {
        id: 'item-4',
        productId: 'prod-2',
        productName: 'Quantum Thermal Sensor Unit',
        quantity: 15,
        unitPrice: 349.50,
        totalPrice: 5242.50,
      },
    ],
    subtotal: 5242.50,
    taxAmount: 943.65,
    grandTotal: 6186.15,
    notes: 'Awaiting purchase order sign-off.',
    createdBy: 'Sarah Connor',
    date: '2026-07-22',
  },
];

export const INITIAL_STOCK_LOGS: StockLog[] = [
  {
    id: 'log-1',
    productId: 'prod-1',
    productName: 'Nexus Core AI Gateway Pro',
    sku: 'NX-GW-900',
    type: 'OUT',
    quantity: 10,
    referenceNo: 'CH-2026-00901',
    reason: 'Sales Order Dispatch',
    date: '2026-07-20 14:30',
    user: 'Marcus Brody',
  },
  {
    id: 'log-2',
    productId: 'prod-3',
    productName: 'Enterprise Server Blade X86',
    sku: 'SB-X86-ENT',
    type: 'IN',
    quantity: 50,
    referenceNo: 'PO-9941-FACTORY',
    reason: 'Supplier Shipment Arrival',
    date: '2026-07-19 09:15',
    user: 'Marcus Brody',
  },
  {
    id: 'log-3',
    productId: 'prod-5',
    productName: 'Industrial Smart Battery Wall',
    sku: 'BAT-IND-48V',
    type: 'OUT',
    quantity: 8,
    referenceNo: 'CH-2026-00898',
    reason: 'Sales Order Dispatch',
    date: '2026-07-18 16:45',
    user: 'Marcus Brody',
  },
];

export const INITIAL_FOLLOWUPS: FollowUp[] = [
  {
    id: 'fol-1',
    customerId: 'cust-103',
    customerName: 'Priya Mehta',
    note: 'Schedule final demo for Q3 sensor deployment contract.',
    dueDate: '2026-07-24',
    completed: false,
    priority: 'HIGH',
  },
  {
    id: 'fol-2',
    customerId: 'cust-103',
    customerName: 'Vortex Dynamics',
    note: 'Send updated quotation with bulk discount for hardware gateways.',
    dueDate: '2026-07-25',
    completed: false,
    priority: 'MEDIUM',
  },
  {
    id: 'fol-3',
    customerId: 'cust-101',
    customerName: 'TechCorp Industries',
    note: 'Quarterly account executive check-in and satisfaction survey.',
    dueDate: '2026-07-28',
    completed: true,
    priority: 'LOW',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-101',
    userId: 'usr-1',
    userName: 'Alex Vance',
    userRole: 'ADMIN',
    action: 'USER_ROLE_UPDATE',
    details: 'Changed role permissions for Marcus Brody (WAREHOUSE)',
    ipAddress: '192.168.1.104',
    timestamp: '2026-07-22 15:40:12',
  },
  {
    id: 'audit-102',
    userId: 'usr-2',
    userName: 'Sarah Connor',
    userRole: 'SALES',
    action: 'SALES_CHALLAN_CREATE',
    details: 'Created Draft Sales Challan #CH-2026-00903',
    ipAddress: '192.168.1.112',
    timestamp: '2026-07-22 14:15:00',
  },
  {
    id: 'audit-103',
    userId: 'usr-3',
    userName: 'Marcus Brody',
    userRole: 'WAREHOUSE',
    action: 'INVENTORY_STOCK_UPDATE',
    details: 'Dispatched 10 units of NX-GW-900 for Order CH-2026-00901',
    ipAddress: '192.168.1.120',
    timestamp: '2026-07-20 14:31:05',
  },
];

export const INITIAL_AI_PREDICTIONS: AiPrediction = {
  churnAlerts: [
    {
      customerId: 'cust-105',
      customerName: 'Starlight Retailers',
      riskScore: 88,
      reason: 'No order activity in 45 days. Competitor price check detected.',
    },
    {
      customerId: 'cust-103',
      customerName: 'Priya Mehta',
      riskScore: 42,
      reason: 'Proposal decision delayed past average buyer cycle.',
    },
  ],
  restockAlerts: [
    {
      productId: 'prod-2',
      productName: 'Quantum Thermal Sensor Unit',
      daysRemaining: 4,
      suggestedOrder: 35,
    },
    {
      productId: 'prod-4',
      productName: 'Fiber Optic Transceiver 100G',
      daysRemaining: 2,
      suggestedOrder: 50,
    },
    {
      productId: 'prod-5',
      productName: 'Industrial Smart Battery Wall',
      daysRemaining: 0,
      suggestedOrder: 20,
    },
  ],
  salesForecast: [
    { month: 'Jan', actualRevenue: 120000, predictedRevenue: 118000 },
    { month: 'Feb', actualRevenue: 145000, predictedRevenue: 140000 },
    { month: 'Mar', actualRevenue: 160000, predictedRevenue: 165000 },
    { month: 'Apr', actualRevenue: 185000, predictedRevenue: 180000 },
    { month: 'May', actualRevenue: 210000, predictedRevenue: 205000 },
    { month: 'Jun', actualRevenue: 245000, predictedRevenue: 240000 },
    { month: 'Jul', actualRevenue: 280000, predictedRevenue: 275000 },
    { month: 'Aug', predictedRevenue: 310000 },
    { month: 'Sep', predictedRevenue: 345000 },
  ],
  recommendations: [
    {
      id: 'rec-1',
      title: 'Restock TS-Q200 Immediately',
      category: 'Inventory Optimization',
      impact: 'HIGH',
      description: 'Stock for Quantum Thermal Sensor will deplete in 4 days. Restocking 35 units prevents an estimated $12,230 revenue loss.',
    },
    {
      id: 'rec-2',
      title: 'VIP Re-engagement: TechCorp Industries',
      category: 'CRM & Sales Growth',
      impact: 'HIGH',
      description: 'TechCorp has reached $140k lifetime spending. Offering an annual 8% volume rebate will seal a 2-year enterprise lock-in.',
    },
    {
      id: 'rec-3',
      title: 'Warehouse Rack Re-allocation',
      category: 'Logistics Efficiency',
      impact: 'MEDIUM',
      description: 'Move Nexus Core AI Gateway Pro from Rack A to Packing Station 1 to reduce order fulfillment lead time by 14 minutes per order.',
    },
  ],
};
