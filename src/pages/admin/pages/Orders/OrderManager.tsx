import React, { useState } from "react";
import { 
  Eye, 
  Search, 
  Truck, 
  Printer, 
  X, 
  Package, 
  MapPin, 
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const mockOrders = [
  { id: "#ORD-8901", date: "2024-05-12", customer: "Alice Freeman", total: "₹12,000", status: "New", payment: "Paid", items: 2 },
  { id: "#ORD-8902", date: "2024-05-12", customer: "Bob Smith", total: "₹4,500", status: "Packed", payment: "COD", items: 1 },
  { id: "#ORD-8903", date: "2024-05-11", customer: "Charlie Davis", total: "₹34,050", status: "Shipped", payment: "Paid", items: 5 },
  { id: "#ORD-8904", date: "2024-05-10", customer: "Diana Prince", total: "₹8,999", status: "Delivered", payment: "Paid", items: 1 },
  { id: "#ORD-8905", date: "2024-05-09", customer: "Eve Adams", total: "₹1,500", status: "Cancelled", payment: "Refunded", items: 1 },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "New": return "bg-violet-100 text-violet-700";
    case "Packed": return "bg-orange-100 text-orange-700";
    case "Shipped": return "bg-purple-100 text-purple-700";
    case "Delivered": return "bg-green-100 text-green-700";
    case "Cancelled": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const OrderManager: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const tabs = ["All", "New", "Packed", "Shipped", "Delivered", "Cancelled"];
  
  const filteredOrders = tabIndex === 0 
    ? mockOrders 
    : mockOrders.filter(o => o.status === tabs[tabIndex]);

  return (
    <div className="space-y-8 animate-entrance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Order Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Track fulfillment, payments, and logistics operations.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
            <Printer size={16} />
            BATCH PRINT
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-violet-600 text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all">
            EXPORT CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="bg-gray-50/50 border-b border-gray-100 px-4 overflow-x-auto no-scrollbar">
          <div className="flex">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setTabIndex(index)}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                  tabIndex === index ? 'text-violet-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {tabIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 border-b border-gray-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer or Status..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Order Reference</th>
                <th className="px-6 py-4">Placement Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4">Fulfillment</th>
                <th className="px-6 py-4">Gross Amount</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-violet-600 hover:underline cursor-pointer">{order.id}</span>
                  </td>
                  <td className="px-6 py-5 text-xs font-medium text-gray-500">{order.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-900">{order.customer}</span>
                      <span className="text-[10px] font-bold text-gray-400">{order.items} items included</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                      order.payment === "Paid" ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs font-black text-gray-900">{order.total}</td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-lg"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center">
                    <Package className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No matching orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-medium text-gray-500">Showing page 1 of 12</span>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 disabled:opacity-30"><ChevronLeft size={16} /></button>
            <button className="px-3 py-1 bg-violet-600 text-white rounded-lg text-[10px] font-black">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-[10px] font-black text-gray-600 hover:bg-gray-100 transition-all">2</button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#f1f5f9] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-white px-8 py-6 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusStyles(selectedOrder.status)}`}>
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedOrder.id}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">ORDER PLACED: {selectedOrder.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyles(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                  {/* Order Items */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">Ordered Items</h4>
                    <div className="space-y-4">
                      {[
                        { name: 'Wireless Noise-Cancelling Headphones', qty: 1, price: '₹10,000' },
                        { name: 'USB-C Fast Charging Cable', qty: 1, price: '₹2,000' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-gray-800">{item.name}</span>
                            <span className="text-[10px] font-bold text-gray-400">Qty: {item.qty}</span>
                          </div>
                          <span className="text-sm font-black text-gray-900">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                        <span className="font-black text-gray-900">₹12,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-400 uppercase tracking-widest">Shipping Fee</span>
                        <span className="font-black text-green-600 uppercase tracking-widest">FREE</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-50">
                        <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Total Amount</span>
                        <span className="text-lg font-black text-violet-600">{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Tracking */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                      <Truck size={18} className="text-violet-600" />
                      Fulfillment Status
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-violet-600 text-white text-[10px] font-black rounded-lg hover:bg-violet-700 transition-all">MARK AS PACKED</button>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-400 text-[10px] font-black rounded-lg cursor-not-allowed">MARK AS SHIPPED</button>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-400 text-[10px] font-black rounded-lg cursor-not-allowed">MARK AS DELIVERED</button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {/* Customer Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <User className="text-violet-600" size={18} />
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Customer</h4>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black text-sm">
                        {selectedOrder.customer.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900">{selectedOrder.customer}</span>
                        <span className="text-[10px] font-bold text-gray-400">Standard Customer</span>
                      </div>
                    </div>
                    <div className="space-y-2 border-t border-gray-50 pt-4">
                      <p className="text-[11px] font-bold text-gray-500">alice.freeman@email.com</p>
                      <p className="text-[11px] font-bold text-gray-500">+91 98765 43210</p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="text-violet-600" size={18} />
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Shipping Details</h4>
                    </div>
                    <div className="space-y-1 text-[11px] font-bold text-gray-500">
                      <p className="text-gray-900 font-black mb-1">Office Delivery</p>
                      <p>Global Tech Center, Tower B</p>
                      <p>Plot No. 44, Electronic City</p>
                      <p>Bengaluru, Karnataka 560100</p>
                      <p>India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-8 py-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-gray-50 text-gray-600 text-xs font-black rounded-xl hover:bg-gray-100 transition-all"
              >
                CLOSE WINDOW
              </button>
              <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-black shadow-lg transition-all active:scale-95">
                <Printer size={16} />
                PRINT INVOICE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
