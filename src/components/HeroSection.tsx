import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Zap 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DynamicIcon, formatPrice } from '../utils/iconHelper';

export const HeroSection: React.FC = () => {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    products, 
    setSelectedProduct, 
    recordAffiliateClick, 
    settings 
  } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const bengooProd = products.find(p => p.id === 'prod-bengoo-headset') || products[0];
  const sonyProd = products.find(p => p.id === 'prod-sony-wh1000xm5') || products[1] || bengooProd;
  const tvProd = products.find(p => p.id === 'prod-samsung-qled-tv') || products[2] || bengooProd;
  const laptopProd = products.find(p => p.id === 'prod-acer-aspire-5') || products[3] || bengooProd;

  const slides = [
    {
      id: 0,
      subTitle: 'Feel the bass in your bones',
      title: 'LISTEN MUSIC YOU WANT',
      caption: 'MOVE WITH THE MUSIC !! PICK AS PER YOUR NEEDS',
      buttonText: 'Shop Best Deal',
      product: bengooProd,
      image: bengooProd?.mainImage || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      badge: '42% OFF TODAY',
      gradient: 'from-amber-500/10 via-orange-500/10 to-transparent',
    },
    {
      id: 1,
      subTitle: 'Industry-Leading Noise Cancelling',
      title: 'SONY WH-1000XM5',
      caption: 'MAGNIFICENT HI-RES SOUND WITHOUT DISTRACTIONS',
      buttonText: 'Check Price on Amazon',
      product: sonyProd,
      image: sonyProd?.mainImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      badge: 'FLAGSHIP AUDIO DEAL',
      gradient: 'from-blue-500/10 via-indigo-500/10 to-transparent',
    },
    {
      id: 2,
      subTitle: 'Cinematic 4K Mini-LED Experience',
      title: 'SAMSUNG 65" NEO QLED',
      caption: 'QUANTUM HDR 32X WITH IMMERSIVE DOLBY ATMOS AUDIO',
      buttonText: 'View Smart TV Deal',
      product: tvProd,
      image: tvProd?.mainImage || 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
      badge: 'SAVE ₹25,000+',
      gradient: 'from-purple-500/10 via-pink-500/10 to-transparent',
    },
    {
      id: 3,
      subTitle: 'High-Performance Productivity',
      title: 'ACER ASPIRE 5 LAPTOP',
      caption: 'INTEL CORE I5 12TH GEN • 16GB RAM • 512GB NVME SSD',
      buttonText: 'Check Laptop Price',
      product: laptopProd,
      image: laptopProd?.mainImage || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      badge: 'BESTSELLER TECH',
      gradient: 'from-emerald-500/10 via-teal-500/10 to-transparent',
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => setActiveSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length);

  // Mobile Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) nextSlide();
    if (distance < -45) prevSlide();
  };

  const currentSlide = slides[activeSlide];

  const handleHeroCta = () => {
    if (currentSlide.product) {
      recordAffiliateClick(currentSlide.product, currentSlide.product.primaryStore);
      setSelectedProduct(currentSlide.product);
    }
  };

  const handlePromoBannerClick = (categoryKeyword: string) => {
    const found = categories.find(c => 
      c.name.toLowerCase().includes(categoryKeyword.toLowerCase()) || 
      c.slug.toLowerCase().includes(categoryKeyword.toLowerCase())
    );
    if (found) {
      setSelectedCategory(found.id);
      window.scrollTo({ top: 750, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Category Sidebar */}
        <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden h-fit">
          <div className="bg-orange-500 text-white px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
            <span>Explore Department</span>
            <span className="text-[10px] bg-orange-600 px-2 py-0.5 rounded-full">{categories.length}</span>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {categories.slice(0, 9).map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between text-xs transition-colors cursor-pointer text-left group ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold border-l-4 border-orange-500'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <DynamicIcon
                      name={cat.icon}
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-orange-500' : 'text-zinc-400 group-hover:text-orange-500'
                      }`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-orange-500 translate-x-0.5' : 'text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
            >
              View All Categories & Brands
            </button>
          </div>
        </div>

        {/* Center / Right Hero Showcase Slider */}
        <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-zinc-100 via-orange-50/40 to-amber-50/50 dark:from-zinc-900 dark:via-zinc-800/90 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 min-h-[400px] md:min-h-[440px] flex items-center p-6 sm:p-10 shadow-sm select-none"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} transition-all duration-700 pointer-events-none`} />

            {/* Previous Arrow Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Next Slide"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slider Content */}
            <div key={activeSlide} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full z-10 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-wide shadow-sm">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{currentSlide.badge}</span>
                </div>

                <p className="text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-widest">
                  {currentSlide.subTitle}
                </p>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                  {currentSlide.title}
                </h1>

                <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 tracking-wide uppercase max-w-md">
                  {currentSlide.caption}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleHeroCta}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 sm:px-7 py-3 rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all hover:gap-3 cursor-pointer"
                  >
                    <span>{currentSlide.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (currentSlide.product) {
                        setSelectedProduct(currentSlide.product);
                      }
                    }}
                    className="border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-semibold px-4 sm:px-5 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Quick Specs & Deals
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-400/25 dark:bg-orange-500/15 blur-3xl rounded-full scale-90 transition-transform duration-500" />
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="relative w-60 h-60 sm:w-72 sm:h-72 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                  {currentSlide.product && (
                    <div className="absolute -bottom-2 -left-2 sm:bottom-0 sm:left-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                      <div className="text-left">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold block">Deal Price</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-black text-orange-600 dark:text-orange-400">
                            {formatPrice(currentSlide.product.salePrice, settings.currencySymbol)}
                          </span>
                          <span className="text-xs text-zinc-400 line-through">
                            {formatPrice(currentSlide.product.regularPrice, settings.currencySymbol)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(slide.id)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === slide.id
                      ? 'w-7 h-2 bg-orange-500 shadow-sm'
                      : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-orange-400'
                  }`}
                  aria-label={`Go to slide ${slide.id + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 3-Column Promo Banner Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => handlePromoBannerClick('television')}
              className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200 block mb-0.5">Best Smart View</span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight">QLED TVs</h3>
                <span className="mt-3 inline-block bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">Shop Now →</span>
              </div>
              <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=260&q=80" alt="QLED TVs" className="w-20 h-20 object-contain drop-shadow-md" />
            </div>

            <div 
              onClick={() => handlePromoBannerClick('camera')}
              className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-200 block mb-0.5">Best Camera</span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight">Digital Cameras</h3>
                <span className="mt-3 inline-block bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">Checkout →</span>
              </div>
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=260&q=80" alt="Digital Cameras" className="w-20 h-20 object-contain drop-shadow-md" />
            </div>

            <div 
              onClick={() => handlePromoBannerClick('home')}
              className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-5 text-white flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-200 block mb-0.5">Appliances</span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight">Microwave Oven</h3>
                <span className="mt-3 inline-block bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full">Checkout →</span>
              </div>
              <img src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=260&q=80" alt="Microwave Oven" className="w-20 h-20 object-contain drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
