import React from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateCartQuantity, 
    removeFromCart, 
    cartFinalTotal, 
    cartDiscountTotal, 
    cartTotalCount, 
    setCurrentPage,
    openProductDetail 
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleProceedToCart = () => {
    setIsCartDrawerOpen(false);
    setCurrentPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-start select-none" id="cart-drawer-overlay">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideInRight"
        id="cart-drawer-content"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">سبد خرید شما</h3>
              <span className="text-[11px] text-slate-400">
                {cartTotalCount} کالا در سبد
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-contain bg-slate-50 rounded-xl p-1 shrink-0 cursor-pointer"
                  onClick={() => {
                    openProductDetail(item.product.id);
                    setIsCartDrawerOpen(false);
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      openProductDetail(item.product.id);
                      setIsCartDrawerOpen(false);
                    }}
                    className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    {item.product.persianName}
                  </h4>

                  {/* Selected Variants */}
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    {item.selectedColor && (
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: item.selectedColor.colorCode }} />
                        <span>{item.selectedColor.name}</span>
                      </span>
                    )}
                    {item.selectedStorage && (
                      <span>| {item.selectedStorage.name}</span>
                    )}
                  </div>

                  {/* Price & Quantity Bar */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 px-2 font-mono">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3 h-3 text-rose-500" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-indigo-600 font-mono">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-700">سبد خرید شما خالی است</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">می‌توانید از تخفیف‌های شگفت‌انگیز شروع کنید</p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentPage('products');
                }}
                className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                مشاهده محصولات
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              {cartDiscountTotal > 0 && (
                <div className="flex items-center justify-between text-rose-600">
                  <span>سود شما از خرید:</span>
                  <span className="font-bold">{formatPrice(cartDiscountTotal)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-900 font-bold">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-base font-extrabold text-indigo-600 font-mono">
                  {formatPrice(cartFinalTotal)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleProceedToCart}
                className="w-full bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                مشاهده سبد خرید
              </button>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 cursor-pointer"
              >
                <span>ادامه فرآیند خرید</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
