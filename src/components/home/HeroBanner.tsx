import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Zap, Shield, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  productId: string;
  image: string;
  bgGradient: string;
  accentColor: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'خانواده پرچمدار آیفون ۱۶ پرو مکس',
    subtitle: 'طراحی تیتانیومی با تراشه فوق سریع A18 Pro و دکمه جدید Camera Control با ۱۸ ماه گارانتی معتبر',
    badge: 'جدیدترین پرچمدار اپل',
    buttonText: 'مشاهده و خرید اختصاصی',
    productId: 'prod-iphone-16-pro-max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
    accentColor: 'text-amber-400'
  },
  {
    id: 'slide-2',
    title: 'سامسونگ Galaxy S24 Ultra با Galaxy AI',
    subtitle: 'قدرتمندترین پردازشگر هوش مصنوعی موبایل، قلم S-Pen اختصاصی و دوربین ۲۰۰ مگاپیکسلی با تخفیف ویژه',
    badge: 'پیشنهاد ویژه جشنواره',
    buttonText: 'خرید با ۵ میلیون تومان تخفیف',
    productId: 'prod-samsung-s24-ultra',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    accentColor: 'text-cyan-400'
  },
  {
    id: 'slide-3',
    title: 'مک‌بوک پرو ۱۶ اینچ با تراشه M3 Max',
    subtitle: 'عملکرد بی‌رقیب برای مهندسان و ادیتورهای حرفه‌ای با نمایشگر خیره‌کننده Liquid Retina XDR',
    badge: 'بهترین برای حرفه‌ای‌ها',
    buttonText: 'بررسی مشخصات فنی',
    productId: 'prod-macbook-pro-16-m3-max',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    bgGradient: 'from-zinc-900 via-neutral-900 to-slate-950',
    accentColor: 'text-indigo-400'
  }
];

export const HeroBanner: React.FC = () => {
  const { openProductDetail, openCategoryPage } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Hero Carousel (8 cols on desktop) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] sm:min-h-[440px] flex items-center bg-slate-950 select-none">
          
          {/* Background image & gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgGradient} opacity-90 transition-all duration-700`}
          />
          <img 
            src={currentSlide.image} 
            alt={currentSlide.title} 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />

          {/* Slide Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-xl text-white flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-300 mb-4 animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentSlide.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-md">
                {currentSlide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openProductDetail(currentSlide.productId)}
                className="bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-102 flex items-center gap-2 cursor-pointer"
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => openCategoryPage('mobile')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                مشاهده همه
              </button>
            </div>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="اسلاید قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlideIndex === idx ? 'w-7 bg-amber-400' : 'w-2 bg-white/40'
                }`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Promo Banners (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
          
          {/* Promo Card 1: Sony WH-1000XM5 */}
          <div 
            onClick={() => openProductDetail('prod-sony-wh-1000xm5')}
            className="flex-1 rounded-3xl p-5 relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white cursor-pointer group hover:shadow-lg transition-all flex flex-col justify-between border border-slate-800"
          >
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                ۱۲٪ تخفیف اختصاصی
              </span>
              <h3 className="text-lg font-black mt-2 mb-1 group-hover:text-indigo-300 transition-colors">
                هدفون بی‌سیم Sony WH-1000XM5
              </h3>
              <p className="text-xs text-slate-300">
                نهایت سکوت و وضوح موسیقی با برترین نویزکنسلینگ
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 relative z-10">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                <span>بررسی و خرید فوری</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=250&q=80" 
                alt="Sony XM5" 
                className="w-20 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Promo Card 2: Anker Prime Powerbank */}
          <div 
            onClick={() => openProductDetail('prod-anker-prime-27650')}
            className="flex-1 rounded-3xl p-5 relative overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 text-white cursor-pointer group hover:shadow-lg transition-all flex flex-col justify-between border border-indigo-900/60"
          >
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                فناوری ۲۵۰ وات
              </span>
              <h3 className="text-lg font-black mt-2 mb-1 group-hover:text-amber-300 transition-colors">
                پاوربانک هوشمند Anker Prime
              </h3>
              <p className="text-xs text-slate-300">
                شارژ همزمان لپ‌تاپ و گوشی با نهایت توان خروجی
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 relative z-10">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                <span>خرید با ضمانت شرکتی</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              <img 
                src="https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=250&q=80" 
                alt="Anker Powerbank" 
                className="w-20 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
