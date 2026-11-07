import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Scale, 
  Moon, 
  Sun, 
  ShieldCheck, 
  ExternalLink, 
  SlidersHorizontal,
  LayoutDashboard,
  CheckCircle2,
  Share2,
  Tv
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    settings,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    compareList,
    darkMode,
    toggleDarkMode,
    currentView,
    setCurrentView,
    openAdminPortal,
    setIsCompareOpen,
    setIsWishlistOpen,
    clicks,
  } = useStore();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-amber-600 dark:bg-amber-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="bg-amber-700 dark:bg-amber-800 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Affiliate Partner
            </span>
            <span className="truncate">{settings.headerNotice}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-normal">
            <span className="hidden md:inline-flex items-center gap-1.5 text-amber-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Retailer Deals
            </span>
            <button
              onClick={handleShare}
              className="hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Share store link"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
            <span className="text-amber-300">|</span>
            <button
              onClick={() => (currentView === 'store' ? openAdminPortal() : setCurrentView('store'))}
              className="text-amber-100 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {currentView === 'store' ? 'Admin Portal' : 'Back to Store'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div 
            onClick={() => {
              setCurrentView('store');
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-base tracking-tighter">GV</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white">
                  GadgetVexa
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              </div>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-400 -mt-1">
                Electronics & Tech Deals
              </p>
            </div>
          </div>

          {/* Search Bar with Category Select (Matching Benkuu layout) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center border-2 border-orange-500 dark:border-orange-500 rounded-full overflow-hidden bg-white dark:bg-zinc-800 shadow-sm focus-within:ring-2 focus-within:ring-orange-500/30">
              {/* Category Dropdown trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-700/60 border-r border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="max-w-[120px] truncate">
                    {selectedCategory
                      ? categories.find(c => c.id === selectedCategory)?.name || 'All Categories'
                      : 'SELECT CATEGORY'}
                  </span>
                  <span className="text-[10px]">▼</span>
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-1.5 max-h-72 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
                        selectedCategory === null
                          ? 'text-orange-600 dark:text-orange-400 font-semibold bg-orange-50/50 dark:bg-zinc-800/60'
                          : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? 'text-orange-600 dark:text-orange-400 font-semibold bg-orange-50/50 dark:bg-zinc-800/60'
                            : 'text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <input
                type="text"
                placeholder="Search electronics, laptops, Sony XM5, 4K TVs, cameras..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none bg-transparent"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  ✕
                </button>
              )}

              {/* Search button */}
              <button 
                type="button" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Compare list toggle */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              title="Compare Products"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist toggle */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Admin Switcher Button */}
            <button
              onClick={() => (currentView === 'store' ? openAdminPortal() : setCurrentView('store'))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                currentView === 'admin'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/60 hover:bg-orange-100'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {currentView === 'admin' ? 'Store Front' : 'Admin Panel'}
              </span>
              <span className="sm:hidden">
                {currentView === 'admin' ? 'Store' : 'Admin'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center border border-orange-500 rounded-lg overflow-hidden bg-white dark:bg-zinc-800">
            <input
              type="text"
              placeholder="Search tech & electronics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none bg-transparent"
            />
            <button className="bg-orange-500 text-white px-4 py-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
