import React from 'react';
import { ArrowLeft, Sparkles, Zap, Shield, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanners: React.FC = () => {
  const { openCategoryPage, setFilters, setCurrentPage } = useStore();

  const handleBannerClick = (categorySlug: string) => {
    openCategoryPage(categorySlug);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 select-none" id="promo-banners-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Banner 1: Smartwatches & Wearables */}
        <div 
          onClick={() => handleBannerClick('smartwatches')}
          className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white cursor-pointer group hover:shadow-lg transition-all duration-300 flex items-center justify-between min-h-[160px]"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-[11px] font-bold text-indigo-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
              تکنولوژی سلامت
            </span>
            <h4 className="text-base sm:text-lg font-black text-white leading-snug">
              ساعت‌های هوشمند پرچمدار
            </h4>
            <p className="text-xs text-indigo-100/80 mt-1">
              پایش دقیق سلامت با باتری قدرتمند
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300 mt-3 group-hover:gap-2 transition-all">
              <span>خرید با ضمانت تعویض</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=300&q=80"
              alt="ساعت هوشمند"
              className="w-full h-full object-contain rounded-xl mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Banner 2: Audio & AirPods */}
        <div 
          onClick={() => handleBannerClick('audio')}
          className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-rose-900 via-rose-800 to-slate-950 text-white cursor-pointer group hover:shadow-lg transition-all duration-300 flex items-center justify-between min-h-[160px]"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-[11px] font-bold text-rose-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
              کیفیت صدای بی‌نظیر
            </span>
            <h4 className="text-base sm:text-lg font-black text-white leading-snug">
              هدفون و هندزفری اورجینال
            </h4>
            <p className="text-xs text-rose-100/80 mt-1">
              نویز کنسلینگ فعال با گارانتی ۱۸ ماهه
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-200 mt-3 group-hover:gap-2 transition-all">
              <span>مشاهده پرفروش‌ترین‌ها</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80"
              alt="هدفون و هندزفری"
              className="w-full h-full object-contain rounded-xl mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Banner 3: Laptops & Workstations */}
        <div 
          onClick={() => handleBannerClick('laptops')}
          className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 text-white cursor-pointer group hover:shadow-lg transition-all duration-300 flex items-center justify-between min-h-[160px] md:col-span-2 lg:col-span-1"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-[11px] font-bold text-cyan-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
              قدرت پردازش فوق‌العاده
            </span>
            <h4 className="text-base sm:text-lg font-black text-white leading-snug">
              لپ‌تاپ‌های گیمینگ و مهندسی
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              جدیدترین مدل‌های ایسوس، اپل و لنوو
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-300 mt-3 group-hover:gap-2 transition-all">
              <span>بررسی مشخصات فنی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80"
              alt="لپ‌تاپ"
              className="w-full h-full object-contain rounded-xl mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
