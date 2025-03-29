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
  value?: string;
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
  onChange?: (e:any) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      name,
      control,
      placeholder = "",
      value,
      label = "",
      variant = "outlined",
      fullWidth = true,
      disabled = false,
      startAdornment,
      readOnly,
      onChange
    },
    ref
  ) => {

    const CustomTextField = styled(TextField)({
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #000",
      },
      "& .MuiInputBase-input": {
        fontSize: "14px !important",
        padding: "3px 10px !important",
        color: "#000",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "4px ",

        "& input": {
          backgroundColor: "rgba(0, 0, 0, 0)",
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
          defaultValue={value || ""}
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
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange(e);
                }}
                InputProps={{
                  startAdornment: startAdornment,
                    readOnly: readOnly,
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
