import React, { useState } from "react";
import { Share2, ShoppingBag, Star, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number | string;
  productRating: number;
  brand?: string;
  reviewsCount?: number;
  originalPrice?: number;
  discount?: number;
  showCart?: boolean;
  handleAddCart?: () => void;
  onClick?: () => void;
  isInCart?: boolean;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productPrice,
  productImage,
  productDescription,
  originalPrice,
  discount,
  productRating,
  brand,
  reviewsCount = 128,
  handleAddCart,
  onClick,
  isInCart,
  viewMode = 'grid'
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const formattedPrice = typeof productPrice === 'number' ? `₹${productPrice.toLocaleString()}` : productPrice;
  const formattedOriginalPrice = originalPrice ? `₹${originalPrice.toLocaleString()}` : null;

  if (viewMode === 'list') {
    return (
      <div
        className="group bg-[#FCFCFC] rounded-[24px] hover:bg-white border border-transparent hover:border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-700 flex items-center p-5 gap-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image Section */}
        <div className="relative w-44 h-44 flex-shrink-0 cursor-pointer bg-white rounded-[18px] overflow-hidden p-0 group-hover:shadow-inner" onClick={onClick}>
          <img
            src={productImage}
            loading="lazy"
            alt={productName}
            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
          />
          {discount && (
            <div className="absolute top-4 left-4 z-20 group-hover:-translate-y-1 transition-all duration-700">
              <div className="bg-[#1A1A2E] border border-amber-400/30 px-3 py-1.5 rounded-full shadow-lg flex items-center">
                <span className="text-[12px] font-black text-white tracking-tighter">-{discount}%</span>
              </div>
            </div>
          )}
          {/* Share Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigator.share?.({ title: productName, url: window.location.href });
            }}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white active:scale-90"
          >
            <Share2 size={14} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col py-1">
          <div className="flex justify-between items-start mb-4">
            <div className="max-w-md">
              {brand && (
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] block mb-1">
                  {brand}
                </span>
              )}
              <h3 className="text-xl font-light text-gray-900 leading-snug group-hover:text-violet-600 transition-colors mb-2">
                {productName}
              </h3>
              <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">
                {productDescription}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-light text-gray-900 tracking-tight">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs line-through text-gray-300 mt-0.5">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-100 px-2 py-0.5 rounded-full">
                <Star size={10} className="fill-gray-900 text-gray-900" />
                <span className="text-[10px] font-medium text-gray-900">{productRating}</span>
              </div>
              <span className="text-[9px] font-medium text-gray-300 uppercase tracking-widest">({reviewsCount})</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInCart) {
                    navigate("/layout/shoppingcart");
                  } else {
                    handleAddCart?.();
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.15em] transition-all ${
                  isInCart ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-[#1A1A2E] text-white hover:bg-black shadow-lg shadow-black/10'
                }`}
              >
                {isInCart ? <Check size={14} /> : <ShoppingBag size={14} />}
                {isInCart ? 'Product added' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white rounded-[20px] border border-transparent hover:border-gray-50 shadow-[0_8px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] transition-all duration-700 flex flex-col h-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-[#F9F9F9] overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={productImage}
          loading="lazy"
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Share Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigator.share?.({ title: productName, url: window.location.href });
          }}
          className="absolute top-3 right-3 z-30 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white active:scale-90"
        >
          <Share2 size={12} />
        </button>

        {discount && (
          <div className="absolute top-3 left-3 z-20 group-hover:-translate-y-0.5 transition-all duration-500">
            <div className="bg-[#1A1A2E] border border-amber-400/40 px-2.5 py-1 rounded-full shadow-xl flex items-center">
              <span className="text-[9px] font-black text-white tracking-tight">{discount}% OFF</span>
            </div>
          </div>
        )}

        {/* Quick Add (Elegant Overlay) */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-700 transform ${hovered || isInCart ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isInCart) {
                navigate("/layout/shoppingcart");
              } else {
                handleAddCart?.();
              }
            }}
            className={`w-full h-10 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-1.5 border ${
              isInCart 
                ? 'bg-violet-600 border-violet-600 text-white hover:bg-violet-700' 
                : 'bg-white/95 border-gray-100 text-gray-900 hover:bg-white'
            }`}
          >
            {isInCart ? (
              <>
                <Check size={12} />
                Product added
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-3.5 flex flex-col flex-1 text-left items-start">
        {brand && (
          <span className="text-[8px] font-medium text-gray-300 uppercase tracking-[0.25em] mb-1">
            {brand}
          </span>
        )}
        <h3 className="text-[13px] font-light text-gray-900 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors mb-2.5 w-full">
          {productName}
        </h3>

        <div className="mt-auto flex flex-col items-start w-full">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base font-light text-gray-900 tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[9px] line-through text-gray-300">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-40">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={8} className={s <= Math.round(productRating) ? "fill-gray-900 text-gray-900" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-[8px] font-medium text-gray-900">({reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
