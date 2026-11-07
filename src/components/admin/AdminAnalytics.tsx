import React from 'react';
import { MousePointerClick, ExternalLink, Calendar, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { STORE_BADGES } from '../../utils/iconHelper';

export const AdminAnalytics: React.FC = () => {
  const { clicks, products } = useStore();

  // Aggregate by store
  const storeCounts: Record<string, number> = {};
  clicks.forEach((c) => {
    storeCounts[c.store] = (storeCounts[c.store] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          Affiliate Conversion & Click Telemetry
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Audited log of every user click redirected to merchant stores with affiliate tags attached
        </p>
      </div>

      {/* Store Distribution Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(STORE_BADGES).slice(0, 4).map(([key, info]) => {
          const count = storeCounts[key] || 0;
          return (
            <div
              key={key}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  {info.name}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${info.bg} ${info.text}`}>
                  Partner
                </span>
              </div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white block">
                {count}
              </span>
              <span className="text-[11px] text-zinc-400">outbound clicks</span>
            </div>
          );
        })}
      </div>

      {/* Full Click Log Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white">
            Referral Activity Log ({clicks.length} Records)
          </h3>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Tracking
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Store</th>
                <th className="p-3">Affiliate Link Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {clicks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-400">
                    No clicks recorded yet. Browse the store and click "Check Deal on Amazon" or other buttons to see live tracking.
                  </td>
                </tr>
              ) : (
                clicks.map((clk) => {
                  const badge = STORE_BADGES[clk.store] || STORE_BADGES.amazon;
                  const date = new Date(clk.timestamp);
                  return (
                    <tr key={clk.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30">
                      <td className="p-3 whitespace-nowrap font-mono text-[11px] text-zinc-500">
                        {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                        {clk.productTitle}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text}`}>
                          {badge.name}
                        </span>
                      </td>
                      <td className="p-3 max-w-sm truncate text-zinc-400 font-mono text-[11px]">
                        <a
                          href={clk.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-orange-500 flex items-center gap-1 truncate"
                        >
                          <span className="truncate">{clk.affiliateUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
