import React, { useState } from 'react';
import { Save, RefreshCw, Download, Upload, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, products, categories, resetToDemoData } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [defaultAmazonTag, setDefaultAmazonTag] = useState(settings.defaultAmazonTag);
  const [affiliateDisclosure, setAffiliateDisclosure] = useState(settings.affiliateDisclosure);
  const [headerNotice, setHeaderNotice] = useState(settings.headerNotice);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol || '₹');
  const [adminPin, setAdminPin] = useState(settings.adminPin || '1234');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      defaultAmazonTag,
      affiliateDisclosure,
      headerNotice,
      supportEmail,
      currencySymbol,
      adminPin: adminPin.trim() || '1234',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportJson = () => {
    const data = {
      settings,
      categories,
      products,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gadgetvexa-catalog-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          Store & Affiliate Compliance Settings
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Manage your affiliate tags, FTC legal disclaimers, and store branding
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
              Store Brand Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
              Support / Contact Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
            Store Brand Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
            Top Announcement Banner Text
          </label>
          <input
            type="text"
            value={headerNotice}
            onChange={(e) => setHeaderNotice(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
              Store Currency Symbol
            </label>
            <input
              type="text"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              placeholder="e.g. ₹ or Rs."
              className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              Default is ₹ (Indian Rupee).
            </span>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
              Default Amazon Associate Tag
            </label>
            <input
              type="text"
              value={defaultAmazonTag}
              onChange={(e) => setDefaultAmazonTag(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              Appended to Amazon India affiliate URLs (e.g. gadgetvexa-21).
            </span>
          </div>
        </div>

        {/* Security PIN Section */}
        <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <label className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              Admin Portal Security PIN
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="e.g. 1234 or your secret PIN"
              className="w-full sm:w-48 px-3.5 py-2 text-sm bg-white dark:bg-zinc-800 border border-amber-300 dark:border-amber-700/60 rounded-xl font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Yeh PIN aapke Admin Portal ko protect karta hai. Default PIN <strong>1234</strong> hai. Aap yahan apna personal 4-8 digit PIN set karke <strong>Save Settings</strong> par click karein.
            </p>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
            FTC Required Affiliate Disclosure Statement
          </label>
          <textarea
            rows={3}
            value={affiliateDisclosure}
            onChange={(e) => setAffiliateDisclosure(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Settings updated successfully!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Backup and Catalog Reset Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-900 dark:text-white">
          Data Backup & Reset
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportJson}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Catalog Backup (JSON)</span>
          </button>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Demo Electronics Catalog</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 animate-in fade-in">
              <span className="text-xs text-rose-600 font-semibold">Restore demo catalog?</span>
              <button
                onClick={() => {
                  resetToDemoData();
                  setResetConfirm(false);
                }}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Yes, Restore
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
