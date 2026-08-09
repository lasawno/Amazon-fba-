import axios from 'axios';
import type { DashboardMetrics, Order, InventoryItem, SalesData } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const dashboardAPI = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },

  getOrders: async (limit: number = 10): Promise<Order[]> => {
    const response = await api.get(`/orders?limit=${limit}`);
    return response.data;
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  getInventory: async (): Promise<InventoryItem[]> => {
    const response = await api.get('/inventory');
    return response.data;
  },

  getInventoryBySkuOrId: async (skuOrId: string): Promise<InventoryItem> => {
    const response = await api.get(`/inventory/${skuOrId}`);
    return response.data;
  },

  getSalesHistory: async (days: number = 30): Promise<SalesData[]> => {
    const response = await api.get(`/sales/history?days=${days}`);
    return response.data;
  },
};

export default api;
