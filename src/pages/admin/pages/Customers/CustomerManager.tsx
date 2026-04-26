import React, { useState } from "react";
import { 
  Eye, 
  Search, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Download, 
  X, 
  Award,
  ExternalLink
} from "lucide-react";

const mockCustomers = [
  { id: "CUST-001", name: "Alice Freeman", email: "alice@example.com", phone: "+91 98765 43210", orders: 12, spent: "₹1,24,000", loyalty: 450, joined: "Jan 15, 2023" },
  { id: "CUST-002", name: "Bob Smith", email: "bob@example.com", phone: "+91 88776 55443", orders: 3, spent: "₹14,550", loyalty: 20, joined: "Nov 20, 2023" },
  { id: "CUST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+91 77665 44332", orders: 28, spent: "₹3,89,000", loyalty: 1200, joined: "Aug 05, 2022" },
];

const CustomerManager: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Customer Directory</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage relationships, track loyalty points and lifecycle value.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Download size={18} />
          EXPORT CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, phone or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-lg">All Segment</button>
            <button className="px-4 py-2 bg-violet-50 text-[10px] font-black text-violet-600 uppercase tracking-widest rounded-lg">VIP Customers</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Customer Profile</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4 text-center">Lifecycle Value</th>
                <th className="px-6 py-4 text-center">Loyalty</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-violet-600/20">
                        {cust.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900">{cust.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                        <Mail size={12} className="text-gray-300" />
                        {cust.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                        <Phone size={12} className="text-gray-300" />
                        {cust.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-600">{cust.orders}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-black text-gray-900">{cust.spent}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Award size={14} className="text-amber-500" />
                      <span className="text-xs font-black text-amber-600">{cust.loyalty} pts</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setSelectedCustomer(cust)}
                      className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-lg"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-r from-violet-600 to-indigo-700">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
              <div className="absolute -bottom-10 left-8 p-1 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-violet-600 rounded-xl flex items-center justify-center text-white text-3xl font-black">
                  {selectedCustomer.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-8 pt-16 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{selectedCustomer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">{selectedCustomer.id}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined {selectedCustomer.joined}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[10px] font-black rounded-xl hover:bg-black transition-all">
                  EDIT PROFILE
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                {/* Contact */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Contact Channels</h4>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-violet-600 shadow-sm"><Mail size={16} /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase">Primary Email</span>
                      <span className="text-xs font-bold text-gray-900">{selectedCustomer.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-violet-600 shadow-sm"><Phone size={16} /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase">Mobile Number</span>
                      <span className="text-xs font-bold text-gray-900">{selectedCustomer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 text-center">
                      <div className="text-xl font-black text-violet-700">{selectedCustomer.orders}</div>
                      <div className="text-[9px] font-black text-violet-600 uppercase tracking-widest mt-1">Orders</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                      <div className="text-xl font-black text-emerald-700">{selectedCustomer.spent}</div>
                      <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">LTV</div>
                    </div>
                    <div className="col-span-2 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="text-amber-600" size={24} />
                        <div className="text-left">
                          <div className="text-lg font-black text-amber-700">{selectedCustomer.loyalty} PTS</div>
                          <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Loyalty Balance</div>
                        </div>
                      </div>
                      <button className="text-[10px] font-black text-amber-700 hover:underline">REDEEM</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction History</h4>
                  <button className="flex items-center gap-1 text-[10px] font-black text-violet-600 hover:underline">
                    VIEW ALL <ExternalLink size={12} />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: '#ORD-8901', date: 'May 12, 2024', total: '₹12,000', status: 'Delivered' },
                    { id: '#ORD-8854', date: 'Apr 20, 2024', total: '₹3,500', status: 'Delivered' },
                  ].map((order, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg text-gray-400"><ShoppingBag size={14} /></div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">{order.id}</span>
                          <span className="text-[10px] font-bold text-gray-400">{order.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-black text-gray-900">{order.total}</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[8px] font-black uppercase rounded">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManager;
