import { Typography, Box, Card } from "@mui/material";
import React from "react";

interface CategoryCircleCardProps {
    categoryName: string;
    categoryImage: string;
    onClick?: () => void;
}

const CategoryCircleCard: React.FC<CategoryCircleCardProps> = ({
    categoryName,
    categoryImage,
    onClick,
}) => {
    return (
        <Box 
            onClick={onClick}
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                m: 2, 
                cursor: onClick ? "pointer" : "default",
                '&:hover .MuiCard-root': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out'
                }
            }}
        >
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
                    transition: 'transform 0.3s ease-in-out'
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
