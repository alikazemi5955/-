export interface ProductSpecificationItem {
  label: string;
  value: string;
}

export interface ProductSpecificationGroup {
  groupName: string;
  items: ProductSpecificationItem[];
}

export interface ProductVariantOption {
  id: string;
  name: string;
  value: string;
  priceDelta?: number;
  colorCode?: string;
  inStock?: boolean;
}

export interface ProductVariantGroup {
  type: 'color' | 'storage' | 'ram' | 'warranty' | 'size';
  title: string;
  options: ProductVariantOption[];
}

export interface Product {
  id: string;
  name: string;
  persianName: string;
  brand: string;
  category: string; // e.g. 'mobile', 'laptop', 'tablet', etc.
  subcategory: string;
  price: number; // in Tomans
  oldPrice?: number; // in Tomans
  discount?: number; // percentage e.g. 12
  images: string[];
  rating: number; // 1 to 5
  reviewCount: number;
  stock: number;
  description: string;
  fullDescription?: string;
  specifications: ProductSpecificationGroup[];
  variants?: ProductVariantGroup[];
  badges?: ('special_deal' | 'bestseller' | 'new_arrival' | 'official_warranty' | 'express_shipping')[];
  keyFeatures?: string[];
  createdAt: string;
  tags: string[];
  salesCount: number;
  views: number;
}

export interface SubCategory {
  id: string;
  slug: string;
  name: string;
  productCount: number;
  popularBrands?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  persianName: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
  color: string;
  subcategories: SubCategory[];
  featuredBrands: string[];
  isPhase1: boolean;
  totalProductsCount: number;
}

export interface Brand {
  id: string;
  name: string;
  persianName: string;
  logo: string;
  description?: string;
  categories: string[];
  productCount: number;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + variants)
  product: Product;
  quantity: number;
  selectedColor?: ProductVariantOption;
  selectedStorage?: ProductVariantOption;
  selectedWarranty?: ProductVariantOption;
  unitPrice: number;
  totalPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  verifiedPurchase: boolean;
  likes: number;
  recommended: boolean;
}

export interface Address {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  postalAddress: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingCode: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  status: 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  address: Address;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nationalCode?: string;
  avatar?: string;
  joinedDate: string;
}

export type SortOption = 'featured' | 'cheapest' | 'expensive' | 'newest' | 'bestselling' | 'discount' | 'top_rated';

export interface FilterState {
  searchQuery: string;
  category?: string;
  subcategory?: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  discountOnly: boolean;
  minRating: number;
  specs: Record<string, string[]>;
  sortBy: SortOption;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export type NavigationPage = 
  | 'home'
  | 'categories'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'profile'
  | 'wishlist'
  | 'compare';
