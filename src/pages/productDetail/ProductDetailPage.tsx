import React from "react";
import { Grid } from "@mui/material";
import ProductDescription from "../../components/commonComponents/customCards/ProductDescription";
import ProductDetailCard from "../../components/commonComponents/customCards/ProductDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import { handleAddCart, toggleFavorite } from "../../components/commonFunctions/CommonFuntion";
import { useNavigate } from "react-router-dom";
const ProductDetailPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) => state.productData?.currentProduct)
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    const originalPrice = product?.price / (1 - (product?.discountPercentage / 100));

    const favorites = useSelector((state: RootState) => state.productData.isFavorited);
    const isFavorited = favorites[product?.id] || false;
    const handleBuy = () => {
        console.log("Navigating to order details");
        navigate("/layout/orderdetails");
    };
    return (
        <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProductDetailCard images={product?.images} isFavorited={isFavorited}
                            onFavoriteClick={() => toggleFavorite(dispatch, product.id, isFavorited)} />
                    </Grid>
                    <Grid item xs={8}>
                        <ProductDescription
                            productName={product?.title}
                            brand={product?.brand}
                            productDescription={product?.description}
                            price={product?.price}
                            stock={product?.stock}
                            rating={product?.rating}
                            discount={product?.discountPercentage}
                            originalPrice={originalPrice}
                            handleAddCart={() => dispatch(handleAddCart(product))}
                            onBuy={handleBuy}
                            isInCart={cartItems.some((item) => item.id === product.id)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default ProductDetailPage;
