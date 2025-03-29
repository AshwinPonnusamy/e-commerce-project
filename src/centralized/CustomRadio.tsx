import React from 'react';
import { Box, Typography, Paper, Radio, FormControlLabel } from '@mui/material';

interface CustomRadioProps {
  value: string;
  label: string;
  description?: string;
  selectedValue: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  value,
  label,
  description,
  selectedValue,
  onChange,
  children
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        boxShadow: 2,
        borderRadius: 1
      }}
    >
      <FormControlLabel
        value={value}
        control={<Radio checked={selectedValue === value} onChange={() => onChange(value)} />}
        label={
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            )}
            {selectedValue === value && children}
          </Box>
        }
        sx={{ alignItems: 'flex-start', width: '100%' }}
      />
    </Paper>
  );
};

export default CustomRadio;
