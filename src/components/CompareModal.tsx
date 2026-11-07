import React from 'react';
import { X, ExternalLink, Trash2, Scale, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/iconHelper';

export const CompareModal: React.FC = () => {
  const {
    compareList,
    products,
    toggleCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    setSelectedProduct,
    recordAffiliateClick,
    settings,
  } = useStore();

  if (!isCompareOpen) return null;

  const compareProducts = products.filter(p => compareList.includes(p.id));

  // Gather all unique specification keys
  const allSpecKeys = Array.from(
    new Set(
      compareProducts.flatMap(p => Object.keys(p.specifications || {}))
    )
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white">
                Side-by-Side Electronics Comparison
              </h2>
              <p className="text-xs text-zinc-500">
                Compare specs, pricing, ratings, and features ({compareProducts.length}/4 selected)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {compareProducts.length === 0 ? (
            <div className="text-center py-16">
              <Scale className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                No products in comparison
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                Click the compare icon (⚖️) on any product card to inspect differences side-by-side.
              </p>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-3 w-40 font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
                      Product
                    </th>
                    {compareProducts.map(p => (
                      <th key={p.id} className="p-3 font-normal align-top min-w-[200px]">
                        <div className="relative group">
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="absolute -top-1 -right-1 p-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>

                          <div 
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsCompareOpen(false);
                            }}
                            className="cursor-pointer"
                          >
                            <img
                              src={p.mainImage}
                              alt={p.title}
                              className="w-24 h-24 object-contain mx-auto mb-2"
                            />
                            <span className="text-[10px] font-bold text-orange-500 uppercase block">
                              {p.brand}
                            </span>
                            <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-2 hover:text-orange-500">
                              {p.title}
                            </h4>
                          </div>

                          <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="text-base font-extrabold text-orange-600 dark:text-orange-400">
                              {formatPrice(p.salePrice, settings.currencySymbol)}
                            </span>
                            {p.regularPrice > p.salePrice && (
                              <span className="text-[11px] text-zinc-400 line-through">
                                {formatPrice(p.regularPrice, settings.currencySymbol)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              recordAffiliateClick(p, p.primaryStore);
                              window.open(p.affiliateUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="mt-2 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Buy Deal</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="p-3 font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
                      Rating & Reviews
                    </td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 text-zinc-800 dark:text-zinc-200">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{p.rating.toFixed(1)}</span>
                          <span className="text-zinc-400">({p.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
                      Category
                    </td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 text-zinc-800 dark:text-zinc-200">
                        {p.categoryName}
                      </td>
                    ))}
                  </tr>

                  {allSpecKeys.map(specKey => (
                    <tr key={specKey}>
                      <td className="p-3 font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
                        {specKey}
                      </td>
                      {compareProducts.map(p => (
                        <td key={p.id} className="p-3 font-medium text-zinc-800 dark:text-zinc-200">
                          {p.specifications?.[specKey] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr>
                    <td className="p-3 font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
                      Primary Retailer
                    </td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 font-bold uppercase text-orange-600 dark:text-orange-400">
                        {p.primaryStore}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
