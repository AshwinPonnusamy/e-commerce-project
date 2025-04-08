import { Box, Button } from '@mui/material';
import React from 'react';

interface CustomButtonProps {
  label: string;
  color?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  sx?: object;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label = 'Button',
  color = 'primary',
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  variant = 'contained',
  sx = {},
  onClick,
}) => {
  const isMuiColor = ['primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(color);

  return (
    <Box>
      <Button
        disabled={disabled}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        color={isMuiColor ? color as 'primary' | 'secondary' : undefined}
        sx={{
          borderRadius: '6px',
          fontWeight: 400,
          textTransform: 'none',
          transition: 'all 0.3s ease',
          ...(!isMuiColor && {
            backgroundColor: variant === 'contained' ? color : undefined,
            color: variant === 'contained' ? '#fff' : color,
            borderColor: color,
          }),
          ...sx,
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default CustomButton;