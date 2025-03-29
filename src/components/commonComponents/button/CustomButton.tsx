import { Box, Button } from '@mui/material'
import React from 'react'

interface buttonProps {
    buttonLabel: string;
    buttonColor?: any;
    onClick?: () => void;
    startIcon?:any;
    disabled?: boolean

}

const CustomButton:React.FC<buttonProps> = ({
    buttonLabel = 'Button',
    buttonColor = 'primary',
    startIcon,
    onClick,
    disabled = false, 
}) => {

    return (
        <Box sx={{ m: 1 }}>
            <Button disabled={disabled}  onClick={onClick} sx={{
                borderRadius: "6px",
                color: "#fff",
                backgroundColor: buttonColor,
                fontWeight: "400",
                textTransform:'none',
                transition: "transform 0.5s",
                height:30,
                padding:1,
            }} variant="contained">
                
                {startIcon} {buttonLabel}
            </Button>
        </Box>

    )
}

export default CustomButton