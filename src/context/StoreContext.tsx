import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, StoreSettings, AffiliateClickLog, StorePlatform } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  settings: StoreSettings;
  clicks: AffiliateClickLog[];
  wishlist: string[];
  compareList: string[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  adminSection: 'dashboard' | 'products' | 'categories' | 'analytics' | 'settings';
  setAdminSection: (section: 'dashboard' | 'products' | 'categories' | 'analytics' | 'settings') => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount') => void;
  activeFilterTab: 'all' | 'new' | 'featured' | 'deals' | 'top-sellers';
  setActiveFilterTab: (tab: 'all' | 'new' | 'featured' | 'deals' | 'top-sellers') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  openAdminPortal: () => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  
  // Product actions
  addProduct: (productData: Omit<Product, 'id' | 'clickCount' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Category actions
  addCategory: (categoryData: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Other actions
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  recordAffiliateClick: (product: Product, store: StorePlatform, customUrl?: string) => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  resetToDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'gadgetvexa_products_v1',
  CATEGORIES: 'gadgetvexa_categories_v1',
  SETTINGS: 'gadgetvexa_settings_v1',
  CLICKS: 'gadgetvexa_clicks_v1',
  WISHLIST: 'gadgetvexa_wishlist_v1',
  COMPARE: 'gadgetvexa_compare_v1',
  DARK_MODE: 'gadgetvexa_dark_mode_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Affiliate Click Logs
  const [clicks, setClicks] = useState<AffiliateClickLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLICKS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'click-1',
          productId: 'prod-sony-wh1000xm5',
          productTitle: 'Sony WH-1000XM5 Wireless Headphones',
          store: 'amazon' as StorePlatform,
          affiliateUrl: 'https://www.amazon.in/dp/B09XS7JWHH?tag=benkuuin-21',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'click-2',
          productId: 'prod-bengoo-headset',
          productTitle: 'BENGOO G9000 Pro Stereo Gaming Headset',
          store: 'amazon' as StorePlatform,
          affiliateUrl: 'https://www.amazon.in/dp/B01H6GUCCQ?tag=benkuuin-21',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
        {
          id: 'click-3',
          productId: 'prod-samsung-qled-tv',
          productTitle: 'Samsung 65" Neo QLED 4K Smart TV',
          store: 'flipkart' as StorePlatform,
          affiliateUrl: 'https://www.flipkart.com/search?q=samsung+neo+qled+65',
          timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
      ];
    } catch {
      return [];
    }
  });

  // Wishlist & Compare
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-bengoo-headset', 'prod-sony-wh1000xm5'];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [adminSection, setAdminSection] = useState<'dashboard' | 'products' | 'categories' | 'analytics' | 'settings'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'new' | 'featured' | 'deals' | 'top-sellers'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Admin Security PIN Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('gadgetvexa_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  const openAdminPortal = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const adminLogin = (pin: string): boolean => {
    const validPin = (settings.adminPin || '1234').trim();
    if (pin.trim() === validPin) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('gadgetvexa_admin_auth', 'true');
      } catch {
        // ignore storage error
      }
      setIsAdminLoginModalOpen(false);
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('gadgetvexa_admin_auth');
    } catch {
      // ignore
    }
    setCurrentView('store');
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify(clicks));
  }, [clicks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'clickCount' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      clickCount: 0,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(item => item !== id));
    setCompareList(prev => prev.filter(item => item !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  // Category CRUD
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    if (selectedCategory === id) {
      setSelectedCategory(null);
    }
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Track affiliate click
  const recordAffiliateClick = (product: Product, store: StorePlatform, customUrl?: string) => {
    const targetUrl = customUrl || product.affiliateUrl;
    
    // Increment click count for this product
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? { ...p, clickCount: (p.clickCount || 0) + 1 } : p))
    );

    // Add to click logs
    const newClick: AffiliateClickLog = {
      id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: product.id,
      productTitle: product.title,
      store,
      affiliateUrl: targetUrl,
      timestamp: new Date().toISOString(),
    };
    setClicks(prev => [newClick, ...prev.slice(0, 99)]); // keep latest 100
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        // max 4 items in comparison
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        clicks,
        wishlist,
        compareList,
        darkMode,
        toggleDarkMode,
        currentView,
        setCurrentView,
        adminSection,
        setAdminSection,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        activeFilterTab,
        setActiveFilterTab,
        selectedProduct,
        setSelectedProduct,
        isCompareOpen,
        setIsCompareOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAdminAuthenticated,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        openAdminPortal,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSettings,
        recordAffiliateClick,
        toggleWishlist,
        toggleCompare,
        clearCompare,
        resetToDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
