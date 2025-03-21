import { AspectRatio, CardOverflow } from "@mui/joy";
import { Typography, CardContent, Box, Card, Rating } from "@mui/material";
import { Favorite, FavoriteBorder, Share, ShoppingCart } from "@mui/icons-material";
import React, { useState } from "react";
import CustomButton from "../button/CustomButton";
import CustomIconButton from "../button/CustomIconButton";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: string;
  productRating: number;
  originalPrice?: number;
  discount?: number;
  showFavorite?: boolean;
  showCart?: boolean;
  showShare?: boolean;
  showTrending?: boolean;
  handleFavoriteChange?: () => void;
  handleAddCart?: () => void;
  handleShare?: () => void;
  onClick?: () => void;
  isFavorited?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productPrice,
  productImage,
  productDescription,
  originalPrice,
  discount,
  productRating,
  showFavorite = true,
  showCart = true,
  showShare = true,
  showTrending = false,
  handleFavoriteChange,
  handleAddCart,
  handleShare,
  isFavorited,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 1 }}>
      <Card
        sx={{
          maxWidth: 250,
          boxShadow: 2,
          borderRadius: 2,
          position: "relative",
          transition: "0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box sx={{ position: "relative" }}>
          <CardOverflow sx={{ overflow: "hidden" }}  onClick={onClick}>
            <AspectRatio ratio="1/1" sx={{ width: "100%" }}>
              <img
                src={productImage}
                loading="lazy"
                alt={productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AspectRatio>
          </CardOverflow>
          {showTrending === true &&
            (
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 220, 19, 0.97)",
                  color: "#000",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                }}
              >
                Trending
              </Typography>
            )}
            </Box>
             {/* Favorite & Cart Icons (Visible on Hover) */}
          {hovered && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {showFavorite && (
                <CustomIconButton icon={isFavorited ? <Favorite /> : <FavoriteBorder />} iconColor={"error"} tooltip="Add to favorite" onClick={handleFavoriteChange} />
              )}
              {showCart && (
                <CustomIconButton icon={<ShoppingCart />} iconColor={"primary"} tooltip="Add to Cart" onClick={handleAddCart} />
              )}
              {showShare && (
                <CustomIconButton icon={<Share />} iconColor={"secondary"} tooltip="Share" onClick={handleShare} />
              )}
        </Box>
          )}

        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '20px'
          }}>
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

          }}>
            {productDescription}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              ₹{productPrice}
            </Typography>
            <Typography
              variant="body2"
              color="green"
              fontWeight="bold"
              sx={{ ml: 1, backgroundColor: "#d4f4dd", padding: "2px 6px", borderRadius: "4px" }}
            >
              {discount}%
            </Typography>
            <Rating value={productRating} precision={0.5} readOnly size="small" />
          </Box>
          <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
          ₹{originalPrice?.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <CustomButton buttonLabel="Buy Now" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
