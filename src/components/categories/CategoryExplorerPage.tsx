import React from 'react';
import { Layers, ArrowLeft, ChevronLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { getCategoryIcon } from '../common/Navbar';

export const CategoryExplorerPage: React.FC = () => {
  const { openCategoryPage, setCurrentPage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="categories-explorer-page">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-100">
          <Layers className="w-3.5 h-3.5" />
          <span>دسته‌بندی جامع محصولات پازل کالا</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          مرور و کاوش در گروه‌های کالایی
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          دسترسی مستقیم و تفکیک‌شده به تمامی شاخه‌ها، برندها و زیردسته‌های کالای دیجیتال، موبایل، لپ‌تاپ و تجهیزات جانبی
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map(cat => (
          <div 
            key={cat.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center p-2.5 overflow-hidden shrink-0">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-xl mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {cat.totalProductsCount} کالا
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Subcategories list */}
              <div className="space-y-2 mb-4">
                <p className="text-xs font-bold text-slate-400">زیردسته‌ها:</p>
                <div className="grid grid-cols-2 gap-2">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => openCategoryPage(cat.slug, sub.slug)}
                      className="text-right p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-medium transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <span className="truncate">{sub.name}</span>
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold">برندها:</span>
                <span className="text-slate-700 font-medium">{cat.featuredBrands.join('، ')}</span>
              </div>

              <button
                onClick={() => openCategoryPage(cat.slug)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>مشاهده همه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
