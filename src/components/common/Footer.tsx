import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Clock, 
  Send, 
  ChevronUp,
  Instagram,
  Send as Telegram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  const { openCategoryPage, setCurrentPage, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('لطفاً یک ایمیل معتبر وارد کنید', 'error');
      return;
    }
    addToast('ایمیل شما با موفقیت در خبرنامه پازل کالا ثبت شد!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-900 text-white mt-16 pt-12 pb-8 border-t border-slate-800 select-none" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Header of Footer: Brand & Scroll to top */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="lg" textColor="light" />
            <div className="hidden md:block mr-4 pr-4 border-r border-slate-800">
              <p className="text-xs text-slate-400">
                تلفن پشتیبانی: <span className="font-mono text-slate-300">۰۲۱-۹۱۰۰۸۸۷۷</span> | هفت روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <span>بازگشت به بالا</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-slate-800">
          
          {/* Column 1: About */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">درباره پازل کالا</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              فروشگاه اینترنتی پازل کالا مرجع تخصصی نقد و بررسی و خرید آنلاین گوشی‌های هوشمند، لپ‌تاپ، تبلت و لوازم جانبی دیجیتال با گارانتی رسمی و بهترین قیمت بازار است.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۶۴</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@puzzlekala.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">خدمات مشتریان</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('profile')} className="hover:text-indigo-400 transition-colors">
                  پیگیری وضعیت سفارش‌ها
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('wishlist')} className="hover:text-indigo-400 transition-colors">
                  لیست علاقه‌مندی‌ها
                </button>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">رویه‌های ارسال کالا و تحویل اکسپرس</span>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">شرایط و قوانین ضمانت بازگشت ۷ روزه</span>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">راهنمای ثبت نام و خرید اینترنتی</span>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">پرسش‌های متداول (FAQ)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Category Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">دسته‌بندی‌های اصلی</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => openCategoryPage(cat.slug)}
                    className="hover:text-indigo-400 transition-colors text-right"
                  >
                    خرید {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Trust Certificates */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">عضویت در خبرنامه تخفیف‌ها</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              از جدیدترین تخفیف‌های شگفت‌انگیز و جشنواره‌ها زودتر از همه باخبر شوید:
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 mb-6">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 flex-1 outline-hidden"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors cursor-pointer"
                title="ثبت ایمیل"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <h4 className="text-xs font-bold text-white mb-2">نمادهای اعتماد الکترونیکی</h4>
            <div className="flex items-center gap-3">
              {/* Trust Badges */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-bold">نماد اعتماد</span>
                <span className="text-[9px] text-slate-500">الکترونیکی</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                <CreditCard className="w-6 h-6 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-bold">پرداخت امن</span>
                <span className="text-[9px] text-slate-500">شاپرک و زرین‌پال</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                <Clock className="w-6 h-6 text-amber-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-bold">۷ روز ضمانت</span>
                <span className="text-[9px] text-slate-500">بازگشت کالا</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت «پازل کالا» می‌باشد.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-indigo-400 cursor-pointer">حریم خصوصی</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">شرایط استفاده</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">فرصت‌های شغلی</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
