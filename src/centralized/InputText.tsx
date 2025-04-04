import React, { forwardRef } from "react";
import { FormLabel, TextField, Typography } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { Box, styled } from "@mui/system";

interface InputTextProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  helperText?: string;
}

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '7px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
    },
    '&.Mui-error': {
      backgroundColor: '#ffebee',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 10px',
    fontSize: '12px',
    height: '24px',
    '&::placeholder': {
      color: '#999',
      opacity: 1,
      fontSize: '12px',
    },
  },
});

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      name,
      control,
      placeholder = "",
      label = "",
      variant = "outlined",
      fullWidth = true,
      required = false,
      disabled = false,
      readOnly = false,
      type = "text",
      startAdornment,
      endAdornment,
      minLength,
      maxLength,
      pattern,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        {label && (
          <FormLabel sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
              {label}
              {required && <span style={{ color: 'red' }}> *</span>}
            </Typography>
          </FormLabel>
        )}
        
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: required ? `${label || placeholder} is required` : false,
            minLength: minLength ? {
              value: minLength,
              message: `${label || placeholder} must be at least ${minLength} characters`
            } : undefined,
            maxLength: maxLength ? {
              value: maxLength,
              message: `${label || placeholder} must be less than ${maxLength} characters`
            } : undefined,
            pattern: pattern ? {
              value: pattern,
              message: `Invalid ${label || placeholder} format`
            } : undefined
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <CustomTextField
                {...field}
                {...props}
                inputRef={ref}
                placeholder={placeholder}
                variant={variant}
                fullWidth={fullWidth}
                disabled={disabled}
                type={type}
                error={!!error}
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: startAdornment,
                  endAdornment: endAdornment,
                }}
              />
              
              {(error || helperText) && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    ml: 1,
                    color: error ? 'error.main' : 'text.secondary',
                    fontSize: '12px',
                  }}
                >
                  {error?.message || helperText}
                </Typography>
              )}
            </>
          )}
        />
      </Box>
    );
  }
);

export default InputText;