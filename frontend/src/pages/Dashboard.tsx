import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { MetricCard } from '@/components/MetricCard';
import { OrdersTable } from '@/components/OrdersTable';
import { InventoryHealth } from '@/components/InventoryHealth';
import { SalesChart } from '@/components/SalesChart';
import { LoadingState } from '@/components/LoadingState';

export const Dashboard = () => {
  const { metrics, orders, inventory, salesHistory, loading, error, refresh } =
    useDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
            <p className="text-neutral-600">
              Welcome back! Here's your FBA performance overview.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-error-50 border border-error-200 text-error-700"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {metrics && (
                <>
                  <MetricCard
                    label="Total Revenue"
                    value={`$${metrics.totalRevenue.toLocaleString()}`}
                    change={metrics.revenueChange}
                    trend={metrics.revenueChange > 0 ? 'up' : 'down'}
                    icon={<DollarSign className="w-6 h-6" />}
                    delay={0}
                  />
                  <MetricCard
                    label="Total Orders"
                    value={metrics.totalOrders.toLocaleString()}
                    change={0}
                    icon={<ShoppingCart className="w-6 h-6" />}
                    delay={0.1}
                  />
                  <MetricCard
                    label="Units Sold"
                    value={metrics.totalUnits.toLocaleString()}
                    change={metrics.unitsChange}
                    trend={metrics.unitsChange > 0 ? 'up' : 'down'}
                    icon={<Package className="w-6 h-6" />}
                    delay={0.2}
                  />
                  <MetricCard
                    label="Inventory Health"
                    value={`${metrics.inventoryHealth}%`}
                    change={metrics.inventoryHealthChange}
                    trend={metrics.inventoryHealthChange > 0 ? 'up' : 'down'}
                    icon={<TrendingUp className="w-6 h-6" />}
                    delay={0.3}
                  />
                </>
              )}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Sales Chart - Takes 2 columns */}
              <div className="lg:col-span-2">
                <SalesChart data={salesHistory} loading={loading} />
              </div>

              {/* Inventory Health - Takes 1 column */}
              <div>
                <InventoryHealth inventory={inventory.slice(0, 5)} loading={loading} />
              </div>
            </div>

            {/* Orders Table */}
            <OrdersTable orders={orders} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
};
