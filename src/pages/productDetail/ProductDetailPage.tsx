import React from "react";
import { useNavigate } from "react-router-dom";
import ProductDescription from "../../components/commonComponents/customCards/ProductDescription";
import ProductDetailCard from "../../components/commonComponents/customCards/ProductDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import { handleAddCart, handleBuyNow, handleProductCardClick } from "../../components/commonFunctions/CommonFunctions";
import { ChevronRight, Star } from "lucide-react";
import ProductCard from "../../components/commonComponents/customCards/ProductCard";

const ProductDetailPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) => state.productData?.currentProduct)
    const state = useSelector((state: RootState) => state);
    const allProducts = useSelector((state: RootState) => state.productData?.allProductList || []);
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const [activeTab, setActiveTab] = React.useState("Description");

    const originalPrice = (product?.price || 0) / (1 - ((product?.discountPercentage || 0) / 100));

    if (!product) return null;

    const recommendations = allProducts
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 6);

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-violet-600 transition-colors">Home</span>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-violet-600 transition-colors">{product.category}</span>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest truncate">{product.title}</span>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                    {/* Left Column: Product Images */}
                    <div className="lg:col-span-6 xl:col-span-5">
                        <div className="sticky top-28">
                            <ProductDetailCard 
                                images={product?.images} 
                            />
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        <ProductDescription
                            productName={product?.title}
                            brand={product?.brand}
                            productDescription={product?.description}
                            price={product?.price}
                            stock={product?.stock}
                            rating={product?.rating}
                            discount={product?.discountPercentage}
                            originalPrice={originalPrice}
                            handleAddCart={() => dispatch(handleAddCart(product) as any)}
                            handleBuyNow={() => handleBuyNow(product, dispatch, () => state, navigate)}
                            isInCart={cartItems.some((item) => item.id === product.id)}
                        />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-24 border-t border-gray-100 pt-12">
                    <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                        {["Description", "Specifications", "Reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                                    activeTab === tab ? 'text-violet-600' : 'text-gray-400 hover:text-gray-900'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.3)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <div className="prose prose-slate max-w-none">
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6">Master the Art of Modern Living</h2>
                                <p className="text-gray-500 leading-relaxed font-medium mb-8">
                                    {product.description}
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Premium build quality for long-lasting performance.",
                                        "Innovative technology integrated for maximum efficiency.",
                                        "Elegant design that complements any modern space.",
                                        "Sustainably sourced materials and eco-friendly packaging."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Customer Ratings Card */}
                        <div className="lg:col-span-4">
                            <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">Customer Ratings</h3>
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="text-5xl font-black text-gray-900">{product.rating}</span>
                                    <div>
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={16} className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Rating</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-4 text-xs">
                                            <span className="w-2 font-black text-gray-900">{star}</span>
                                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)]" 
                                                    style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }} 
                                                />
                                            </div>
                                            <span className="w-8 text-right font-black text-gray-400">{star === 5 ? 85 : star === 4 ? 10 : 5}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">You May Also Like</h2>
                        <button className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] hover:text-violet-700 transition-all border-b-2 border-violet-600/20 hover:border-violet-600 pb-1">
                            View Collection
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {recommendations.map((p) => (
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

export default ProductDetailPage;
