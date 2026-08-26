import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { toPersianDigits } from '../../utils/formatters';

export const SpecialDealsSection: React.FC = () => {
  const { setFilters, setCurrentPage } = useStore();

  // 12-hour countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter(p => p.discount && p.discount >= 8).slice(0, 6);

  const handleSeeAllDeals = () => {
    setFilters(prev => ({
      ...prev,
      discountOnly: true,
      category: undefined,
      subcategory: undefined,
      searchQuery: '',
      sortBy: 'discount'
    }));
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="special-deals-section">
      <div className="bg-gradient-to-l from-rose-600 via-rose-700 to-indigo-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-rose-900/10 text-white">
        
        {/* Header with Title and Countdown */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
              <Flame className="w-7 h-7 fill-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  شگفت‌انگیزهای پازل کالا
                </h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  تخفیف ویژه روز
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                تخفیف‌های محدود با گارانتی رسمی و ارسال فوری
              </p>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-rose-200 ml-1 hidden sm:inline">زمان باقی‌مانده:</span>
            
            <div className="flex items-center gap-1.5 font-mono text-slate-900 font-black text-sm">
              <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm text-center min-w-[36px]">
                {toPersianDigits(timeLeft.seconds.toString().padStart(2, '0'))}
              </div>
              <span className="text-white font-bold text-lg">:</span>
              <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm text-center min-w-[36px]">
                {toPersianDigits(timeLeft.minutes.toString().padStart(2, '0'))}
              </div>
              <span className="text-white font-bold text-lg">:</span>
              <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm text-center min-w-[36px]">
                {toPersianDigits(timeLeft.hours.toString().padStart(2, '0'))}
              </div>
            </div>

            <button
              onClick={handleSeeAllDeals}
              className="mr-3 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>مشاهده همه</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {dealProducts.map(product => (
            <div key={product.id} className="text-slate-900">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
