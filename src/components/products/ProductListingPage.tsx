import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Grid3X3, 
  List, 
  ChevronDown, 
  Check, 
  Search, 
  Star,
  Tag,
  Package,
  Layers,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { ProductCard } from '../common/ProductCard';
import { SortOption } from '../../types';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const ProductListingPage: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    resetFilters, 
    openCategoryPage, 
    setCurrentPage 
  } = useStore();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState('');

  // Active Category information
  const activeCategory = filters.category 
    ? CATEGORIES.find(c => c.slug === filters.category || c.id === filters.category) 
    : undefined;

  const activeSubcategory = activeCategory && filters.subcategory
    ? activeCategory.subcategories.find(s => s.slug === filters.subcategory || s.id === filters.subcategory)
    : undefined;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchPersian = product.persianName.includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchPersian && !matchBrand && !matchTags) return false;
      }

      // 2. Category
      if (filters.category) {
        const cat = CATEGORIES.find(c => c.slug === filters.category || c.id === filters.category);
        if (cat && product.category !== cat.id) return false;
      }

      // 3. Subcategory
      if (filters.subcategory) {
        const sub = activeCategory?.subcategories.find(s => s.slug === filters.subcategory || s.id === filters.subcategory);
        if (sub && product.subcategory !== sub.id) return false;
      }

      // 4. Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false;
      }

      // 5. Price Range
      if (product.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && product.price > filters.maxPrice) return false;

      // 6. In-Stock Only
      if (filters.inStockOnly && product.stock <= 0) return false;

      // 7. Discount Only
      if (filters.discountOnly && (!product.discount || product.discount <= 0)) return false;

      // 8. Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'cheapest':
          return a.price - b.price;
        case 'expensive':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'bestselling':
          return b.salesCount - a.salesCount;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'top_rated':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filters, activeCategory]);

  const handleBrandToggle = (brandName: string) => {
    setFilters(prev => {
      const exists = prev.brands.includes(brandName);
      const updated = exists 
        ? prev.brands.filter(b => b !== brandName)
        : [...prev.brands, brandName];
      return { ...prev, brands: updated };
    });
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'bestselling', label: 'پرفروش‌ترین' },
    { value: 'cheapest', label: 'ارزان‌ترین' },
    { value: 'expensive', label: 'گران‌ترین' },
    { value: 'discount', label: 'بیشترین تخفیف' },
    { value: 'top_rated', label: 'محبوب‌ترین' }
  ];

  // Active filter count for badge
  const activeFiltersCount = 
    (filters.brands.length > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.discountOnly ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  const filteredBrandsList = BRANDS.filter(b => 
    b.name.toLowerCase().includes(brandSearchTerm.toLowerCase()) || 
    b.persianName.includes(brandSearchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 select-none" id="product-listing-page">
      
      {/* 1. Breadcrumbs & Header Title */}
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:text-indigo-600 transition-colors"
          >
            خانه
          </button>
          <span>/</span>
          {activeCategory ? (
            <>
              <button 
                onClick={() => openCategoryPage(activeCategory.slug)}
                className="hover:text-indigo-600 transition-colors font-medium text-slate-600"
              >
                {activeCategory.name}
              </button>
              {activeSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-slate-800 font-bold">{activeSubcategory.name}</span>
                </>
              )}
            </>
          ) : filters.searchQuery ? (
            <span className="text-slate-800 font-bold">نتایج جستجوی «{filters.searchQuery}»</span>
          ) : (
            <span className="text-slate-800 font-bold">تمام محصولات</span>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {activeSubcategory 
                ? activeSubcategory.name 
                : activeCategory 
                  ? activeCategory.name 
                  : filters.searchQuery 
                    ? `نتایج جستجو برای «${filters.searchQuery}»`
                    : 'فروشگاه کالای دیجیتال'
              }
            </h1>
            <span className="bg-slate-200/70 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {toPersianDigits(filteredProducts.length)} کالا
            </span>
          </div>

          {/* Active Filters Clear Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>حذف فیلترها ({toPersianDigits(activeFiltersCount)})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Body Grid: Sidebar Filters (Desktop) + Product List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Desktop Filter Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6">
            
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-900">فیلترهای پیشرفته</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                >
                  پاکسازی
                </button>
              )}
            </div>

            {/* Quick Switch: In Stock Only */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}>
              <span className="text-xs font-bold text-slate-800">فقط کالاهای موجود</span>
              <div className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${filters.inStockOnly ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${filters.inStockOnly ? '-translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Quick Switch: Discount Only */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, discountOnly: !prev.discountOnly }))}>
              <span className="text-xs font-bold text-slate-800">فقط کالاهای تخفیف‌دار</span>
              <div className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${filters.discountOnly ? 'bg-rose-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${filters.discountOnly ? '-translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Price Filter Box */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block mb-3">محدوده قیمت (تومان)</span>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">از قیمت:</label>
                  <input
                    type="number"
                    placeholder="مثال: ۱,۰۰۰,۰۰۰"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) || 0 }))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">تا قیمت:</label>
                  <input
                    type="number"
                    placeholder="مثال: ۵۰,۰۰۰,۰۰۰"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) || 0 }))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Brand Checklist with Search */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900">برندها</span>
                {filters.brands.length > 0 && (
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold">
                    {toPersianDigits(filters.brands.length)} انتخاب
                  </span>
                )}
              </div>

              {/* Brand Search Input */}
              <div className="relative mb-2.5">
                <input
                  type="text"
                  placeholder="جستجوی برند..."
                  value={brandSearchTerm}
                  onChange={(e) => setBrandSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 text-xs rounded-xl pr-8 pl-3 py-1.5 border border-slate-200 outline-none focus:border-indigo-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredBrandsList.map(brand => {
                  const isChecked = filters.brands.includes(brand.name);
                  return (
                    <label
                      key={brand.id}
                      className="flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-medium">{brand.persianName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{brand.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block mb-3">حداقل امتیاز خریداران</span>
              <div className="space-y-1.5">
                {[4, 3, 2].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === stars ? 0 : stars }))}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                      filters.minRating === stars
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                      <span className="mr-1 font-bold">{toPersianDigits(stars)} ستاره به بالا</span>
                    </div>
                    {filters.minRating === stars && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Product Catalog Content (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Top Control Bar: Sort Options & Layout Mode & Mobile Filter Trigger */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-3">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors lg:hidden cursor-pointer"
            >
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>فیلترها</span>
              {activeFiltersCount > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {toPersianDigits(activeFiltersCount)}
                </span>
              )}
            </button>

            {/* Desktop Sort Tabs */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-400 ml-1">مرتب‌سازی:</span>
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilters(prev => ({ ...prev, sortBy: opt.value }))}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    filters.sortBy === opt.value
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Layout Toggle (Grid / List) */}
            <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${layoutMode === 'grid' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                title="نمایش شبکه‌ای"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${layoutMode === 'list' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                title="نمایش لیستی"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Product Grid / List */}
          {filteredProducts.length > 0 ? (
            <div className={
              layoutMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4'
                : 'flex flex-col gap-3'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout={layoutMode} />
              ))}
            </div>
          ) : (
            /* Professional Empty State */
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  کالایی با فیلترهای انتخابی شما یافت نشد
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  پیشنهاد می‌کنیم فیلترهای قیمت یا برندها را تغییر دهید تا نتایج بیشتری مشاهده کنید.
                </p>
              </div>

              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>پاک کردن تمام فیلترها</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* 3. Mobile Filter Bottom Sheet / Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-slideUp">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-sm text-slate-900">فیلتر و مرتب‌سازی</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter controls */}
            <div className="p-5 space-y-6">
              {/* Sort selector for mobile */}
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-2">مرتب‌سازی براساس:</span>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setFilters(prev => ({ ...prev, sortBy: opt.value }))}
                      className={`text-xs font-bold p-2.5 rounded-xl text-center border transition-colors ${
                        filters.sortBy === opt.value
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Switches */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between" onClick={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}>
                  <span className="text-xs font-bold text-slate-800">فقط کالاهای موجود</span>
                  <div className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${filters.inStockOnly ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${filters.inStockOnly ? '-translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between" onClick={() => setFilters(prev => ({ ...prev, discountOnly: !prev.discountOnly }))}>
                  <span className="text-xs font-bold text-slate-800">فقط کالاهای تخفیف‌دار</span>
                  <div className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${filters.discountOnly ? 'bg-rose-600' : 'bg-slate-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${filters.discountOnly ? '-translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2">انتخاب برند:</span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {BRANDS.map(brand => {
                    const isChecked = filters.brands.includes(brand.name);
                    return (
                      <label
                        key={brand.id}
                        className="flex items-center justify-between text-xs text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span>{brand.persianName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{brand.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3 sticky bottom-0 z-10">
              <button
                onClick={resetFilters}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-3 rounded-xl transition-colors"
              >
                پاک کردن
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-xs"
              >
                مشاهده {toPersianDigits(filteredProducts.length)} کالا
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
