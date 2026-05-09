import { motion } from 'framer-motion';
import { Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-white border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-neutral-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="hidden sm:block text-lg font-bold text-neutral-900">
                FBA Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg">
              <Settings className="w-5 h-5 text-neutral-600" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
