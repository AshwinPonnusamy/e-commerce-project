import React from "react";
import { 
  Save, 
  Store, 
  CreditCard, 
  Truck, 
  Bell, 
  ShieldCheck,
  Search
} from "lucide-react";

const StoreSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">System Settings</h1>
          <p className="text-sm text-gray-500 font-medium mt-2">Configure global store parameters, payments and fulfillment rules.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-[#7c3aed] text-white text-sm font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
          <Save size={18} />
          SAVE CONFIGURATION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* General Info */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
              <Store className="text-violet-600" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Business Profile</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Legal Store Name</label>
                <input type="text" defaultValue="OMNISTORE" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Support Email Alias</label>
                <input type="email" defaultValue="support@omnistore.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Physical Headquarters Address</label>
                <textarea rows={2} defaultValue="123 Retail Ave, Tech Park, Bengaluru, KA 560100" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold resize-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">GST / Tax Identification Number</label>
                <input type="text" defaultValue="29AAAAA0000A1Z5" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold font-mono focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* Shipping Rules */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
              <Truck className="text-violet-600" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Fulfillment Logic</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Default Shipping Rate (Flat)</label>
                <input type="text" defaultValue="₹150.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Free Shipping Threshold</label>
                <input type="text" defaultValue="₹1,000.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Serviceable Pincodes (Wildcard supported)</label>
                <input type="text" placeholder="e.g. 560*, 600001, 11001*" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* Payments */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
              <CreditCard className="text-violet-600" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Financial Gateways</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                    <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Razorpay Integration</span>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Primary Payment Processor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded-lg border border-green-200">
                  <ShieldCheck size={12} />
                  Connected
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Razorpay Key ID</label>
                  <input type="password" defaultValue="rzp_test_1234567890" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-mono focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Razorpay Key Secret</label>
                  <input type="password" defaultValue="••••••••••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-mono focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Notifications */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
              <Bell className="text-violet-600" size={18} />
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Communications</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Order Confirmation', desc: 'Email via SendGrid', active: true },
                { label: 'WhatsApp Alerts', desc: 'Real-time via Twilio', active: true },
                { label: 'SMS Notifications', desc: 'Delivery updates', active: false },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between group">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{notif.label}</span>
                    <span className="text-[10px] font-bold text-gray-400">{notif.desc}</span>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notif.active ? 'bg-violet-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${notif.active ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-50 space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Messaging API Key</label>
                <input type="password" placeholder="Key required for WhatsApp" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* SEO Defaults */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
              <Search className="text-violet-600" size={18} />
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Meta Strategy</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Global Site Title</label>
                <input type="text" defaultValue="OMNISTORE - Experience Premium Excellence" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                <textarea rows={3} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold resize-none" />
              </div>
              <button className="w-full py-2 bg-gray-900 text-white text-[10px] font-black rounded-xl hover:bg-black transition-all uppercase tracking-widest shadow-lg shadow-black/10">
                REGENERATE SITEMAP
              </button>
            </div>
          </section>

          {/* System Security */}
          <section className="bg-violet-600 p-6 md:p-8 rounded-2xl shadow-xl shadow-violet-600/20 text-white">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={18} />
              <h3 className="text-sm font-black uppercase tracking-tight">Core Security</h3>
            </div>
            <p className="text-[10px] font-bold text-violet-100 mb-6 leading-relaxed uppercase tracking-widest">
              Last security audit performed on May 10, 2024. System is running in production mode.
            </p>
            <button className="w-full py-2 bg-white text-violet-600 text-[10px] font-black rounded-xl hover:bg-violet-50 transition-all uppercase tracking-widest">
              VIEW ACCESS LOGS
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
