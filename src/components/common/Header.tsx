import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User as UserIcon, 
  Scale, 
  Menu, 
  X, 
  Phone, 
  ChevronDown,
  ArrowLeft,
  LogOut,
  Package,
  MapPin,
  Sparkles,
  Tag,
  Laptop,
  Smartphone,
  Headphones,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cart,
    cartTotalCount,
    cartTotalPrice,
    setIsCartDrawerOpen,
    wishlist,
    compareList,
    setIsCompareModalOpen,
    user,
    setIsAuthModalOpen,
    logout,
    handleSearchSubmit,
    openProductDetail,
    openCategoryPage
  } = useStore();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Live search filtering with simulated fast debounce
  useEffect(() => {
    if (searchInputValue.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [searchInputValue]);

  const searchSuggestions = searchInputValue.trim() === '' 
    ? [] 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        p.persianName.includes(searchInputValue) ||
        p.brand.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchInputValue.toLowerCase()))
      ).slice(0, 5);

  const matchingCategories = searchInputValue.trim() === ''
    ? []
    : CATEGORIES.filter(c => c.name.includes(searchInputValue)).slice(0, 3);

  const matchingBrands = searchInputValue.trim() === ''
    ? []
    : BRANDS.filter(b => b.name.toLowerCase().includes(searchInputValue.toLowerCase()) || b.persianName.includes(searchInputValue)).slice(0, 3);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      handleSearchSubmit(searchInputValue.trim());
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleQuickSuggestionClick = (query: string) => {
    setSearchInputValue(query);
    handleSearchSubmit(query);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs select-none" id="main-header">
      {/* 1. Top Slim Trust & Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="bg-rose-600 text-white font-black px-2 py-0.5 rounded-full text-[10px] tracking-wide">
              تخفیف ویژه
            </span>
            <span className="text-slate-300 hidden md:inline">
              ارسال اکسپرس و رایگان برای خریدهای بالای ۵۰۰ هزار تومان + ضمانت اصالت ۱۰۰٪
            </span>
            <span className="text-slate-300 md:hidden">
              ضمانت اصالت ۱۰۰٪ و گارانتی رسمی کالاها
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-[11px] text-slate-300 dir-ltr">021-91008877</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button 
              onClick={() => setCurrentPage('profile')} 
              className="hover:text-white transition-colors hidden sm:inline"
            >
              پیگیری سفارش
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Right: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 -mr-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
              aria-label="باز کردن منو"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            >
              <BrandLogo size="md" showText={true} showSubtitle={true} />
            </div>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-2xl relative" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="جستجوی نام کالا، برند یا مدل (مثال: آیفون ۱۶، لپ‌تاپ ایسوس)..."
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-2xl pr-11 pl-24 py-2.5 border border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                />
                
                <Search className="w-5 h-5 text-slate-400 absolute right-3.5 pointer-events-none" />

                {searchInputValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInputValue('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute left-16 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    title="پاک کردن"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute left-1.5 top-1.5 bottom-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 rounded-xl transition-all shadow-xs"
                >
                  جستجو
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Modal / Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-slideUp">
                
                {/* Searching Skeleton */}
                {isSearching ? (
                  <div className="space-y-3 py-2">
                    <div className="h-4 bg-slate-100 rounded-md animate-pulse w-1/3" />
                    <div className="h-10 bg-slate-100 rounded-xl animate-pulse w-full" />
                    <div className="h-10 bg-slate-100 rounded-xl animate-pulse w-full" />
                  </div>
                ) : searchInputValue.trim() === '' ? (
                  /* Popular searches when query is empty */
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>بیشترین جستجوهای اخیر:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'آیفون ۱۶ پرو مکس',
                        'سامسونگ S24 اولترا',
                        'مک‌بوک پرو M3',
                        'ایرپاد پرو ۲',
                        'ساعت هوشمند گلکسی واچ',
                        'پاوربانک ۲۰۰۰۰ فست شارژ'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleQuickSuggestionClick(item)}
                          className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchSuggestions.length > 0 ? (
                  /* Results found */
                  <div className="space-y-3">
                    {matchingCategories.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block mb-1.5">دسته‌بندی‌ها:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {matchingCategories.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                openCategoryPage(cat.slug);
                                setIsSearchFocused(false);
                              }}
                              className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{cat.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1.5">محصولات پیشنهادی:</span>
                      <div className="divide-y divide-slate-100">
                        {searchSuggestions.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              openProductDetail(prod.id);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 py-2 px-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 truncate transition-colors">
                                {prod.persianName}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {prod.brand}
                                </span>
                                <span className="text-xs font-bold text-slate-900">
                                  {formatPrice(prod.price)}
                                </span>
                              </div>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSearch}
                      className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2.5 rounded-xl transition-colors"
                    >
                      مشاهده تمام نتایج برای «{searchInputValue}»
                    </button>
                  </div>
                ) : (
                  /* Empty state for search */
                  <div className="text-center py-5">
                    <p className="text-xs font-bold text-slate-700">کالایی با عبارت «{searchInputValue}» یافت نشد.</p>
                    <p className="text-[11px] text-slate-400 mt-1">املا و حروف عبارت جستجو شده را بررسی کرده یا نام برند را جستجو کنید.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Left: User Actions (Compare, Wishlist, Profile, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
              aria-label="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center gap-1.5"
              title="مقایسه محصولات"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {toPersianDigits(compareList.length)}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setCurrentPage('wishlist')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-colors hidden sm:flex"
              title="لیست علاقه‌مندی‌ها"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {toPersianDigits(wishlist.length)}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-slate-200/60"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                      {user.name.charAt(0)}
                    </div>
                    <span className="max-w-[90px] truncate hidden md:inline">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-slideUp">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{user.phoneNumber}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setCurrentPage('profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <Package className="w-4 h-4 text-slate-400" />
                          <span>سفارش‌های من</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPage('wishlist');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span>لیست علاقه‌مندی‌ها</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPage('profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>آدرس‌های ذخیره شده</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>خروج از حساب</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200/70 transition-all cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">ورود / ثبت‌نام</span>
                  <span className="sm:hidden">ورود</span>
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {toPersianDigits(cartTotalCount)}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">سبد خرید</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {isMobileSearchOpen && (
          <div className="mt-3 pt-3 border-t border-slate-100 lg:hidden animate-slideUp">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="جستجوی کالا، برند یا مدل..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="w-full bg-slate-100 text-slate-900 text-xs rounded-xl pr-10 pl-20 py-2.5 border border-slate-200 focus:border-indigo-500 outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <button
                type="submit"
                className="absolute left-1.5 top-1.5 bottom-1.5 bg-indigo-600 text-white text-xs font-bold px-3 rounded-lg"
              >
                جستجو
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-slideUp">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <BrandLogo size="sm" showSubtitle={false} />
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 px-3 block mb-2">دسته‌بندی‌های کالا:</span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      openCategoryPage(cat.slug);
                      setIsMobileNavOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 text-xs font-bold transition-colors text-right"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{toPersianDigits(cat.totalProductsCount || 0)} کالا</span>
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    setCurrentPage('products');
                    setIsMobileNavOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <span>تخفیف‌ها و پیشنهادهای ویژه</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('wishlist');
                    setIsMobileNavOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>علاقه‌مندی‌ها ({toPersianDigits(wishlist.length)})</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompareModalOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Scale className="w-4 h-4 text-amber-500" />
                  <span>مقایسه کالاها ({toPersianDigits(compareList.length)})</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-bold text-slate-800 mb-1">پشتیبانی پازل کالا</p>
              <p className="font-mono text-[11px] text-slate-600">۰۲۱-۹۱۰۰۸۸۷۷</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
