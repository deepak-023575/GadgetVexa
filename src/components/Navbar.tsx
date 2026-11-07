import React, { useState } from 'react';
import { Menu, ChevronDown, Flame, Sparkles, Percent, Tag, Headphones, Laptop, Camera, Smartphone, Tv } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DynamicIcon } from '../utils/iconHelper';

export const Navbar: React.FC = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    activeFilterTab,
    setActiveFilterTab,
    setCurrentView,
    setSearchQuery,
  } = useStore();

  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(selectedCategory === catId ? null : catId);
    setIsBrowseOpen(false);
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* BROWSE CATEGORIES Button (Matching the Reference Screenshot) */}
          <div className="relative">
            <button
              onClick={() => setIsBrowseOpen(!isBrowseOpen)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs px-5 py-3.5 flex items-center gap-3 transition-colors cursor-pointer select-none rounded-t-sm"
            >
              <Menu className="w-4 h-4" />
              <span>Browse Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isBrowseOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu when clicked */}
            {isBrowseOpen && (
              <div 
                className="absolute left-0 top-full w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 py-2 rounded-b-xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 pb-2 mb-1 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Categories ({categories.length})
                  </span>
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsBrowseOpen(false);
                      }}
                      className="text-[11px] text-orange-500 hover:underline cursor-pointer font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-orange-500 text-white font-semibold'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <DynamicIcon name={cat.icon} className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
                          <span className="truncate">{cat.name}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-orange-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                          ›
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-semibold text-xs tracking-wider uppercase">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setActiveFilterTab('all');
              }}
              className={`px-3 py-3 transition-colors cursor-pointer ${
                activeFilterTab === 'all' && selectedCategory === null
                  ? 'text-orange-500 dark:text-orange-400 font-bold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-orange-500'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setActiveFilterTab('deals');
              }}
              className={`px-3 py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFilterTab === 'deals'
                  ? 'text-orange-500 dark:text-orange-400 font-bold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-orange-500'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-rose-500" />
              <span>Products on Sale</span>
            </button>

            <button
              onClick={() => {
                setActiveFilterTab('top-sellers');
              }}
              className={`px-3 py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFilterTab === 'top-sellers'
                  ? 'text-orange-500 dark:text-orange-400 font-bold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-orange-500'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Top Sellers</span>
            </button>

            <button
              onClick={() => {
                setActiveFilterTab('featured');
              }}
              className={`px-3 py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFilterTab === 'featured'
                  ? 'text-orange-500 dark:text-orange-400 font-bold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-orange-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Featured Gear</span>
            </button>

            <button
              onClick={() => {
                const audioCat = categories.find(c => c.slug.includes('audio') || c.name.toLowerCase().includes('audio'));
                if (audioCat) setSelectedCategory(audioCat.id);
              }}
              className="px-3 py-3 text-zinc-700 dark:text-zinc-300 hover:text-orange-500 transition-colors cursor-pointer hidden xl:inline-block"
            >
              Headphones & Audio
            </button>
          </div>
        </div>

        {/* Right side helper badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-medium">Prime Delivery & Real-Time Price Tracking</span>
        </div>
      </div>
    </nav>
  );
};
