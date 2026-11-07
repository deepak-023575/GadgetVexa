export type StorePlatform = 'amazon' | 'flipkart' | 'croma' | 'reliance' | 'bestbuy' | 'walmart' | 'bhphoto' | 'newegg' | 'target' | 'apple';

export interface PriceComparison {
  store: StorePlatform;
  storeName: string;
  price: number;
  regularPrice: number;
  url: string;
  inStock: boolean;
  badge?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  regularPrice: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTopSeller?: boolean;
  isDealOfTheDay?: boolean;
  mainImage: string;
  galleryImages: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  pros: string[];
  cons: string[];
  primaryStore: StorePlatform;
  affiliateUrl: string;
  affiliateTag?: string;
  priceComparison: PriceComparison[];
  clickCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  bannerImage?: string;
  productCount?: number;
  displayOrder: number;
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productTitle: string;
  store: StorePlatform;
  affiliateUrl: string;
  timestamp: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  defaultAmazonTag: string;
  affiliateDisclosure: string;
  supportEmail: string;
  currencySymbol: string;
  headerNotice: string;
  adminPin?: string;
}
