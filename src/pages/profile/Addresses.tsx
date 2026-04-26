import React from "react";
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Globe } from "lucide-react";

const Addresses: React.FC = () => {
  const addresses = [
    {
      id: 1,
      type: "Home",
      icon: <Home size={18} />,
      name: "Alex Rivers",
      address: "24th Street, Premium Residency, Block C, Apt 402",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 9876543210",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      icon: <Briefcase size={18} />,
      name: "Alex Rivers",
      address: "LuxeGlobal Tech Park, 7th Floor, Innovation Wing",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560103",
      phone: "+91 9876543210",
      isDefault: false
    }
  ];

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Saved Addresses</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Manage Delivery Locations</p>
        </div>
        <button className="flex bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-600/20 group">
          Add New
        </button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={`bg-white rounded-2xl p-6 border-2 transition-all relative overflow-hidden group ${
              addr.isDefault ? "border-violet-600 shadow-xl shadow-violet-600/5" : "border-gray-100 hover:border-violet-200"
            }`}
          >
            {addr.isDefault && (
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                Default
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                addr.isDefault ? "bg-violet-600 text-white" : "bg-gray-50 text-violet-600"
              }`}>
                {addr.icon}
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{addr.type}</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Primary Contact: {addr.name}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-xs font-medium text-gray-600 leading-relaxed max-w-[200px]">
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 uppercase tracking-tighter">
                <Globe size={14} className="text-violet-600" />
                {addr.phone}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-violet-50 text-gray-600 hover:text-violet-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                <Edit2 size={12} /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
