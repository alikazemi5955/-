import React, { useState } from 'react';
import { X, Phone, Lock, User, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits } from '../../utils/formatters';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, addToast } = useStore();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('09123456789');
  const [otpCode, setOtpCode] = useState('1234');
  const [userName, setUserName] = useState('علی رضایی');

  if (!isAuthModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      addToast('لطفاً شماره موبایل معتبر وارد نمایید', 'error');
      return;
    }
    setStep('otp');
    addToast('کد تایید یکبار مصرف برای شماره شما پیامک شد (کد تستی: ۱۲۳۴)', 'info');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone, userName);
    setIsAuthModalOpen(false);
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none" id="auth-modal">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 left-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BrandLogo size="lg" showText={false} />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {step === 'phone' ? 'ورود / ثبت‌نام در پازل کالا' : 'تایید شماره همراه'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {step === 'phone' 
              ? 'برای ادامه لطفا شماره موبایل خود را وارد نمایید' 
              : `کد تایید ارسال شده به شماره ${toPersianDigits(phone)} را وارد کنید`}
          </p>
        </div>

        {/* Form 1: Phone */}
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">شماره تلفن همراه:</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-hidden focus:border-indigo-500 font-mono text-sm text-left"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="مثال: علی رضایی"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-hidden focus:border-indigo-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>دریافت کد تایید ورود</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-4">
              با ورود به پازل کالا، کلیه شرایط و قوانین حریم خصوصی را می‌پذیرید.
            </p>
          </form>
        ) : (
          /* Form 2: OTP */
          <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 text-center">کد تایید ۴ رقمی:</label>
              <input
                type="text"
                maxLength={4}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-36 mx-auto block bg-slate-50 border-2 border-indigo-600 rounded-xl py-3 text-center font-mono text-xl font-bold tracking-widest outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                ویرایش شماره همراه
              </button>
              <span className="font-mono">کد تست: ۱۲۳۴</span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Check className="w-4 h-4" />
              <span>تایید و ورود به حساب</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
