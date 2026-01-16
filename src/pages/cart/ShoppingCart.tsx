import React from "react";
import {
    Box,
    Typography,
    Rating,
    CardMedia,
    Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CustomButton from "../../components/commonComponents/button/CustomButton";
import QuantityButton from "../../components/commonComponents/button/QuantityButton";
import { useNavigate } from "react-router-dom";
import { handleDecrease, handleIncrease, handleRemove } from "../../components/commonFunctions/CommonFunctions";
import Lottie from "lottie-react";
import EmptyCart from "../../assets/animation/EmptyCartAnimation.json";
import { ShoppingCartSharp } from "@mui/icons-material";

const ShoppingCart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
    const cartItems = useSelector(
        (state: RootState) => state.productData.cartItems
    );
    console.log(cartItems, "cart items");
    const handleBuy = () => {
        console.log("Navigating to order details");
        navigate("/layout/orderdetails");
    };

    const totalOriginalPrice = cartItems.reduce(
        (sum, item) => {
            const originalPrice = item.price / (1 - (item.discountPercentage / 100));
            return sum + originalPrice * item.quantity;
        },
        0
    );
    const totalDiscount = totalOriginalPrice - cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Box
            sx={{
                maxWidth: "1024px",
                margin: "auto",
                padding: 3,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    <ShoppingCartSharp />
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    Shopping Cart
                </Typography>
            </Box>

            {cartItems.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Lottie animationData={EmptyCart} loop style={{ width: 200, height: 200, margin: 'auto' }} />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#ff8800' }}>
                        Your Cart is Empty!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {cartItems.map((item) => (
                        <Grid
                            size={{ xs: 12 }}
                            key={item.id}
                            sx={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: 2,
                                paddingTop: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                            }}
                        >
                            <Grid container spacing={2} alignItems="flex-start">
                                {/* Product Image */}
                                <Grid size={{ xs: 4, sm: 2 }}>
                                    <Box sx={{ position: 'relative', pt: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={item.thumbnail}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                borderRadius: 2,
                                                backgroundColor: "#fff",
                                                border: '1px solid #eee'
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Product Details */}
                                <Grid size={{ xs: 8, sm: 6.5 }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mt: 0.5,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    {/* Rating */}
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <Rating value={item.rating} precision={0.1} readOnly size="small" />
                                        <Typography variant="caption" fontWeight="bold" sx={{ ml: 1, color: 'text.secondary' }}>
                                            {item.rating?.toFixed(1)}
                                        </Typography>
                                    </Box>

                                    <Typography variant="caption" sx={{ color: "green", mt: 0.5, display: 'block', fontWeight: 'bold' }}>
                                        {item.availabilityStatus}
                                    </Typography>
                                </Grid>

                                {/* Price Section */}
                                <Grid size={{ xs: 12, sm: 3.5 }} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: "flex-start" }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{ textDecoration: "line-through", color: "gray" }}
                                        >
                                            ₹{(item.price / (1 - (item.discountPercentage / 100)) * item.quantity).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="green"
                                            fontWeight="bold"
                                            sx={{ ml: 1, backgroundColor: "#d4f4dd", padding: "1px 4px", borderRadius: "4px" }}
                                        >
                                            {item.discountPercentage ? `${item.discountPercentage.toFixed(2)}% OFF` : "0% OFF"}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Quantity Controls & Delete Button */}
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                {/* Quantity Controls */}
                                <QuantityButton
                                    onQuant={item.quantity}
                                    onAdd={() => handleIncrease(item.id, dispatch, cartItems)}
                                    onRemove={() => handleDecrease(item.id, dispatch, cartItems)}
                                />

                                {/* Delete Button */}
                                <CustomButton
                                    label="Remove"
                                    variant="text"
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                    onClick={() => handleRemove(item.id, dispatch)}
                                    sx={{ ml: 2 }}
                                />
                            </Box>
                        </Grid>

                    ))}
                </Grid>
            )}

            {/* Subtotal */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="h6">
                    M.R.P ({cartItems.length} items):
                </Typography>
                <Typography fontWeight="bold" sx={{ textDecoration: "line-through", color: 'gray' }}>
                    ₹{totalOriginalPrice.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                    sx={{ fontSize: "16px" }}
                >
                    Total Discount:
                </Typography>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                    sx={{ fontSize: "16px" }}
                >
                    - ₹ {totalDiscount.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: '1px solid #ddd', mt: 1, pt: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                    Subtotal:
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    ₹{subtotal.toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <CustomButton
                    label="Proceed to Buy"
                    color="warning"
                    onClick={handleBuy}
                    disabled={cartItems.length === 0 ? true : false}
                />
            </Box>
        </Box>
    );
};

export default ShoppingCart;
