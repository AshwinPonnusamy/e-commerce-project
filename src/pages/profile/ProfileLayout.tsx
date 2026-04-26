import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Package, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { logout } from "../../state/store/features/authData";

const ProfileLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userData);

  const menuItems = [
    { label: "My Orders", path: "/layout/profile/orders", icon: <Package size={18} /> },
    { label: "Saved Addresses", path: "/layout/profile/addresses", icon: <MapPin size={18} /> },
    { label: "Settings", path: "/layout/profile/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/layout/home");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 md:py-10 px-4">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Sidebar / Mobile Nav */}
        <aside className="lg:col-span-3 space-y-6 md:space-y-8">
          {/* User Info Card - Hidden on very small mobile if needed, but keeping for now */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
            
            <div className="relative z-10 flex flex-row lg:flex-col items-center gap-3 lg:gap-0 lg:text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-violet-50 p-0.5">
                <img 
                  src={user?.profileUrl || "https://i.pravatar.cc/150?u=user"} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="lg:mt-3">
                <h2 className="text-xs lg:text-sm font-black text-gray-900 tracking-tight uppercase">
                  {user?.fullName || "Guest User"}
                </h2>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Premium Member
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block mt-8 space-y-1.5">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                      isActive 
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${isActive ? "text-white" : "text-violet-600 group-hover:text-violet-600"}`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group"
                >
                  <LogOut size={18} />
                  <span className="text-xs font-black uppercase tracking-tight">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="lg:hidden flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                    isActive 
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" 
                      : "bg-white text-gray-500 border border-gray-100"
                  }`}
                >
                  <div className={isActive ? "text-white" : "text-violet-600"}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{item.label.split(' ')[1] || item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Help Banner - Hidden on mobile to save space */}
          <div className="hidden lg:block bg-[#1A1A2E] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h4 className="text-sm font-black uppercase tracking-tight mb-2">Need Help?</h4>
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-6">
              Our support team is available 24/7 for our premium members.
            </p>
            <button 
              onClick={() => navigate("/layout/faq")}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Go to Support
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
