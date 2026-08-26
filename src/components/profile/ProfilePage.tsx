import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  ChevronLeft,
  Trash2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const ProfilePage: React.FC = () => {
  const { 
    user, 
    orders, 
    wishlist, 
    addresses,
    deleteAddress, 
    setCurrentPage, 
    openProductDetail, 
    setIsAuthModalOpen 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'info'>('orders');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center" id="profile-unauth">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">برای مشاهده حساب کاربری وارد شوید</h2>
        <p className="text-xs text-slate-500 mb-6">
          جهت پیگیری سفارش‌ها، دسترسی به لیست علاقه‌مندی‌ها و مدیریت آدرس‌ها وارد حساب خود شوید.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          ورود / ثبت نام در پازل کالا
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="profile-page-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* User Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-xl font-black shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{toPersianDigits(user.phone)}</p>
              <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                کاربر طلایی پازل کالا
              </span>
            </div>
          </div>

          {/* Nav List */}
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-xs space-y-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>سفارش‌های من ({orders.length})</span>
              </div>
              <ChevronLeft className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>آدرس‌های ذخیره شده ({addresses.length})</span>
              </div>
              <ChevronLeft className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('wishlist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>لیست علاقه‌مندی‌ها ({wishlist.length})</span>
              </div>
              <ChevronLeft className="w-4 h-4 opacity-70" />
            </button>
          </div>

        </div>

        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TAB 1: Orders History */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h2 className="font-extrabold text-base text-slate-900 pb-4 border-b border-slate-100 mb-6">
                تاریخچه سفارش‌های شما
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-colors text-xs space-y-4">
                      {/* Order Header */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">کد پیگیری:</span>
                          <span className="font-mono font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {order.trackingCode}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-mono">{order.date}</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            order.status === 'delivered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : order.status === 'processing' 
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status === 'delivered' ? 'تحویل شده' : order.status === 'processing' ? 'در حال پردازش' : 'ارسال شده'}
                          </span>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.items.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => openProductDetail(item.product.id)}
                            className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-12 h-12 object-contain bg-white rounded-lg p-1"
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

                      {/* Order Footer */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500">تحویل به: {order.address.recipientName} ({order.address.city})</span>
                        <div className="flex items-center gap-1 font-bold">
                          <span className="text-slate-600">مبلغ کل:</span>
                          <span className="text-sm font-black text-indigo-600 font-mono">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  تاکنون سفارشی از پازل کالا ثبت نکرده‌اید.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h2 className="font-extrabold text-base text-slate-900 pb-4 border-b border-slate-100 mb-6">
                مدیریت آدرس‌های پستی
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div key={addr.id} className="border border-slate-200 rounded-2xl p-4 text-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-2">
                        <span>{addr.title}</span>
                        {addr.isDefault && (
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-md">پیش‌فرض</span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-3">
                        {addr.province}، {addr.city}، {addr.postalAddress}
                      </p>
                      <div className="space-y-1 text-slate-400 text-[11px]">
                        <p>کد پستی: {toPersianDigits(addr.postalCode)}</p>
                        <p>گیرنده: {addr.recipientName} ({toPersianDigits(addr.phone)})</p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف آدرس</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
