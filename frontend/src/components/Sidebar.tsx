import { motion } from 'framer-motion';
import { BarChart3, ShoppingCart, Package, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: '#dashboard', id: 'dashboard' },
  { icon: ShoppingCart, label: 'Orders', href: '#orders', id: 'orders' },
  { icon: Package, label: 'Inventory', href: '#inventory', id: 'inventory' },
  { icon: TrendingUp, label: 'Analytics', href: '#analytics', id: 'analytics' },
];

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const [active, setActive] = useState('dashboard');

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 lg:hidden z-30"
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-neutral-200 lg:relative lg:translate-x-0 z-40 flex flex-col"
      >
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wider">
            Navigation
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(item.id);
                  onClose?.();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </motion.a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 hover:bg-neutral-50 font-medium transition-all">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error-600 hover:bg-error-50 font-medium transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};
