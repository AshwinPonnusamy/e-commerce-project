import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { updateUser } from "../../state/store/features/userData";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../centralized/InputText";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  Settings as SettingsIcon,
  RefreshCw,
  Bell
} from "lucide-react";
import CustomButton from "../../components/commonComponents/button/CustomButton";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userData);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifyOrder: true,
      notifyPromo: false,
      notifySecurity: true,
      notifyRestock: true
    }
  });

  const onSubmit = (data: any) => {
    // If any password field is filled, validate password updates
    if (data.currentPassword || data.newPassword || data.confirmPassword) {
      if (user.password && data.currentPassword !== user.password) {
        setStatusMessage({ type: "error", text: "Current password is incorrect." });
        return;
      }
      if (!data.newPassword || !data.confirmPassword) {
        setStatusMessage({ type: "error", text: "Please fill in all password fields." });
        return;
      }
      if (data.newPassword !== data.confirmPassword) {
        setStatusMessage({ type: "error", text: "New passwords do not match." });
        return;
      }
      if (data.newPassword.length < 6) {
        setStatusMessage({ type: "error", text: "New password must be at least 6 characters long." });
        return;
      }
    }

    // Dispatch details to Redux
    dispatch(updateUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.newPassword || user.password
    }));

    setStatusMessage({ type: "success", text: "Profile preferences saved successfully!" });

    // Clear password forms
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmPassword", "");

    // Dismiss message after 4 seconds
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const handleReset = () => {
    reset({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifyOrder: true,
      notifyPromo: false,
      notifySecurity: true,
      notifyRestock: true
    });
    setStatusMessage({ type: "success", text: "Preferences reset to default values." });
    setTimeout(() => setStatusMessage(null), 2000);
  };

  return (
    <div className="space-y-8 animate-entrance max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
          <SettingsIcon className="text-violet-600 animate-spin-slow" size={24} />
          Profile Settings
        </h1>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
          Customize Your Account Details, Security & Alerts
        </p>
      </div>

      {/* Banner message alert */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          statusMessage.type === "success" 
            ? "bg-green-50 border-green-100 text-green-700" 
            : "bg-red-50 border-red-100 text-red-700"
        }`}>
          {statusMessage.type === "success" ? (
            <CheckCircle size={20} className="flex-shrink-0" />
          ) : (
            <AlertTriangle size={20} className="flex-shrink-0" />
          )}
          <p className="text-xs font-bold uppercase tracking-wide">{statusMessage.text}</p>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Details Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <User className="text-violet-600" size={18} />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <InputText
                fullWidth
                label="Full Name"
                name="fullName"
                placeholder="Enter your name"
                control={control}
                required={true}
                startAdornment={<User size={16} />}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputText
                fullWidth
                label="Email Address"
                name="email"
                placeholder="name@example.com"
                control={control}
                required={true}
                pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                startAdornment={<Mail size={16} />}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputText
                fullWidth
                label="Phone Number"
                name="phone"
                placeholder="Enter 10-digit number"
                control={control}
                pattern={/^[0-9]{10}$/}
                startAdornment={<Phone size={16} />}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Notification Settings Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Bell className="text-violet-600" size={18} />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">
              Notification Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Toggle 1: Orders */}
            <Controller
              name="notifyOrder"
              control={control}
              render={({ field }) => (
                <label className="relative flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-violet-100 hover:bg-violet-50/10 transition-all select-none">
                  <div className="flex flex-col pr-10">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Order Status updates</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Alert me when my package changes status</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                  </div>
                </label>
              )}
            />

            {/* Toggle 2: Promos */}
            <Controller
              name="notifyPromo"
              control={control}
              render={({ field }) => (
                <label className="relative flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-violet-100 hover:bg-violet-50/10 transition-all select-none">
                  <div className="flex flex-col pr-10">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Offers & Campaigns</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Receive newsletters, sales and coupons</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                  </div>
                </label>
              )}
            />

            {/* Toggle 3: Security */}
            <Controller
              name="notifySecurity"
              control={control}
              render={({ field }) => (
                <label className="relative flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-violet-100 hover:bg-violet-50/10 transition-all select-none">
                  <div className="flex flex-col pr-10">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Security Alerts</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Notify me of login attempts or password changes</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                  </div>
                </label>
              )}
            />

            {/* Toggle 4: Restocks */}
            <Controller
              name="notifyRestock"
              control={control}
              render={({ field }) => (
                <label className="relative flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-violet-100 hover:bg-violet-50/10 transition-all select-none">
                  <div className="flex flex-col pr-10">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Back in Stock</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Email me when favorited items are restocked</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                  </div>
                </label>
              )}
            />

          </div>
        </div>

        {/* Change Password Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Lock className="text-violet-600" size={18} />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">
              Password & Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <InputText
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                placeholder="••••••••"
                control={control}
                startAdornment={<Lock size={16} />}
              />
            </div>
            <div>
              <InputText
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                placeholder="••••••••"
                control={control}
                startAdornment={<Lock size={16} />}
              />
            </div>
            <div>
              <InputText
                fullWidth
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                placeholder="••••••••"
                control={control}
                startAdornment={<Lock size={16} />}
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <CustomButton
            label="Save Changes"
            type="submit"
            className="px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl shadow-lg shadow-violet-600/20 transition-all cursor-pointer"
          />
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <RefreshCw size={14} />
            Reset Fields
          </button>
        </div>

      </form>
    </div>
  );
};

export default Settings;
