import React, { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Package, 
  FileText, 
  Ticket, 
  Megaphone, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Eye,
  Bell
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store/store";
import { logout } from "../../../state/store/features/authData";
import CustomIconButton from "../../../components/commonComponents/button/CustomIconButton";

const drawerWidth = 260;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.userData);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "New Order #1234", time: "2 mins ago", type: "order", read: false },
    { id: 2, title: "Low Stock: Premium Watch", time: "1 hour ago", type: "stock", read: false },
    { id: 3, title: "New User Registered", time: "3 hours ago", type: "user", read: true },
  ];

  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { text: "Products", icon: <ShoppingBag size={20} />, path: "/admin/products" },
    { text: "Categories", icon: <Layers size={20} />, path: "/admin/categories" },
    { text: "Inventory", icon: <Package size={20} />, path: "/admin/inventory" },
    { text: "Orders", icon: <FileText size={20} />, path: "/admin/orders" },
    { text: "Coupons & Offers", icon: <Ticket size={20} />, path: "/admin/coupons" },
    { text: "Campaigns", icon: <Megaphone size={20} />, path: "/admin/campaigns" },
    { text: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
    { text: "Reports", icon: <BarChart3 size={20} />, path: "/admin/reports" },
    { text: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-black text-[#7c3aed] tracking-tight">
          OMNISTORE
        </h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
          Admin Management
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                  : 'text-gray-500 hover:bg-violet-50 hover:text-violet-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-violet-600'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-black tracking-tight">{item.text}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-white/70" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <img 
            src={userData?.profileUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"} 
            alt="Profile" 
            className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-gray-900 truncate">
              {userData?.fullName || "Alex Rivers"}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
              {userData?.role || "Super Admin"}
            </p>
          </div>
          <CustomIconButton
            icon={<LogOut size={18} />}
            iconColor="default"
            tooltip="SECURE LOGOUT"
            onClick={handleLogout}
            className="!bg-transparent !shadow-none !border-none hover:!bg-red-50 hover:!text-red-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar Desktop */}
      <aside 
        className="fixed inset-y-0 left-0 z-50 hidden md:block border-r border-gray-200 bg-white"
        style={{ width: drawerWidth }}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={handleDrawerToggle}
        ></div>
      )}

      {/* Sidebar Mobile */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-4 right-4 md:hidden">
          <button onClick={handleDrawerToggle} className="p-2 text-gray-400 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px] transition-all">
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-6 md:px-10 transition-all">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleDrawerToggle}
              className="p-2.5 text-gray-500 hover:text-gray-900 md:hidden bg-gray-50 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              {menuItems.find((m) => m.path === location.pathname)?.text || "Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/layout/home")}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-lg shadow-gray-900/10"
            >
              <Eye size={16} />
              View Store
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-xl transition-all group ${
                  showNotifications ? 'bg-violet-600 text-white' : 'bg-gray-50 text-gray-500 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                <Bell size={20} />
                <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-white ${
                  notifications.some(n => !n.read) ? 'bg-red-500' : 'bg-transparent'
                }`} />
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-entrance">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                      <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Notifications</span>
                      <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-[9px] font-black rounded-full">3 NEW</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer group">
                          <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              n.type === 'order' ? 'bg-emerald-50 text-emerald-600' : 
                              n.type === 'stock' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {n.type === 'order' ? <ShoppingBag size={18} /> : 
                               n.type === 'stock' ? <Package size={18} /> : <Users size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[11px] font-bold text-gray-900 mb-1 ${!n.read ? 'font-black' : 'font-medium opacity-60'}`}>
                                {n.title}
                              </p>
                              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{n.time}</span>
                            </div>
                            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-violet-600 self-center" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-violet-600 hover:bg-violet-50 transition-all">
                      View All Activity
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-black text-gray-900">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
              <span className="text-[11px] font-black text-violet-600 uppercase tracking-widest">Active System Instance</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
