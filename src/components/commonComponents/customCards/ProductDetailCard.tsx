import React, { useState, useEffect } from "react";
import { Box, Grid, Dialog, DialogContent } from "@mui/material";

interface ProductDetailCardProps {
  images?: string[];
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ images = [] }) => {
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
      {/* Main Image */}
      {currentImage && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            cursor: "pointer",
            boxShadow: 2,
            borderRadius: 2,
            overflow: "hidden",
          }}
          onClick={handleToggle}
        >
          <img src={currentImage} alt="product" style={{ width: "100%" }} />
        </Box>
      )}

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <Grid container spacing={1} justifyContent="center" mt={2}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: currentImage === image ? "2px solid #1976d2" : "none",
                }}
                onClick={() => handleClick(index)}
              >
                <img src={image} alt={`thumb-${index}`} style={{ width: "100%" }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <img src={currentImage} alt="enlarged-product" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetailCard;
