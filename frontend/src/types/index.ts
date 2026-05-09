export interface DashboardMetrics {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  revenueChange: number;
  totalUnits: number;
  unitsChange: number;
  inventoryHealth: number;
  inventoryHealthChange: number;
  avgOrderValue: number;
  avgOrderValueChange: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  amount: number;
  units: number;
  date: string;
  customerName: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  reservedQuantity: number;
  minimumThreshold: number;
  health: 'healthy' | 'warning' | 'critical';
  turnover: number;
}

export interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  units: number;
}

export interface DashboardState {
  metrics: DashboardMetrics | null;
  orders: Order[];
  inventory: InventoryItem[];
  salesHistory: SalesData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string;
}
