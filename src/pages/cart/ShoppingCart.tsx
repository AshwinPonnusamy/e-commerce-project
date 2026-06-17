import React from "react";
import { clearCart } from "../../state/store/features/productData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { handleDecrease, handleIncrease, handleRemove, handleAddCart, handleProductCardClick } from "../../components/commonFunctions/CommonFunctions";
import Lottie from "lottie-react";
import EmptyCart from "../../assets/animation/EmptyCartAnimation.json";
import { Trash2, Plus, Minus, ShieldCheck, Truck, RefreshCcw, Gift, ArrowRight } from "lucide-react";
import ProductCard from "../../components/commonComponents/customCards/ProductCard";

const ShoppingCart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const productDetails = useSelector((state: RootState) => state.productData?.allProductList || []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const storeDiscount = cartItems.length > 0 ? 50.00 : 0;
    const estimatedTax = subtotal * 0.08;
    const total = subtotal - storeDiscount + estimatedTax;

    const handleBuy = () => {
        navigate("/layout/checkout");
    };

    const handleClearAll = () => {
        dispatch(clearCart());
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-[1440px] mx-auto px-6 py-24 text-center">
                <div className="flex justify-center mb-8">
                    <Lottie animationData={EmptyCart} loop style={{ width: 300, height: 300 }} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your Cart is Empty!</h2>
                <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest collections and find something you love.</p>
                <button
                    onClick={() => navigate('/layout/home')}
                    className="bg-violet-600 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/20 active:scale-95"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/30 min-h-screen pb-16">
            <div className="max-w-[1440px] mx-auto px-6 py-8">
                
                {/* Main Content Grid: Cart + Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
                    
                    {/* Left Column: Cart Items (8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                Your Shopping Cart <span className="text-gray-400">({cartItems.length} items)</span>
                            </h1>
                            <button
                                onClick={handleClearAll}
                                className="text-[10px] font-black text-violet-600 uppercase tracking-widest hover:text-violet-700 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md group"
                                >
                                    {/* Image */}
                                    <div className="w-28 h-28 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-0 border border-gray-50 group-hover:scale-102 transition-transform duration-500">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-xl mix-blend-multiply" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 flex flex-col h-full justify-between gap-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-0.5 group-hover:text-violet-600 transition-colors cursor-pointer" onClick={() => navigate(`/layout/productdetail/${item.id}`)}>
                                                    {item.title}
                                                </h3>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {item.category} • {item.brand}
                                                </p>
                                            </div>
                                            <span className="text-lg font-black text-gray-900 tracking-tighter">
                                                ₹{item.price.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-0.5">
                                                <button
                                                    onClick={() => handleDecrease(item.id, dispatch, cartItems)}
                                                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-7 text-center font-black text-[10px] text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrease(item.id, dispatch, cartItems)}
                                                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.id, dispatch)}
                                                className="flex items-center gap-2 text-[8px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-all p-2 rounded-xl hover:bg-red-50"
                                            >
                                                <Trash2 size={10} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary (4 Cols) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-2xl shadow-gray-200/50 space-y-6">
                            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                    <span>Store Discount</span>
                                    <span>-₹{storeDiscount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-black">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-900 font-black">₹{estimatedTax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">Total</span>
                                <span className="text-2xl font-black text-violet-600 tracking-tighter leading-none">₹{total.toFixed(2)}</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="flex-1 bg-gray-50 border-transparent rounded-2xl px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all outline-none"
                                    />
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">
                                        Apply
                                    </button>
                                </div>
                                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group">
                                    <input type="checkbox" className="w-4 h-4 rounded-lg accent-violet-600 cursor-pointer" />
                                    <div className="flex items-center gap-2">
                                        <Gift size={16} className="text-orange-500" />
                                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-tight group-hover:text-gray-900">Add premium gift wrap (+₹350)</span>
                                    </div>
                                </label>
                            </div>

                            <button
                                onClick={handleBuy}
                                className="w-full bg-[#8b4513] hover:bg-[#a0522d] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#8b4513]/20 flex items-center justify-center gap-3 group active:scale-[0.98]"
                            >
                                Proceed to Checkout
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Trust Badges */}
                            <div className="pt-6 border-t border-gray-100">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-6">Trusted Checkout</div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: ShieldCheck, label: "Secure" },
                                        { icon: Truck, label: "Fast Ship" },
                                        { icon: RefreshCcw, label: "30D Return" }
                                    ].map((badge) => (
                                        <div key={badge.label} className="flex flex-col items-center gap-1.5 group cursor-default">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition-all">
                                                <badge.icon size={18} />
                                            </div>
                                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendation Section - Full Width Bottom */}
                <div className="pt-16 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Recommended for you</h2>
                        <button 
                            onClick={() => navigate('/layout/allproducts')}
                            className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] hover:text-violet-700 transition-all border-b-2 border-violet-600/20 hover:border-violet-600 pb-1"
                        >
                            Explore More
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {productDetails.slice(10, 16).map((p) => (
                            <ProductCard
                                key={p.id}
                                productName={p.title}
                                productDescription={p.description}
                                productImage={p.images[0]}
                                productPrice={p.price}
                                productRating={p.rating}
                                onClick={() => handleProductCardClick(p, dispatch, navigate)}
                                isInCart={cartItems.some((item) => item.id === p.id)}
                                handleAddCart={() => dispatch(handleAddCart(p) as any)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
