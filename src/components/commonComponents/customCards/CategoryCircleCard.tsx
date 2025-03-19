import { Typography, Box, Card } from "@mui/material";
import React from "react";

interface CategoryCircleCardProps {
    categoryName: string;
    categoryImage: string;
}

const CategoryCircleCard: React.FC<CategoryCircleCardProps> = ({
    categoryName,
    categoryImage,
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m:2 }}>
            <Card
                sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#D3D3D3",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={categoryImage}
                    loading="lazy"
                    alt={categoryName}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Card>

            {/* Category Name */}
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                {categoryName}
            </Typography>
        </Box>
    );
};

export default CategoryCircleCard;
