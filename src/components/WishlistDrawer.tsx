import React from 'react';
import { X, ExternalLink, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/iconHelper';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    setSelectedProduct,
    recordAffiliateClick,
    settings,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white dark:bg-zinc-900 h-full shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-xl">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                Saved Wishlist ({savedProducts.length})
              </h2>
              <p className="text-[11px] text-zinc-400">Track price drops on your favorite electronics</p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {savedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Your wishlist is currently empty
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Tap the heart icon on any gadget or audio product to monitor deal pricing.
              </p>
            </div>
          ) : (
            savedProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center gap-3">
                <img
                  src={p.mainImage}
                  alt={p.title}
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsWishlistOpen(false);
                  }}
                  className="w-16 h-16 object-contain rounded-xl bg-zinc-50 dark:bg-zinc-800 p-1 cursor-pointer shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-orange-500">
                    {p.brand}
                  </span>
                  <h4 
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsWishlistOpen(false);
                    }}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate hover:text-orange-500 cursor-pointer"
                  >
                    {p.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      {formatPrice(p.salePrice, settings.currencySymbol)}
                    </span>
                    {p.regularPrice > p.salePrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        {formatPrice(p.regularPrice, settings.currencySymbol)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-end">
                  <button
                    onClick={() => {
                      recordAffiliateClick(p, p.primaryStore);
                      window.open(p.affiliateUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    title="Buy Deal"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="p-1 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        {savedProducts.length > 0 && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
            <p className="text-[11px] text-zinc-400 text-center">
              Items remain saved in your browser localStorage across visits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
