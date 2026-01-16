import React from "react";
import { Grid, Box } from '@mui/material';
import ProductDescription from "../../components/commonComponents/customCards/ProductDescription";
import ProductDetailCard from "../../components/commonComponents/customCards/ProductDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import { handleAddCart, toggleFavorite } from "../../components/commonFunctions/CommonFunctions";

const ProductDetailPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.productData?.currentProduct)
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const originalPrice = (product?.price || 0) / (1 - ((product?.discountPercentage || 0) / 100));

    const favorites = useSelector((state: RootState) => state.productData.isFavorited);
    const isFavorited = product ? favorites[product.id] : false;

    if (!product) return null;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, mt: { xs: 2, md: 5 }, mb: 5 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <ProductDetailCard images={product?.images} isFavorited={isFavorited}
                        onFavoriteClick={() => toggleFavorite(dispatch, product.id, isFavorited)} />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
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
                        isInCart={cartItems.some((item) => item.id === product.id)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailPage;
