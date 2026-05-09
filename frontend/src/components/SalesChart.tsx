import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { SalesData } from '@/types';

interface SalesChartProps {
  data: SalesData[];
  loading?: boolean;
}

export const SalesChart = ({ data, loading }: SalesChartProps) => {
  if (loading) {
    return (
      <div className="card h-80">
        <div className="animate-pulse h-full bg-neutral-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
    >
      <h3 className="text-lg font-semibold mb-6 text-neutral-900">Sales Trend (30 Days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => value.toLocaleString()}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="revenue" fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Revenue ($)" />
          <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} name="Orders" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-600">Avg Daily Revenue</p>
          <p className="text-lg font-bold text-neutral-900">
            ${(data.reduce((sum, d) => sum + d.revenue, 0) / data.length).toFixed(0)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-600">Avg Daily Orders</p>
          <p className="text-lg font-bold text-neutral-900">
            {Math.round(data.reduce((sum, d) => sum + d.orders, 0) / data.length)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-600">Avg Daily Units</p>
          <p className="text-lg font-bold text-neutral-900">
            {Math.round(data.reduce((sum, d) => sum + d.units, 0) / data.length)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
