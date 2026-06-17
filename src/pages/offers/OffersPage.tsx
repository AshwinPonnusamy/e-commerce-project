import React, { useState } from "react";
import { mockCoupons, Coupon } from "../../utils/offerEngine";
import { 
  Ticket, 
  Copy, 
  Check, 
  Calendar, 
  TrendingUp, 
  Info,
  Gift,
  Truck
} from "lucide-react";

const OffersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "percent" | "flat" | "freeship">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter coupons based on active tab
  const filteredCoupons = mockCoupons.filter((coupon) => {
    if (!coupon.isActive) return false;
    if (activeFilter === "all") return true;
    return coupon.type === activeFilter || (activeFilter === "percent" && coupon.type === "first_order");
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const getCouponBadge = (coupon: Coupon) => {
    switch (coupon.type) {
      case "first_order":
        return "New User Offer";
      case "percent":
        return "Seasonal Discount";
      case "flat":
        return "Flat Reward";
      case "freeship":
        return "Delivery Perks";
      default:
        return "Special Offer";
    }
  };

  const getCouponIcon = (type: string) => {
    switch (type) {
      case "freeship":
        return <Truck size={24} className="text-violet-600 animate-bounce" />;
      case "first_order":
        return <Gift size={24} className="text-violet-600 animate-pulse" />;
      default:
        return <Ticket size={24} className="text-violet-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-[10px] font-black text-violet-600 uppercase tracking-[0.25em]">Exclusive Promotions</span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter mt-1 flex items-center justify-center md:justify-start gap-3">
          <Ticket className="text-violet-600 animate-spin-slow" size={32} />
          Active Offers & Coupons
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-2">
          Apply these codes at checkout to unlock savings on your premium orders.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4 no-scrollbar overflow-x-auto">
        {[
          { label: "All Offers", id: "all" },
          { label: "Percentage Off", id: "percent" },
          { label: "Flat Discounts", id: "flat" },
          { label: "Free Shipping", id: "freeship" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeFilter === tab.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/15"
                : "bg-white border border-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Coupons Grid */}
      {filteredCoupons.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center">
          <Ticket size={36} className="text-gray-300 mb-4" />
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">No Active Offers</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Check back later for new discount codes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoupons.map((coupon) => {
            const hasUsageLimit = !!coupon.usageLimit;
            const progress = hasUsageLimit ? (coupon.currentUsage / (coupon.usageLimit || 1)) * 100 : 0;
            const isCopied = copiedCode === coupon.code;

            return (
              <div 
                key={coupon.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:border-violet-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Decorative Coupon Notch circles */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-gray-50 border-r border-gray-100 -translate-y-1/2 z-10" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-gray-50 border-l border-gray-100 -translate-y-1/2 z-10" />

                {/* Card Top section */}
                <div className="p-6 space-y-4 flex-1">
                  
                  {/* Icon & Badge row */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-violet-50 rounded-2xl">
                      {getCouponIcon(coupon.type)}
                    </div>
                    <span className="text-[8px] font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-full uppercase tracking-widest">
                      {getCouponBadge(coupon)}
                    </span>
                  </div>

                  {/* Coupon Title / Value */}
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      {coupon.type === "freeship" ? "FREE SHIPPING" : 
                       coupon.type === "percent" || coupon.type === "first_order" ? `${coupon.value}% OFF` : 
                       `₹${coupon.value} FLAT OFF`}
                    </h3>
                    
                    {/* Expiry / Conditions */}
                    <div className="flex flex-col gap-1.5 mt-3">
                      {coupon.minOrderValue && (
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Info size={12} className="text-violet-600" />
                          Min Order Value: ₹{coupon.minOrderValue}
                        </p>
                      )}
                      {coupon.maxDiscount && (
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <TrendingUp size={12} className="text-violet-600" />
                          Max Discount Cap: ₹{coupon.maxDiscount}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={12} className="text-violet-600" />
                        Expires: {new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Usage Progress bar */}
                  {hasUsageLimit && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        <span>Usage limit</span>
                        <span>{coupon.currentUsage} / {coupon.usageLimit} claimed</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-600 rounded-full transition-all duration-500" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Bottom / Dotted divider / Code action */}
                <div className="border-t border-dashed border-gray-100 bg-gray-50/50 p-6 flex flex-col items-center gap-4">
                  {/* Coupon Code Dotted Badge */}
                  <div className="px-5 py-2.5 border-2 border-dashed border-violet-200 bg-violet-50/20 text-violet-700 rounded-xl text-center font-mono font-black text-sm tracking-wider select-all uppercase">
                    {coupon.code}
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className={`w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isCopied 
                        ? "bg-green-600 text-white shadow-green-600/10" 
                        : "bg-gray-900 hover:bg-black text-white shadow-gray-950/10"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} />
                        COPIED!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        COPY CODE
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OffersPage;
