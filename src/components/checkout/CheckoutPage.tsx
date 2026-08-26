import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Address, Order } from '../../types';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartFinalTotal, 
    couponDiscount, 
    user, 
    addresses,
    addAddress, 
    createOrder, 
    setCurrentPage, 
    addToast 
  } = useStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || 'addr-1');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'tipax' | 'post'>('express');
  const [deliveryDate, setDeliveryDate] = useState('فردا (۹ الی ۱۳)');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'snappay' | 'cod'>('online');
  const [orderNote, setOrderNote] = useState('');

  // New address modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('منزل');
  const [newProvince, setNewProvince] = useState('تهران');
  const [newCity, setNewCity] = useState('تهران');
  const [newPostalAddress, setNewPostalAddress] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newRecipientName, setNewRecipientName] = useState(user?.name || 'وحید زارع');
  const [newPhone, setNewPhone] = useState(user?.phone || '09121234567');

  // Completed order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const shippingCost = shippingMethod === 'express' ? 45000 : shippingMethod === 'tipax' ? 65000 : 35000;
  const isFreeShipping = cartFinalTotal >= 2000000;
  const finalPayable = cartFinalTotal + (isFreeShipping ? 0 : shippingCost);

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostalAddress || !newPostalCode || !newPhone) {
      addToast('لطفاً اطلاعات ضروری آدرس را تکمیل فرمایید', 'warning');
      return;
    }

    addAddress({
      title: `${newCity} - ${newTitle}`,
      province: newProvince,
      city: newCity,
      postalAddress: newPostalAddress,
      postalCode: newPostalCode,
      recipientName: newRecipientName,
      phone: newPhone,
      isDefault: false
    });

    setIsAddressModalOpen(false);
    setNewPostalAddress('');
    setNewPostalCode('');
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      addToast('لطفاً یک آدرس برای تحویل کالا انتخاب کنید', 'error');
      setCurrentStep(1);
      return;
    }

    const paymentMethodLabel = paymentMethod === 'online' 
      ? 'پرداخت اینترنتی شاپرک' 
      : paymentMethod === 'snappay' 
        ? 'پرداخت اقساطی ۴ ماهه اسنپ‌پی' 
        : 'پرداخت در محل با کارتخوان';

    const newOrder = createOrder(paymentMethodLabel, selectedAddress.id);

    if (newOrder) {
      setCompletedOrder(newOrder);
      setCurrentStep(3);
    }
  };

  // Step 3: Success Screen
  if (currentStep === 3 && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center" id="order-success-view">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">
            سفارش شما با موفقیت ثبت شد!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            کد پیگیری اختصاصی سفارش شما: <strong className="font-mono text-indigo-600 font-extrabold text-base">{completedOrder.trackingCode}</strong>
          </p>

          {/* Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-right space-y-3 mb-8 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">تحویل گیرنده:</span>
              <span className="font-bold text-slate-900">{completedOrder.address.recipientName} ({completedOrder.address.phone})</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">آدرس تحویل:</span>
              <span className="font-bold text-slate-900 max-w-sm truncate">{completedOrder.address.postalAddress}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">روش پرداخت:</span>
              <span className="font-bold text-slate-900">{completedOrder.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between font-bold text-sm">
              <span className="text-slate-900">مبلغ پرداختی:</span>
              <span className="font-mono text-indigo-600 font-black">{formatPrice(completedOrder.totalAmount)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setCurrentPage('profile')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
            >
              مشاهده در پنل کاربری و پیگیری
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="checkout-process-page">
      
      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          {/* Step 1: Address */}
          <div className={`relative z-10 flex flex-col items-center bg-slate-50 px-2`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              ۱
            </div>
            <span className={`text-[11px] font-bold mt-1.5 ${currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
              آدرس و زمان ارسال
            </span>
          </div>

          {/* Step 2: Payment */}
          <div className={`relative z-10 flex flex-col items-center bg-slate-50 px-2`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              ۲
            </div>
            <span className={`text-[11px] font-bold mt-1.5 ${currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
              روش پرداخت و نهایی‌سازی
            </span>
          </div>

          {/* Step 3: Confirmation */}
          <div className={`relative z-10 flex flex-col items-center bg-slate-50 px-2`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              currentStep === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              ۳
            </div>
            <span className={`text-[11px] font-bold mt-1.5 ${currentStep === 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
              صدور فاکتور
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Steps (8 cols) + Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Steps Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Address & Shipping Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
              {/* Address Selection */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-sm text-slate-900">انتخاب آدرس تحویل سفارش</h3>
                  </div>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن آدرس جدید</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100 font-medium'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                        <span>{addr.title}</span>
                        {selectedAddressId === addr.id && (
                          <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">انتخاب شده</span>
                        )}
                      </div>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed mb-2">
                        {addr.province}، {addr.city}، {addr.postalAddress}
                      </p>
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <p>کد پستی: {toPersianDigits(addr.postalCode)}</p>
                        <p>تحویل گیرنده: {addr.recipientName} ({toPersianDigits(addr.phone)})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <Truck className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-sm text-slate-900">شیوه ارسال سفارش</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100 font-bold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-extrabold text-slate-900 mb-1">ارسال فوری اختصاصی</span>
                    <span className="text-slate-500 text-[11px] block mb-2">تحویل همان روز در تهران</span>
                    <span className="text-indigo-600 font-mono">{isFreeShipping ? 'رایگان' : '۴۵,۰۰۰ تومان'}</span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('tipax')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'tipax'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100 font-bold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-extrabold text-slate-900 mb-1">ارسال با تیپاکس</span>
                    <span className="text-slate-500 text-[11px] block mb-2">تحویل ۲۴ الی ۴۸ ساعته شهرستان</span>
                    <span className="text-indigo-600 font-mono">{isFreeShipping ? 'رایگان' : '۶۵,۰۰۰ تومان'}</span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('post')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'post'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100 font-bold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-extrabold text-slate-900 mb-1">پست پیشتاز</span>
                    <span className="text-slate-500 text-[11px] block mb-2">ارسال سراسری به تمام نقاط ایران</span>
                    <span className="text-indigo-600 font-mono">{isFreeShipping ? 'رایگان' : '۳۵,۰۰۰ تومان'}</span>
                  </div>
                </div>

                {/* Delivery Time Selection */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-2">بازه زمانی ترجیحی تحویل:</label>
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    {['فردا (۹ الی ۱۳)', 'فردا (۱۴ الی ۱۸)', 'پس‌فردا (۹ الی ۱۳)', 'پس‌فردا (۱۴ الی ۱۸)'].map(slot => (
                      <button
                        key={slot}
                        onClick={() => setDeliveryDate(slot)}
                        className={`px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                          deliveryDate === slot
                            ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-100"
                >
                  <span>مرحله بعد: شیوه پرداخت</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Gateways & Placement */}
          {currentStep === 2 && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-sm text-slate-900">انتخاب روش پرداخت</h3>
                </div>

                <div className="space-y-3 text-xs">
                  
                  {/* Gateway 1: Online Bank */}
                  <div 
                    onClick={() => setPaymentMethod('online')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'online'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                        {paymentMethod === 'online' && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">پرداخت اینترنتی امن شاپرک</span>
                        <span className="text-slate-500 text-[11px]">با تمامی کارت‌های بانکی عضو شبکه شتاب</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      توصیه شده
                    </span>
                  </div>

                  {/* Gateway 2: SnappPay Installment */}
                  <div 
                    onClick={() => setPaymentMethod('snappay')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'snappay'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                        {paymentMethod === 'snappay' && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">پرداخت اقساطی اسنپ‌پی (۴ قسط)</span>
                        <span className="text-slate-500 text-[11px]">بدون کارمزد و بدون نیاز به ضامن</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      اقساطی ۴ ماهه
                    </span>
                  </div>

                  {/* Gateway 3: Cash On Delivery */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                        {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">پرداخت در محل (کارتخوان)</span>
                        <span className="text-slate-500 text-[11px]">ویژه سفارش‌های شهر تهران با کارتخوان سیار</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Optional Notes */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-1">یادداشت سفارش (اختیاری):</label>
                  <input
                    type="text"
                    placeholder="مثال: زنگ واحد ۳، تحویل به نگهبانی..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>بازگشت به انتخاب آدرس</span>
                </button>

                <button
                  onClick={handlePlaceOrder}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-200"
                  id="final-pay-btn"
                >
                  <Check className="w-4 h-4" />
                  <span>پرداخت نهایی و ثبت سفارش ({formatPrice(finalPayable)})</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Order Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">
              اقلام سفارش شما ({cart.length} محصول)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-12 h-12 object-contain bg-slate-50 rounded-xl p-1 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{item.product.persianName}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      تعداد: {toPersianDigits(item.quantity)} | {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>جمع سبد خرید:</span>
                <span className="font-mono font-bold text-slate-900">{formatPrice(cartFinalTotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>هزینه ارسال:</span>
                {isFreeShipping ? (
                  <span className="font-bold text-emerald-600">رایگان</span>
                ) : (
                  <span className="font-mono font-bold text-slate-900">{formatPrice(shippingCost)}</span>
                )}
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>تخفیف کوپن:</span>
                  <span className="font-mono">- {formatPrice(couponDiscount)}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-extrabold">
              <span className="text-xs text-slate-900">مبلغ نهایی:</span>
              <span className="text-base text-indigo-600 font-mono font-black">{formatPrice(finalPayable)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Add New Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">افزودن آدرس جدید پستی</h3>

            <form onSubmit={handleSaveNewAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان آدرس (مثال: منزل، محل کار):</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">استان:</label>
                  <input
                    type="text"
                    required
                    value={newProvince}
                    onChange={(e) => setNewProvince(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شهر:</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نشانی دقیق پستی (خیابان، کوچه، پلاک، واحد):</label>
                <textarea
                  required
                  rows={2}
                  value={newPostalAddress}
                  onChange={(e) => setNewPostalAddress(e.target.value)}
                  placeholder="مثال: خیابان شریعتی، بالاتر از میرداماد، پلاک ۱۲، واحد ۴"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    required
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    placeholder="1234567890"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام گیرنده:</label>
                  <input
                    type="text"
                    required
                    value={newRecipientName}
                    onChange={(e) => setNewRecipientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">شماره تماس گیرنده:</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="0912..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold px-5 py-2 rounded-xl hover:bg-indigo-700"
                >
                  ذخیره و انتخاب آدرس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
