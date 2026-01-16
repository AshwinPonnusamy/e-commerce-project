import { Box, CardMedia, Rating, Typography, Grid } from "@mui/material"
import QuantityButton from "../../components/commonComponents/button/QuantityButton"
import { handleIncrease, handleDecrease, handleRemove } from "../../components/commonFunctions/CommonFunctions"
import { RootState } from "../../state/store/store"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../state/store/store"
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../components/commonComponents/button/CustomButton"

const OrderSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
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
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CardMedia
                        component="img"
                        image={item.thumbnail}
                        sx={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                          borderRadius: 2,
                          backgroundColor: "#fff",
                          border: '1px solid #eee'
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Product Details */}
                  <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: { xs: 'center', sm: 'left' } }}>
                      {item.description}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                      <Rating value={item.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
                        {item.rating?.toFixed(1)}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ color: "success.main", mt: 1, textAlign: { xs: 'center', sm: 'left' }, fontWeight: 'medium' }}>
                      {item.availabilityStatus}
                    </Typography>
                  </Grid>

                  {/* Price Section */}
                  <Grid size={{ xs: 12, sm: 3 }} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: 'center', sm: 'flex-end' } }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "text.secondary", fontSize: "13px" }}
                      >
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="success.main"
                        fontWeight="bold"
                        sx={{ ml: 1, backgroundColor: "#e8f5e9", px: 1, borderRadius: "4px", fontSize: "12px" }}
                      >
                        {item.discountPercentage ? `${item.discountPercentage.toFixed(0)}% OFF` : ""}
                      </Typography>
                    </Box>

                    {/* Discounted Price */}
                    <Typography variant="h6" fontWeight="bold" color="primary.main">
                      ₹{((item.price - (item.price * item.discountPercentage) / 100) * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Quantity Controls & Delete Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 1, px: 1 }}>
                  <QuantityButton
                    onQuant={item.quantity}
                    onAdd={() => handleIncrease(item.id, dispatch, cartItems)}
                    onRemove={() => handleDecrease(item.id, dispatch, cartItems)}
                  />

                  <CustomButton
                    label="Remove"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleRemove(item.id, dispatch)}
                    sx={{ textTransform: 'none' }}
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