import React, { useState } from "react";
import { 
  Plus, 
  Ticket, 
  Edit3, 
  Trash2, 
  X, 
  Calendar, 
  Percent, 
  Banknote, 
  Truck, 
  Search,
  Filter
} from "lucide-react";

// Simplified Coupon interface for migration
interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'flat' | 'freeship' | 'bogo';
  value: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  currentUsage: number;
  minOrderValue?: number;
}

const mockCoupons: Coupon[] = [
  { id: '1', code: 'SUMMER20', type: 'percent', value: 20, isActive: true, validFrom: '2024-06-01', validUntil: '2024-08-31', usageLimit: 500, currentUsage: 142, minOrderValue: 2000 },
  { id: '2', code: 'WELCOME100', type: 'flat', value: 100, isActive: true, validFrom: '2024-01-01', validUntil: '2024-12-31', usageLimit: 1000, currentUsage: 856 },
  { id: '3', code: 'FREESHIP', type: 'freeship', value: 0, isActive: false, validFrom: '2024-05-01', validUntil: '2024-05-31', usageLimit: 100, currentUsage: 100, minOrderValue: 500 },
];

const CouponManager: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [showForm, setShowForm] = useState(false);

  const toggleStatus = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const getCouponIcon = (type: string) => {
    switch (type) {
      case 'percent': return <Percent size={14} />;
      case 'flat': return <Banknote size={14} />;
      case 'freeship': return <Truck size={14} />;
      default: return <Ticket size={14} />;
    }
  };

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Coupons & Offers</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Design promotional campaigns and manage discount codes.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg ${
            showForm 
              ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' 
              : 'bg-[#7c3aed] text-white hover:bg-violet-700 shadow-violet-600/20'
          }`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'CANCEL' : 'NEW PROMO CODE'}
        </button>
      </div>

      {/* Creation Form */}
      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-violet-100 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
              <Ticket size={20} />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Configure New Discount</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Coupon Code</label>
              <input type="text" placeholder="e.g. FESTIVE50" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black uppercase placeholder:normal-case" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Type</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold appearance-none">
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
                <option value="freeship">Free Shipping</option>
                <option value="bogo">Buy 1 Get 1 Free</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Value</label>
              <input type="number" placeholder="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Min Order Value</label>
              <input type="number" placeholder="₹0 (Optional)" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Usage Limit</label>
              <input type="number" placeholder="e.g. 500 uses" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Max Discount Cap</label>
              <input type="number" placeholder="₹ (Optional)" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-500" />
            </div>
            
            <div className="sm:col-span-3 pt-6 flex justify-end gap-3">
              <button className="px-8 py-3 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
                ACTIVATE COUPON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search coupons..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            ACTIVE ONLY
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Promo Code</th>
                <th className="px-6 py-4">Offer Configuration</th>
                <th className="px-6 py-4">Usage Analytics</th>
                <th className="px-6 py-4">Campaign Lifecycle</th>
                <th className="px-6 py-4">Live Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-violet-600 transition-colors">
                        <Ticket size={18} />
                      </div>
                      <span className="text-xs font-black text-gray-900">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-violet-600">{getCouponIcon(coupon.type)}</span>
                        <span className="text-xs font-black text-gray-900">
                          {coupon.type === 'freeship' ? 'FREE SHIPPING' : 
                           coupon.type === 'percent' ? `${coupon.value}% OFF` : 
                           `₹${coupon.value} FLAT OFF`}
                        </span>
                      </div>
                      {coupon.minOrderValue && (
                        <span className="text-[10px] font-bold text-gray-400">MIN. ORDER: ₹{coupon.minOrderValue}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center w-32">
                        <span className="text-[10px] font-black text-gray-900">{coupon.currentUsage}</span>
                        <span className="text-[10px] font-bold text-gray-400">/ {coupon.usageLimit || '∞'}</span>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-600 rounded-full"
                          style={{ width: `${coupon.usageLimit ? (coupon.currentUsage / coupon.usageLimit) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Calendar size={12} className="text-gray-300" />
                      <span>{coupon.validFrom}</span>
                      <ArrowRight size={10} className="text-gray-300" />
                      <span>{coupon.validUntil}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => toggleStatus(coupon.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        coupon.isActive ? 'bg-violet-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        coupon.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-lg">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default CouponManager;
