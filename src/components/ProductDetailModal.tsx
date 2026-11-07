import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Check, 
  ShieldCheck, 
  Heart, 
  Scale, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  TrendingDown,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_BADGES, formatPrice } from '../utils/iconHelper';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    recordAffiliateClick,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    settings,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [clickedStore, setClickedStore] = useState<string | null>(null);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const isCompared = compareList.includes(selectedProduct.id);
  const images = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0 
    ? selectedProduct.galleryImages 
    : [selectedProduct.mainImage];

  const handleStoreClick = (store: any, url: string) => {
    recordAffiliateClick(selectedProduct, store, url);
    setClickedStore(store);
    setTimeout(() => setClickedStore(null), 2500);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}?product=${selectedProduct.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-md">
              {selectedProduct.brand}
            </span>
            <span className="text-xs text-zinc-400">/</span>
            <span className="text-xs text-zinc-500 font-medium truncate max-w-[200px] sm:max-w-xs">
              {selectedProduct.categoryName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Share Deal"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square w-full rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 relative">
                <img
                  src={images[activeImageIndex] || selectedProduct.mainImage}
                  alt={selectedProduct.title}
                  className="w-full h-full object-contain"
                />
                {selectedProduct.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-sm">
                    -{selectedProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl border p-1 bg-zinc-50 dark:bg-zinc-800 shrink-0 cursor-pointer transition-all ${
                        activeImageIndex === idx
                          ? 'border-orange-500 ring-2 ring-orange-500/20'
                          : 'border-zinc-200 dark:border-zinc-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* FTC Affiliate Disclaimer Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Affiliate Disclosure:</strong> GadgetVexa is an independent editorial affiliate platform. When you buy through our links, we may earn an affiliate commission from Amazon or partner stores at no additional cost to you.
                </span>
              </div>
            </div>

            {/* Right: Product Details & Prices */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                  {selectedProduct.title}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'opacity-40'
                        }`}
                      />
                    ))}
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 ml-1.5 text-xs">
                      {selectedProduct.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">
                    ({selectedProduct.reviewsCount.toLocaleString()} customer reviews)
                  </span>
                </div>
              </div>

              {/* Big Price Box */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Current Best Deal
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-orange-600 dark:text-orange-400">
                      {formatPrice(selectedProduct.salePrice, settings.currencySymbol)}
                    </span>
                    {selectedProduct.regularPrice > selectedProduct.salePrice && (
                      <span className="text-sm text-zinc-400 line-through">
                        {formatPrice(selectedProduct.regularPrice, settings.currencySymbol)}
                      </span>
                    )}
                  </div>
                </div>

                {selectedProduct.regularPrice > selectedProduct.salePrice && (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Save {formatPrice(selectedProduct.regularPrice - selectedProduct.salePrice, settings.currencySymbol)}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick actions: Wishlist & Compare */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-400'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(selectedProduct.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isCompared
                      ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'In Compare List' : 'Compare Specs'}</span>
                </button>
              </div>

              {/* Retailer Price Comparison Table (Key Affiliate Feature!) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-2 flex items-center justify-between">
                  <span>Compare Prices Across Stores</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Real-Time In-Stock</span>
                </h3>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
                  {selectedProduct.priceComparison?.map((deal, idx) => {
                    const badge = STORE_BADGES[deal.store] || STORE_BADGES.amazon;
                    const isRedirecting = clickedStore === deal.store;
                    return (
                      <div
                        key={idx}
                        className="p-3 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text}`}>
                            {deal.storeName}
                          </span>
                          {deal.badge && (
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                              {deal.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-black text-sm text-zinc-900 dark:text-white">
                            {formatPrice(deal.price, settings.currencySymbol)}
                          </span>

                          <button
                            onClick={() => handleStoreClick(deal.store, deal.url)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                              isRedirecting
                                ? 'bg-emerald-600 text-white'
                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                            }`}
                          >
                            <span>{isRedirecting ? 'Opening...' : 'View Deal'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description summary */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-1">
                  Product Overview
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedProduct.fullDescription || selectedProduct.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>The Good (Pros)</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedProduct.pros?.map((pro, i) => (
                  <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Things to Consider (Cons)</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedProduct.cons?.map((con, i) => (
                  <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Specifications */}
          {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-3">
                Key Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex justify-between"
                  >
                    <span className="font-semibold text-zinc-500 dark:text-zinc-400">{key}:</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
