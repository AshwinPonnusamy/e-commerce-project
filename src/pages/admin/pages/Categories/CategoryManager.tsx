import React, { useState } from "react";
import { 
  Folder, 
  FolderPlus, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  UploadCloud, 
  ChevronRight, 
  ChevronDown,
  Search
} from "lucide-react";

const CategoryManager: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(['Electronics']);

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const categories = [
    { 
      name: 'Electronics', 
      icon: <Folder className="text-violet-600" size={18} />,
      sub: ['Mobile Phones', 'Audio & Headphones', 'Smartwatches'] 
    },
    { name: 'Fashion & Apparel', icon: <Folder className="text-pink-600" size={18} /> },
    { name: 'Home & Kitchen', icon: <Folder className="text-orange-600" size={18} /> },
    { name: 'Beauty & Health', icon: <Folder className="text-emerald-600" size={18} /> },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Category Manager</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Organize your store hierarchy and logical collections.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
          <Plus size={18} />
          NEW CATEGORY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Tree View */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Hierarchy</h3>
              <button className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-lg">
                <FolderPlus size={18} />
              </button>
            </div>

            <div className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <button 
                    onClick={() => toggleCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                      openCategories.includes(cat.name) 
                        ? 'bg-violet-50 text-violet-700 border border-violet-100/50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {cat.icon}
                      <span className="text-xs font-black tracking-tight">{cat.name}</span>
                    </div>
                    {cat.sub && (
                      openCategories.includes(cat.name) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                  </button>

                  {cat.sub && openCategories.includes(cat.name) && (
                    <div className="ml-6 space-y-1 py-1 border-l-2 border-violet-100 pl-3">
                      {cat.sub.map((sub) => (
                        <button 
                          key={sub}
                          className="w-full text-left px-3 py-2 text-[11px] font-bold text-gray-500 hover:text-violet-600 hover:bg-violet-50/50 rounded-lg transition-all"
                        >
                          {sub}
                        </button>
                      ))}
                      <button className="w-full text-left px-3 py-2 text-[10px] font-black text-violet-600/50 hover:text-violet-600 transition-all flex items-center gap-1">
                        <Plus size={12} />
                        ADD SUB
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Modify Category</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Editing: Electronics</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
                  <Save size={16} />
                  SAVE CHANGES
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                <input 
                  type="text" 
                  defaultValue="Electronics"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug</label>
                <input 
                  type="text" 
                  defaultValue="electronics"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold font-mono text-gray-500"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Parent Category</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold appearance-none">
                  <option value="none">None (Top Level)</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion & Apparel</option>
                </select>
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium resize-none"
                  defaultValue="Latest electronic gadgets and accessories."
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category Icon</label>
                <div className="border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-xl p-6 text-center hover:border-violet-200 transition-all cursor-pointer">
                  <UploadCloud className="text-gray-400 mx-auto mb-2" size={24} />
                  <span className="text-[10px] font-black text-gray-400 uppercase">Upload Icon</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Header Banner</label>
                <div className="border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-xl p-6 text-center hover:border-violet-200 transition-all cursor-pointer">
                  <UploadCloud className="text-gray-400 mx-auto mb-2" size={24} />
                  <span className="text-[10px] font-black text-gray-400 uppercase">Upload Banner</span>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 pt-6 mt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="text-violet-600" size={18} />
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">SEO Configuration</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Title</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" defaultValue="Shop Electronics & Gadgets | OMNISTORE" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                    <textarea rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold resize-none" defaultValue="Discover the latest in tech. Shop our extensive collection of mobile phones, laptops, and audio gear."></textarea>
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 pt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
                  </div>
                  <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Active in Store</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
                  </div>
                  <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Show in Main Menu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
