import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Tag, Headphones, CheckCircle2 } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'ضمانت ۱۰۰٪ اصالت کالا',
      description: 'تمامی کالاها با گارانتی معتبر شرکتی و کد رجیستری'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-blue-600" />,
      title: '۷ روز ضمانت بازگشت وجه',
      description: 'امکان تست سلامت و مرجوعی کالا در صورت عدم رضایت'
    },
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'ارسال سریع و اکسپرس',
      description: 'تحویل سریع در تهران و ارسال با تیپاکس/پست به سراسر ایران'
    },
    {
      icon: <Tag className="w-6 h-6 text-amber-600" />,
      title: 'تضمین بهترین قیمت بازار',
      description: 'قیمت‌گذاری شفاف و رقابتی بدون واسطه'
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-600" />,
      title: 'مشاوره تخصصی و پشتیبانی ۲۴/۷',
      description: 'راهنمایی خرید کالا توسط کارشناسان خبره دیجیتال'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="benefits-section">
      <div className="bg-slate-100/80 rounded-3xl p-6 border border-slate-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="flex items-center sm:flex-col sm:text-center gap-3.5 p-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">
                  {benefit.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
