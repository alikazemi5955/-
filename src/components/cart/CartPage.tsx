import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Tag, 
  RotateCcw, 
  Check, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartRawTotal,
    cartDiscountTotal,
    cartFinalTotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    setCurrentPage,
    openProductDetail,
    addToast
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  const freeShippingThreshold = 2000000; // 2,000,000 Tomans
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartFinalTotal);
  const shippingPercentage = Math.min(100, Math.round((cartFinalTotal / freeShippingThreshold) * 100));

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCoupon(inputCoupon);
    if (success) {
      setInputCoupon('');
    }
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center" id="empty-cart-view">
        <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">سبد خرید شما در حال حاضر خالی است!</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          می‌توانید برای مشاهده محصولات و پیشنهادهای ویژه به فروشگاه سر بزنید و بهترین کالاهای دیجیتال را با ضمانت اصالت انتخاب کنید.
        </p>
        <button
          onClick={() => {
            setCurrentPage('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>مشاهده و خرید کالاها</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="cart-page-container">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">سبد خرید شما</h1>
          <p className="text-xs text-slate-500 mt-1">
            بررسی و نهایی‌سازی سفارش‌های کالای دیجیتال
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>خالی کردن کل سبد</span>
        </button>
      </div>

      {/* Main Grid: Items (8 cols) + Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Progress Alert */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700">تبریک! سفارش شما شامل ارسال رایگان پازل کالا شد.</span>
                ) : (
                  <span>
                    فقط <strong className="text-indigo-700">{formatPrice(remainingForFreeShipping)}</strong> دیگر خرید کنید تا ارسال شما <strong>رایگان</strong> شود!
                  </span>
                )}
              </div>
              <span className="font-mono">{toPersianDigits(shippingPercentage)}٪</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-indigo-200/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                style={{ width: `${shippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs divide-y divide-slate-100">
            {cart.map(item => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Product details */}
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    onClick={() => openProductDetail(item.product.id)}
                    className="w-20 h-20 object-contain bg-slate-50 rounded-2xl p-2 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />

                  <div>
                    <h3 
                      onClick={() => openProductDetail(item.product.id)}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 leading-relaxed"
                    >
                      {item.product.persianName}
                    </h3>

                    {/* Variant specs */}
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 flex-wrap">
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-3 h-3 rounded-full border border-slate-300 shadow-xs" 
                            style={{ backgroundColor: item.selectedColor.colorCode }}
                          />
                          <span>رنگ: {item.selectedColor.name}</span>
                        </span>
                      )}

                      {item.selectedStorage && (
                        <span>حافظه: {item.selectedStorage.name}</span>
                      )}

                      {item.selectedWarranty && (
                        <span className="text-emerald-600 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{item.selectedWarranty.name}</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      قیمت واحد: <span className="font-mono text-slate-700 font-bold">{formatPrice(item.unitPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Total Item Price */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  
                  {/* Quantity Counter */}
                  <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="افزایش تعداد"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-slate-900 font-mono">
                      {toPersianDigits(item.quantity)}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="کاهش تعداد"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Total for this item line */}
                  <div className="text-left">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Order Summary & Checkout (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Coupon Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-indigo-600" />
              <span>کد تخفیف پازل کالا</span>
            </h4>

            {couponCode ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-800">کد فعال: {couponCode}</span>
                  <p className="text-[11px] text-emerald-600 mt-0.5">
                    تخفیف اعمال شده: {formatPrice(couponDiscount)}
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  حذف
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: PUZZLE2025)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-hidden focus:border-indigo-500 font-mono"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  اعمال
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-400 mt-2">
              کد تست برای تخفیف ویژه: <span className="font-bold text-indigo-600">PUZZLE2025</span> یا <span className="font-bold text-indigo-600">NOROOZ</span>
            </p>
          </div>

          {/* Pricing Calculation Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">
              خلاصه صورت‌حساب
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>قیمت کالاها:</span>
                <span className="font-mono font-bold text-slate-900">{formatPrice(cartRawTotal)}</span>
              </div>

              {cartDiscountTotal > 0 && (
                <div className="flex items-center justify-between text-rose-600">
                  <span>تخفیف کالاها:</span>
                  <span className="font-mono font-bold">- {formatPrice(cartDiscountTotal)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>کد تخفیف:</span>
                  <span className="font-mono font-bold">- {formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>هزینه ارسال:</span>
                {remainingForFreeShipping === 0 ? (
                  <span className="font-bold text-emerald-600">رایگان</span>
                ) : (
                  <span className="font-mono font-bold text-slate-900">۴۵,۰۰۰ تومان</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-900">مبلغ نهایی قابل پرداخت:</span>
              <span className="text-lg font-black text-indigo-600 font-mono">
                {formatPrice(cartFinalTotal + (remainingForFreeShipping === 0 ? 0 : 45000))}
              </span>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="proceed-to-checkout-btn"
            >
              <span>ادامه ثبت سفارش و انتخاب آدرس</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Safe notes */}
            <div className="space-y-2 pt-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>ضمانت سلامت و اصالت کالاهای دیجیتال</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
                <span>امکان بازگشت کالا تا ۷ روز پس از تحویل</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
