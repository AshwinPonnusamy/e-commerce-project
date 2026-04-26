import React from "react";
import { Package, Truck, CheckCircle2, ChevronRight, Search, Filter } from "lucide-react";

const Orders: React.FC = () => {
  const orders = [
    {
      id: "ORD-9921",
      date: "Oct 24, 2023",
      amount: "₹4,299",
      status: "In Transit",
      items: [
        { name: "Premium Wireless Headphones", price: "₹3,499", qty: 1, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
        { name: "Smart Watch Band", price: "₹800", qty: 1, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" }
      ]
    },
    {
      id: "ORD-9845",
      date: "Oct 18, 2023",
      amount: "₹1,850",
      status: "Delivered",
      items: [
        { name: "Luxury Scented Candle", price: "₹1,850", qty: 1, img: "https://images.unsplash.com/photo-1603006375271-7f3b9042c943?w=100" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">My Orders</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Track & Manage Purchases</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:border-violet-100 transition-all">
            {/* Order Meta */}
            <div className="p-6 bg-gray-50/50 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{order.id}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Placed</p>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">{order.date}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-xs font-black text-violet-600 uppercase tracking-tight">{order.amount}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
              }`}>
                {order.status === "Delivered" ? <CheckCircle2 size={12} /> : <Truck size={12} />}
                {order.status}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-6">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 p-2 overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.qty} • {item.price}</p>
                    </div>
                  </div>
                  <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:bg-violet-600 hover:text-white transition-all group-hover:bg-violet-50 group-hover:text-violet-600">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20">
                Track Order
              </button>
              <button className="px-8 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                Order Details
              </button>
              {order.status === "Delivered" && (
                <button className="px-8 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Return Item
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
