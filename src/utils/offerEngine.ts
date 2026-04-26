export type CouponType = 
  | 'flat'          // ₹100 OFF
  | 'percent'       // 20% OFF (with optional max cap)
  | 'bogo'          // Buy 1 Get 1
  | 'combo'         // Buy A+B get X% off
  | 'freeship'      // Free shipping
  | 'category'      // 15% off on specific category
  | 'brand'         // 10% off specific brand
  | 'first_order';  // First purchase discount

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // For percent, flat, or discount amounts
  maxDiscount?: number; // Cap for percentage
  minOrderValue?: number; // Condition for applying
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  currentUsage: number;
  isActive: boolean;
  targetId?: string; // e.g. Category ID or Brand Name if applicable
}

export const mockCoupons: Coupon[] = [
  {
    id: "c1", code: "WELCOME10", type: "first_order", value: 10, isActive: true, currentUsage: 45, usageLimit: 100, validFrom: "2024-01-01", validUntil: "2024-12-31"
  },
  {
    id: "c2", code: "SUMMER20", type: "percent", value: 20, maxDiscount: 50, isActive: true, currentUsage: 12, validFrom: "2024-05-01", validUntil: "2024-08-31"
  },
  {
    id: "c3", code: "FESTIVE50", type: "flat", value: 50, minOrderValue: 200, isActive: true, currentUsage: 500, validFrom: "2024-10-01", validUntil: "2024-11-01"
  },
  {
    id: "c4", code: "FREESHIP99", type: "freeship", value: 0, minOrderValue: 99, isActive: true, currentUsage: 89, validFrom: "2024-01-01", validUntil: "2024-12-31"
  }
];

export const calculateDiscount = (cartTotal: number, coupon: Coupon, isFirstOrder: boolean = false): number => {
  if (!coupon.isActive) return 0;
  if (coupon.minOrderValue && cartTotal < coupon.minOrderValue) return 0;
  if (coupon.usageLimit && coupon.currentUsage >= coupon.usageLimit) return 0;
  
  const now = new Date().toISOString();
  if (now < coupon.validFrom || now > coupon.validUntil) return 0;

  switch (coupon.type) {
    case "flat":
      return Math.min(coupon.value, cartTotal);
    case "percent":
      const discount = (cartTotal * coupon.value) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    case "freeship":
      return 0; // Handled at shipping calculation level
    case "first_order":
      if (!isFirstOrder) return 0;
      const firstDiscount = (cartTotal * coupon.value) / 100;
      return coupon.maxDiscount ? Math.min(firstDiscount, coupon.maxDiscount) : firstDiscount;
    default:
      return 0;
  }
};
