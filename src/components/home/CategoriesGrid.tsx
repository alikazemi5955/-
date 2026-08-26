import React from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { getCategoryIcon } from '../common/Navbar';

export const CategoriesGrid: React.FC = () => {
  const { openCategoryPage, setCurrentPage } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="categories-grid-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            دسته‌بندی‌های محبوب پازل کالا
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            دسترسی سریع به گروه‌های تخصصی کالاهای دیجیتال و تکنولوژی
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('categories')}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>همه دسته‌ها</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of category tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => openCategoryPage(category.slug)}
            className="group bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col items-center text-center select-none"
          >
            {/* Image / Icon container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-100 to-indigo-50/50 flex items-center justify-center p-3 mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover rounded-xl mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors" />
            </div>

            <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {category.name}
            </h4>

            <span className="text-[11px] text-slate-400 mt-1">
              {category.totalProductsCount} کالا
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
