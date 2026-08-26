import React from 'react';
import { BRANDS } from '../../data/brands';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft } from 'lucide-react';

export const BrandsCarousel: React.FC = () => {
  const { setFilters, setCurrentPage } = useStore();

  const handleBrandClick = (brandName: string) => {
    setFilters(prev => ({
      ...prev,
      brands: [brandName],
      category: undefined,
      subcategory: undefined,
      searchQuery: ''
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="brands-section">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              محبوب‌ترین برندهای کالای دیجیتال
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              نمایندگی رسمی و ضمانت ۱۰۰٪ اصالت برندهای پیشرو جهانی
            </p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {BRANDS.map(brand => (
            <div
              key={brand.id}
              onClick={() => handleBrandClick(brand.name)}
              className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 mb-2 group-hover:scale-110 transition-transform">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-full h-full object-cover rounded-lg mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {brand.persianName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
