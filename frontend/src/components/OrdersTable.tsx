import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Order } from '@/types';

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
}

const statusColors = {
  pending: 'bg-warning-100 text-warning-700',
  processing: 'bg-primary-100 text-primary-700',
  shipped: 'bg-primary-100 text-primary-700',
  delivered: 'bg-success-100 text-success-700',
  cancelled: 'bg-error-100 text-error-700',
};

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const OrdersTable = ({ orders, loading }: OrdersTableProps) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card overflow-hidden"
    >
      <h3 className="text-lg font-semibold mb-4 text-neutral-900">Recent Orders</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">
                Order #
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-4 text-sm text-neutral-600">{order.customerName}</td>
                <td className="py-3 px-4 text-sm font-semibold text-neutral-900">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <span className={`badge ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-neutral-600">
                  {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
