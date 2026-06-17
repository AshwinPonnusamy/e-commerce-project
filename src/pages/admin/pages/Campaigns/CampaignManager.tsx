import React, { useState } from "react";
import { 
  Plus, 
  Megaphone, 
  Calendar, 
  Edit3, 
  Trash2, 
  X, 
  UploadCloud, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react";

const mockCampaigns = [
  { id: 1, name: "Summer Sale 2024", type: "Hero Banner", status: "Active", impressions: 124500, clicks: 3420, ctr: 2.7, start: "2024-05-01", end: "2024-05-31" },
  { id: 2, name: "New iPhone 15 Launch", type: "Popup", status: "Scheduled", impressions: 0, clicks: 0, ctr: 0, start: "2024-09-01", end: "2024-09-30" },
  { id: 3, name: "Clearance Up To 70%", type: "Sidebar Ad", status: "Ended", impressions: 450000, clicks: 12500, ctr: 2.8, start: "2023-12-25", end: "2024-01-05" },
];

const CampaignManager: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("banner-upload")?.click();
  };

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Campaign Control</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage storefront banners, popups, and marketing assets.</p>
        </div>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setSelectedFile(null);
            setFilePreview(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg cursor-pointer ${
            showForm 
              ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' 
              : 'bg-[#7c3aed] text-white hover:bg-violet-700 shadow-violet-600/20'
          }`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'CANCEL' : 'LAUNCH CAMPAIGN'}
        </button>
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-violet-100 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
              <Megaphone size={20} />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Setup Promotion</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Campaign Title</label>
              <input type="text" placeholder="e.g. Diwali Mega Sale" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black focus:outline-none focus:border-violet-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Call to Action (Link)</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="https://omnistore.com/collection/sale" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 focus:outline-none focus:border-violet-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 focus:outline-none focus:border-violet-500" />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Banner Asset</label>
              <input 
                type="file" 
                id="banner-upload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange} 
              />
              <div 
                onClick={triggerFileInput}
                className="border-4 border-dashed border-gray-150 bg-gray-50/50 rounded-2xl p-8 text-center hover:border-violet-200 transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[160px] select-none"
              >
                {filePreview ? (
                  <div className="space-y-3 flex flex-col items-center">
                    <div className="w-32 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">{selectedFile?.name}</p>
                      <p className="text-[9px] text-violet-600 font-bold uppercase tracking-widest mt-1.5">Click to replace asset</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="text-gray-300 mx-auto mb-2 group-hover:text-violet-500 group-hover:scale-110 transition-all" size={32} />
                    <p className="text-xs font-black text-gray-900">Upload Creative Asset</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Recommended: 1920x600 (Hero) or 800x800 (Popup)</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-2 pt-6 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => {
                  alert("Campaign configured successfully!");
                  setShowForm(false);
                }}
                className="px-8 py-3 bg-[#7c3aed] hover:bg-violet-750 text-white text-xs font-black rounded-xl shadow-lg shadow-violet-600/20 transition-all active:scale-95 cursor-pointer"
              >
                LAUNCH CAMPAIGN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Campaign Creative</th>
                <th className="px-6 py-4">Analytics & CTR</th>
                <th className="px-6 py-4">Lifecycle Schedule</th>
                <th className="px-6 py-4">Deployment</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                        <ImageIcon size={20} className="text-gray-300" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{camp.name}</span>
                        <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest">{camp.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5 w-48">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <TrendingUp size={10} className="text-green-500" />
                          <span className="text-[10px] font-black text-gray-900 uppercase">CTR: {camp.ctr}%</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{camp.clicks.toLocaleString()} CLICKS</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-600 rounded-full"
                          style={{ width: `${Math.min(camp.ctr * 10, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{camp.impressions.toLocaleString()} TOTAL IMPRESSIONS</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Calendar size={12} className="text-gray-300" />
                      <span>{camp.start}</span>
                      <ChevronRight size={10} className="text-gray-300" />
                      <span>{camp.end}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      camp.status === "Active" ? 'bg-green-100 text-green-700' :
                      camp.status === "Scheduled" ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-lg">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignManager;
