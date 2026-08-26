import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Award, 
  Tag, 
  Layers, 
  ChevronDown, 
  ArrowLeft,
  Headphones,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  BatteryCharging,
  Zap,
  Shield,
  HardDrive,
  Gamepad2,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

// Icon mapper for category strings
export const getCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Tablet': return <Tablet className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'Watch': return <Watch className={className} />;
    case 'Headphones': return <Headphones className={className} />;
    case 'BatteryCharging': return <BatteryCharging className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'HardDrive': return <HardDrive className={className} />;
    case 'Gamepad2': return <Gamepad2 className={className} />;
    default: return <Layers className={className} />;
  }
};

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    openCategoryPage, 
    setFilters 
  } = useStore();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState(CATEGORIES[0]);

  const handleSpecialDealsClick = () => {
    setFilters(prev => ({
      ...prev,
      discountOnly: true,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'discount'
    }));
    setCurrentPage('products');
  };

  const handleBestsellersClick = () => {
    setFilters(prev => ({
      ...prev,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'bestselling'
    }));
    setCurrentPage('products');
  };

  const handleNewArrivalsClick = () => {
    setFilters(prev => ({
      ...prev,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'newest'
    }));
    setCurrentPage('products');
  };

  return (
    <nav className="bg-white border-b border-slate-200 hidden lg:block relative z-30 select-none" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Right Links: Mega Menu Trigger & Main Links */}
          <div className="flex items-center gap-1 xl:gap-2">
            
            {/* Mega Menu Category Dropdown Trigger */}
            <div 
              className="relative py-2.5"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button 
                onClick={() => setCurrentPage('categories')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold text-xs bg-slate-100 text-slate-900 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                id="mega-menu-trigger"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>دسته‌بندی کالاها</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div 
                  className="absolute top-full right-0 w-[840px] bg-white rounded-2xl shadow-2xl border border-slate-200 mt-1 p-4 grid grid-cols-12 gap-4 animate-fadeIn overflow-hidden"
                  id="mega-menu-dropdown"
                >
                  {/* Category Sidebar List */}
                  <div className="col-span-4 border-l border-slate-100 pr-1 space-y-1 max-h-[420px] overflow-y-auto">
                    {CATEGORIES.map(cat => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveHoverCategory(cat)}
                        onClick={() => {
                          openCategoryPage(cat.slug);
                          setIsMegaMenuOpen(false);
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                          activeHoverCategory.id === cat.id 
                            ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {getCategoryIcon(cat.icon, `w-4 h-4 ${activeHoverCategory.id === cat.id ? 'text-white' : 'text-slate-500'}`)}
                          <span>{cat.name}</span>
                        </div>
                        <ArrowLeft className={`w-3.5 h-3.5 opacity-60 ${activeHoverCategory.id === cat.id ? 'block' : 'hidden'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Category Subcategories & Brands Preview */}
                  <div className="col-span-8 pl-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">
                            همه محصولات {activeHoverCategory.name}
                          </h4>
                          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                            {activeHoverCategory.totalProductsCount} کالا
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            openCategoryPage(activeHoverCategory.slug);
                            setIsMegaMenuOpen(false);
                          }}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors"
                        >
                          <span>مشاهده همه</span>
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        {activeHoverCategory.description}
                      </p>

                      {/* Subcategory Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {activeHoverCategory.subcategories.map(sub => (
                          <div
                            key={sub.id}
                            onClick={() => {
                              openCategoryPage(activeHoverCategory.slug, sub.slug);
                              setIsMegaMenuOpen(false);
                            }}
                            className="p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 cursor-pointer transition-all group"
                          >
                            <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                              {sub.name}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {sub.productCount} محصول موجود
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Brands in Category */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">برندهای برتر:</span>
                      <div className="flex items-center gap-2">
                        {activeHoverCategory.featuredBrands.map(b => (
                          <span key={b} className="text-xs font-medium text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Navigation Links */}
            <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
              
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${
                  currentPage === 'home' ? 'text-indigo-600 font-bold' : ''
                }`}
              >
                صفحه اصلی
              </button>

              <button
                onClick={handleSpecialDealsClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/70 transition-colors text-slate-700 font-semibold"
              >
                <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                <span>شگفت‌انگیزها و تخفیف‌ها</span>
              </button>

              <button
                onClick={handleBestsellersClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-50/70 transition-colors text-slate-700"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>پرفروش‌ترین کالاها</span>
              </button>

              <button
                onClick={handleNewArrivalsClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors text-slate-700"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>جدیدترین‌ها</span>
              </button>

              <button
                onClick={() => setCurrentPage('categories')}
                className={`px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${
                  currentPage === 'categories' ? 'text-indigo-600 font-bold' : ''
                }`}
              >
                راهنمای دسته‌بندی‌ها
              </button>
            </div>
          </div>

          {/* Left Quick Note */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ارسال رایگان برای تمام سفارش‌های بالای ۲ میلیون تومان</span>
          </div>

        </div>
      </div>
    </nav>
  );
};
