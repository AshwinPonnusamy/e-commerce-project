import { useDispatch } from "react-redux";
import { loginUser } from "../../state/action/users";
import { AppDispatch } from "../../state/store/store";
import { ArrowRight, ChevronDown, Percent, Star, Truck, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      // Using mock credentials for instant success
      await dispatch(loginUser("user@example.com", "password123"));
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[900px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Left Column: Purple Gradient Info */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-[#2D0C54] via-[#48108C] to-[#2D0C54] p-10 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter mb-1">OMNISTORE</h2>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-16">Powered by LuxeGlobal</p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black leading-[1.1] max-w-[200px]">Redefine Your Beauty Standards</h3>
              <div className="w-20 h-1 bg-[#00FF9D] rounded-full" />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-20">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Percent size={14} className="text-[#00FF9D]" />
              </div>
              <span className="text-[8px] font-black uppercase leading-tight tracking-tighter">Save 20% First Order</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Truck size={14} className="text-[#00FF9D]" />
              </div>
              <span className="text-[8px] font-black uppercase leading-tight tracking-tighter">Express Delivery</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Star size={14} className="text-[#00FF9D]" />
              </div>
              <span className="text-[8px] font-black uppercase leading-tight tracking-tighter">Curated For You</span>
            </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="flex-1 p-10 md:p-14 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
          >
            <X size={20} />
          </button>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-xl font-black text-gray-900 mb-1">Welcome to OMNISTORE</h1>
              <p className="text-xs font-medium text-gray-400">Enter your mobile number to get started</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-100 transition-all">
                    <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 rounded-[2px]" />
                    <span className="text-xs font-bold text-gray-900">+91</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                    <input 
                      type="tel" 
                      defaultValue="9876543210"
                      placeholder="98765 43210" 
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-xs font-bold tracking-widest outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                    />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-200 text-violet-600 focus:ring-violet-500" />
                <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-600 leading-relaxed transition-colors">
                  Notify me about exclusive offers, new drops, and member-only events.
                </span>
              </label>

              <button 
                onClick={handleLogin}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Continue
                <ArrowRight size={16} />
              </button>

              <button className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
                Trouble logging in?
              </button>
            </div>
          </div>

          <p className="mt-12 text-[9px] text-gray-400 text-center leading-relaxed max-w-[280px] mx-auto">
            By continuing, you agree to our <span className="text-gray-900 font-bold underline cursor-pointer">Privacy Policy</span> and <span className="text-gray-900 font-bold underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
