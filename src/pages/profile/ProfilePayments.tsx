import React, { useState } from "react";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Smartphone, 
  CheckCircle, 
  X, 
  Globe, 
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useForm } from "react-hook-form";
import InputText from "../../centralized/InputText";
import CustomButton from "../../components/commonComponents/button/CustomButton";

interface CardItem {
  id: string;
  type: "Visa" | "Mastercard";
  number: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
  bgGradient: string;
}

interface UpiItem {
  id: string;
  handle: string;
  bankName: string;
  isDefault: boolean;
}

const ProfilePayments: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: "card-1",
      type: "Visa",
      number: "•••• •••• •••• 4242",
      holder: "Alex Rivers",
      expiry: "12/28",
      isDefault: true,
      bgGradient: "from-violet-600 to-indigo-800"
    },
    {
      id: "card-2",
      type: "Mastercard",
      number: "•••• •••• •••• 9856",
      holder: "Alex Rivers",
      expiry: "08/27",
      isDefault: false,
      bgGradient: "from-orange-500 to-red-700"
    }
  ]);

  const [upiAccounts, setUpiAccounts] = useState<UpiItem[]>([
    {
      id: "upi-1",
      handle: "alexrivers@okaxis",
      bankName: "Axis Bank",
      isDefault: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addMethodType, setAddMethodType] = useState<"card" | "upi">("card");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      upiHandle: "",
      upiBank: ""
    }
  });

  const handleSetDefaultCard = (id: string) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    triggerNotification("Default card updated successfully!");
  };

  const handleSetDefaultUpi = (id: string) => {
    setUpiAccounts(prev => prev.map(u => ({ ...u, isDefault: u.id === id })));
    triggerNotification("Default UPI account updated successfully!");
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
    triggerNotification("Payment card removed.");
  };

  const handleDeleteUpi = (id: string) => {
    setUpiAccounts(prev => prev.filter(u => u.id !== id));
    triggerNotification("UPI handle removed.");
  };

  const triggerNotification = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleAddPayment = (data: any) => {
    if (addMethodType === "card") {
      if (!data.cardName || !data.cardNumber || !data.cardExpiry || !data.cardCvv) {
        triggerNotification("Please fill in all card details.", "error");
        return;
      }
      
      const rawNumber = data.cardNumber.replace(/\s+/g, '');
      if (rawNumber.length < 16) {
        triggerNotification("Card number must be 16 digits.", "error");
        return;
      }

      const cleanNum = `•••• •••• •••• ${rawNumber.substring(12, 16)}`;
      const isVisa = rawNumber.startsWith("4");
      
      const newCard: CardItem = {
        id: `card-${Date.now()}`,
        type: isVisa ? "Visa" : "Mastercard",
        number: cleanNum,
        holder: data.cardName,
        expiry: data.cardExpiry,
        isDefault: cards.length === 0,
        bgGradient: isVisa ? "from-violet-600 to-indigo-800" : "from-emerald-600 to-teal-800"
      };

      setCards(prev => [...prev, newCard]);
      triggerNotification("New credit/debit card added successfully!");
    } else {
      if (!data.upiHandle) {
        triggerNotification("Please enter a valid UPI address.", "error");
        return;
      }
      if (!data.upiHandle.includes("@")) {
        triggerNotification("Invalid UPI format. Must contain @ (e.g. user@bank).", "error");
        return;
      }

      const newUpi: UpiItem = {
        id: `upi-${Date.now()}`,
        handle: data.upiHandle,
        bankName: data.upiBank || "UPI Bank",
        isDefault: upiAccounts.length === 0
      };

      setUpiAccounts(prev => [...prev, newUpi]);
      triggerNotification("UPI payment method registered successfully!");
    }

    reset();
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Payment Methods</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Manage Your Cards & UPI Details</p>
        </div>
        <button 
          onClick={() => {
            reset();
            setShowAddForm(prev => !prev);
          }}
          className={`flex px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md items-center gap-2 cursor-pointer ${
            showAddForm 
              ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
              : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/10"
          }`}
        >
          {showAddForm ? (
            <>
              <ChevronUp size={14} />
              Close Form
            </>
          ) : (
            <>
              <Plus size={14} />
              Add Payment Option
            </>
          )}
        </button>
      </div>

      {/* Alert Notification banner */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          statusMessage.type === "success" 
            ? "bg-green-50 border-green-100 text-green-700" 
            : "bg-red-50 border-red-100 text-red-700"
        }`}>
          {statusMessage.type === "success" ? (
            <CheckCircle size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <p className="text-xs font-bold uppercase tracking-wide">{statusMessage.text}</p>
        </div>
      )}

      {/* COLLAPSIBLE INLINE ADD PAYMENT METHOD CARD FORM */}
      {showAddForm && (
        <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 shadow-sm space-y-6 animate-in slide-in-from-top-5 duration-300">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <div>
              <span className="text-[8px] font-black text-violet-600 uppercase tracking-widest">New Billing Option</span>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mt-0.5">Add Payment Method</h3>
            </div>
            <button 
              onClick={() => setShowAddForm(false)}
              className="p-2 bg-gray-50 text-gray-400 hover:text-gray-950 rounded-lg transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* Switch tabs (Card or UPI) */}
          <div className="flex gap-2 max-w-sm">
            <button
              onClick={() => setAddMethodType("card")}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                addMethodType === "card" 
                  ? "bg-violet-600 text-white shadow-sm" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              Debit/Credit Card
            </button>
            <button
              onClick={() => setAddMethodType("upi")}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                addMethodType === "upi" 
                  ? "bg-violet-600 text-white shadow-sm" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              UPI Handle
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {addMethodType === "card" ? (
              <>
                <div className="col-span-2 md:col-span-1">
                  <InputText
                    fullWidth
                    label="Cardholder Name"
                    name="cardName"
                    placeholder="E.g. Alex Rivers"
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <InputText
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    placeholder="1234 5678 1234 5678"
                    control={control}
                    maxLength={19}
                  />
                </div>
                <div>
                  <InputText
                    fullWidth
                    label="Expiry (MM/YY)"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    control={control}
                    maxLength={5}
                  />
                </div>
                <div>
                  <InputText
                    fullWidth
                    type="password"
                    label="CVV Code"
                    name="cardCvv"
                    placeholder="•••"
                    control={control}
                    maxLength={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2 md:col-span-1">
                  <InputText
                    fullWidth
                    label="UPI Handle Address"
                    name="upiHandle"
                    placeholder="username@bank"
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <InputText
                    fullWidth
                    label="Linked Bank (Optional)"
                    name="upiBank"
                    placeholder="E.g. HDFC Bank"
                    control={control}
                  />
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <CustomButton
              label="Save Payment Method"
              onClick={handleSubmit(handleAddPayment)}
              className="px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-violet-600/15 cursor-pointer"
            />
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Saved Cards Panel (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-50 pb-4">
              <CreditCard size={18} className="text-violet-600" />
              Saved Credit & Debit Cards
            </h2>

            {cards.length === 0 ? (
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider py-6">No saved cards. Add a card to experience faster checkout.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                  <div 
                    key={card.id} 
                    className={`rounded-2xl p-6 text-white bg-gradient-to-br ${card.bgGradient} relative overflow-hidden h-48 flex flex-col justify-between shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group`}
                  >
                    {/* Watermark Logo */}
                    <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/5 font-black text-9xl select-none uppercase tracking-tighter">
                      {card.type[0]}
                    </div>
                    
                    {/* Top Row: Type & Chip */}
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/70">Card Type</span>
                        <p className="text-sm font-black uppercase tracking-wider mt-0.5">{card.type}</p>
                      </div>
                      <div className="w-10 h-7 rounded bg-amber-400/80 border border-amber-300/40 opacity-70" />
                    </div>

                    {/* Masked card number */}
                    <p className="text-base font-black tracking-[0.15em] font-mono z-10 py-2">
                      {card.number}
                    </p>

                    {/* Bottom Row: Holder, Expiry & Quick actions */}
                    <div className="flex justify-between items-end z-10">
                      <div>
                        <span className="text-[7px] font-black uppercase tracking-widest text-white/60">Cardholder</span>
                        <p className="text-xs font-black uppercase tracking-wide mt-0.5 truncate max-w-[120px]">{card.holder}</p>
                      </div>
                      <div>
                        <span className="text-[7px] font-black uppercase tracking-widest text-white/60">Expires</span>
                        <p className="text-xs font-black uppercase tracking-wide mt-0.5">{card.expiry}</p>
                      </div>
                      
                      {/* Action buttons hover display overlay */}
                      <div className="flex gap-2 bg-black/20 backdrop-blur-md px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        {!card.isDefault && (
                          <button 
                            onClick={() => handleSetDefaultCard(card.id)}
                            className="p-1.5 text-white hover:text-green-400 transition-colors cursor-pointer"
                            title="Set Default"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-1.5 text-white hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove Card"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Default badge */}
                    {card.isDefault && (
                      <div className="absolute top-0 right-12 bg-white/20 backdrop-blur-md text-white text-[7px] font-black uppercase tracking-widest px-3 py-1 rounded-b-xl border-x border-b border-white/10">
                        Default
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Saved UPI Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-50 pb-4">
              <Smartphone size={18} className="text-violet-600" />
              UPI & Bank Accounts
            </h2>

            {upiAccounts.length === 0 ? (
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider py-4">No UPI addresses registered.</p>
            ) : (
              <div className="space-y-4">
                {upiAccounts.map((upi) => (
                  <div 
                    key={upi.id}
                    className={`p-4 rounded-2xl border-2 transition-all relative ${
                      upi.isDefault ? "border-violet-600 bg-violet-50/10" : "border-gray-50 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black text-gray-950 uppercase tracking-tight break-all">{upi.handle}</p>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mt-1">Linked Bank: {upi.bankName}</span>
                      </div>
                      
                      <div className="flex gap-1.5">
                        {!upi.isDefault && (
                          <button 
                            onClick={() => handleSetDefaultUpi(upi.id)}
                            className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                            title="Set Default UPI"
                          >
                            <CheckCircle size={12} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteUpi(upi.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Remove UPI"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {upi.isDefault && (
                      <span className="mt-2 inline-block text-[7px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        Default ID
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Security Notice Card */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="text-green-600 flex-shrink-0" size={18} />
              <div>
                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Secured Server</h4>
                <p className="text-[9px] text-gray-400 uppercase tracking-tight leading-relaxed mt-0.5">
                  STITCH complies with secure PCI-DSS standards. We never store CVVs or raw pins.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProfilePayments;
