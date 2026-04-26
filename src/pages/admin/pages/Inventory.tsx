import React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  TrendingDown, 
  Box as InventoryIcon, 
  XCircle, 
  CheckCircle2
} from "lucide-react";

const inventoryStats = [
  { title: "Total Value", value: "₹1,24,04,920", icon: <InventoryIcon size={20} />, color: "#7c3aed" },
  { title: "Low Stock", value: "24 Items", icon: <TrendingDown size={20} />, color: "#f59e0b" },
  { title: "Out of Stock", value: "7 Items", icon: <XCircle size={20} />, color: "#ef4444" },
  { title: "Active SKUs", value: "1,894 Units", icon: <CheckCircle2 size={20} />, color: "#10b981" },
];

const inventoryItems = [
  { id: 1, name: "Pro Audio Headphones X1", sku: "SKU-AUDIO-4492", category: "Electronics", stock: 45, price: "₹29,900", status: "In Stock" },
  { id: 2, name: "Precision Timepiece 04", sku: "SKU-WTCH-8821", category: "Fashion", stock: 8, price: "₹85,000", status: "Low Stock" },
  { id: 3, name: "Vintage Lens 35mm", sku: "SKU-CAM-1104", category: "Electronics", stock: 0, price: "₹1,20,000", status: "Out of Stock" },
  { id: 4, name: "SwiftRun Sneakers", sku: "SKU-SHOE-7729", category: "Fashion", stock: 124, price: "₹12,000", status: "In Stock" },
  { id: 5, name: "Smart Home Hub v2", sku: "SKU-HOME-2201", category: "Home", stock: 12, price: "₹19,900", status: "Low Stock" },
];

const StitchInventory: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Inventory Control</h1>
          <p className="text-sm text-gray-500 font-medium mt-2">Real-time stock monitoring and warehouse management.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
          <Plus size={18} />
          ADD NEW PRODUCT
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by product name, SKU or category..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
            />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              FILTERS
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
              EXPORT CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Product Details</th>
                <th className="px-6 py-5">SKU Code</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Stock Level</th>
                <th className="px-6 py-5">Unit Price</th>
                <th className="px-6 py-5">Inventory Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-gray-900 block uppercase tracking-tight">{item.name}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[11px] font-bold text-gray-400 font-mono tracking-tighter">{item.sku}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded uppercase tracking-widest">{item.category}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-sm font-black ${item.stock <= 10 ? 'text-red-600' : 'text-gray-900'}`}>{item.stock} Units</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-black text-gray-900">₹{item.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === "In Stock" ? 'bg-green-100 text-green-700 border border-green-200' :
                      item.status === "Low Stock" ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all rounded-xl">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Showing 5 of 1,894 items</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-[10px] font-black text-gray-400 disabled:opacity-30 cursor-not-allowed">PREV</button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black shadow-lg shadow-violet-600/20">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:bg-gray-100 transition-all">2</button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:bg-gray-100 transition-all">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StitchInventory;
