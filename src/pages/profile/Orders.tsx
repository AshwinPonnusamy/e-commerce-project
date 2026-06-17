import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { Order } from "../../state/store/features/productData";
import { 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Package, 
  AlertCircle,
  Clock,
  ArrowRight,
  Receipt
} from "lucide-react";

const Orders: React.FC = () => {
  const orders = useSelector((state: RootState) => state.productData.orders || []);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<"details" | "track">("details");

  // Status mapping to steps
  const statusSteps = [
    { label: "Order Placed", desc: "Your order has been confirmed and registered." },
    { label: "Processing", desc: "Items are packed and undergoing quality check." },
    { label: "In Transit", desc: "Parcel is dispatched and on its way to your city." },
    { label: "Delivered", desc: "Package delivered safely." }
  ];

  const getStatusIndex = (status: string) => {
    if (status === "Cancelled") return -1;
    const mapping: Record<string, number> = {
      "Ordered": 0,
      "Processing": 1,
      "In Transit": 2,
      "Delivered": 3
    };
    return mapping[status] ?? 0;
  };

  const handleDownloadInvoice = (order: Order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to download the invoice.");
      return;
    }

    const subtotalNum = Number(order.subtotal) || 0;
    const discountNum = Number(order.discount) || 0;
    const deliveryNum = Number(order.deliveryCharges) || 0;
    const handlingNum = Number(order.handlingFee) || 0;
    const totalNum = Number(order.totalAmount) || 0;

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Outfit', 'sans-serif'],
                }
              }
            }
          }
        </script>
        <style>
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body class="bg-white p-8 font-sans text-gray-900">
        <div class="max-w-4xl mx-auto border border-gray-100 p-8 rounded-3xl shadow-sm">
          <!-- Header -->
          <div class="flex justify-between items-start border-b border-gray-100 pb-8">
            <div>
              <h1 class="text-3xl font-black tracking-tight text-violet-600 uppercase">STITCH</h1>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Premium E-Commerce Store</p>
              <p class="text-xs text-gray-500 mt-3">123 Fashion Street, Tech Park</p>
              <p class="text-xs text-gray-500">Bangalore, KA - 560001</p>
              <p class="text-xs text-gray-500">support@stitch.com</p>
            </div>
            <div class="text-right">
              <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight">INVOICE</h2>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Invoice ID</p>
              <p class="text-sm font-black text-violet-600 uppercase">${order.id}</p>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3">Date Placed</p>
              <p class="text-xs font-bold text-gray-600">${order.date}</p>
            </div>
          </div>

          <!-- Billing & Shipping / Payment Details -->
          <div class="grid grid-cols-2 gap-8 py-8 border-b border-gray-100">
            <div>
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Shipping Address</h3>
              <p class="text-sm font-black text-gray-900 uppercase">${order.shippingAddress.name}</p>
              <p class="text-xs text-gray-600 leading-relaxed mt-1">${order.shippingAddress.address}</p>
              <p class="text-xs text-gray-600">${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
              <p class="text-xs font-bold text-gray-900 mt-2">Phone: ${order.shippingAddress.number}</p>
            </div>
            <div>
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Info</h3>
              <p class="text-xs text-gray-600"><span class="font-bold text-gray-900">Payment Method:</span> ${order.paymentMethod}</p>
              <p class="text-xs text-gray-600 mt-1"><span class="font-bold text-gray-900">Payment Status:</span> ${order.paymentStatus}</p>
              ${order.shippingAddress.landmark ? `<p class="text-xs text-gray-600 mt-3"><span class="font-bold text-gray-900">Landmark:</span> ${order.shippingAddress.landmark}</p>` : ''}
            </div>
          </div>

          <!-- Items Table -->
          <div class="py-8">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Description</th>
                  <th class="py-3 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Price</th>
                  <th class="py-3 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</th>
                  <th class="py-3 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr class="border-b border-gray-100">
                    <td class="py-4">
                      <p class="text-sm font-black text-gray-900 uppercase tracking-tight">${item.name}</p>
                    </td>
                    <td class="py-4 text-right text-sm font-bold text-gray-600">
                      ₹${Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td class="py-4 text-center text-sm font-bold text-gray-600">
                      ${item.qty}
                    </td>
                    <td class="py-4 text-right text-sm font-black text-gray-900">
                      ₹${(Number(item.price) * item.qty).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Calculations -->
          <div class="grid grid-cols-12 gap-4 border-t border-gray-100 pt-8">
            <div class="col-span-7">
              <p class="text-xs text-gray-400 font-medium leading-relaxed">
                Thank you for shopping with STITCH! This is a computer generated invoice and does not require a signature.
              </p>
            </div>
            <div class="col-span-5 space-y-3">
              <div class="flex justify-between items-center text-xs font-bold text-gray-600">
                <span>Subtotal</span>
                <span>₹${subtotalNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              ${discountNum > 0 ? `
                <div class="flex justify-between items-center text-xs font-bold text-green-600">
                  <span>Product Discount</span>
                  <span>-₹${discountNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              ` : ''}
              <div class="flex justify-between items-center text-xs font-bold text-gray-600">
                <span>Delivery Charges</span>
                <span>${deliveryNum === 0 ? 'FREE' : `₹${deliveryNum}`}</span>
              </div>
              ${handlingNum > 0 ? `
                <div class="flex justify-between items-center text-xs font-bold text-gray-600">
                  <span>Handling Fee</span>
                  <span>₹${handlingNum}</span>
                </div>
              ` : ''}
              <hr class="border-gray-100" />
              <div class="flex justify-between items-center">
                <span class="text-sm font-black text-gray-900 uppercase">Grand Total</span>
                <span class="text-base font-black text-violet-600">₹${totalNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <!-- Print Button for Manual Triggers -->
          <div class="mt-12 text-center no-print">
            <button 
              onclick="window.print()" 
              class="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Print Invoice
            </button>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  };

  // RENDER DEDICATED ORDER DETAILS PAGE INSTEAD OF POPUP
  if (selectedOrder) {
    const subtotalNum = Number(selectedOrder.subtotal) || 0;
    const discountNum = Number(selectedOrder.discount) || 0;
    const deliveryNum = Number(selectedOrder.deliveryCharges) || 0;
    const handlingNum = Number(selectedOrder.handlingFee) || 0;
    const totalNum = Number(selectedOrder.totalAmount) || 0;

    return (
      <div className="space-y-8 animate-entrance">
        {/* Back navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-150 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm flex items-center justify-center cursor-pointer"
              title="Back to Orders"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest">
                {viewMode === "track" ? "Shipment Tracker" : "Order Invoice Details"}
              </span>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight mt-1 flex items-center gap-3">
                {selectedOrder.id}
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  selectedOrder.status === "Delivered" ? "bg-green-50 text-green-600" :
                  selectedOrder.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                }`}>
                  {selectedOrder.status}
                </span>
              </h1>
            </div>
          </div>
          
          {/* Quick Page Toggle Action Header */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {viewMode === "track" ? (
              <button 
                onClick={() => setViewMode("details")}
                className="flex-1 sm:flex-initial px-5 py-3 bg-white border border-gray-250 hover:bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Receipt size={14} className="text-violet-600" />
                View Receipt Details
              </button>
            ) : (
              selectedOrder.status !== "Cancelled" && (
                <button 
                  onClick={() => setViewMode("track")}
                  className="flex-1 sm:flex-initial px-5 py-3 bg-white border border-gray-250 hover:bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Truck size={14} className="text-violet-600" />
                  Track Shipment
                </button>
              )
            )}
            
            {selectedOrder.status === "Delivered" && (
              <button 
                onClick={() => handleDownloadInvoice(selectedOrder)}
                className="flex-1 sm:flex-initial px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/15 cursor-pointer"
              >
                <FileText size={14} />
                Download Invoice
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN PANEL (8-Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {viewMode === "track" ? (
              /* LIVE TRACKING MILESTONES */
              <div className="space-y-6">
                {selectedOrder.status === "Cancelled" ? (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4 text-red-600">
                    <AlertCircle size={24} className="flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider">Shipment Cancelled</h4>
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-0.5">
                        Tracking has stopped because this transaction was cancelled.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Delivery Route graphic card */}
                    <div className="p-8 bg-[#1A1A2E] text-white rounded-3xl relative overflow-hidden shadow-md">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                      <div className="relative z-10 flex justify-between items-center gap-6">
                        <div>
                          <span className="text-[8px] font-black text-violet-400 uppercase tracking-widest">Courier Route</span>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm font-black uppercase">STITCH Warehouse</span>
                            <ArrowRight size={14} className="text-violet-400" />
                            <span className="text-sm font-black uppercase">{selectedOrder.shippingAddress.city}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-black text-violet-400 uppercase tracking-widest">Courier Status</span>
                          <p className="text-sm font-black uppercase mt-2 flex items-center justify-end gap-1.5 text-violet-400">
                            <Truck size={14} />
                            {selectedOrder.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline logs */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 space-y-6 shadow-sm">
                      <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} className="text-violet-600" />
                        Milestone Updates
                      </h4>
                      
                      {/* Timeline List */}
                      <div className="relative pl-6 border-l-2 border-gray-150 ml-3 space-y-8 py-2">
                        {statusSteps.map((step, idx) => {
                          const currentStatusIdx = getStatusIndex(selectedOrder.status);
                          const isCompleted = idx <= currentStatusIdx;
                          const isActive = idx === currentStatusIdx;
                          
                          let timestamp = "";
                          if (isCompleted) {
                            if (idx === 0) timestamp = `${selectedOrder.date} - 10:30 AM`;
                            if (idx === 1) timestamp = `${selectedOrder.date} - 02:45 PM`;
                            if (idx === 2) timestamp = `Next Day - 09:15 AM`;
                            if (idx === 3) timestamp = `Next Day - 04:30 PM`;
                          }

                          return (
                            <div key={idx} className="relative">
                              {/* Circle Dot */}
                              <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                                isCompleted 
                                  ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-500/20 text-white" 
                                  : "bg-white border-gray-200"
                              }`}>
                                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                              
                              {/* Label & Details */}
                              <div>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h5 className={`text-xs font-black uppercase tracking-wider ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.label}
                                    {isActive && (
                                      <span className="ml-2 text-[8px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full tracking-widest uppercase">
                                        Current Location
                                      </span>
                                    )}
                                  </h5>
                                  {timestamp && (
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                                      {timestamp}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1 leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ORDER PRODUCT LIST */
              <div className="space-y-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Package size={16} className="text-violet-600" />
                  Purchased Items ({selectedOrder.items.length})
                </h4>
                
                <div className="divide-y divide-gray-50 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-6 flex items-center justify-between gap-6 hover:bg-gray-50/50 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0 overflow-hidden">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-950 uppercase tracking-tight leading-snug">{item.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                            Qty: {item.qty} • Price: ₹{Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-gray-950">
                        ₹{(Number(item.price) * item.qty).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR PANEL (4-Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Shipping details */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                <MapPin size={14} className="text-violet-600" />
                Shipping Details
              </h4>
              <div>
                <p className="text-xs font-black text-gray-900 uppercase">{selectedOrder.shippingAddress.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-2">{selectedOrder.shippingAddress.address}</p>
                <p className="text-xs text-gray-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                <p className="text-[10px] font-bold text-gray-900 mt-3 uppercase tracking-tighter">Phone: {selectedOrder.shippingAddress.number}</p>
                {selectedOrder.shippingAddress.landmark && (
                  <p className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase tracking-tight">Landmark: {selectedOrder.shippingAddress.landmark}</p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                <CreditCard size={14} className="text-violet-600" />
                Payment Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-400 uppercase">Method</span>
                  <span className="font-black text-gray-900 uppercase">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-400 uppercase">Status</span>
                  <span className={`font-black uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-full ${
                    selectedOrder.paymentStatus === "Success" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  }`}>{selectedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-400 uppercase">Placed On</span>
                  <span className="font-bold text-gray-600 flex items-center gap-1">
                    <Calendar size={12} className="text-violet-600" />
                    {selectedOrder.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Bill calculations */}
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-150 pb-3">
                <Receipt size={14} className="text-violet-600" />
                Bill Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600 uppercase">
                  <span>Subtotal</span>
                  <span>₹{subtotalNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                {discountNum > 0 && (
                  <div className="flex justify-between items-center text-xs font-bold text-green-600 uppercase">
                    <span>Discount</span>
                    <span>-₹{discountNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs font-bold text-gray-600 uppercase">
                  <span>Delivery Fees</span>
                  <span>{deliveryNum === 0 ? "FREE" : `₹${deliveryNum}`}</span>
                </div>
                {handlingNum > 0 && (
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 uppercase">
                    <span>Handling Fee</span>
                    <span>₹${handlingNum}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-905 uppercase">Amount Paid</span>
                  <span className="text-base font-black text-violet-600">
                    ₹{totalNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">My Orders</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Track & Manage Purchases</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 mb-4">
            <Package size={28} />
          </div>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-2">No Orders Yet</h3>
          <p className="text-xs font-medium text-gray-400 max-w-xs leading-relaxed uppercase tracking-wider mb-6">
            You haven't placed any orders yet. Head back to the store to start shopping!
          </p>
        </div>
      ) : (
        /* Orders List */
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:border-violet-100 transition-all">
              {/* Order Meta */}
              <div className="p-6 bg-gray-50/50 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Placed</p>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-xs font-black text-violet-600 uppercase tracking-tight">{order.amount}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  order.status === "Delivered" ? "bg-green-50 text-green-600" : 
                  order.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                }`}>
                  {order.status === "Delivered" ? <CheckCircle2 size={12} /> : 
                   order.status === "Cancelled" ? <AlertCircle size={12} /> : <Truck size={12} />}
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-6">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 p-2 overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{item.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Qty: {item.qty} • ₹{Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        setViewMode("details");
                      }}
                      className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:bg-violet-600 hover:text-white transition-all group-hover:bg-violet-50 group-hover:text-violet-600 cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    setSelectedOrder(order);
                    setViewMode("track");
                  }}
                  className="px-8 py-3 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 cursor-pointer"
                >
                  Track Order
                </button>
                <button 
                  onClick={() => {
                    setSelectedOrder(order);
                    setViewMode("details");
                  }}
                  className="px-8 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Order Details
                </button>
                {order.status === "Delivered" && (
                  <button 
                    onClick={() => handleDownloadInvoice(order)}
                    className="px-8 py-3 bg-white border border-gray-100 text-violet-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-50 hover:border-violet-100 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={12} />
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
