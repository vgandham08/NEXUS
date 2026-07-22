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

export interface AiPrediction {
  churnAlerts: Array<{
    customerId: string;
    customerName: string;
    riskScore: number;
    reason: string;
  }>;
  restockAlerts?: Array<{
    productId: string;
    productName: string;
    daysRemaining: number;
    suggestedOrder: number;
  }>;
  restockRecommendations?: Array<{
    productId: string;
    productName: string;
    sku: string;
    daysUntilDepletion: number;
    recommendedOrderQty: number;
  }>;
  salesForecast: Array<{
    month: string;
    actualRevenue?: number;
    predictedRevenue: number;
  }>;
  recommendations?: Array<{
    id: string;
    title: string;
    category: string;
    impact: string;
    description: string;
  }>;
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

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex',
    email: 'admin@nexuserp.ai',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Executive Management',
  },
  {
    id: 'usr-2',
    name: 'Rajesh',
    email: 'sales@nexuserp.ai',
    role: 'SALES',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'Sales & Growth',
  },
  {
    id: 'usr-3',
    name: 'John',
    email: 'warehouse@nexuserp.ai',
    role: 'WAREHOUSE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Logistics & Stock',
  },
  {
    id: 'usr-4',
    name: 'Siri',
    email: 'accounts@nexuserp.ai',
    role: 'ACCOUNTS',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Finance & Taxation',
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'TechCorp Industries',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 234-5678',
    company: 'TechCorp Global LLC',
    status: 'WON',
    tags: ['Enterprise', 'VIP', 'Annual Contract'],
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    pinned: true,
    totalSpent: 142500,
    lastActive: '2 hours ago',
    churnRisk: 'LOW',
    notes: 'Key enterprise account. Requested quarterly inventory reports.',
  },
  {
    id: 'cust-102',
    name: 'Apex BioLabs',
    email: 'procurement@apexbio.io',
    phone: '+1 (555) 876-5432',
    company: 'Apex Pharmaceuticals Inc',
    status: 'PROPOSAL',
    tags: ['Healthcare', 'High Volume'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    pinned: true,
    totalSpent: 89400,
    lastActive: '1 day ago',
    churnRisk: 'MEDIUM',
    notes: 'Pending Q3 hardware contract renewal. Proposal sent.',
  },
  {
    id: 'cust-103',
    name: 'Vortex Dynamics',
    email: 'info@vortextotech.org',
    phone: '+1 (555) 432-1098',
    company: 'Vortex Automation Solutions',
    status: 'QUALIFIED',
    tags: ['Robotics', 'Mid-Market'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    pinned: false,
    totalSpent: 34200,
    lastActive: '3 hours ago',
    churnRisk: 'LOW',
    notes: 'Interested in AI-driven inventory sync modules.',
  },
  {
    id: 'cust-104',
    name: 'Cyberdyne Systems',
    email: 'ops@cyberdyne.net',
    phone: '+1 (555) 998-1122',
    company: 'Cyberdyne AI Hardware',
    status: 'WON',
    tags: ['AI Hardware', 'Strategic Partner'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    pinned: true,
    totalSpent: 215000,
    lastActive: 'Just now',
    churnRisk: 'LOW',
    notes: 'Primary customer for Server Rack Alpha units.',
  },
  {
    id: 'cust-105',
    name: 'Starlight Retailers',
    email: 'buyers@starlight.store',
    phone: '+1 (555) 334-7788',
    company: 'Starlight Consumer Brands',
    status: 'LOST',
    tags: ['E-commerce', 'Price Sensitive'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
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
    name: 'Wi-Fi Router',
    sku: 'NET-001',
    category: 'Routers',
    price: 75.00,
    stockQuantity: 60,
    minStockLevel: 15,
    warehouseLocation: 'Shelf A - 01',
    status: 'IN_STOCK',
  },
  {
    id: 'prod-2',
    name: '8-Port Ethernet Switch',
    sku: 'NET-002',
    category: 'Networking',
    price: 55.00,
    stockQuantity: 12,
    minStockLevel: 20,
    warehouseLocation: 'Shelf A - 02',
    status: 'LOW_STOCK',
  },
  {
    id: 'prod-3',
    name: 'Network Cable',
    sku: 'NET-003',
    category: 'Cables',
    price: 12.00,
    stockQuantity: 40,
    minStockLevel: 10,
    warehouseLocation: 'Shelf B - 01',
    status: 'IN_STOCK',
  },
  {
    id: 'prod-4',
    name: 'USB Wi-Fi Adapter',
    sku: 'NET-004',
    category: 'Adapters',
    price: 18.00,
    stockQuantity: 8,
    minStockLevel: 10,
    warehouseLocation: 'Shelf B - 02',
    status: 'LOW_STOCK',
  },
  {
    id: 'prod-5',
    name: 'Power Strip',
    sku: 'NET-005',
    category: 'Power Supplies',
    price: 22.00,
    stockQuantity: 0,
    minStockLevel: 5,
    warehouseLocation: 'Shelf C - 01',
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
        productName: 'Wi-Fi Router',
        quantity: 10,
        unitPrice: 1299.00,
        totalPrice: 12990.00,
      },
      {
        id: 'item-2',
        productId: 'prod-3',
        productName: 'Network Cable',
        quantity: 2,
        unitPrice: 4850.00,
        totalPrice: 9700.00,
      },
    ],
    subtotal: 22690.00,
    taxAmount: 4084.20,
    grandTotal: 26774.20,
    notes: 'Priority dispatch requested via FedEx Express.',
    createdBy: 'Alex',
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
        productName: 'Wi-Fi Router',
        quantity: 5,
        unitPrice: 1299.00,
        totalPrice: 6495.00,
      },
    ],
    subtotal: 6495.00,
    taxAmount: 1169.10,
    grandTotal: 7664.10,
    notes: 'Standard delivery terms apply.',
    createdBy: 'Rajesh',
    date: '2026-07-21',
  },
  {
    id: 'ch-903',
    challanNumber: 'CH-2026-00903',
    customerId: 'cust-102',
    customerName: 'Apex BioLabs',
    customerCompany: 'Apex Pharmaceuticals Inc',
    status: 'DRAFT',
    items: [
      {
        id: 'item-4',
        productId: 'prod-2',
        productName: '8-Port Ethernet Switch',
        quantity: 15,
        unitPrice: 349.50,
        totalPrice: 5242.50,
      },
    ],
    subtotal: 5242.50,
    taxAmount: 943.65,
    grandTotal: 6186.15,
    notes: 'Awaiting purchase order sign-off.',
    createdBy: 'Rajesh',
    date: '2026-07-22',
  },
];

export const INITIAL_STOCK_LOGS: StockLog[] = [
  {
    id: 'log-1',
    productId: 'prod-1',
    productName: 'Wi-Fi Router',
    sku: 'NET-001',
    type: 'OUT',
    quantity: 10,
    referenceNo: 'CH-2026-00901',
    reason: 'Sales Order Dispatch',
    date: '2026-07-20 14:30',
    user: 'John',
  },
  {
    id: 'log-2',
    productId: 'prod-3',
    productName: 'Network Cable',
    sku: 'NET-003',
    type: 'IN',
    quantity: 50,
    referenceNo: 'PO-9941-FACTORY',
    reason: 'Supplier Shipment Arrival',
    date: '2026-07-19 09:15',
    user: 'John',
  },
  {
    id: 'log-3',
    productId: 'prod-5',
    productName: 'Power Strip',
    sku: 'NET-005',
    type: 'OUT',
    quantity: 8,
    referenceNo: 'CH-2026-00898',
    reason: 'Sales Order Dispatch',
    date: '2026-07-18 16:45',
    user: 'John',
  },
];

export const INITIAL_FOLLOWUPS: FollowUp[] = [
  {
    id: 'fol-1',
    customerId: 'cust-102',
    customerName: 'Apex BioLabs',
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
    userName: 'Alex',
    userRole: 'ADMIN',
    action: 'USER_ROLE_UPDATE',
    details: 'Changed role permissions for John (WAREHOUSE)',
    ipAddress: '192.168.1.104',
    timestamp: '2026-07-22 15:40:12',
  },
  {
    id: 'audit-102',
    userId: 'usr-2',
    userName: 'Rajesh',
    userRole: 'SALES',
    action: 'SALES_CHALLAN_CREATE',
    details: 'Created Draft Sales Challan #CH-2026-00903',
    ipAddress: '192.168.1.112',
    timestamp: '2026-07-22 14:15:00',
  },
  {
    id: 'audit-103',
    userId: 'usr-3',
    userName: 'John',
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
      customerId: 'cust-102',
      customerName: 'Apex BioLabs',
      riskScore: 42,
      reason: 'Proposal decision delayed past average buyer cycle.',
    },
  ],
  restockAlerts: [
    {
      productId: 'prod-2',
      productName: '8-Port Ethernet Switch',
      daysRemaining: 4,
      suggestedOrder: 35,
    },
    {
      productId: 'prod-4',
      productName: 'USB Wi-Fi Adapter',
      daysRemaining: 2,
      suggestedOrder: 50,
    },
    {
      productId: 'prod-5',
      productName: 'Power Strip',
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
      title: 'Restock Ethernet Switches',
      category: 'Inventory Optimization',
      impact: 'HIGH',
      description: '8-Port Ethernet Switch stock will deplete in 4 days. Restocking 35 units keeps network orders ready to fulfill.',
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
      description: 'Move Wi-Fi Routers closer to the packing station to reduce order fulfillment time.',
    },
  ],
};