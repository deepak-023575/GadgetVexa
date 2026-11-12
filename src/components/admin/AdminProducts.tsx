import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Star, 
  Zap, 
  Sparkles, 
  Filter, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Store,
  Tag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, StorePlatform } from '../../types';
import { STORE_BADGES, formatPrice } from '../../utils/iconHelper';

const PRESET_ELECTRONICS_IMAGES = [
  { name: 'Gaming Headset', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Studio Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ultra Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80' },
  { name: 'DSLR Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { name: '4K Smart TV', url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80' },
  { name: 'VR Headset', url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  { name: 'Air Fryer / Appliance', url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Microwave Oven', url: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80' },
  { name: 'Memory Card / Storage', url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80' },
];

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, settings } = useStore();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [regularPrice, setRegularPrice] = useState('3499');
  const [salePrice, setSalePrice] = useState('1999');
  const [rating, setRating] = useState('4.8');
  const [reviewsCount, setReviewsCount] = useState('1250');
  const [mainImage, setMainImage] = useState(PRESET_ELECTRONICS_IMAGES[0].url);
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [primaryStore, setPrimaryStore] = useState<StorePlatform>('amazon');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isDealOfTheDay, setIsDealOfTheDay] = useState(false);
  const [isTopSeller, setIsTopSeller] = useState(false);

  // Multi-Store Comparison Offers State (e.g. Amazon India + Flipkart + Croma)
  const [comparisonOffers, setComparisonOffers] = useState<Array<{
    id: string;
    store: StorePlatform;
    price: string;
    regularPrice: string;
    url: string;
    badge: string;
  }>>([]);

  const addComparisonStore = () => {
    const usedStores = comparisonOffers.map((o) => o.store);
    const allStores: StorePlatform[] = [
      'amazon',
      'flipkart',
      'croma',
      'reliance',
      'apple',
      'bestbuy',
      'bhphoto',
      'walmart',
      'newegg',
      'target',
    ];
    const nextStore = allStores.find((s) => !usedStores.includes(s)) || 'flipkart';

    setComparisonOffers((prev) => [
      ...prev,
      {
        id: `offer-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        store: nextStore,
        price: salePrice || '1999',
        regularPrice: regularPrice || '3499',
        url: '',
        badge: 'Verified Deal',
      },
    ]);
  };

  const updateComparisonStore = (id: string, field: 'store' | 'price' | 'regularPrice' | 'url' | 'badge', value: any) => {
    setComparisonOffers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeComparisonStore = (id: string) => {
    if (comparisonOffers.length <= 1) return;
    setComparisonOffers((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic Specs & Pros/Cons
  const [specs, setSpecs] = useState<Array<{ key: string; val: string }>>([
    { key: 'Connectivity', val: 'Bluetooth 5.3 + 3.5mm' },
    { key: 'Battery Life', val: 'Up to 30 Hours' },
  ]);
  const [pros, setPros] = useState<string[]>([
    'Exceptional build quality and audio fidelity',
    'Fast charging and ergonomic fit',
  ]);
  const [cons, setCons] = useState<string[]>([
    'Carrying case sold separately',
  ]);

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle('');
    setBrand('');
    setCategoryId(categories[0]?.id || '');
    setRegularPrice('3499');
    setSalePrice('1999');
    setRating('4.8');
    setReviewsCount('500');
    setMainImage(PRESET_ELECTRONICS_IMAGES[0].url);
    setShortDescription('High performance tech gear with cutting edge specs.');
    setFullDescription('Engineered for peak performance, everyday reliability, and high fidelity acoustics.');
    setPrimaryStore('amazon');
    setAffiliateUrl(`https://www.amazon.in/dp/EXAMPLE?tag=${settings.defaultAmazonTag}`);
    setIsFeatured(true);
    setIsDealOfTheDay(false);
    setIsTopSeller(false);
    setComparisonOffers([
      {
        id: `offer-${Date.now()}-0`,
        store: 'amazon',
        price: '1999',
        regularPrice: '3499',
        url: `https://www.amazon.in/s?k=example&tag=${settings.defaultAmazonTag}`,
        badge: 'Lowest Price',
      },
      {
        id: `offer-${Date.now()}-1`,
        store: 'flipkart',
        price: '2199',
        regularPrice: '3499',
        url: 'https://www.flipkart.com/search?q=example',
        badge: 'Verified Deal',
      },
    ]);
    setSpecs([
      { key: 'Connectivity', val: 'Wireless + USB-C' },
      { key: 'Warranty', val: '1 Year Manufacturer' },
    ]);
    setPros(['Crisp high-resolution performance', 'Excellent price to value ratio']);
    setCons(['Charging cable is relatively short']);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setRegularPrice(p.regularPrice.toString());
    setSalePrice(p.salePrice.toString());
    setRating(p.rating.toString());
    setReviewsCount(p.reviewsCount.toString());
    setMainImage(p.mainImage);
    setShortDescription(p.shortDescription);
    setFullDescription(p.fullDescription);
    setPrimaryStore(p.primaryStore);
    setAffiliateUrl(p.affiliateUrl);
    setIsFeatured(!!p.isFeatured);
    setIsDealOfTheDay(!!p.isDealOfTheDay);
    setIsTopSeller(!!p.isTopSeller);

    // Initialize multi-store comparison links
    if (p.priceComparison && p.priceComparison.length > 0) {
      setComparisonOffers(
        p.priceComparison.map((c, idx) => ({
          id: `offer-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
          store: c.store,
          price: (c.price !== undefined && c.price !== null) ? c.price.toString() : p.salePrice.toString(),
          regularPrice: (c.regularPrice !== undefined && c.regularPrice !== null) ? c.regularPrice.toString() : p.regularPrice.toString(),
          url: c.url || p.affiliateUrl || '',
          badge: c.badge || (idx === 0 ? 'Lowest Price' : 'Verified Deal'),
        }))
      );
    } else {
      setComparisonOffers([
        {
          id: `offer-${Date.now()}-0`,
          store: p.primaryStore || 'amazon',
          price: p.salePrice.toString(),
          regularPrice: p.regularPrice.toString(),
          url: p.affiliateUrl || '',
          badge: 'Lowest Price',
        },
        {
          id: `offer-${Date.now()}-1`,
          store: (p.primaryStore === 'amazon' ? 'flipkart' : 'amazon') as StorePlatform,
          price: p.salePrice.toString(),
          regularPrice: p.regularPrice.toString(),
          url: '',
          badge: 'Verified Deal',
        },
      ]);
    }

    setSpecs(
      Object.entries(p.specifications || {}).map(([k, v]) => ({ key: k, val: v }))
    );
    setPros(p.pros || []);
    setCons(p.cons || []);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const regNum = parseFloat(regularPrice) || 0;
    const saleNum = parseFloat(salePrice) || 0;
    const discount = regNum > saleNum ? Math.round(((regNum - saleNum) / regNum) * 100) : 0;
    const catObj = categories.find((c) => c.id === categoryId);

    // Convert specs array back to Record
    const specRecord: Record<string, string> = {};
    specs.forEach((item) => {
      if (item.key.trim()) {
        specRecord[item.key.trim()] = item.val.trim();
      }
    });

    // Build multi-store price comparison from comparisonOffers
    const validOffers = comparisonOffers.filter((o) => o.url.trim() !== '');
    const activeOffers = validOffers.length > 0 ? validOffers : comparisonOffers;

    const priceCompList = activeOffers.map((o, idx) => ({
      store: o.store,
      storeName: STORE_BADGES[o.store]?.name || o.store.toUpperCase(),
      price: parseFloat(o.price) || saleNum,
      regularPrice: parseFloat(o.regularPrice) || regNum,
      url: o.url.trim() || `https://www.amazon.in/s?k=${encodeURIComponent(title)}&tag=${settings.defaultAmazonTag}`,
      inStock: true,
      badge: o.badge || (idx === 0 ? 'Lowest Price' : 'Verified Deal'),
    }));

    const sortedOffers = [...priceCompList].sort((a, b) => a.price - b.price);
    const bestOffer = sortedOffers[0] || priceCompList[0];

    const productPayload = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      brand,
      categoryId,
      categoryName: catObj?.name || 'Electronics',
      regularPrice: regNum,
      salePrice: saleNum,
      discountPercent: discount,
      rating: parseFloat(rating) || 4.5,
      reviewsCount: parseInt(reviewsCount) || 100,
      isFeatured,
      isDealOfTheDay,
      isTopSeller,
      mainImage,
      galleryImages: [mainImage],
      shortDescription,
      fullDescription,
      specifications: specRecord,
      pros: pros.filter((p) => p.trim()),
      cons: cons.filter((c) => c.trim()),
      primaryStore: bestOffer.store,
      affiliateUrl: bestOffer.url,
      priceComparison: priceCompList,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  // Filter products
  const filtered = products.filter((p) => {
    const matchCategory = filterCategory === 'all' || p.categoryId === filterCategory;
    const matchSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Top Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Manage Products ({products.length})
          </h2>
        </div>

        <button
          onClick={openAddModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, brand, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-auto bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold rounded-xl py-2 px-3 text-zinc-700 dark:text-zinc-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Departments</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price & Deal</th>
                <th className="p-3.5">Store Deals</th>
                <th className="p-3.5">Clicks</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filtered.map((product) => {
                const storeBadge = STORE_BADGES[product.primaryStore] || STORE_BADGES.amazon;
                return (
                  <tr key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.mainImage}
                          alt={product.title}
                          className="w-10 h-10 object-contain rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 shrink-0"
                        />
                        <div className="max-w-[220px]">
                          <div className="font-bold text-zinc-900 dark:text-white truncate">
                            {product.title}
                          </div>
                          <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap">
                      {product.categoryName}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-extrabold text-orange-600 dark:text-orange-400 text-sm">
                        {formatPrice(product.salePrice, settings.currencySymbol)}
                      </div>
                      <div className="text-[10px] text-zinc-400 line-through">
                        {formatPrice(product.regularPrice, settings.currencySymbol)}
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1 flex-wrap">
                        {product.priceComparison?.map((c, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STORE_BADGES[c.store]?.bg || 'bg-zinc-100'} ${STORE_BADGES[c.store]?.text || 'text-zinc-700'}`}
                          >
                            {STORE_BADGES[c.store]?.name || c.store}: {formatPrice(c.price, settings.currencySymbol)}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-mono font-bold text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300">
                        {product.clickCount || 0}
                      </span>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(product.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Delete Product?</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Are you sure you want to remove this product? This action cannot be undone.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deletingProductId);
                  setDeletingProductId(null);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                Delete
              </but
