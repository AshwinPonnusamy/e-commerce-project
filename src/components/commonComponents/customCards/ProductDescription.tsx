import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QuantityButton from "../button/QuantityButton"; // Ensure this component exists

interface ProductDescriptionProps {
  productName: string;
  productDescription: string;
  price: number;
  discount: number;
  originalPrice: number;
  onQuant: number;
  onRemove: () => void;
  onAdd: () => void;
  onSetOrderedQuant: (quantity: number) => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productName,
  productDescription,
  price,
  discount,
  originalPrice,
  onQuant,
  onRemove,
  onAdd,
  onSetOrderedQuant,
}) => {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            {/* Company Name */}
            <Typography variant="subtitle2" color="gray">
              Sneaker Company
            </Typography>

            {/* Product Name */}
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {productName}
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" mt={2}>
              {productDescription}
            </Typography>

            {/* Price Section */}
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="h5" fontWeight="bold">
                ${price.toFixed(2)}
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
            <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
              ${originalPrice.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Push button to bottom */}
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="start">
          <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />

          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            sx={{
              textTransform: "none",
       
              // flexGrow: 1,
              ml: 2,
            }}
            onClick={() => onSetOrderedQuant(onQuant)}
          >
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>

  );
};

export default ProductDescription;
