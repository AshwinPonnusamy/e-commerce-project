import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

interface CustomIconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    iconColor?: any;
    tooltip?: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
    icon,
    onClick,
    iconColor= "primary",
    tooltip
}) => {
    return (
        <Box>
            <Tooltip title={tooltip} placement="top">
                <IconButton onClick={onClick}  color= {iconColor} sx={{ backgroundColor: "#fff", p: 0.5 }}>
                    {icon}
                </IconButton>
            </Tooltip>
        </Box>
        
    );
};

export default CustomIconButton;
