import React, { forwardRef } from "react";
import { FormLabel, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import "../App.css";

interface InputTextProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  startAdornment?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  InputProps?: any;
}

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
      startAdornment,
      minLength,
      maxLength,
      pattern,
      readOnly,
    },
    ref
  ) => {

    const CustomTextField = styled(TextField)({
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #000",
      },
      "& .MuiInputBase-input": {
        fontSize: "14px !important",
        padding: "3px 3px 3px 10px !important",
        color: "#000",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "7px ",

        "& input": {
          backgroundColor: "rgba(58, 209, 230, 0)",
          color: "#000",
          padding: "6px",
          border: "none",
          borderRadius: "5px ",
          flex: 1,
          width: "200px",
          fontSize: "12px",
          height: "40px",
        },
        "& input::placeholder": {
          color: "ff00ff",
          fontSize: "14px",
        },
      }
    });

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel sx={{ margin: "13px 0px 16px 0px" }}>
          <Typography sx={{ fontSize: "16px" }}>{label}</Typography>
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <CustomTextField
                {...field}
                inputRef={ref }
                placeholder={placeholder}
                variant={variant}
                fullWidth={fullWidth}
                disabled={disabled}
                error={!!error}
                InputProps={{
                  startAdornment: startAdornment,
                  inputProps: {
                    readOnly: readOnly,
                  },
                }}
              />
              {error && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {error.message}
                </p>
              )}
            </>
          )}
        />
      </Box>
    );
  }
);

export default InputText;
