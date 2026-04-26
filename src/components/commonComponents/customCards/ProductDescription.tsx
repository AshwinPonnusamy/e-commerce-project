import React, { useState, useMemo } from "react";
import { Star, ShieldCheck, Zap, Minus, Plus, ShoppingCart } from "lucide-react";

interface ProductDescriptionProps {
  productName: string;
  productDescription: string;
  brand?: string;
  category?: string;
  price: number;
  stock?: number;
  rating?: number;
  discount: number;
  originalPrice: number;
  handleAddCart: () => void;
  handleBuyNow?: () => void;
  isInCart: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productName,
  productDescription,
  brand,
  category = "",
  price,
  rating,
  discount,
  originalPrice,
  handleAddCart,
  handleBuyNow,
  isInCart
}) => {
  const [quantity, setQuantity] = useState(1);

  // Generate dynamic options based on category
  const { label, options } = useMemo(() => {
    const cat = category.toLowerCase();
    if (cat.includes("smartphones") || cat.includes("laptops") || cat.includes("tablets")) {
      return { label: "Select Storage", options: ["128GB", "256GB", "512GB"] };
    }
    if (cat.includes("clothing") || cat.includes("shirts") || cat.includes("tops")) {
      return { label: "Select Size", options: ["S", "M", "L", "XL", "XXL"] };
    }
    if (cat.includes("shoes") || cat.includes("footwear")) {
      return { label: "Select Size (US)", options: ["8", "9", "10", "11", "12"] };
    }
    if (cat.includes("fragrances") || cat.includes("skincare") || cat.includes("beauty")) {
      return { label: "Select Volume", options: ["30ml", "50ml", "100ml"] };
    }
    if (cat.includes("watches")) {
      return { label: "Select Case Size", options: ["40mm", "44mm", "45mm"] };
    }
    if (cat.includes("kitchen") || cat.includes("home")) {
      return { label: "Select Capacity", options: ["1.5L", "3L", "5L"] };
    }
    return { label: "Select Option", options: ["Standard", "Premium", "Pro"] };
  }, [category]);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="flex flex-col h-full bg-white animate-entrance">
      <div className="flex flex-col space-y-6">
        
        {/* Top Badges */}
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">
            Best Seller
          </span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {brand}
          </span>
        </div>

        {/* Product Name */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight">
          {productName}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-black text-yellow-700">{rating}</span>
          </div>
          <span className="text-xs font-bold text-gray-400 border-l border-gray-200 pl-4">
            (1,248 Reviews)
          </span>
        </div>

        {/* Pricing Card */}
        <div className="bg-violet-50/50 p-6 rounded-2xl border border-violet-100/50">
          <div className="flex items-end gap-4">
            <span className="text-3xl font-black text-violet-600 tracking-tighter">
              ₹{price?.toFixed(2)}
            </span>
            <div className="flex flex-col pb-1">
              <span className="text-xs text-gray-400 line-through font-bold">
                ₹{originalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] text-green-600 font-black uppercase">
                {discount}% OFF
              </span>
            </div>
          </div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">
            Inclusive of all taxes
          </p>
        </div>

        {/* Dynamic Selector */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            {label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedOption(opt)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all border-2 ${
                  selectedOption === opt
                    ? 'border-violet-600 bg-violet-50 text-violet-600 shadow-md scale-105'
                    : 'border-gray-50 bg-white text-gray-400 hover:border-gray-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Stock */}
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Quantity
            </h3>
            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-500"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-black text-xs text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-500"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-500">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">In Stock</span>
            </div>
            <p className="text-[9px] font-bold text-gray-400 ml-6 uppercase">Ships within 24 hours</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleAddCart}
            className={`flex-1 py-5 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
              isInCart 
                ? 'bg-violet-50 text-violet-600 border-2 border-violet-600 shadow-violet-600/5' 
                : 'bg-violet-600 text-white hover:bg-violet-700 shadow-violet-600/20 active:scale-95'
            }`}
          >
            <ShoppingCart size={18} />
            {isInCart ? "In Your Cart" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-5 px-8 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-xl shadow-gray-900/20 transition-all active:scale-95"
          >
            Buy Now
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-400">
            <ShieldCheck size={18} className="text-violet-500" />
            <span className="text-[9px] font-black uppercase tracking-widest">10 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Zap size={18} className="text-orange-500" />
            <span className="text-[9px] font-black uppercase tracking-widest">Premium Quality</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDescription;
