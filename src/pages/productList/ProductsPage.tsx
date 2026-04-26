import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X, Filter, ChevronDown, LayoutGrid, List, ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from '../../components/commonComponents/customCards/ProductCard';
import { AppDispatch, RootState } from '../../state/store/store';
import { handleAddCart, handleProductCardClick } from '../../components/commonFunctions/CommonFunctions';
import FilterMenu from '../../components/commonComponents/FilterMenu';
import { Product } from '../../state/store/features/productData';

const ProductsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useSelector((state: RootState) => state.productData?.allProductList || []);
    const searchQuery = useSelector((state: RootState) => state.productData.searchQuery);
    const searchResults = useSelector((state: RootState) => state.productData.searchProductList || []);

    const [filterOpen, setFilterOpen] = useState(false);
    const [desktopFilterOpen, setDesktopFilterOpen] = useState(true);
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [visibleCount, setVisibleCount] = useState(20);

    const maxPriceFromProducts = productDetails.length > 0
        ? Math.ceil(Math.max(...productDetails.map(p => p.price)))
        : 2000;

    const [priceRange, setPriceRange] = useState<number[]>([0, maxPriceFromProducts]);

    useEffect(() => {
        if (maxPriceFromProducts > 0 && (priceRange[1] === 2000 || priceRange[1] === 0)) {
            setPriceRange([0, maxPriceFromProducts]);
        }
    }, [maxPriceFromProducts]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setSelectedCategories([category]);
        }
    }, [location.search]);

    const [sortBy, setSortBy] = useState<string>("default");

    const baseList = searchQuery ? searchResults : productDetails;

    const filteredProducts = baseList.filter((product: Product) => {
        return (
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (selectedRatings.length === 0 || selectedRatings.some(rating => parseInt(rating) <= product.rating)) &&
            (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
            (selectedAvailability.length === 0 ||
                (selectedAvailability.includes("inStock") && product.stock > 0) ||
                (selectedAvailability.includes("outOfStock") && product.stock === 0))
        );
    });

    const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") {
            const idA = typeof a.id === 'string' ? parseInt(a.id) || 0 : a.id;
            const idB = typeof b.id === 'string' ? parseInt(b.id) || 0 : b.id;
            return (idB as number) - (idA as number);
        }
        return 0;
    });

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(20);
    }, [selectedCategories, selectedBrands, selectedRatings, selectedAvailability, priceRange, searchQuery, sortBy]);

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedRatings([]);
        setSelectedAvailability([]);
        setPriceRange([0, maxPriceFromProducts]);
    };

    const categories = Array.from(
        new Set(productDetails.map((item: Product) => item.category))
    ).map((category) => ({ label: category, value: category }));
    
    const brands = Array.from(
        new Set(productDetails.map((item: Product) => item.brand))
    ).map((brand) => ({ label: brand, value: brand }));

    const ratingOptions = [
        { label: "4★ & above", value: "4" },
        { label: "3★ & above", value: "3" },
        { label: "2★ & above", value: "2" },
        { label: "1★ & above", value: "1" },
    ];

    const isFilterActive = selectedCategories.length > 0 || 
                           selectedBrands.length > 0 || 
                           selectedRatings.length > 0 || 
                           selectedAvailability.length > 0 || 
                           priceRange[0] !== 0 || 
                           priceRange[1] !== maxPriceFromProducts;

    const SidebarContent = () => (
        <div className="space-y-0 p-1" role="search" aria-label="Product Filters">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                        <Filter size={18} className="text-gray-900" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Filters</h2>
                </div>
                {isFilterActive && (
                    <button 
                        onClick={handleResetFilters}
                        className="text-[9px] font-black text-violet-600 uppercase tracking-[0.1em] hover:text-white hover:bg-violet-600 px-3 py-2 rounded-lg transition-all active:scale-95 border border-violet-100"
                        aria-label="Clear all applied filters"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <FilterMenu title={'CATEGORY'} options={categories} selectedOptions={selectedCategories} setSelectedOptions={setSelectedCategories} />

            {/* Price Range Filter */}
            <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price Range</h3>
                    <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md tracking-tighter">
                        ₹0 - ₹{priceRange[1]}
                    </span>
                </div>
                <div className="px-1 space-y-4">
                    <input 
                        type="range"
                        min="0"
                        max={maxPriceFromProducts}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        aria-label="Filter by maximum price"
                    />
                    <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        <span>MIN: ₹0</span>
                        <span>MAX: ₹{maxPriceFromProducts}</span>
                    </div>
                </div>
            </div>

            {/* Other Filters */}
            <div className="space-y-2">
                <FilterMenu title={'BRAND'} options={brands} selectedOptions={selectedBrands} setSelectedOptions={setSelectedBrands} />
                <FilterMenu title={'RATINGS'} options={ratingOptions} selectedOptions={selectedRatings} setSelectedOptions={setSelectedRatings} />
                <FilterMenu title={'STOCK STATUS'} options={[
                    { label: "In Stock Only", value: "inStock" },
                    { label: "Out of Stock", value: "outOfStock" }
                ]} selectedOptions={selectedAvailability} setSelectedOptions={setSelectedAvailability} />
            </div>

            {/* Close Button for Sidebar */}
            <button 
                onClick={() => setDesktopFilterOpen(false)}
                className="hidden lg:flex w-full items-center justify-center gap-3 py-5 mt-10 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border border-gray-100 rounded-2xl hover:bg-gray-50 hover:text-gray-900 group"
            >
                <ChevronLeft size={16} />
                Collapse Filters
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs & Page Title */}
            <div className="bg-gray-50 border-b border-gray-100 py-8">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-violet-600">Home</span>
                        <ChevronRight size={12} className="text-gray-300" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-violet-600">
                            {selectedCategories[0] || "Products"}
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-1">
                        {searchQuery ? `Results for "${searchQuery}"` : (selectedCategories[0] || "Global Collection")}
                    </h1>
                    <p className="text-gray-400 text-xs font-medium">Premium essentials for the modern lifestyle.</p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Desktop Sidebar */}
                    <aside className={`hidden lg:block shrink-0 ${desktopFilterOpen ? 'w-72' : 'hidden'}`}>
                        <div className="sticky top-24 pr-6">
                            <SidebarContent />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-8">
                        {/* Top Bar Section */}
                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {!desktopFilterOpen && (
                                    <button 
                                        onClick={() => setDesktopFilterOpen(true)}
                                        className="hidden lg:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-violet-600 hover:text-violet-600 group"
                                    >
                                        <Filter size={14} />
                                        Show Filters
                                    </button>
                                )}
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                    Showing <span className="text-gray-900 font-black">1-{Math.min(sortedProducts.length, 12)}</span> of {sortedProducts.length} products
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* View Toggles */}
                                <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-violet-50 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-violet-50 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all cursor-pointer"
                                    >
                                        <option value="default">Sort by: Default</option>
                                        <option value="newest">Sort by: Newest</option>
                                        <option value="priceLowHigh">Price: Low-High</option>
                                        <option value="priceHighLow">Price: High-Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                <button 
                                    onClick={() => setFilterOpen(true)}
                                    className="lg:hidden p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all relative"
                                >
                                    <Filter size={18} className="text-gray-700" />
                                    {isFilterActive && <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full border-2 border-white" />}
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className={`grid gap-6 ${
                            viewMode === 'list' 
                                ? 'grid-cols-1' 
                                : desktopFilterOpen 
                                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
                                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                        }`}>
                            {sortedProducts.length > 0 ? (
                                sortedProducts.slice(0, visibleCount).map((item: Product) => (
                                    <ProductCard
                                        key={item.id}
                                        productName={item?.title}
                                        productDescription={item?.description}
                                        productImage={item?.images[0]}
                                        productPrice={item?.price}
                                        productRating={item?.rating}
                                        brand={item.brand}
                                        onClick={() => handleProductCardClick(item, dispatch, navigate)}
                                        handleAddCart={() => dispatch(handleAddCart(item) as any)}
                                        isInCart={cartItems.some((cartItem) => cartItem.id === item.id)}
                                        originalPrice={item.price / (1 - (item.discountPercentage / 100))}
                                        discount={item.discountPercentage}
                                        viewMode={viewMode}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-24 flex flex-col items-center justify-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                    <div className="p-8 bg-white rounded-full shadow-sm mb-6">
                                        <Search size={48} className="text-gray-200" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 uppercase">No Matches Found</h3>
                                    <p className="text-gray-500 font-medium mt-2">Try adjusting your filters or search terms.</p>
                                    <button 
                                        onClick={handleResetFilters}
                                        className="mt-8 px-10 py-4 bg-gray-900 text-white text-[10px] font-black rounded-2xl hover:bg-violet-600 transition-all uppercase tracking-widest shadow-xl shadow-gray-900/10"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* View More Button */}
                        {sortedProducts.length > visibleCount && (
                            <div className="pt-16 pb-8 flex flex-col items-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">
                                    Showing <span className="text-gray-900">{visibleCount}</span> of {sortedProducts.length} Products
                                </p>
                                <button 
                                    onClick={() => setVisibleCount(prev => prev + 20)}
                                    className="px-16 py-5 bg-white border-2 border-gray-900 text-gray-900 text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-gray-900 hover:text-white transition-all active:scale-95 shadow-2xl shadow-gray-900/5"
                                >
                                    View More Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {filterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900/40" onClick={() => setFilterOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Filters</h2>
                            <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8">
                            <SidebarContent />
                        </div>
                        <div className="p-8 border-t border-gray-100 bg-gray-50">
                            <button 
                                onClick={() => setFilterOpen(false)}
                                className="w-full py-5 bg-gray-900 text-white text-[10px] font-black rounded-2xl hover:bg-violet-600 transition-all uppercase tracking-widest shadow-xl"
                            >
                                SHOW {sortedProducts.length} RESULTS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
