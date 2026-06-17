import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, HelpCircle, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store/store";
import { logout } from "../state/store/features/authData";
import LoginModal from "../components/auth/LoginModal";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  
  const { isLoggedIn } = useSelector((state: RootState) => state.authData);
  const user = useSelector((state: RootState) => state.userData);
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: "Categories", path: "/layout/allproducts" },
    { label: "Offers", path: "/layout/offers" },
    { label: "FAQ", path: "/layout/faq" },
  ];

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/layout/profile");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/layout/home");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm px-6">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16">
        
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-10">
          <div 
            className="text-xl font-black text-gray-900 cursor-pointer tracking-tighter"
            onClick={() => navigate("/layout/home")}
          >
            OMNISTORE
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:text-violet-600 ${
                  location.pathname === link.path ? "text-violet-600 border-b-2 border-violet-600 pb-0.5" : "text-gray-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Search & Icons */}
        <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
          <div className="relative flex-1 hidden md:block max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 border-transparent rounded-full py-2.5 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => navigate("/layout/faq")}
              className="p-2.5 hover:bg-gray-50 rounded-full text-gray-500 transition-all group"
            >
              <HelpCircle size={20} className="group-hover:text-violet-600 transition-colors" />
            </button>
            <button 
              className="p-2.5 hover:bg-gray-50 rounded-full text-gray-500 transition-all group"
              onClick={handleUserClick}
            >
              <User size={20} className={`group-hover:text-violet-600 transition-colors ${isLoggedIn ? "text-violet-600" : ""}`} />
            </button>
            <button 
              className="p-2.5 hover:bg-gray-50 rounded-full text-gray-500 transition-all relative group"
              onClick={() => navigate("/layout/shoppingcart")}
            >
              <ShoppingCart size={20} className="group-hover:text-violet-600 transition-colors" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center bg-violet-600 text-white text-[9px] font-black h-4 w-4 rounded-full shadow-lg shadow-violet-600/30">
                  {totalCartItems}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden p-2.5 hover:bg-gray-50 rounded-full text-gray-500 transition-all"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 bg-white h-full shadow-2xl p-8 flex flex-col animate-entrance">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black tracking-tighter">OMNISTORE</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            {isLoggedIn && (
              <div className="mb-10 pb-10 border-b border-gray-50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-violet-600 bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm uppercase shadow-sm">
                    {(() => {
                      const name = user?.fullName || "Guest User";
                      const parts = name.trim().split(" ");
                      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
                      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                    })()}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Hello, {user?.fullName?.split(' ')[0]}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Premium Member</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { navigate("/layout/profile/overview"); setMobileMenuOpen(false); }} className="p-4 bg-gray-50 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-all">Profile</button>
                  <button onClick={() => { navigate("/layout/profile/orders"); setMobileMenuOpen(false); }} className="p-4 bg-gray-50 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-all">Orders</button>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                  className="text-left text-lg font-black uppercase tracking-widest text-gray-400 hover:text-violet-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {!isLoggedIn && (
                <button
                  onClick={() => { setIsLoginModalOpen(true); setMobileMenuOpen(false); }}
                  className="text-left text-lg font-black uppercase tracking-widest text-violet-600"
                >
                  Login / Join
                </button>
              )}
            </nav>

            {isLoggedIn && (
              <div className="mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  <span>Logout</span>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Popup */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
