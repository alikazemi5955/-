import React from 'react';
import { X, Trash2, ShoppingCart, Scale, Star, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

export const ComparisonModal: React.FC = () => {
  const { 
    compareList, 
    toggleCompare, 
    clearCompare, 
    isCompareModalOpen, 
    setIsCompareModalOpen,
    addToCart,
    openProductDetail,
    setCurrentPage 
  } = useStore();

  if (!isCompareModalOpen) return null;

  const comparedProducts = PRODUCTS.filter(p => compareList.includes(p.id));

  // Collect all unique spec groups and items
  const allGroups = Array.from(
    new Set(
      comparedProducts.flatMap(p => p.specifications.map(s => s.groupName))
    )
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 select-none" id="compare-modal-container">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                مقایسه تخصصی کالاها ({comparedProducts.length} از ۴ کالا)
              </h3>
              <span className="text-[11px] text-slate-400">
                بررسی جدول مشخصات فنی و تفاوت‌های کلیدی
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف همه</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {comparedProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                
                {/* Header Row: Products Overview */}
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-slate-400 font-normal w-40">مشخصه / کالا</th>
                    {comparedProducts.map(prod => (
                      <th key={prod.id} className="p-3 text-center min-w-[200px] align-top">
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => toggleCompare(prod.id)}
                            className="self-end p-1 text-slate-300 hover:text-rose-500 mb-1"
                            title="حذف از مقایسه"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img 
                            src={prod.images[0]} 
                            alt={prod.name} 
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              openProductDetail(prod.id);
                            }}
                            className="w-24 h-24 object-contain bg-slate-50 rounded-xl p-2 mb-2 cursor-pointer hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <h4 
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              openProductDetail(prod.id);
                            }}
                            className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-2 mb-1 text-center"
                          >
                            {prod.persianName}
                          </h4>
                          <span className="font-extrabold text-indigo-600 font-mono mb-2">
                            {formatPrice(prod.price)}
                          </span>
                          <button
                            onClick={() => addToCart(prod)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>افزودن به سبد</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body Rows: Specifications */}
                <tbody className="divide-y divide-slate-100">
                  
                  {/* General Row */}
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td colSpan={comparedProducts.length + 1} className="p-2.5">
                      اطلاعات کلی و برند
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">برند</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-center font-bold text-slate-800">{p.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">امتیاز خریداران</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{p.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Spec Groups */}
                  {allGroups.map(groupName => {
                    // find all unique labels in this group across products
                    const labelsInGroup = Array.from(
                      new Set(
                        comparedProducts.flatMap(p => {
                          const g = p.specifications.find(s => s.groupName === groupName);
                          return g ? g.items.map(i => i.label) : [];
                        })
                      )
                    );

                    return (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-50 font-bold text-slate-900">
                          <td colSpan={comparedProducts.length + 1} className="p-2.5">
                            {groupName}
                          </td>
                        </tr>
                        {labelsInGroup.map(label => (
                          <tr key={label} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-500">{label}</td>
                            {comparedProducts.map(prod => {
                              const group = prod.specifications.find(s => s.groupName === groupName);
                              const item = group?.items.find(i => i.label === label);
                              return (
                                <td key={prod.id} className="p-3 text-center text-slate-700 font-medium">
                                  {item ? item.value : '-'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}

                </tbody>

              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              کالایی برای مقایسه انتخاب نشده است. با کلیک بر روی آیکون مقایسه در هر کارت محصول، کالاها را اینجا اضافه کنید.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
