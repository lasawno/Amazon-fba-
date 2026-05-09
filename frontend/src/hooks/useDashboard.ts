import { useState, useEffect, useCallback } from 'react';
import { dashboardAPI } from '@/services/api';
import type { DashboardMetrics, Order, InventoryItem, SalesData } from '@/types';

interface UseDashboardReturn {
  metrics: DashboardMetrics | null;
  orders: Order[];
  inventory: InventoryItem[];
  salesHistory: SalesData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useDashboard = (): UseDashboardReturn => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [metricsData, ordersData, inventoryData, salesData] = await Promise.all([
        dashboardAPI.getMetrics(),
        dashboardAPI.getOrders(10),
        dashboardAPI.getInventory(),
        dashboardAPI.getSalesHistory(30),
      ]);

      setMetrics(metricsData);
      setOrders(ordersData);
      setInventory(inventoryData);
      setSalesHistory(salesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { metrics, orders, inventory, salesHistory, loading, error, refresh: fetchData };
};
