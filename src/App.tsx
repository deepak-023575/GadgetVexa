/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { PromoBanners } from './components/PromoBanners';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CompareModal } from './components/CompareModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Scale, Heart, SlidersHorizontal, ArrowUp, Lock } from 'lucide-react';

const StoreContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    compareList, 
    setIsCompareOpen, 
    wishlist, 
    setIsWishlistOpen,
    darkMode,
    isAdminAuthenticated,
    openAdminPortal,
  } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin' && !isAdminAuthenticated) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans`}>
        <Header />
        <AdminLoginModal />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">Admin Portal Locked</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              GadgetVexa management portal ko protect kiya gaya hai. Access karne ke liye apna 4-digit Security PIN enter karein (Default PIN: <strong className="text-amber-600 dark:text-amber-400 font-mono">1234</strong>).
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={openAdminPortal}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition cursor-pointer"
              >
                Enter Admin PIN
              </button>
              <button
                onClick={() => setCurrentView('store')}
                className="w-full py-2.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              >
                ← Return to Store
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 flex flex-col font-sans`}>
      <Header />
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <ProductSection />
        <PromoBanners />
        <FaqSection />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CompareModal />
      <WishlistDrawer />
      <AdminLoginModal />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Compare Bar if products selected */}
        {compareList.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-xl flex items-center gap-2 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <Scale className="w-4 h-4" />
            <span>Compare ({compareList.length}/4)</span>
          </button>
        )}

        {/* Floating Quick Admin Toggle */}
        <button
          onClick={openAdminPortal}
          className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs py-2.5 px-4 rounded-full shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-zinc-700 dark:border-zinc-300"
          title="Open Store Admin Dashboard"
        >
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          <span>Admin Portal</span>
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
