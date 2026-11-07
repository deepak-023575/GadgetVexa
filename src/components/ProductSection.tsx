import React, { useMemo } from 'react';
import { Sparkles, Flame, Clock, Tag, ArrowUpDown, Filter, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductSection: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeFilterTab,
    setActiveFilterTab,
    sortBy,
    setSortBy,
  } = useStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory && product.categoryId !== selectedCategory) {
          return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchCat = product.categoryName.toLowerCase().includes(query);
          const matchDesc = product.shortDescription.toLowerCase().includes(query);
          if (!matchTitle && !matchBrand && !matchCat && !matchDesc) {
            return false;
          }
        }

        // Tab filter
        if (activeFilterTab === 'new') {
          return product.isNew || new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 3600 * 1000;
        }
        if (activeFilterTab === 'featured') {
          return product.isFeatured;
        }
        if (activeFilterTab === 'top-sellers') {
          return product.isTopSeller;
        }
        if (activeFilterTab === 'deals') {
          return product.discountPercent >= 15 || product.isDealOfTheDay;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.salePrice - b.salePrice;
        if (sortBy === 'price-desc') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        // default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, activeFilterTab, sortBy]);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Products Header with Tabs (Matching the reference image!) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              {selectedCategoryObj ? selectedCategoryObj.name : 'Top Products'}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {filteredProducts.length} deals
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Verified lowest price tracking across major retailers
          </p>
        </div>

        {/* Tab Filters (NEW, FEATURED, TOP SELLERS, DEALS, ALL) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilterTab === 'all'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilterTab('featured')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeFilterTab === 'featured'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('top-sellers')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeFilterTab === 'top-sellers'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Top Sellers</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('deals')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeFilterTab === 'deals'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>Hot Deals</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('new')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeFilterTab === 'new'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold py-2 px-3 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer appearance-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active filter badges / Search banner */}
      {(selectedCategory || searchQuery) && (
        <div className="flex items-center flex-wrap gap-2 mt-4 pt-1">
          <span className="text-xs text-zinc-500 font-medium">Active filters:</span>
          {selectedCategoryObj && (
            <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-full text-xs font-semibold">
              Category: {selectedCategoryObj.name}
              <button
                onClick={() => setSelectedCategory(null)}
                className="hover:text-orange-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 px-2.5 py-1 rounded-full text-xs font-semibold">
              Query: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="text-xs text-zinc-500 hover:text-orange-500 underline ml-2 cursor-pointer"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 mt-6">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-500 flex items-center justify-center mx-auto mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">
            No electronics match your criteria
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mb-4">
            Try resetting your search query or switching categories to see available affiliate offers.
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setActiveFilterTab('all');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
