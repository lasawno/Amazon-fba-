import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

export const MetricCard = ({
  label,
  value,
  change,
  icon,
  trend = 'neutral',
  delay = 0,
}: MetricCardProps) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card card-hover group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>

          {change !== undefined && (
            <div className={`flex items-center mt-3 text-sm font-medium ${
              isPositive ? 'text-success-600' : isNegative ? 'text-error-600' : 'text-neutral-600'
            }`}>
              {isPositive && <ArrowUpRight className="w-4 h-4 mr-1" />}
              {isNegative && <ArrowDownRight className="w-4 h-4 mr-1" />}
              <span>{Math.abs(change)}%</span>
              <span className="ml-2 text-neutral-500">vs last month</span>
            </div>
          )}
        </div>

        {icon && (
          <div className="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};
