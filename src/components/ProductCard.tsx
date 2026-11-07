import React, { useState } from 'react';
import { Heart, Scale, Eye, ExternalLink, Star, Check, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { STORE_BADGES, formatPrice } from '../utils/iconHelper';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    setSelectedProduct,
    recordAffiliateClick,
    settings,
  } = useStore();

  const [clickedFeedback, setClickedFeedback] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const storeBadge = STORE_BADGES[product.primaryStore] || STORE_BADGES.amazon;

  const handleAffiliateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordAffiliateClick(product, product.primaryStore);
    setClickedFeedback(true);
    setTimeout(() => setClickedFeedback(false), 2200);

    // Open affiliate link in new tab safely
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/40 relative cursor-pointer"
    >
      {/* Top Badges & Action Buttons */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.discountPercent > 0 && (
              <span className="bg-orange-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                -{product.discountPercent}%
              </span>
            )}
            {product.isDealOfTheDay && (
              <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-current" />
                Deal
              </span>
            )}
            {product.isTopSeller && (
              <span className="bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Top Seller
              </span>
            )}
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(product.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/40 p-4 flex items-center justify-center mb-3">
          <img
            src={product.mainImage}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
            loading="lazy"
          />

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 dark:bg-zinc-900/95 text-zinc-800 dark:text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Quick Specs
            </span>
          </div>
        </div>

        {/* Brand & Category Info */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
          <span className="font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            {product.brand}
          </span>
          <span className="truncate max-w-[120px]">{product.categoryName}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2 group-hover:text-orange-500 transition-colors mb-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-amber-400 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-zinc-800 dark:text-zinc-200 ml-1 text-xs">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-zinc-400">
            ({product.reviewsCount.toLocaleString()})
          </span>
        </div>
      </div>

      {/* Pricing & Affiliate CTA */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-baseline justify-between gap-1 mb-2.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-zinc-900 dark:text-white">
                {formatPrice(product.salePrice, settings.currencySymbol)}
              </span>
              {product.regularPrice > product.salePrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatPrice(product.regularPrice, settings.currencySymbol)}
                </span>
              )}
            </div>
            {product.regularPrice > product.salePrice && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                Save {formatPrice(product.regularPrice - product.salePrice, settings.currencySymbol)}
              </span>
            )}
          </div>

          {/* Retailer badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${storeBadge.bg} ${storeBadge.text}`}>
            {storeBadge.name}
          </span>
        </div>

        {/* Primary Affiliate Button */}
        <button
          type="button"
          onClick={handleAffiliateClick}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
            clickedFeedback
              ? 'bg-emerald-600 text-white'
              : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white shadow-orange-500/20'
          }`}
        >
          {clickedFeedback ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Redirecting to {storeBadge.name}...</span>
            </>
          ) : (
            <>
              <span>Check Deal on {storeBadge.name}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </>
          )}
        </button>

        {product.priceComparison && product.priceComparison.length > 1 && (
          <p className="text-[10px] text-zinc-400 text-center mt-1.5">
            + {product.priceComparison.length - 1} more store prices
          </p>
        )}
      </div>
    </div>
  );
};
