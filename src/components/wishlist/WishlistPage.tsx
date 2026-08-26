import React from 'react';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, setCurrentPage } = useStore();

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="wishlist-page-container">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              لیست علاقه‌مندی‌های شما
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              کالاهای مورد علاقه شما برای بررسی یا خرید در آینده
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
          {wishlistProducts.length} کالا
        </span>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800 mb-1">
            لیست علاقه‌مندی‌های شما خالی است
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            با کلیک بر روی آیکون قلب روی هر کالا، می‌توانید آن را به این لیست اضافه نمایید.
          </p>
          <button
            onClick={() => {
              setCurrentPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5"
          >
            <span>مشاهده فروشگاه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
