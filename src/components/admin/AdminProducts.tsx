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
  Image as ImageIcon
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
      primaryStore,
      affiliateUrl: affiliateUrl || `https://www.amazon.com/s?k=${encodeURIComponent(title)}&tag=${settings.defaultAmazonTag}`,
      priceComparison: [
        {
          store: primaryStore,
          storeName: STORE_BADGES[primaryStore]?.name || 'Amazon',
          price: saleNum,
          regularPrice: regNum,
          url: affiliateUrl,
          inStock: true,
          badge: 'Verified Deal',
        },
      ],
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
                <th className="p-3.5">Price & Discount</th>
                <th className="p-3.5">Store & Link</th>
                <th className="p-3.5">Status Badges</th>
                <th className="p-3.5 text-center">Clicks</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filtered.map((p) => {
                const badge = STORE_BADGES[p.primaryStore] || STORE_BADGES.amazon;
                return (
                  <tr key={p.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                    {/* Product */}
                    <td className="p-3.5 min-w-[260px]">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.mainImage}
                          alt={p.title}
                          className="w-12 h-12 object-contain rounded-xl bg-zinc-50 dark:bg-zinc-800 p-1 shrink-0 border border-zinc-200 dark:border-zinc-700"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-orange-500">
                            {p.brand}
                          </span>
                          <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-1">
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-1 text-amber-500 text-[10px] mt-0.5">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-bold">{p.rating}</span>
                            <span className="text-zinc-400">({p.reviewsCount})</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3.5 text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                      {p.categoryName}
                    </td>

                    {/* Price & Discount */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-sm text-zinc-900 dark:text-white">
                          {formatPrice(p.salePrice, settings.currencySymbol)}
                        </span>
                        {p.regularPrice > p.salePrice && (
                          <span className="text-[11px] text-zinc-400 line-through">
                            {formatPrice(p.regularPrice, settings.currencySymbol)}
                          </span>
                        )}
                      </div>
                      {p.discountPercent > 0 && (
                        <span className="inline-block text-[10px] font-bold text-orange-600 dark:text-orange-400">
                          -{p.discountPercent}% Off
                        </span>
                      )}
                    </td>

                    {/* Retailer Store */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text}`}>
                          {badge.name}
                        </span>
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-orange-500"
                          title="Open Affiliate Target"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                    {/* Status Badges */}
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Featured
                          </span>
                        )}
                        {p.isDealOfTheDay && (
                          <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Deal of Day
                          </span>
                        )}
                        {p.isTopSeller && (
                          <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Top Seller
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Clicks */}
                    <td className="p-3.5 text-center font-bold text-orange-600 dark:text-orange-400">
                      {p.clickCount || 0}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          className="p-1.5 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Delete This Product?
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                This item will be removed from your store front and affiliate comparison tables.
              </p>
            </div>
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
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div 
            className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white">
                {editingProduct ? 'Edit Electronics Product' : 'Add New Electronics Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Sony, Apple, Nikon, Samsung"
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Department Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Regular Price ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Sale Deal Price ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Rating (1 to 5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Affiliate Platform & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Primary Store Platform
                  </label>
                  <select
                    value={primaryStore}
                    onChange={(e) => setPrimaryStore(e.target.value as StorePlatform)}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="amazon">Amazon India</option>
                    <option value="flipkart">Flipkart</option>
                    <option value="croma">Croma</option>
                    <option value="reliance">Reliance Digital</option>
                    <option value="apple">Apple India</option>
                    <option value="bestbuy">Best Buy</option>
                    <option value="bhphoto">B&H Photo Video</option>
                    <option value="walmart">Walmart</option>
                    <option value="newegg">Newegg</option>
                    <option value="target">Target</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Affiliate Target URL
                  </label>
                  <input
                    type="url"
                    required
                    value={affiliateUrl}
                    onChange={(e) => setAffiliateUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/B00.../?tag=yourtag-20"
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Image Selection with Presets */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                  Product Image URL
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={mainImage}
                    alt="Preview"
                    className="w-12 h-12 object-contain rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 shrink-0 border border-zinc-200 dark:border-zinc-700"
                  />
                  <input
                    type="url"
                    required
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1">
                  <span className="text-[10px] text-zinc-400 block mb-1 font-semibold">
                    Quick Sample Tech Photos:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PRESET_ELECTRONICS_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMainImage(preset.url)}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                          mainImage === preset.url
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isDealOfTheDay}
                    onChange={(e) => setIsDealOfTheDay(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Deal of the Day</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isTopSeller}
                    onChange={(e) => setIsTopSeller(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Top Seller Badge</span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={fullDescription}
                  onChange={(e) => {
                    setFullDescription(e.target.value);
                    if (!shortDescription) setShortDescription(e.target.value.slice(0, 100));
                  }}
                  className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Dynamic Key-Value Specs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={() => setSpecs([...specs, { key: '', val: '' }])}
                    className="text-xs text-orange-500 hover:underline font-semibold cursor-pointer"
                  >
                    + Add Spec Row
                  </button>
                </div>
                {specs.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Spec Name (e.g. Display)"
                      value={item.key}
                      onChange={(e) => {
                        const copy = [...specs];
                        copy[idx].key = e.target.value;
                        setSpecs(copy);
                      }}
                      className="w-1/3 px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 6.7 inch OLED 120Hz)"
                      value={item.val}
                      onChange={(e) => {
                        const copy = [...specs];
                        copy[idx].val = e.target.value;
                        setSpecs(copy);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      Pros (Good Points)
                    </label>
                    <button
                      type="button"
                      onClick={() => setPros([...pros, ''])}
                      className="text-[11px] text-emerald-600 hover:underline font-semibold cursor-pointer"
                    >
                      + Add Pro
                    </button>
                  </div>
                  {pros.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={p}
                        onChange={(e) => {
                          const copy = [...pros];
                          copy[idx] = e.target.value;
                          setPros(copy);
                        }}
                        className="flex-1 px-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setPros(pros.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-rose-500 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                      Cons (Trade-offs)
                    </label>
                    <button
                      type="button"
                      onClick={() => setCons([...cons, ''])}
                      className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      + Add Con
                    </button>
                  </div>
                  {cons.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={c}
                        onChange={(e) => {
                          const copy = [...cons];
                          copy[idx] = e.target.value;
                          setCons(copy);
                        }}
                        className="flex-1 px-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setCons(cons.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-rose-500 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Product Updates' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
