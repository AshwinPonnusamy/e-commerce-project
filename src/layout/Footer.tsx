import { MapPin, Globe, Share2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
              OMNISTORE
            </div>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              Experience retail at its finest. From daily essentials to luxury splurges, we deliver quality to your doorstep with unmatched speed.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-violet-50 hover:text-violet-600 transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h6 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-8">Shop Categories</h6>
              <ul className="space-y-4">
                {["Household & Living", "Electronics & Gadgets", "Kitchen & Dining", "Seasonal Specials", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 font-medium hover:text-violet-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-8">Customer Support</h6>
              <ul className="space-y-4">
                {["Track Your Order", "Returns & Refunds", "Shipping Information", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 font-medium hover:text-violet-600 transition-colors">{item}</a>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigate("/layout/faq")} className="text-sm text-gray-400 font-medium hover:text-violet-600 transition-colors text-left">
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Location / Map */}
          <div className="lg:col-span-4 space-y-8">
            <h6 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-8">Our Location</h6>
            <div className="relative h-48 rounded-[32px] overflow-hidden bg-gray-100 group border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <MapPin size={20} className="text-violet-600" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <MapPin size={14} />
              7th Ave, New York, NY 10001
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <p>© {getCurrentYear()} OMNISTORE. Experience Premium Excellence.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
