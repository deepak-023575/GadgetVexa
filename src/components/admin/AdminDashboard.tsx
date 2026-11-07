import React from 'react';
import { 
  Package, 
  Layers, 
  MousePointerClick, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { STORE_BADGES, formatPrice } from '../../utils/iconHelper';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    categories, 
    clicks, 
    setAdminSection, 
    resetToDemoData,
    setCurrentView,
    settings,
  } = useStore();

  const totalClicks = clicks.length + products.reduce((acc, p) => acc + (p.clickCount || 0), 0);
  
  // Estimate commission (assume ~4% average on clicked electronics)
  const estimatedRevenue = products.reduce((acc, p) => {
    return acc + (p.clickCount || 0) * (p.salePrice * 0.035);
  }, 0);

  // Top clicked products
  const topProducts = [...products]
    .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-orange-500/15">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
            Admin Management Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
            Electronics Affiliate Control Hub
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl mt-1">
            Manage your electronics product catalog, affiliate store links, discount badges, categories, and track outbound commission clicks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminSection('products')}
            className="bg-white text-orange-600 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:bg-orange-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => setCurrentView('store')}
            className="bg-zinc-900/40 hover:bg-zinc-900/60 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Store</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
              Active Products
            </span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">
              {products.length}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              100% In Catalog
            </span>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Total Categories */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
              Departments
            </span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">
              {categories.length}
            </span>
            <button
              onClick={() => setAdminSection('categories')}
              className="text-[11px] text-orange-500 font-semibold hover:underline mt-1 cursor-pointer block"
            >
              Manage Categories →
            </button>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Total Outbound Clicks */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
              Affiliate Clicks
            </span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">
              {totalClicks.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              Tracking Active
            </span>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <MousePointerClick className="w-6 h-6" />
          </div>
        </div>

        {/* Estimated Commissions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
              Est. Commission
            </span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">
              {formatPrice(estimatedRevenue, settings.currencySymbol)}
            </span>
            <span className="text-[11px] text-zinc-400 mt-1 block">
              Avg. 3.5% payout rate
            </span>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Top Deals & Recent Affiliate Clicks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Performing Affiliate Deals */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Top Performing Affiliate Deals
              </h2>
              <p className="text-xs text-zinc-400">Ranked by outbound referral clicks</p>
            </div>
            <button
              onClick={() => setAdminSection('products')}
              className="text-xs font-semibold text-orange-500 hover:underline cursor-pointer"
            >
              View All Products
            </button>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {topProducts.map((p, idx) => {
              const badge = STORE_BADGES[p.primaryStore] || STORE_BADGES.amazon;
              return (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 text-xs font-black text-zinc-400">#{idx + 1}</span>
                    <img
                      src={p.mainImage}
                      alt={p.title}
                      className="w-12 h-12 object-contain rounded-lg bg-zinc-50 dark:bg-zinc-800 p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-orange-500">
                        {p.brand}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                          {formatPrice(p.salePrice, settings.currencySymbol)}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.bg} ${badge.text}`}>
                          {badge.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-orange-600 dark:text-orange-400 block">
                      {p.clickCount || 0}
                    </span>
                    <span className="text-[10px] text-zinc-400">Clicks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Live Clicks Stream */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Live Outbound Clicks
              </h2>
              <p className="text-xs text-zinc-400">Latest user redirects to affiliate stores</p>
            </div>
            <button
              onClick={() => setAdminSection('analytics')}
              className="text-xs font-semibold text-orange-500 hover:underline cursor-pointer"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3">
            {clicks.slice(0, 5).map((clk) => {
              const badge = STORE_BADGES[clk.store] || STORE_BADGES.amazon;
              const dateStr = new Date(clk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <div
                  key={clk.id}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-400 font-mono block">{dateStr}</span>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                      {clk.productTitle}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${badge.bg} ${badge.text}`}>
                    {badge.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
