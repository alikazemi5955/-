import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  ProductVariantOption, 
  User, 
  Address, 
  Order, 
  FilterState, 
  NavigationPage, 
  ToastMessage,
  Review 
} from '../types';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { generateTrackingCode } from '../utils/formatters';

interface StoreContextType {
  // Navigation & View
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedSubcategorySlug: string | null;
  setSelectedSubcategorySlug: (slug: string | null) => void;
  openProductDetail: (productId: string) => void;
  openCategoryPage: (categorySlug: string, subcategorySlug?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: ProductVariantOption, selectedStorage?: ProductVariantOption, selectedWarranty?: ProductVariantOption) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscountTotal: number;
  cartFinalTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare
  compareList: string[]; // product IDs (max 4)
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // User & Auth
  user: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (phoneOrEmail: string, name?: string) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod: string, addressId: string) => Order | null;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (query: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'likes' | 'verifiedPurchase'>) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  category: undefined,
  subcategory: undefined,
  brands: [],
  minPrice: 0,
  maxPrice: 200000000,
  inStockOnly: false,
  discountOnly: false,
  minRating: 0,
  specs: {},
  sortBy: 'featured'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string | null>(null);

  // Cart State (initialized from localStorage if available)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('puzzlekala_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('puzzlekala_wishlist');
      return saved ? JSON.parse(saved) : ['prod-iphone-16-pro-max', 'prod-sony-wh-1000xm5'];
    } catch {
      return ['prod-iphone-16-pro-max', 'prod-sony-wh-1000xm5'];
    }
  });

  // Compare State
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Auth & User State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('puzzlekala_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-1',
        name: 'وحید زارع',
        phone: '09121234567',
        email: 'vahid@example.com',
        nationalCode: '0012345678',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        joinedDate: '۱۴۰۲/۰۶/۱۵'
      };
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      title: 'منزل تهران',
      recipientName: 'وحید زارع',
      phone: '09121234567',
      province: 'تهران',
      city: 'تهران',
      postalAddress: 'خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۶ واحد ۲',
      postalCode: '1969764512',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'محل کار',
      recipientName: 'وحید زارع',
      phone: '09121234567',
      province: 'تهران',
      city: 'تهران',
      postalAddress: 'خیابان بهشتی، خیابان قائم‌مقام فراهانی، کوچه ششم، پلاک ۱۲',
      postalCode: '1586713456',
      isDefault: false
    }
  ]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1',
      orderNumber: 'PZK-984210',
      trackingCode: 'PZK-98421098',
      date: '۱۴۰۳/۰۵/۱۴',
      items: [
        {
          id: 'prod-anker-735-gan-65w-default',
          product: PRODUCTS.find(p => p.id === 'prod-anker-735-gan-65w') || PRODUCTS[0],
          quantity: 1,
          unitPrice: 3400000,
          totalPrice: 3400000
        }
      ],
      totalAmount: 3400000,
      discountAmount: 500000,
      shippingFee: 0,
      status: 'delivered',
      paymentMethod: 'پرداخت آنلاین اینترنتی',
      address: {
        id: 'addr-1',
        title: 'منزل تهران',
        recipientName: 'وحید زارع',
        phone: '09121234567',
        province: 'تهران',
        city: 'تهران',
        postalAddress: 'خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۶',
        postalCode: '1969764512',
        isDefault: true
      }
    }
  ]);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  // Filters & Search
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('puzzlekala_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('puzzlekala_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation helpers
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategoryPage = (categorySlug: string, subcategorySlug?: string) => {
    setSelectedCategorySlug(categorySlug);
    setSelectedSubcategorySlug(subcategorySlug || null);
    setFilters(prev => ({
      ...prev,
      category: categorySlug,
      subcategory: subcategorySlug,
      searchQuery: ''
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
      category: undefined,
      subcategory: undefined
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => {
    const originalPrice = item.product.oldPrice || item.product.price;
    const delta = (item.selectedStorage?.priceDelta || 0) + (item.selectedWarranty?.priceDelta || 0);
    return total + ((originalPrice + delta) * item.quantity);
  }, 0);

  const cartFinalTotalBeforeCoupon = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  const cartDiscountTotal = (cartSubtotal - cartFinalTotalBeforeCoupon) + couponDiscount;
  const cartFinalTotal = Math.max(0, cartFinalTotalBeforeCoupon - couponDiscount);

  // Cart Actions
  const addToCart = (
    product: Product, 
    quantity = 1, 
    selectedColor?: ProductVariantOption, 
    selectedStorage?: ProductVariantOption, 
    selectedWarranty?: ProductVariantOption
  ) => {
    const colorId = selectedColor ? selectedColor.id : (product.variants?.find(v => v.type === 'color')?.options[0]?.id || 'def-col');
    const storageId = selectedStorage ? selectedStorage.id : (product.variants?.find(v => v.type === 'storage')?.options[0]?.id || 'def-stg');
    const warrantyId = selectedWarranty ? selectedWarranty.id : (product.variants?.find(v => v.type === 'warranty')?.options[0]?.id || 'def-war');

    const defaultColor = selectedColor || product.variants?.find(v => v.type === 'color')?.options[0];
    const defaultStorage = selectedStorage || product.variants?.find(v => v.type === 'storage')?.options[0];
    const defaultWarranty = selectedWarranty || product.variants?.find(v => v.type === 'warranty')?.options[0];

    const storageDelta = defaultStorage?.priceDelta || 0;
    const warrantyDelta = defaultWarranty?.priceDelta || 0;
    const calculatedUnitPrice = product.price + storageDelta + warrantyDelta;

    const cartItemId = `${product.id}-${colorId}-${storageId}-${warrantyId}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.unitPrice }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          quantity,
          selectedColor: defaultColor,
          selectedStorage: defaultStorage,
          selectedWarranty: defaultWarranty,
          unitPrice: calculatedUnitPrice,
          totalPrice: calculatedUnitPrice * quantity
        };
        return [...prev, newItem];
      }
    });

    addToast(`«${product.persianName.substring(0, 32)}...» به سبد خرید اضافه شد`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity,
          totalPrice: item.unitPrice * quantity
        };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('کالا از سبد خرید حذف شد', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'لطفاً کد تخفیف را وارد کنید' };
    }
    if (trimmed === 'PUZZLE' || trimmed === 'PUZZLEKALA') {
      const discount = Math.round(cartFinalTotalBeforeCoupon * 0.1); // 10% discount
      setCouponCode(trimmed);
      setCouponDiscount(discount);
      addToast('کد تخفیف ۱۰٪ پازل کالا با موفقیت اعمال شد', 'success');
      return { success: true, message: 'کد تخفیف ۱۰٪ با موفقیت اعمال شد' };
    } else if (trimmed === 'WELCOME' || trimmed === 'NEW') {
      const discount = 500000; // 500k Tomans discount
      setCouponCode(trimmed);
      setCouponDiscount(discount);
      addToast('کد تخفیف ۵۰۰ هزار تومانی خوش‌آمدگویی اعمال شد', 'success');
      return { success: true, message: 'کد تخفیف ۵۰۰،۰۰۰ تومانی اعمال شد' };
    } else {
      return { success: false, message: 'کد تخفیف وارد شده معتبر نیست یا منقضی شده است' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    addToast('کد تخفیف حذف شد', 'info');
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = PRODUCTS.find(p => p.id === productId);
    const name = prod ? prod.name : 'محصول';

    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addToast(`${name} از لیست علاقه‌مندی‌ها حذف شد`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      addToast(`${name} به لیست علاقه‌مندی‌ها افزوده شد`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare Actions
  const toggleCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      setCompareList(prev => prev.filter(id => id !== productId));
      addToast('کالا از لیست مقایسه حذف شد', 'info');
    } else {
      if (compareList.length >= 4) {
        addToast('حداکثر ۴ محصول را می‌توانید همزمان مقایسه کنید', 'warning');
        return;
      }
      setCompareList(prev => [...prev, productId]);
      addToast('محصول به لیست مقایسه اضافه شد', 'success');
      setIsCompareModalOpen(true);
    }
  };

  const isInCompare = (productId: string) => compareList.includes(productId);
  const clearCompare = () => setCompareList([]);

  // Auth Actions
  const login = (phoneOrEmail: string, name?: string) => {
    const newUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 7),
      name: name || 'کاربر گرامی پازل کالا',
      phone: phoneOrEmail.includes('@') ? '09120000000' : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : undefined,
      joinedDate: '۱۴۰۳/۰۵/۲۸'
    };
    setUser(newUser);
    try {
      localStorage.setItem('puzzlekala_user', JSON.stringify(newUser));
    } catch {}
    setIsAuthModalOpen(false);
    addToast(`خوش آمدید، ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('puzzlekala_user');
    } catch {}
    addToast('از حساب کاربری خود خارج شدید', 'info');
    setCurrentPage('home');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    try {
      localStorage.setItem('puzzlekala_user', JSON.stringify(updated));
    } catch {}
    addToast('اطلاعات کاربری با موفقیت ویرایش شد', 'success');
  };

  // Address Actions
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: 'addr-' + Math.random().toString(36).substring(2, 7)
    };
    if (newAddress.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddress));
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
    addToast('آدرس جدید با موفقیت اضافه شد', 'success');
  };

  const updateAddress = (id: string, updatedData: Partial<Address>) => {
    setAddresses(prev => prev.map(addr => {
      if (addr.id === id) {
        return { ...addr, ...updatedData };
      }
      if (updatedData.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    }));
    addToast('آدرس با موفقیت بروزرسانی شد', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    addToast('آدرس حذف شد', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  // Order Actions
  const createOrder = (paymentMethod: string, addressId: string): Order | null => {
    if (cart.length === 0) return null;
    const targetAddress = addresses.find(a => a.id === addressId) || addresses[0];
    if (!targetAddress) return null;

    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substring(2, 8),
      orderNumber: 'PZK-' + Math.floor(100000 + Math.random() * 900000),
      trackingCode: generateTrackingCode(),
      date: new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
      items: [...cart],
      totalAmount: cartFinalTotal,
      discountAmount: cartDiscountTotal,
      shippingFee: 0, // Free shipping for promotion
      status: 'processing',
      paymentMethod,
      address: targetAddress
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Review Actions
  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'likes' | 'verifiedPurchase'>) => {
    const fullReview: Review = {
      ...newRev,
      id: 'rev-' + Math.random().toString(36).substring(2, 8),
      date: new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
      likes: 0,
      verifiedPurchase: true
    };
    setReviews(prev => [fullReview, ...prev]);
    addToast('نظر شما با موفقیت ثبت شد و پس از تایید منتشر خواهد شد', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedSubcategorySlug,
        setSelectedSubcategorySlug,
        openProductDetail,
        openCategoryPage,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscountTotal,
        cartFinalTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        updateUser,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        createOrder,
        filters,
        setFilters,
        resetFilters,
        searchQuery,
        setSearchQuery,
        handleSearchSubmit,
        reviews,
        addReview,
        toasts,
        addToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct
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
