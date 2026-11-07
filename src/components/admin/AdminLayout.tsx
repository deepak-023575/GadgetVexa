import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  MousePointerClick, 
  Settings as SettingsIcon,
  Store,
  Sun,
  Moon,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';

export const AdminLayout: React.FC = () => {
  const { 
    adminSection, 
    setAdminSection, 
    setCurrentView, 
    adminLogout,
    darkMode, 
    toggleDarkMode, 
    products, 
    categories 
  } = useStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: `Products (${products.length})`, icon: Package },
    { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
    { id: 'analytics', label: 'Affiliate Clicks', icon: MousePointerClick },
    { id: 'settings', label: 'Settings & FTC', icon: SettingsIcon },
  ] as const;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200`}>
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white text-xs shadow-sm">
              GV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                  GadgetVexa Admin
                </span>
                <span className="bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Store Management
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 -mt-0.5">Electronics Affiliate Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setCurrentView('store')}
              className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              title="Return to front store"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Live Store</span>
            </button>

            <button
              onClick={adminLogout}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Lock Admin and Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock & Exit</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto border-t border-zinc-100 dark:border-zinc-800/80 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminSection(item.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {adminSection === 'dashboard' && <AdminDashboard />}
        {adminSection === 'products' && <AdminProducts />}
        {adminSection === 'categories' && <AdminCategories />}
        {adminSection === 'analytics' && <AdminAnalytics />}
        {adminSection === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
