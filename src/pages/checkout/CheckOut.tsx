import { useState } from 'react';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentsPage';
import ShippingDetails from './ShippingDetails';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/commonComponents/button/CustomButton';

const steps = ['Shipping', 'Order Summary', 'Payment'];

const CheckOut = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalOriginalPrice = cartItems.reduce(
        (sum, item) => {
            const originalPrice = item.price / (1 - (item.discountPercentage / 100));
            return sum + originalPrice * item.quantity;
        },
        0
    );
    const totalDiscount = totalOriginalPrice - subtotal;
    const deliveryCharges = subtotal > 500 ? 0 : 50;
    const handlingFee = paymentMethod === 'cod' ? 17 : 0;
    const totalAmount = subtotal + deliveryCharges + handlingFee;

    const handleCardPayment = async (totalAmount?: number) => {
        if (!totalAmount) {
            alert("Invalid payment amount.");
            return;
        }
        setIsProcessing(true);
        setProcessingMessage("Initiating secure payment connection...");
        const amountInPaise = Math.round(totalAmount * 100);
        const itemNames = cartItems.map(item => item.title).join(", ");
        try {
            const response = await axios.post('http://localhost:4242/create-checkout-session', {
                amount: amountInPaise,
                itemName: itemNames.substring(0, 100) // Truncate if too long
            });

            if (response.data?.url) {
                setProcessingMessage("Redirecting to payment gateway...");
                await new Promise(resolve => setTimeout(resolve, 800));
                window.location.href = response.data.url;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.warn("Payment server offline, falling back to simulated payment flow:", error);
            setProcessingMessage("Local payment server offline. Activating secure simulation...");
            await new Promise(resolve => setTimeout(resolve, 1500));
            setProcessingMessage("Simulating transaction success...");
            await new Promise(resolve => setTimeout(resolve, 1200));
            setIsProcessing(false);
            navigate("/layout/checkout/payment-status/success");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-gray-50 min-h-screen">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">Checkout Process</h1>
                            <p className="text-sm text-gray-500 font-medium mt-1">Review your order and secure your shipment.</p>
                        </div>
                    </div>
                </div>

                {/* Stepper Wrapper */}
                <div className="mb-12 mt-8">
                    <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                        {/* Progress Bar Background */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                        {/* Active Progress Bar */}
                        <div 
                            className="absolute top-1/2 left-0 h-1 bg-violet-600 -translate-y-1/2 z-0 transition-all duration-500"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((label, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center">
                                <div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4 ${
                                        activeStep >= index 
                                        ? 'bg-violet-600 border-white text-white shadow-lg' 
                                        : 'bg-white border-gray-200 text-gray-400'
                                    }`}
                                >
                                    {activeStep > index ? <Check size={20} /> : index + 1}
                                </div>
                                <span className={`absolute top-12 text-xs font-black uppercase tracking-wider whitespace-nowrap ${
                                    activeStep >= index ? 'text-violet-600' : 'text-gray-400'
                                }`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
                {/* Main Content Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                        {activeStep === 0 && <ShippingDetails />}
                        {activeStep === 1 && <OrderSummary />}
                        {activeStep === 2 && (
                            <PaymentOptions
                                setPaymentMethod={setPaymentMethod}
                                paymentMethod={paymentMethod}
                                totalAmount={totalAmount}
                            />
                        )}

                        {/* Navigation Buttons (Desktop Internal) */}
                        <div className="mt-12 flex justify-between pt-8 border-t border-gray-50">
                            <button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                className="flex items-center gap-2 text-sm font-black text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ArrowLeft size={18} />
                                BACK
                            </button>
                            
                            {activeStep < steps.length - 1 && (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-black rounded-lg hover:bg-black transition-all shadow-md active:scale-95"
                                >
                                    NEXT STEP
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Price Details Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100">
                        <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">
                            Price Details
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-gray-600 font-medium">
                                <span className="text-sm">M.R.P ({cartItems.length} items)</span>
                                <span className="text-sm line-through">₹{totalOriginalPrice.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center text-green-600 font-bold">
                                <span className="text-sm">Product Discount</span>
                                <span className="text-sm font-black">-₹{totalDiscount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-600 font-medium">
                                <span className="text-sm">Delivery Charges</span>
                                <span className={`text-sm font-bold ${deliveryCharges === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                                </span>
                            </div>

                            {paymentMethod === 'cod' && (
                                <div className="flex justify-between items-center text-gray-600 font-medium">
                                    <span className="text-sm">Payment Handling Fee</span>
                                    <span className="text-sm font-bold text-gray-900">₹17</span>
                                </div>
                            )}

                            <hr className="border-gray-100 my-4" />

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-gray-900">Total Amount</span>
                                <span className="text-xl font-black text-[#7c3aed]">₹{totalAmount?.toFixed(2)}</span>
                            </div>

                            <div className="pt-6">
                                {activeStep === 2 ? (
                                    <CustomButton
                                        label={paymentMethod === "cod" ? 'Place Order' : `Pay ₹${totalAmount?.toFixed(2)}`}
                                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl shadow-lg shadow-orange-500/20 transition-all disabled:bg-gray-300 disabled:shadow-none"
                                        disabled={!paymentMethod}
                                        onClick={async () => {
                                            if (paymentMethod === "cod") {
                                                setIsProcessing(true);
                                                setProcessingMessage("Placing your order...");
                                                await new Promise(resolve => setTimeout(resolve, 1500));
                                                setIsProcessing(false);
                                                navigate("/layout/checkout/payment-status/success");
                                            } else {
                                                handleCardPayment(totalAmount);
                                            }
                                        }}
                                    />
                                ) : (
                                    <CustomButton
                                        label="Proceed to Next Step"
                                        className="w-full py-4 bg-[#7c3aed] hover:bg-violet-700 text-white font-black rounded-xl shadow-lg shadow-violet-500/20 transition-all block md:hidden"
                                        onClick={handleNext}
                                    />
                                )}
                            </div>
                            
                            <p className="text-[10px] text-gray-400 mt-4 text-center font-medium">
                                Safe and Secure Payments. 100% Authentic products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {isProcessing && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center gap-6 shadow-2xl animate-in zoom-in-95 max-w-sm mx-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-violet-100" />
                            <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-2">Secure Gateway</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider animate-pulse">{processingMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckOut;
