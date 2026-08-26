import React, { useState } from 'react';
import { Award, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

type TabKey = 'all' | 'cat-mobile' | 'cat-laptop' | 'cat-audio' | 'cat-accessories';

export const BestsellersShowcase: React.FC = () => {
  const { setFilters, setCurrentPage } = useStore();
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const tabs = [
    { key: 'all' as TabKey, label: 'همه دسته‌ها' },
    { key: 'cat-mobile' as TabKey, label: 'گوشی موبایل' },
    { key: 'cat-laptop' as TabKey, label: 'لپ‌تاپ و تبلت' },
    { key: 'cat-audio' as TabKey, label: 'هدفون و صوتی' },
    { key: 'cat-accessories' as TabKey, label: 'پاوربانک و شارژر' },
  ];

  let filteredProducts = PRODUCTS.filter(p => p.badges?.includes('bestseller') || p.salesCount > 100);

  if (activeTab === 'cat-mobile') {
    filteredProducts = filteredProducts.filter(p => p.category === 'cat-mobile');
  } else if (activeTab === 'cat-laptop') {
    filteredProducts = filteredProducts.filter(p => p.category === 'cat-laptop' || p.category === 'cat-tablet');
  } else if (activeTab === 'cat-audio') {
    filteredProducts = filteredProducts.filter(p => p.category === 'cat-audio');
  } else if (activeTab === 'cat-accessories') {
    filteredProducts = filteredProducts.filter(p => p.category === 'cat-powerbank' || p.category === 'cat-chargers' || p.category === 'cat-mobile-accessories');
  }

  const displayedProducts = filteredProducts.slice(0, 8);

  const handleSeeAllBestsellers = () => {
    setFilters(prev => ({
      ...prev,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'bestselling'
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="bestsellers-section">
      {/* Header and Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              پرفروش‌ترین‌های دیجیتال
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              محبوب‌ترین و پرانتخاب‌ترین محصولات کاربران پازل کالا
            </p>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Footer link */}
      <div className="text-center mt-6">
        <button
          onClick={handleSeeAllBestsellers}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 transition-colors cursor-pointer"
        >
          <span>مشاهده همه پرفروش‌ترین کالاها</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
