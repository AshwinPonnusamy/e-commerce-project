import React, { useState, useEffect } from "react";
import { Box, Grid, Dialog, DialogContent, Card, CardMedia } from "@mui/material";

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
      {/* Main Image using CardMedia */}
      {currentImage && (
        <Card
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
          <CardMedia
            component="img"
            image={currentImage}
            alt="product"
            sx={{ width: "100%", height: 400, objectFit: "contain", borderRadius: 2, boxShadow: 1 }}
          />
        </Card>
      )}

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <Grid container spacing={1} justifyContent="center" mt={2}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: currentImage === image ? "2px solid #1976d2" : "none",
                }}
                onClick={() => handleClick(index)}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`thumb-${index}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <CardMedia
            component="img"
            image={currentImage}
            alt="enlarged-product"
            sx={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetailCard;
