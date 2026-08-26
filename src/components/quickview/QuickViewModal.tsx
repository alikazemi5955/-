import React, { useState } from 'react';
import { X, Star, ShoppingCart, ArrowLeft, ShieldCheck, Heart, Scale } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    openProductDetail,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare 
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleFullDetail = () => {
    const id = product.id;
    setQuickViewProduct(null);
    openProductDetail(id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none" id="quickview-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Image (5 cols) */}
          <div className="sm:col-span-5 bg-slate-50 rounded-2xl p-4 flex items-center justify-center h-60 relative overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            {product.discount && product.discount > 0 && (
              <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
                {product.discount}٪
              </span>
            )}
          </div>

          {/* Details (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount})</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-slate-900 line-clamp-2 leading-relaxed mb-2">
                {product.persianName}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Price & Cart Actions */}
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                {product.oldPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-lg font-black text-slate-900 font-mono">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>افزودن به سبد</span>
                </button>

                <button
                  onClick={handleFullDetail}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>صفحه کالا</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
