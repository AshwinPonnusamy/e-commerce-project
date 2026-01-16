import React from "react";
import { Box, Typography, Rating, Chip, Divider, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CustomButton from "../button/CustomButton";

interface ProductDescriptionProps {
  productName: string;
  productDescription: string;
  brand?: string;
  price: number;
  stock?: number;
  rating?: number;
  discount: number;
  originalPrice: number;
  handleAddCart: () => void;
  isInCart: boolean;
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
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack spacing={{ xs: 2, md: 3 }}>
        {/* Brand & Rating */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            {brand}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={rating || 0} precision={0.1} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium', fontSize: '0.8rem' }}>
              ({rating})
            </Typography>
          </Box>
        </Box>

        {/* Product Name */}
        <Typography variant="h3" sx={{
          fontWeight: 800,
          lineHeight: 1.2,
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
        }}>
          {productName}
        </Typography>

        {/* Pricing */}
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4" sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
            }}>
              ₹{price?.toFixed(2)}
            </Typography>
            <Chip
              label={`${discount}% OFF`}
              color="success"
              size="small"
              sx={{ fontWeight: 'bold', borderRadius: '4px' }}
            />
          </Stack>
          <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.secondary', mt: 0.5, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            MRP: ₹{originalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: { xs: 1.5, md: 3 } }} />

        {/* Stock Status */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem' }}>
            Availability:
          </Typography>
          <Chip
            label={stock && stock > 0 ? (stock <= 10 ? `Only ${stock} left in stock!` : 'In Stock') : 'Out of Stock'}
            color={stock && stock > 10 ? 'success' : 'error'}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Description */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem' }}>
            Description:
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            {productDescription}
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ pt: { xs: 2, md: 4 }, mt: 'auto' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <CustomButton
              fullWidth
              variant={isInCart ? "outlined" : "contained"}
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddCart}
              color={isInCart ? "error" : "warning"}
              label={isInCart ? "Remove from Cart" : "Add to Cart"}
              sx={{ py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
            />
            <CustomButton
              fullWidth
              variant="contained"
              startIcon={<ShoppingBagIcon />}
              color="primary"
              label="Buy Now"
              sx={{ py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDescription;
