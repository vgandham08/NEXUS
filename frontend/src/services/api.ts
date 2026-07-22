import type { User, Customer, Product, SalesChallan, AuditLog, StockLog, AiPrediction } from './mockData';
import { INITIAL_AI_PREDICTIONS } from './mockData';

const API_BASE = '/api';
const STORAGE_TOKEN = 'nexus_token';
const STORAGE_USER = 'nexus_user';

export const getToken = () => localStorage.getItem(STORAGE_TOKEN);
export const saveToken = (token: string) => localStorage.setItem(STORAGE_TOKEN, token);
export const clearToken = () => localStorage.removeItem(STORAGE_TOKEN);
export const getSavedUser = (): User | null => {
  const raw = localStorage.getItem(STORAGE_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};
export const saveUser = (user: User) => localStorage.setItem(STORAGE_USER, JSON.stringify(user));
export const clearSavedUser = () => localStorage.removeItem(STORAGE_USER);

async function apiFetch<T>(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || response.statusText || 'API request failed');
  }

  return data as T;
}

export const login = async (role: User['role'], email?: string) => {
  const payload = { role, email };
  const result = await apiFetch<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  saveToken(result.token);
  saveUser(result.user);
  return result;
};

export const fetchDashboardStats = async () => {
  return apiFetch<{
    revenueToday: number;
    activeOrders: number;
    totalCustomers: number;
    lowStockCount: number;
  }>('/dashboard/stats');
};

export const fetchCustomers = async () => {
  return apiFetch<Customer[]>('/customers');
};

export const createCustomer = async (customer: Partial<Customer>) => {
  return apiFetch<Customer>('/customers', {
    method: 'POST',
    body: JSON.stringify(customer),
  });
};

export const fetchProducts = async () => {
  return apiFetch<Product[]>('/products');
};

export const fetchStockLogs = async () => {
  return apiFetch<StockLog[]>('/inventory/logs');
};

export const fetchChallans = async () => {
  return apiFetch<SalesChallan[]>('/challans');
};

export const createChallan = async (challan: Partial<SalesChallan>) => {
  return apiFetch<SalesChallan>('/challans', {
    method: 'POST',
    body: JSON.stringify(challan),
  });
};

export const fetchAuditLogs = async () => {
  return apiFetch<AuditLog[]>('/audit-logs');
};

export const fetchAiPredictions = async (): Promise<AiPrediction> => {
  try {
    return await apiFetch<AiPrediction>('/ai/predictions');
  } catch {
    return INITIAL_AI_PREDICTIONS;
  }
};

export const clearAuth = () => {
  clearToken();
  clearSavedUser();
};
