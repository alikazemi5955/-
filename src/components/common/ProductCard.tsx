import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Scale, 
  Eye,
  Check,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    openProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    setQuickViewProduct 
  } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleCardClick = () => {
    openProductDetail(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(product.id);
  };

  /* List Layout View */
  if (layout === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-indigo-400/80 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center gap-5 group cursor-pointer relative"
        id={`product-card-list-${product.id}`}
      >
        {/* Product Image Container */}
        <div className="w-full sm:w-48 h-48 bg-slate-50/80 rounded-xl p-4 flex items-center justify-center relative overflow-hidden shrink-0">
          <img 
            src={product.images[0]} 
            alt={product.persianName} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          
          {/* Discount Pill */}
          {product.discount && product.discount > 0 && (
            <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
              {toPersianDigits(product.discount)}٪
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center">
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg">ناموجود</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 flex flex-col justify-between w-full h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{toPersianDigits(product.rating.toString())}</span>
                <span className="text-slate-400 font-normal">({toPersianDigits(product.reviewCount)} نظر)</span>
              </div>
            </div>

            <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">
              {product.persianName}
            </h3>

            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing and Actions Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-col">
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-base font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleWishlistClick}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isFavorite 
                    ? 'bg-rose-50 border-rose-200 text-rose-500' 
                    : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                }`}
                title="افزودن به علاقه‌مندی‌ها"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleAddToCartClick}
                disabled={isOutOfStock}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs ${
                  isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                }`}
              >
                {isAdding ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                <span>{isOutOfStock ? 'ناموجود' : isAdding ? 'اضافه شد' : 'افزودن به سبد'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Grid Layout View (Standard Card) */
  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 hover:border-indigo-400/80 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative select-none h-full"
      id={`product-card-grid-${product.id}`}
    >
      {/* 1. Top Image Box with Fixed Aspect Ratio */}
      <div className="relative w-full aspect-square bg-slate-50/70 rounded-xl p-3 sm:p-4 flex items-center justify-center overflow-hidden mb-3">
        
        {/* Product Image */}
        <img 
          src={product.images[0]} 
          alt={product.persianName} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges (Discount / Stock) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-start z-10">
          {product.discount && product.discount > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
              {toPersianDigits(product.discount)}٪
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
              ویژه
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons (Wishlist, Quick View, Compare) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/90 backdrop-blur-xs border shadow-xs transition-colors ${
              isFavorite 
                ? 'border-rose-200 text-rose-500 bg-rose-50/90' 
                : 'border-slate-200 text-slate-500 hover:text-rose-500 hover:bg-rose-50'
            }`}
            title="علاقه‌مندی"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 shadow-xs transition-colors hidden sm:flex"
            title="پیش‌نمایش سریع"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center z-20">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* 2. Middle Content: Brand, Title, Rating */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand and Rating Row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{toPersianDigits(product.rating.toString())}</span>
            </div>
          </div>

          {/* Persian Product Name (Clamped to 2 lines for uniform grid) */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {product.persianName}
          </h3>
        </div>

        {/* 3. Bottom Row: Price & Add to Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price Container */}
          <div className="flex flex-col min-w-0">
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through truncate">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart Quick Button */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
              isOutOfStock 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : isAdding
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white active:scale-90 shadow-2xs'
            }`}
            title="افزودن به سبد خرید"
            aria-label="افزودن به سبد خرید"
          >
            {isAdding ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
