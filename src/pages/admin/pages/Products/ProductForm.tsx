import React, { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  UploadCloud, 
  Trash2, 
  Plus,
  Info,
  Link as LinkIcon,
  Search,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [variants, setVariants] = useState([{ id: 1, name: "Default Title", sku: "", price: "", stock: "" }]);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), name: "", sku: "", price: "", stock: "" }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-entrance pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/products")}
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">New Product Listing</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Configure details, media, and pricing for your new item.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate("/admin/products")}
            className="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all"
          >
            CANCEL
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#7c3aed] text-white text-sm font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
            <Save size={18} />
            SAVE PRODUCT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Info className="text-violet-600" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Core Details</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Description</label>
                <textarea 
                  rows={6}
                  placeholder="Tell your customers about the features, benefits and specs..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-bold resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <UploadCloud className="text-violet-600" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Product Media</h3>
            </div>
            <div className="border-4 border-dashed border-gray-50 bg-gray-50/50 rounded-2xl p-12 text-center hover:border-violet-200 hover:bg-violet-50/30 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-violet-600" size={28} />
              </div>
              <p className="text-sm font-black text-gray-900">Drop your product images here</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">PNG, JPG or WebP up to 10MB each. Max 8 files.</p>
              <button className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:shadow-md transition-all">
                BROWSE FILES
              </button>
            </div>
            <div className="mt-6 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video Demonstration URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-bold"
                />
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Layers className="text-violet-600" size={20} />
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Product Variants</h3>
              </div>
              <button 
                onClick={addVariant}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-violet-600 hover:bg-violet-50 transition-all"
              >
                <Plus size={14} />
                ADD VARIANT
              </button>
            </div>
            
            <div className="space-y-4">
              {variants.map((v) => (
                <div key={v.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Option</label>
                      <input type="text" placeholder="Size/Color" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-4 focus:ring-violet-500/10 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Price</label>
                      <input type="text" placeholder="₹0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-4 focus:ring-violet-500/10 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Stock</label>
                      <input type="text" placeholder="0" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-4 focus:ring-violet-500/10 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-0.5">SKU</label>
                      <input type="text" placeholder="AUTO-GEN" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-4 focus:ring-violet-500/10 outline-none" />
                    </div>
                  </div>
                  <button 
                    onClick={() => removeVariant(v.id)}
                    disabled={variants.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Categorization */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">Categorization</h3>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-bold appearance-none">
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="beauty">Beauty & Health</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brand / Vendor</label>
                <input type="text" placeholder="e.g. Sony, Apple, Nike" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Collection Tags</label>
                <input type="text" placeholder="Separate with commas" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" />
              </div>
            </div>
          </section>

          {/* Visibility & Status */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">Product Visibility</h3>
            <div className="space-y-4">
              {[
                { label: 'Active in Store', desc: 'Visible to customers' },
                { label: 'Featured Product', desc: 'Show on homepage' },
                { label: 'New Arrival', desc: 'Add badge to card' },
                { label: 'COD Available', desc: 'Allow cash payment' },
              ].map((flag) => (
                <div key={flag.label} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900">{flag.label}</span>
                    <span className="text-[10px] font-medium text-gray-400">{flag.desc}</span>
                  </div>
                  <div className="relative inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                    <span className="inline-block h-3.5 w-3.5 transform translate-x-1 rounded-full bg-white transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEO */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Search className="text-violet-600" size={18} />
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">SEO Strategy</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug</label>
                <input type="text" placeholder="product-url-handle" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold font-mono tracking-tighter" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Title</label>
                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                <textarea rows={3} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold resize-none"></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
