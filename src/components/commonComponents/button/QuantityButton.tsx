import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface QuantityButtonProps {
    onQuant?: number;
    onRemove?: () => void;
    onAdd?: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ onQuant, onRemove, onAdd }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                width: "fit-content",
            }}
        >
            {/* Decrease Quantity */}
            <IconButton onClick={onRemove} disabled={onQuant === 0} color="primary">
                <RemoveIcon />
            </IconButton>

            {/* Quantity Display */}
            <Typography variant="body1" sx={{ minWidth: "40px", textAlign: "center" }}>
                {onQuant}
            </Typography>

            {/* Increase Quantity */}
            <IconButton onClick={onAdd} disabled={onQuant === 100} color="primary">
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default QuantityButton;
