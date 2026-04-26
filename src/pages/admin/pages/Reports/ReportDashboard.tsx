import React from "react";
import { 
  Download, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  ClipboardList,
  Calendar,
  PieChart,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const ReportCard = ({ title, desc, icon, color }: any) => (
  <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl hover:border-violet-100 transition-all duration-300">
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-300`} style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{title}</h3>
    </div>
    <p className="text-sm font-medium text-gray-500 mb-8 flex-1 leading-relaxed">
      {desc}
    </p>
    <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#7c3aed] text-white text-[10px] font-black rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/10 transition-all active:scale-95 uppercase tracking-widest">
        <Download size={16} />
        GENERATE CSV
      </button>
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 text-[10px] font-black rounded-xl hover:bg-gray-100 transition-all uppercase tracking-widest">
        PREVIEW DATA
      </button>
    </div>
  </div>
);

const ReportDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Analytical Reports</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Export comprehensive data for accounting, logistics and marketing audits.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-xl border border-violet-100">
          <Calendar size={16} className="text-violet-600" />
          <span className="text-[10px] font-black text-violet-700 uppercase tracking-widest">Last Sync: 2 Mins Ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReportCard 
          title="Revenue Analytics" 
          desc="Complete breakdown of gross revenue, deductions, net sales and average order value (AOV) across all channels." 
          icon={<TrendingUp size={24} />} 
          color="#7c3aed"
        />
        <ReportCard 
          title="Taxation (GST)" 
          desc="Detailed item-wise tax reports including CGST, SGST and IGST breakdowns for direct integration with Tally or GST portals." 
          icon={<ShieldCheck size={24} />} 
          color="#10b981"
        />
        <ReportCard 
          title="Product Audit" 
          desc="Performance metrics per SKU, including sales velocity, view-to-buy conversion rates and return/refund frequencies." 
          icon={<BarChart3 size={24} />} 
          color="#f59e0b"
        />
        <ReportCard 
          title="Stock Ledger" 
          desc="Historical inventory movements, valuation reports (FIFO), and wastage tracking for warehouse optimization." 
          icon={<ClipboardList size={24} />} 
          color="#7c3aed"
        />
        <ReportCard 
          title="Customer Insights" 
          desc="Demographic data, retention rates, and acquisition cost analysis (CAC) per marketing channel." 
          icon={<PieChart size={24} />} 
          color="#ec4899"
        />
        <ReportCard 
          title="Custom Log" 
          desc="Build your own custom data export by selecting specific fields, date ranges and filtering criteria." 
          icon={<FileText size={24} />} 
          color="#64748b"
        />
      </div>

      {/* Audit Banner */}
      <div className="mt-12 bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <BarChart3 size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight mb-4 uppercase italic">Yearly Financial Audit</h2>
          <p className="text-gray-400 font-medium mb-8 leading-relaxed">
            Generate a comprehensive 12-month consolidated financial report. This asset includes all transactions, refunds, chargebacks and tax liabilities for the 2023-24 fiscal year.
          </p>
          <button className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 text-xs font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-white/10 uppercase tracking-widest">
            DOWNLOAD AUDIT PACKAGE <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
