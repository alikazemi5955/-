import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Scale, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  MessageSquare,
  Share2,
  Info,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../common/ProductCard';
import { formatPrice, toPersianDigits } from '../../utils/formatters';
import { ProductVariantOption } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    setCurrentPage, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    reviews,
    addReview,
    addToast,
    openCategoryPage
  } = useStore();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const category = CATEGORIES.find(c => c.id === product.category) || CATEGORIES[0];
  const subcategory = category.subcategories.find(s => s.id === product.subcategory);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selections
  const colorGroup = product.variants?.find(v => v.type === 'color');
  const storageGroup = product.variants?.find(v => v.type === 'storage');
  const warrantyGroup = product.variants?.find(v => v.type === 'warranty');

  const [selectedColor, setSelectedColor] = useState<ProductVariantOption | undefined>(
    colorGroup?.options[0]
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductVariantOption | undefined>(
    storageGroup?.options[0]
  );
  const [selectedWarranty, setSelectedWarranty] = useState<ProductVariantOption | undefined>(
    warrantyGroup?.options[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [isAdding, setIsAdding] = useState(false);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isOutOfStock = product.stock <= 0;

  // Calculated dynamic price
  const storageDelta = selectedStorage?.priceDelta || 0;
  const warrantyDelta = selectedWarranty?.priceDelta || 0;
  const finalUnitPrice = product.price + storageDelta + warrantyDelta;
  const oldPriceFinal = product.oldPrice ? product.oldPrice + storageDelta + warrantyDelta : undefined;

  // Reviews for this product
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Similar products
  const similarProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    addToCart(product, quantity, selectedColor, selectedStorage, selectedWarranty);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedColor, selectedStorage, selectedWarranty);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.persianName,
        text: `خرید ${product.persianName} در پازل کالا`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('لینک صفحه محصول در کلیپ‌بورد کپی شد', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      addToast('لطفاً نام و متن نظر خود را وارد کنید', 'error');
      return;
    }

    addReview({
      productId: product.id,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      title: newReviewTitle.trim() || 'تجربه خرید این محصول',
      comment: newReviewComment.trim(),
      isVerifiedPurchase: true,
      pros: [],
      cons: []
    });

    addToast('دیدگاه ارزشمند شما با موفقیت ثبت شد!', 'success');
    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 select-none" id="product-detail-page">
      
      {/* 1. Top Breadcrumbs Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage('home')} className="hover:text-indigo-600 transition-colors">
            خانه
          </button>
          <span>/</span>
          <button onClick={() => openCategoryPage(category.slug)} className="hover:text-indigo-600 transition-colors">
            {category.name}
          </button>
          {subcategory && (
            <>
              <span>/</span>
              <span className="text-slate-600 font-medium">{subcategory.name}</span>
            </>
          )}
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {product.persianName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>اشتراک‌گذاری</span>
          </button>
        </div>
      </div>

      {/* 2. Main Product Hero Section (Gallery + Info + Purchase Box) */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Right: Interactive Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-slate-50/80 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-slate-100">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.persianName}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {product.discount && product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs">
                  {toPersianDigits(product.discount)}٪ تخفیف
                </span>
              )}

              {/* Wishlist & Compare floating buttons */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white border shadow-xs transition-colors ${
                    isFavorite ? 'border-rose-200 text-rose-500 bg-rose-50' : 'border-slate-200 text-slate-400 hover:text-rose-500'
                  }`}
                  title="علاقه‌مندی"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white border shadow-xs transition-colors ${
                    isCompared ? 'border-indigo-200 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-400 hover:text-indigo-600'
                  }`}
                  title="مقایسه"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl bg-slate-50 p-1.5 border transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.persianName} thumbnail ${idx}`}
                      className="w-full h-full object-contain mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances Under Gallery */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">ضمانت اصالت</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">ارسال اکسپرس</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                <RotateCcw className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">۷ روز مهلت تست</span>
              </div>
            </div>
          </div>

          {/* Center: Core Product Information & Specifications Preview (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                برند {product.brand}
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-relaxed">
                {product.persianName}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1" dir="ltr">
                {product.name}
              </p>
            </div>

            {/* Rating and Reviews Counter */}
            <div className="flex items-center gap-3 text-xs pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{toPersianDigits(product.rating.toString())}</span>
              </div>
              <span className="text-slate-300">|</span>
              <button 
                onClick={() => setActiveTab('reviews')}
                className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {toPersianDigits(productReviews.length || product.reviewCount)} دیدگاه کاربران
              </button>
            </div>

            {/* Color Variant Selector */}
            {colorGroup && colorGroup.options.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">رنگ انتخابی:</span>
                  <span className="text-indigo-600 font-bold">{selectedColor?.name || selectedColor?.value}</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {colorGroup.options.map((opt) => {
                    const isSelected = selectedColor?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedColor(opt)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                          style={{ backgroundColor: opt.colorCode || '#ccc' }}
                        />
                        <span>{opt.name || opt.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Storage / Capacity Variant Selector */}
            {storageGroup && storageGroup.options.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">ظرفیت / حافظه داخلی:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {storageGroup.options.map((opt) => {
                    const isSelected = selectedStorage?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedStorage(opt)}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                        }`}
                      >
                        <span>{opt.name || opt.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Features Bullet Points */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2.5">ویژگی‌های برجسته:</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Left (RTL): Sticky Purchase Action Card (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-5 sticky top-24">
              
              {/* Seller / Warranty info */}
              <div className="space-y-2.5 pb-4 border-b border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>فروشنده: <strong className="text-slate-900">پازل کالا (مرجع رسمی)</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>گارانتی: <strong className="text-slate-900">{selectedWarranty?.name || '۱۸ ماه گارانتی جامع شرکتی'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>ارسال سریع: <strong className="text-emerald-600">موجود در انبار</strong></span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="space-y-1">
                {oldPriceFinal && oldPriceFinal > finalUnitPrice && (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>قیمت مصرف‌کننده:</span>
                    <span className="line-through">{formatPrice(oldPriceFinal)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-700">قیمت نهایی:</span>
                  <span className="text-lg font-black text-slate-900">
                    {formatPrice(finalUnitPrice * quantity)}
                  </span>
                </div>

                {oldPriceFinal && oldPriceFinal > finalUnitPrice && (
                  <p className="text-[11px] font-bold text-rose-600 text-left pt-0.5">
                    سود شما: {formatPrice((oldPriceFinal - finalUnitPrice) * quantity)}
                  </p>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700">تعداد:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-1 text-slate-600 hover:text-indigo-600 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 font-mono">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1 text-slate-600 hover:text-indigo-600 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isOutOfStock
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : isAdding
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-98 cursor-pointer'
                  }`}
                >
                  {isAdding ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{isOutOfStock ? 'کالا ناموجود است' : isAdding ? 'به سبد خرید افزوده شد' : 'افزودن به سبد خرید'}</span>
                </button>

                {!isOutOfStock && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    خرید سریع و تسویه حساب
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 3. Detailed Tabs Section: Specs, Editorial Description, User Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-xs sm:text-sm font-bold pb-3 -mb-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            مشخصات فنی تخصصی
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`text-xs sm:text-sm font-bold pb-3 -mb-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'desc'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            نقد و بررسی کارشناسی
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-xs sm:text-sm font-bold pb-3 -mb-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            نظرات کاربران ({toPersianDigits(productReviews.length)})
          </button>
        </div>

        {/* Tab 1: Specs Table */}
        {activeTab === 'specs' && (
          <div className="pt-6 space-y-6 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900 mb-4">جدول مشخصات فنی محصول:</h3>
            
            <div className="space-y-6">
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <h4 className="text-xs font-bold text-indigo-700 bg-indigo-50/60 px-3 py-1.5 rounded-lg inline-block">
                      {group.groupName}
                    </h4>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                      {group.items.map((item, iIdx) => (
                        <div 
                          key={iIdx} 
                          className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs ${iIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}
                        >
                          <span className="font-bold text-slate-700 sm:col-span-1">{item.label}</span>
                          <span className="text-slate-600 sm:col-span-2 font-medium mt-1 sm:mt-0">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">مشخصات فنی تکمیلی به زودی افزوده خواهد شد.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Editorial Description */}
        {activeTab === 'desc' && (
          <div className="pt-6 space-y-4 animate-fadeIn text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            <h3 className="text-base font-black text-slate-900 mb-3">بررسی تخصصی پازل کالا:</h3>
            <p>{product.description}</p>
            {product.fullDescription && <p className="mt-2 text-slate-600">{product.fullDescription}</p>}
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 space-y-1 mt-4">
              <p className="font-bold">جمع‌بندی کارشناسان پازل کالا:</p>
              <p>این محصول با توجه به برچسب قیمتی، کیفیت ساخت و گارانتی معتبر شرکتی، یکی از با ارزش‌ترین انتخاب‌ها در رده خود به شمار می‌رود.</p>
            </div>
          </div>
        )}

        {/* Tab 3: User Reviews */}
        {activeTab === 'reviews' && (
          <div className="pt-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {toPersianDigits(product.rating.toString())}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    بر اساس {toPersianDigits(productReviews.length || 1)} دیدگاه ثبت‌شده
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                ثبت دیدگاه و تجربه خرید
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                        {rev.isVerifiedPurchase && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                            خریدار محصول
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {rev.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  هنوز دیدگاهی برای این کالا ثبت نشده است. شما اولین نفر باشید!
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 4. Similar / Related Products Section */}
      {similarProducts.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              محصولات مرتبط و مشابه
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 5. Mobile Sticky Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-slate-500 truncate">{product.persianName}</span>
            <span className="text-sm font-black text-slate-900">{formatPrice(finalUnitPrice * quantity)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${
              isOutOfStock ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isOutOfStock ? 'ناموجود' : 'افزودن به سبد'}</span>
          </button>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsReviewModalOpen(false)} />
          
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl z-10 animate-slideUp">
            <h3 className="text-base font-bold text-slate-900 mb-4">ثبت نظر برای {product.persianName}</h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                  placeholder="مثال: علی رضایی"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">امتیاز شما:</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">متن نظر شما:</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 resize-none"
                  placeholder="تجربه کار با محصول، نقاط قوت و ضعف را بنویسید..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  ثبت دیدگاه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
