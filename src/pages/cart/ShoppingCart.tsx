import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Rating,
    CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CustomButton from "../../components/commonComponents/button/CustomButton";
import QuantityButton from "../../components/commonComponents/button/QuantityButton";
import { useNavigate } from "react-router-dom";
import { handleDecrease, handleIncrease, handleRemove } from "../../components/commonFunctions/CommonFuntion";
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

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalDiscount = cartItems.reduce((sum, item) => sum + item.price * (item.discountPercentage / 100) * item.quantity,
        0
    );
    const discountedPrice = totalPrice - totalDiscount;

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
                            item
                            xs={12}
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
                            <Grid container spacing={2} alignItems="center">
                                {/* Product Image */}
                                <Grid item xs={2}>
                                    <CardMedia
                                        component="img"
                                        image={item.thumbnail}
                                        sx={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            backgroundColor: "#fff",
                                        }}
                                    />
                                </Grid>

                                {/* Product Details */}
                                <Grid item xs={7}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {item.description}
                                    </Typography>

                                    {/* Rating */}
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <Rating value={item.rating} precision={0.1} readOnly size="small" />
                                        <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                                            {item.rating?.toFixed(1)}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: "green", mt: 1 }}>
                                        {item.availabilityStatus}
                                    </Typography>
                                </Grid>

                                {/* Price Section */}
                                <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ textDecoration: "line-through", color: "gray", fontSize: "14px" }}
                                        >
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="green"
                                            fontWeight="bold"
                                            sx={{ ml: 1, backgroundColor: "#d4f4dd", padding: "2px 6px", borderRadius: "4px" }}
                                        >
                                            {item.discountPercentage ? `${item.discountPercentage.toFixed(2)}%` : "0.00%"}
                                        </Typography>
                                    </Box>

                                    {/* Discounted Price (Updated for Quantity) */}
                                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "18px" }}>
                                        ₹{((item.price - (item.price * item.discountPercentage) / 100) * item.quantity).toFixed(2)}
                                    </Typography>
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
                                <Button
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                    onClick={() => handleRemove(item.id, dispatch)}
                                    sx={{ ml: 2 }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Grid>

                    ))}
                </Grid>
            )}

            {/* Subtotal */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="h6">
                    Total Price ({cartItems.length} items):
                </Typography>
                <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
                    ₹{totalPrice.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success"
                    sx={{ fontSize: "16px" }}
                >
                    Discounted Price :
                </Typography>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success"
                    sx={{ fontSize: "16px" }}
                >
                    ₹ {totalDiscount.toFixed()}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold" color="success">
                    Subtotal :
                </Typography>
                <Typography fontWeight="bold" color="success">

                    ₹{discountedPrice.toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <CustomButton
                    buttonLabel="Proceed to Buy"
                    buttonColor="#ff0ff0"
                    onClick={handleBuy}
                    disabled={cartItems.length === 0}
                />
            </Box>
        </Box>
    );
};

export default ShoppingCart;
