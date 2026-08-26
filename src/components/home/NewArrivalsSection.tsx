import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const NewArrivalsSection: React.FC = () => {
  const { setFilters, setCurrentPage } = useStore();

  const newProducts = [...PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const handleSeeAllNew = () => {
    setFilters(prev => ({
      ...prev,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'newest'
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="new-arrivals-section">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              جدیدترین کالاهای دیجیتال
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تازه‌ترین پرچمداران و گجت‌های هوشمند رونمایی شده در بازار
            </p>
          </div>
        </div>

        <button
          onClick={handleSeeAllNew}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>مشاهده همه</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {newProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
