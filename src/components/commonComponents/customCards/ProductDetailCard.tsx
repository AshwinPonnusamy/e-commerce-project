import React, { useState, useEffect } from "react";
import {
  Box, Dialog, DialogContent, Card, CardMedia, IconButton
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface ProductDetailCardProps {
  images?: string[];
  isFavorited?: boolean;
  onFavoriteClick: () => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ images = [], isFavorited = false, onFavoriteClick }) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  const handleClick = (index: number) => {
    setCurrentImage(images[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Main Image Card with Favorite Icon */}
      {currentImage && (
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "500px" },
            cursor: "pointer",
            boxShadow: 2,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative"
          }}
          onClick={handleToggle}
        >
          {/* Favorite Icon */}
          <IconButton
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "#f5f5f5" }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick && onFavoriteClick();
            }}
          >
            {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>

          {/* Main Product Image */}
          <CardMedia
            component="img"
            image={currentImage}
            alt="product"
            sx={{
              width: "100%",
              height: { xs: 300, sm: 400, md: 500 },
              objectFit: "contain",
              backgroundColor: '#f9f9f9',
            }}
          />
        </Card>
      )}

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <Box sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {images.map((image, index) => (
            <Card
              key={index}
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: 1,
                overflow: "hidden",
                cursor: "pointer",
                border: currentImage === image ? "2px solid #1976d2" : "1px solid #eee",
                transition: 'all 0.2s',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => handleClick(index)}
            >
              <CardMedia
                component="img"
                image={image}
                alt={`thumb-${index}`}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Card>
          ))}
        </Box>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1, bgcolor: 'rgba(0,0,0,0.1)' }}
          >
            <FavoriteBorder sx={{ color: 'white' }} />
          </IconButton>
          <CardMedia
            component="img"
            image={currentImage}
            alt="enlarged-product"
            sx={{ width: "100%", height: "auto", maxHeight: '90vh', objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetailCard;
