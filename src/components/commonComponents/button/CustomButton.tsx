import { Box, Button } from '@mui/material'
import React from 'react'

interface buttonProps {
    buttonLabel: string;
    buttonColor?: any;
    startIcon?:any
    onClick?: () => void

}

const CustomButton:React.FC<buttonProps> = ({
    buttonLabel = 'Button',
    buttonColor = 'primary',
    startIcon,
    onClick,
}) => {

    return (
        <Box>
            <Button onClick={onClick} sx={{
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