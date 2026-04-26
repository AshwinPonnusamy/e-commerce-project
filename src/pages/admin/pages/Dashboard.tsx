import React from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 2000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 1890 },
  { name: "Sat", revenue: 2390 },
  { name: "Sun", revenue: 3490 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Fashion", value: 300 },
  { name: "Home", value: 300 },
  { name: "Beauty", value: 200 },
];

const COLORS = ["#7c3aed", "#10b981", "#f59e0b", "#7c3aed"];

const recentOrders = [
  { id: "#ORD-7721", customer: "Sarah Jenkins", product: "Pro Audio Headphones", amount: "$299.00", status: "Delivered" },
  { id: "#ORD-7722", customer: "Michael Chen", product: "Smartwatch v4", amount: "$159.00", status: "Processing" },
  { id: "#ORD-7723", customer: "Emma Wilson", product: "Studio Mic", amount: "$89.00", status: "Shipped" },
  { id: "#ORD-7724", customer: "James Bond", product: "Action Cam", amount: "$450.00", status: "Pending" },
];

const StatCard = ({ title, value, subtitle, icon, color, trend }: any) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-opacity-10 text-${color}-600`} style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black ${
          trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
      <p className="text-[10px] font-medium text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

const StitchDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-entrance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Executive Dashboard</h1>
          <p className="text-sm text-gray-500 font-medium mt-2">Welcome back, here's a summary of your store's performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-violet-600 rounded-xl text-xs font-black text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all">
            Manage Store
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Sales" value="₹2,45,080" subtitle="vs. ₹2,18,400 yesterday" icon={<TrendingUp size={20} />} color="#7c3aed" trend="+12.5%" />
        <StatCard title="Total Orders" value="452" subtitle="Avg. ₹5,420 per order" icon={<ShoppingBag size={20} />} color="#10b981" trend="+8.2%" />
        <StatCard title="Pending" value="18" subtitle="Requires immediate action" icon={<Clock size={20} />} color="#f59e0b" trend="-2.4%" />
        <StatCard title="New Customers" value="84" subtitle="Acquired in last 24h" icon={<Users size={20} />} color="#7c3aed" trend="+14.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Revenue Analytics</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daily gross revenue trends</p>
            </div>
            <div className="flex gap-2">
              {['7D', '1M', '3M', '1Y'].map((t) => (
                <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-black ${t === '7D' ? 'bg-violet-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 700, fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="lg:col-span-4 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Category Mix</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{item.name}</span>
                  <span className="text-sm font-black text-gray-900">{((item.value / 1200) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Recent Transactions</h3>
            <button className="p-2 text-gray-400 hover:text-gray-900"><MoreHorizontal size={20} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-violet-50/30 transition-colors group">
                    <td className="px-4 py-3 text-xs font-black text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-600">{order.customer}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-600">{order.product}</td>
                    <td className="px-4 py-3 text-xs font-black text-gray-900">{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        order.status === "Delivered" ? 'bg-green-100 text-green-700' :
                        order.status === "Processing" ? 'bg-violet-100 text-violet-700' :
                        order.status === "Shipped" ? 'bg-purple-100 text-purple-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-50 bg-gray-50/50 text-center">
            <button className="text-[10px] font-black text-violet-600 uppercase tracking-widest hover:underline">View All Transactions</button>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Stock Alerts</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: "Sonic Runners X2", sku: "RUN-992", stock: 2, status: "Critical" },
                { name: "Core Smartwatch v4", sku: "WTC-014", stock: 5, status: "Warning" },
                { name: "Studio Pro ANC", sku: "AUD-551", stock: 8, status: "Attention" },
              ].map((item) => (
                <div key={item.sku} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black text-gray-900">{item.name}</span>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                      item.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>{item.status}</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400">SKU: {item.sku}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-black text-red-600">{item.stock} Units Left</span>
                    <button className="text-[10px] font-black text-violet-600 hover:underline">Restock</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StitchDashboard;
