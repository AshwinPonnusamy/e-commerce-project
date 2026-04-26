import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import { getAllProductList } from "../../state/action/product";
import { ChevronRight, ArrowRight, Truck, Mail, ChevronLeft, Plus, Timer, Flame } from "lucide-react";
import ProductCard from "../../components/commonComponents/customCards/ProductCard";
import { handleAddCart, handleProductCardClick } from "../../components/commonFunctions/CommonFunctions";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const productDetails = useSelector((state: RootState) => state.productData?.allProductList || []);
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);

  useEffect(() => {
    dispatch(getAllProductList() as any);
  }, [dispatch]);

  const categories = [
    { name: "Household", image: "https://images.unsplash.com/photo-1583847268964-b28dc2f51f92?q=80&w=400&auto=format&fit=crop" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&auto=format&fit=crop" },
    { name: "Gifts", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop" },
    { name: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop" },
    { name: "Gardening", image: "https://images.unsplash.com/photo-1416870262648-2513df5a3b90?q=80&w=400&auto=format&fit=crop" },
    { name: "Baby", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400&auto=format&fit=crop" },
    { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop" },
    { name: "Seasonal", image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=400&auto=format&fit=crop" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop" },
    { name: "Toys", image: "https://images.unsplash.com/photo-1531315630201-bb152f6372c2?q=80&w=400&auto=format&fit=crop" },
    { name: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop" },
    { name: "Others", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="px-6 pt-6">
        <div className="max-w-[1440px] mx-auto relative h-[500px] rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1468436139062-f60a71c5c892?q=80&w=2070&auto=format&fit=crop"
            alt="OMNISTORE: Gifts, Gadgets & Play"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="relative z-20 h-full flex flex-col justify-center px-12 md:px-20 max-w-4xl text-white">
            <div className="bg-violet-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-4">
              Flash Sale Live
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">
              Elevate Your Lifestyle with <span className="text-violet-500">Premium Elegance.</span>
            </h1>
            <p className="text-base text-gray-200 mb-8 max-w-xl font-medium leading-relaxed">
              Discover our curated selection of premium electronics, smart gadgets, and modern lifestyle essentials with up to 40% off this week only.
            </p>
            <button
              onClick={() => navigate("/layout/allproducts")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all w-fit flex items-center gap-3 group shadow-2xl shadow-violet-600/20"
            >
              Shop The Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="w-8 h-1.5 bg-white rounded-full" />
            <div className="w-2 h-1.5 bg-white/40 rounded-full" />
            <div className="w-2 h-1.5 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-6 max-w-[1440px] mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-1 uppercase">Shop by Category</h2>
            <p className="text-gray-500 font-medium text-[10px]">Explore our curated collections for every need.</p>
          </div>
          <button className="flex items-center gap-2 text-violet-600 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all border-b-2 border-violet-600/20 pb-1">
            View All Categories
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all"
              onClick={() => navigate(`/layout/allproducts?category=${cat.name}`)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[8px] font-black text-violet-400 uppercase tracking-[0.2em] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                  <h3 className="text-white font-black text-xs uppercase tracking-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner Section */}
      <section className="px-6 max-w-[1440px] mx-auto w-full">
        <div className="bg-[#f3f7ff] rounded-2xl p-10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-black tracking-tight uppercase">Flash Sale</h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ends in:</span>
                <div className="flex gap-2">
                  <div className="bg-violet-600 text-white px-2 py-1 rounded-md text-xs font-black">08</div>
                  <div className="bg-violet-600 text-white px-2 py-1 rounded-md text-xs font-black">42</div>
                  <div className="bg-violet-600 text-white px-2 py-1 rounded-md text-xs font-black">17</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-violet-600 hover:border-violet-600 transition-all shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-violet-600 hover:border-violet-600 transition-all shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {productDetails.slice(0, 5).map((p) => (
              <ProductCard
                key={p.id}
                productName={p.title}
                productDescription={p.description}
                productImage={p.images[0]}
                productPrice={p.price}
                productRating={p.rating}
                brand={p.brand}
                onClick={() => handleProductCardClick(p, dispatch, navigate)}
                handleAddCart={() => dispatch(handleAddCart(p) as any)}
                isInCart={cartItems.some((item) => item.id === p.id)}
                originalPrice={p.price / (1 - (p.discountPercentage / 100))}
                discount={p.discountPercentage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Clearance Sale Section */}
      <section className="px-6 max-w-[1440px] mx-auto w-full mb-10">
        <div className="relative bg-[#050505] rounded-[48px] overflow-hidden group border border-white/5">
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 -left-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_#7c3aed33_0%,_transparent_50%)] animate-pulse" />
            <div className="absolute bottom-0 -right-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_#4c1d9533_0%,_transparent_50%)] animate-pulse delay-700" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[600px]">
            {/* Visual Side */}
            <div className="lg:col-span-5 relative overflow-hidden h-[400px] lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Tech" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
                <span className="block text-[8px] font-black text-violet-400 uppercase tracking-[0.3em] mb-1">Status</span>
                <span className="text-[12px] font-black text-white uppercase tracking-tighter">Limited Release</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 p-12 lg:p-24 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-[2px] bg-violet-600" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Finale Event</span>
              </div>
              
              <h2 className="text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-10 group-hover:tracking-normal transition-all duration-1000">
                Last <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">Chance.</span>
              </h2>
              
              <p className="text-gray-400 text-sm font-medium max-w-sm leading-relaxed mb-12 opacity-60">
                The final evolution of our premium catalog. Cutting-edge designs at their ultimate value point.
              </p>
              
              <div className="flex flex-wrap items-center gap-10">
                <button 
                  onClick={() => navigate("/layout/allproducts")}
                  className="relative px-12 py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] active:scale-95 group/btn"
                >
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Enter The Finale</span>
                  <div className="absolute inset-0 bg-violet-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                </button>

                <div className="flex flex-col">
                  <span className="text-4xl font-black text-white tracking-tighter">70% OFF</span>
                  <span className="text-[9px] font-black text-violet-500 uppercase tracking-widest mt-1">Final Inventory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </section>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6">
          {productDetails.slice(14, 20).map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => handleProductCardClick(p, dispatch, navigate)}>
              <div className="aspect-square rounded-[32px] overflow-hidden bg-white mb-5 border border-gray-100 shadow-sm relative transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 flex items-center shadow-2xl">
                  <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-l-xl flex items-center gap-1.5 border-r border-white/20">
                    <Flame size={10} className="fill-current" />
                    SAVE
                  </div>
                  <div className="bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-r-xl">
                    70%
                  </div>
                </div>
                {Number(p.id) % 3 === 0 && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[8px] font-black uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Timer size={10} />
                    Final Call
                  </div>
                )}
              </div>
              <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-tight line-clamp-1 mb-1 px-1">{p.title}</h4>
              <div className="flex items-center gap-3 px-1">
                <span className="text-violet-600 font-black text-[12px]">₹{p.price.toLocaleString()}</span>
                <span className="text-[10px] text-gray-300 font-bold line-through">₹{(p.price * 3.3).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

      {/* New Arrivals & Sidebars */}
      <section className="px-6 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Just Landed
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase">New Arrivals</h2>
            </div>
            <button className="flex items-center gap-2 text-violet-600 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all pb-1 border-b-2 border-violet-600/10">
              View All Arrivals
              <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productDetails.slice(5, 13).map((p) => (
              <div 
                key={p.id} 
                className="group cursor-pointer relative overflow-hidden rounded-[32px] aspect-[4/5]"
                onClick={() => handleProductCardClick(p, dispatch, navigate)}
              >
                {/* Full-bleed Image */}
                <img 
                  src={p.images[0]} 
                  alt={p.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                
                {/* Floating Info */}
                <div className="absolute inset-x-6 bottom-6 z-20">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[8px] font-black text-violet-400 uppercase tracking-[0.3em] mb-1.5 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Season Select
                    </span>
                    <h3 className="text-base font-light text-white leading-tight mb-3 uppercase tracking-tight line-clamp-1">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light text-white/80">₹{p.price.toLocaleString()}</span>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-gray-900 transition-all">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-[#0F172A] rounded-[32px] p-10 text-white relative overflow-hidden group flex-1 flex flex-col justify-end min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Gifts Collection"
            />
            <div className="relative z-20">
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] block mb-4">Signature Collection</span>
              <h3 className="text-3xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">Curated <br />Home Essentials.</h3>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-2xl">
                Explore The Edit
              </button>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-[32px] p-10 flex flex-col items-center text-center justify-center gap-6 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-3xl rounded-full" />
            <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-violet-600 relative z-10">
              <Truck size={28} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Complimentary Shipping</h3>
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed max-w-[200px] mx-auto">Enjoy free express delivery on all premium orders over ₹5,000.</p>
            </div>
            <div className="bg-white border border-gray-100 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 relative z-10">
              Auto-applied at checkout
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 max-w-[1440px] mx-auto w-full">
        <div className="bg-gray-50/50 rounded-2xl p-16 border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.9] mb-6">
              Join the OMNISTORE <span className="text-violet-600">Community</span>
            </h2>
            <p className="text-base text-gray-500 font-medium leading-relaxed">
              Get exclusive access to new launches, early bird discounts, and weekly style inspiration directly to your inbox.
            </p>
          </div>
          <div className="w-full max-w-md space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white border-transparent py-5 pl-16 pr-8 rounded-2xl text-xs font-medium shadow-sm outline-none focus:ring-4 focus:ring-violet-500/5 transition-all"
              />
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-600/20">
              Subscribe Now
            </button>
            <p className="text-[9px] text-gray-400 font-medium px-4">
              By subscribing, you agree to our <span className="text-gray-900 underline cursor-pointer">Privacy Policy</span> and <span className="text-gray-900 underline cursor-pointer">Terms of Service</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
