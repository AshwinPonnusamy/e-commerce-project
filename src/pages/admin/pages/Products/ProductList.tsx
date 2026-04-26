import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Filter, 
  Download,
  Image as ImageIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", sku: "WH-1000XM4", category: "Electronics", stock: 45, price: "₹29,900", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop", active: true },
  { id: 2, name: "Ergonomic Office Chair", sku: "FURN-CHAIR-01", category: "Furniture", stock: 12, price: "₹19,999", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&h=100&fit=crop", active: true },
  { id: 3, name: "Smart Fitness Watch", sku: "TECH-WTCH-V2", category: "Wearables", stock: 0, price: "₹14,950", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop", active: false },
  { id: 4, name: "Organic Cotton T-Shirt", sku: "APP-TSH-WHT", category: "Apparel", stock: 150, price: "₹2,400", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop", active: true },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();

  const handleToggleActive = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="space-y-6 animate-entrance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Product Catalog</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage your inventory, pricing and visibility.</p>
        </div>
        <button 
          onClick={() => navigate("/admin/products/new")}
          className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95"
        >
          <Plus size={18} />
          ADD PRODUCT
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={14} />
              FILTERS
            </button>
          </div>
          <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
            <Download size={14} />
            EXPORT
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                </th>
                <th className="px-4 py-3">Product Info</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Inventory Status</th>
                <th className="px-4 py-3">Retail Price</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 shadow-sm">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-gray-900 truncate max-w-[200px] uppercase tracking-tight">{product.name}</span>
                        <span className="text-[9px] font-bold text-gray-400 font-mono tracking-tighter mt-0.5">SKU: {product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded uppercase tracking-widest">{product.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                      </span>
                      <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-black text-gray-900">{product.price}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => handleToggleActive(product.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        product.active ? 'bg-violet-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        product.active ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="p-2.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-xl border border-transparent hover:border-violet-100">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl border border-transparent hover:border-red-100">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-gray-900 transition-all rounded-xl">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-medium text-gray-500">Showing 4 products of 1,248</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 disabled:opacity-30">PREV</button>
            <button className="px-3 py-1 bg-violet-600 text-white rounded-lg text-[10px] font-black">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-[10px] font-black text-gray-600 hover:bg-gray-100 transition-all">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
