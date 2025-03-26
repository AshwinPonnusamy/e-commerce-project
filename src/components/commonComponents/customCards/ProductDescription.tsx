import React from "react";
import { Box, Typography, Grid, Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "../button/CustomButton";

interface ProductDescriptionProps {
  productName: string;
  productDescription: string;
  brand?: string;
  price: number;
  stock?: any;
  rating?: any;
  discount: number;
  originalPrice: number;
  handleAddCart: () => void;
  isInCart: any
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productName,
  productDescription,
  brand,
  price,
  stock,
  rating,
  discount,
  originalPrice,
  handleAddCart,
  isInCart
}) => {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={10}>
            {/* Company Name */}
            <Typography variant="subtitle2" color="gray">
              {brand}
            </Typography>
             <Rating value={rating} precision={0.5} readOnly size="medium" />

            {/* Product Name */}
            <Typography variant="h5" fontWeight="bold" mt={1}>
              {productName}
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" mt={2}>
              {productDescription}
            </Typography>

            {/* Price Section */}
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="h5" fontWeight="bold">
                ${price?.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="green"
                fontWeight="bold"
                sx={{ ml: 1, backgroundColor: "#d4f4dd", padding: "2px 6px", borderRadius: "4px" }}
              >
                {discount}%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ textDecoration: "line-through", color: "red" }}>
            ₹{originalPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: stock <= 10 ? "red" : "green", mt:2 }}>
              {stock } items Left
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Push button to bottom */}
      <Grid item xs={10}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <CustomButton
            startIcon={<ShoppingCartIcon sx={{fontSize:20, mr:1}} />}
            onClick={handleAddCart} buttonLabel={isInCart ? "Remove from Cart" : "Add to Cart"}/>

          <CustomButton buttonLabel="Buy Now " buttonColor="#ff0ff0" />
        </Box>
      </Grid>
    </Grid>

  );
};

export default ProductDescription;
