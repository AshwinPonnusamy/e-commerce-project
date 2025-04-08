import { Box, CardMedia, Grid, Rating, Typography } from "@mui/material"
import QuantityButton from "../../components/commonComponents/button/QuantityButton"
import { handleIncrease, handleDecrease, handleRemove } from "../../components/commonFunctions/CommonFuntion"
import { RootState } from "../../state/store/store"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../components/commonComponents/button/CustomButton"

const OrderSummary = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);

  return (
    <>
      <Box
        sx={{
          maxWidth: "1024px",
          paddingX: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          m: 2
        }}
      >
        {cartItems.length !== 0 && (
          <Grid container spacing={2}>
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
      </Box>
    </>
  )
}

export default OrderSummary