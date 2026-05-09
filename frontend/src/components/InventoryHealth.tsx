import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import type { InventoryItem } from '@/types';

interface InventoryHealthProps {
  inventory: InventoryItem[];
  loading?: boolean;
}

const healthColors = {
  healthy: { bg: 'bg-success-50', text: 'text-success-700', bar: 'bg-success-500' },
  warning: { bg: 'bg-warning-50', text: 'text-warning-700', bar: 'bg-warning-500' },
  critical: { bg: 'bg-error-50', text: 'text-error-700', bar: 'bg-error-500' },
};

export const InventoryHealth = ({ inventory, loading }: InventoryHealthProps) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-neutral-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const criticalItems = inventory.filter((i) => i.health === 'critical');
  const warningItems = inventory.filter((i) => i.health === 'warning');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">Inventory Health</h3>
        <div className="text-sm text-neutral-600">
          {criticalItems.length} critical, {warningItems.length} warning
        </div>
      </div>

      <div className="space-y-4">
        {inventory.slice(0, 5).map((item, index) => {
          const colors = healthColors[item.health];
          const utilization = (item.quantity / (item.quantity + item.minimumThreshold)) * 100;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${colors.bg}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-neutral-900">{item.name}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">SKU: {item.sku}</p>
                </div>
                {item.health === 'healthy' ? (
                  <Check className={`w-5 h-5 ${colors.text}`} />
                ) : (
                  <AlertCircle className={`w-5 h-5 ${colors.text}`} />
                )}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${colors.text}`}>
                  {item.quantity} units
                </span>
                <span className="text-xs text-neutral-600">{utilization.toFixed(0)}%</span>
              </div>

              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${utilization}%` }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className={`h-full ${colors.bar}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
