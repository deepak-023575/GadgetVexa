import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoBanners: React.FC = () => {
  const { categories, setSelectedCategory, setSelectedProduct, products, recordAffiliateClick } = useStore();

  const handleCategoryNavigate = (keyword: string) => {
    const cat = categories.find(c => 
      c.name.toLowerCase().includes(keyword.toLowerCase()) || 
      c.slug.toLowerCase().includes(keyword.toLowerCase())
    );
    if (cat) {
      setSelectedCategory(cat.id);
      const target = document.getElementById('products-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDirectProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      recordAffiliateClick(prod, prod.primaryStore);
      setSelectedProduct(prod);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* 4-Card Promo Grid Matching Reference Image Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Banner 1: Headphones */}
        <div 
          onClick={() => handleCategoryNavigate('audio')}
          className="relative bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-2xl p-6 text-white overflow-hidden min-h-[300px] flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Fulfill Your Music Needs
            </span>
            <h3 className="text-xl font-extrabold leading-tight tracking-tight mb-2">
              Feel The Music With Best Headphones
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 group-hover:translate-x-1 transition-all">
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="absolute -bottom-4 -right-4 w-44 h-44 z-0 opacity-90 group-hover:scale-110 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
              alt="Headphones"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Banner 2: Smartwatch */}
        <div 
          onClick={() => handleCategoryNavigate('wearable')}
          className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-2xl p-6 text-white overflow-hidden min-h-[300px] flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
              Smartwatch
            </span>
            <h3 className="text-xl font-extrabold leading-tight tracking-tight mb-2">
              Everything You Need Right On Your Wrist
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 group-hover:translate-x-1 transition-all">
              Compare Watches <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="absolute -bottom-2 -right-2 w-44 h-44 z-0 opacity-90 group-hover:scale-110 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
              alt="Smartwatch"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Banner 3: Television & Video / Streaming Stick */}
        <div 
          onClick={() => handleDirectProduct('prod-fire-tv-4k-max')}
          className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 text-white overflow-hidden min-h-[300px] flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Television & Video
            </span>
            <h3 className="text-xl font-extrabold leading-tight tracking-tight mb-2">
              Best 4K Streaming Media Players
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 group-hover:translate-x-1 transition-all">
              Check Prices <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="absolute -bottom-2 -right-2 w-44 h-44 z-0 opacity-90 group-hover:scale-110 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80"
              alt="Streaming Stick"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Banner 4: VR Headsets */}
        <div 
          onClick={() => handleDirectProduct('prod-meta-quest-3')}
          className="relative bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-6 text-white overflow-hidden min-h-[300px] flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Virtual Reality
            </span>
            <h3 className="text-xl font-extrabold leading-tight tracking-tight mb-2">
              Best Virtual Reality (VR) Headsets
            </h3>
            <span className="inline-block bg-white text-zinc-900 text-xs font-extrabold px-3 py-1.5 rounded-full group-hover:bg-purple-100 transition-colors mt-2">
              Shop Now →
            </span>
          </div>

          <div className="absolute -bottom-2 -right-2 w-44 h-44 z-0 opacity-90 group-hover:scale-110 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=400&q=80"
              alt="VR Headsets"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
