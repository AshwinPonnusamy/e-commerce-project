import React from "react";
import { Box, Grid, Typography, Button, Checkbox, Rating, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
import { changeCartQuantity, removeProductFromCart } from "../../state/action/product";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CustomButton from "../../components/commonComponents/button/CustomButton";
import QuantityButton from "../../components/commonComponents/button/QuantityButton";

const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);
    console.log(cartItems, "cart items");

    const handleIncrease = (id: number) => {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            dispatch(changeCartQuantity(id, item.quantity + 1));
        }
    };

    const handleDecrease = (id: number) => {
        const item = cartItems.find((item) => item.id === id);
        if (item && item.quantity > 1) {
            dispatch(changeCartQuantity(id, item.quantity - 1));
        }
    };

    const handleRemove = (id: number) => {
        dispatch(removeProductFromCart(id));
    };
    // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.price * (item.discountPercentage / 100)) * item.quantity, 0);
    const discountedPrice = totalPrice - totalDiscount;

    return (
        <Box sx={{ maxWidth: "1024px", margin: "auto", padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                Shopping Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography sx={{ textAlign: "center", mt: 3 }}>Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} key={item.id} sx={{ borderBottom: "1px solid #ddd", paddingBottom: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <CardMedia
                                        component="img"
                                        image={item.thumbnail}
                                        sx={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: 2, backgroundColor: "#fff" }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <Rating value={item.rating} precision={0.1} readOnly size="small" />
                                        <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                                            {item.rating?.toFixed(1)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: "green", mt: 1 }}>
                                        {item.availabilityStatus}
                                    </Typography>
                                    <Checkbox defaultChecked />
                                    <Typography variant="body2" display="inline">
                                        This will be a gift
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" fontWeight="bold">
                                        ₹{item.price}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Quantity Controls */}
                            <Box display="flex" alignItems="center" mt={1}>
                                <QuantityButton onQuant={item.quantity} onAdd={() => handleIncrease(item.id)} onRemove={() => handleDecrease(item.id)} />
                                <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleRemove(item.id)} sx={{ ml: 2 }}>
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Subtotal */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="h6">Total Price  ({cartItems.length} items):</Typography>
                <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
                    ₹{totalPrice.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold" color="success" sx={{ fontSize: '16px' }}>Discount Price :</Typography>
                <Typography variant="h6" fontWeight="bold" color="success" sx={{ fontSize: '16px' }}>
                    {totalDiscount.toFixed()}%
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold" color="success">Subtotal :</Typography>
                <Typography fontWeight="bold" color="success"> ₹{discountedPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <CustomButton buttonLabel="Proceed to Buy" buttonColor="#ff0ff0" />
            </Box>

        </Box>
    );
};

export default ShoppingCart;
