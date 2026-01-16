import { Box, Button, InputBase, Paper, Typography, Drawer, IconButton, Slider, Select, MenuItem, FormControl, InputLabel, Grid, Badge } from '@mui/material';
import { useState } from 'react';
import ProductCard from '../../components/commonComponents/customCards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store/store';
import { handleAddCart, handleProductCardClick, handleSearch, toggleFavorite } from '../../components/commonFunctions/CommonFunctions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Close } from '@mui/icons-material';
import { Filter } from 'iconsax-react';
import FilterMenu from '../../components/commonComponents/FilterMenu';
import { useEffect } from 'react';
import { Product } from '../../state/store/features/productData';

const ProductsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useSelector((state: RootState) => state.productData?.allProductList || []);
    const searchQuery = useSelector((state: RootState) => state.productData.searchQuery);
    const searchResults = useSelector((state: RootState) => state.productData.searchProductList || []);

    const [filterOpen, setFilterOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

    const maxPriceFromProducts = productDetails.length > 0
        ? Math.ceil(Math.max(...productDetails.map(p => p.price)))
        : 2000;

    const [priceRange, setPriceRange] = useState<number[]>([0, maxPriceFromProducts]);

    useEffect(() => {
        if (maxPriceFromProducts > 0 && priceRange[1] === 2000 && maxPriceFromProducts !== 2000) {
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
    const favorites = useSelector((state: RootState) => state.productData.isFavorited);

    const options = [
        { label: "4★ & above", value: "4" },
        { label: "3★ & above", value: "3" },
        { label: "2★ & above", value: "2" },
        { label: "1★ & above", value: "1" },
    ];

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 2 }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        mb: 3,
                        flexWrap: "wrap"
                    }}>
                        <IconButton onClick={() => setFilterOpen(true)}>
                            <Badge color="primary" variant="dot" invisible={selectedCategories.length === 0 && selectedBrands.length === 0 && selectedRatings.length === 0 && selectedAvailability.length === 0 && priceRange[0] === 0 && priceRange[1] === maxPriceFromProducts}>
                                <Filter />
                            </Badge>
                        </IconButton>

                        <Paper sx={{
                            display: "flex",
                            alignItems: "center",
                            paddingX: 2,
                            paddingY: 0.5,
                            width: { xs: '100%', sm: 400 },
                            borderRadius: 2,
                            border: '1px solid #ddd',
                            boxShadow: 'none'
                        }}>
                            <Search color="action" />
                            <InputBase
                                placeholder="Search Products..."
                                sx={{ flex: 1, marginLeft: 1 }}
                                onChange={(e) => handleSearch(e.target.value, dispatch)}
                                value={searchQuery}
                            />
                        </Paper>

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                                <MenuItem value="rating">Popularity (Rating)</MenuItem>
                                <MenuItem value="newest">Newest Arrivals</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Grid container spacing={3}>
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((item: Product) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                                    <ProductCard
                                        productName={item?.title}
                                        productDescription={item?.description}
                                        productImage={item?.images[0]}
                                        productPrice={item?.price}
                                        productRating={item?.rating}
                                        showTrending={true}
                                        onClick={() => handleProductCardClick(item, dispatch, navigate)}
                                        handleAddCart={() => dispatch(handleAddCart(item) as any)}
                                        isFavorited={favorites[item.id] || false}
                                        onFavoriteClick={() => toggleFavorite(dispatch, item.id, favorites[item.id])}
                                        isInCart={cartItems.some((cartItem) => cartItem.id === item.id)}
                                        originalPrice={item.price / (1 - (item.discountPercentage / 100))}
                                        discount={item.discountPercentage}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ textAlign: 'center', py: 5 }}>
                                    <Typography variant="h6" color="textSecondary">No products found matching your filters.</Typography>
                                    <Button onClick={handleResetFilters} sx={{ mt: 2 }}>Clear all filters</Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Grid>
            <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Filters</Typography>
                        <IconButton onClick={() => setFilterOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <FilterMenu title={'CATEGORY'} options={categories} selectedOptions={selectedCategories} setSelectedOptions={setSelectedCategories} />
                        <FilterMenu title={'BRAND'} options={brands} selectedOptions={selectedBrands} setSelectedOptions={setSelectedBrands} />
                        <FilterMenu title={'CUSTOMER RATING'} options={options} selectedOptions={selectedRatings} setSelectedOptions={setSelectedRatings} />
                        <FilterMenu title={'AVAILABILITY'} options={[
                            { label: "In Stock", value: "inStock" },
                            { label: "Out of Stock", value: "outOfStock" }
                        ]} selectedOptions={selectedAvailability} setSelectedOptions={setSelectedAvailability} />

                        <Box sx={{ p: 2 }}>
                            <Typography gutterBottom fontWeight="bold" fontSize="14px">PRICE RANGE</Typography>
                            <Slider
                                value={priceRange}
                                onChange={(_e, newValue) => setPriceRange(newValue as number[])}
                                valueLabelDisplay="auto"
                                min={0}
                                max={maxPriceFromProducts}
                                sx={{ color: 'orange' }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption">₹{priceRange[0]}</Typography>
                                <Typography variant="caption">₹{priceRange[1]}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button variant="outlined" fullWidth onClick={handleResetFilters}>
                            Reset
                        </Button>
                        <Button variant="contained" fullWidth onClick={() => setFilterOpen(false)}>
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default ProductsPage;
