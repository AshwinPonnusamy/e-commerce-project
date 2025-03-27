import { Box, Button, Grid, InputBase, Paper, Typography, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import ProductCard from '../../components/commonComponents/customCards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store/store';
import { handleAddCart, handleProductCardClick, toggleFavorite } from '../../components/commonFunctions/CommonFuntion';
import { useNavigate } from 'react-router-dom';
import { Search, Close } from '@mui/icons-material';
import { Filter } from 'iconsax-react';
import FilterMenu from '../../components/commonComponents/FilterMenu';
import { setSearchProductList } from '../../state/store/features/productData';
import { getSearchProductList } from '../../state/action/product';

const ProductsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useSelector((state: RootState) => state.productData?.allProductList || []);

    const [filterOpen, setFilterOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = useSelector((state: RootState) => state.productData.searchProductList || []);
    const filteredProducts = productDetails.filter((product: any) => {
        return (
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (selectedRatings.length === 0 || selectedRatings.some(rating => parseInt(rating) <= product.rating))
        );
    });

    const displayedProducts = productDetails ?  filteredProducts  : filteredProducts.slice(0, 10);
    const categories = Array.from(
        new Set(productDetails.map((item: any) => item.category))
    ).map((category) => ({ label: category, value: category }));
    const brands = Array.from(
        new Set(productDetails.map((item: any) => item.brand))
    ).map((brand) => ({ label: brand, value: brand }));
    const favorites = useSelector((state: RootState) => state.productData.isFavorited);

    const options = [
        { label: "4★ & above", value: "4" },
        { label: "3★ & above", value: "3" },
        { label: "2★ & above", value: "2" },
        { label: "1★ & above", value: "1" },
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            dispatch(setSearchProductList([]));
            return;
        }
        dispatch(getSearchProductList(query));
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2} columns={15} sx={{ p: 2 }}>
                        <Grid item xs={15} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconButton onClick={() => setFilterOpen(true)} sx={{ mr: 2 }}>
                                <Filter />
                            </IconButton>

                            <Paper sx={{
                                display: "flex",
                                alignItems: "center",
                                paddingX: 2,
                                paddingY: 1,
                                width: 500,
                            }}>
                                <Search />
                                <InputBase placeholder="Search Products..." sx={{ flex: 1, marginLeft: 1 }}  onChange={(e) => handleSearch(e.target.value)} />
                            </Paper>
                        </Grid>

                        {(searchQuery ? searchResults : displayedProducts).map((item: any) => (
                            <Grid item xs={15} sm={5} md={3.7} lg={3} key={item.id}>
                                <ProductCard
                                    productName={item?.title}
                                    productDescription={item?.description}
                                    productImage={item?.images[0]}
                                    productPrice={item?.price}
                                    productRating={item?.rating}
                                    showTrending={true}
                                    onClick={() => handleProductCardClick(item, dispatch, navigate)}
                                    handleAddCart={() => dispatch(handleAddCart(item))}
                                    isFavorited={favorites[item.id] || false}
                                    onFavoriteClick={() => toggleFavorite(dispatch, item.id, favorites[item.id])}
                                    isInCart={cartItems.some((cartItem: any) => cartItem.id === item.id)}
                                    originalPrice={item.price / (1 - (item.discountPercentage / 100))}
                                    discount={item.discountPercentage}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
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
                    </Box>
                    <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={() => setFilterOpen(false)}>
                        Apply Filters
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default ProductsPage;
