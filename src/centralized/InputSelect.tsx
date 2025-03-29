import { forwardRef } from "react";
import { Select, MenuItem, FormLabel, Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../App.css";
interface InputSelectProps {
  name: string;
  control?: any;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  options?: any;
  onchange?: any;
  getOptionLabel?: any;
  sx?: any;
}
const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(
  (
    {
      name,
      control,
      label,
      readOnly,
      placeholder = "Select",
      fullWidth = true,
      required = false,
      disabled = false,
      options,
      onchange,
      getOptionLabel,
      sx,
    },
    ref
  ) => {
    const selectArrow = styled(KeyboardArrowDownIcon)(() => ({
      fontSize: "16px",
    }));
    const CustomSelect = styled(Select)(() => ({
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1 px solid #000",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "14px !important",
        padding: "4px 10px !important",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "7px",
      },
      "& .MuiSelect-select": {
        backgroundColor: "transparent",
        color: '#000',
        padding: "6px",
        border: "none",
        borderRadius: "5px",
        flex: 1,
        width: "200px",
        fontSize: "12px",
        minHeight: "30px",
      },
      "& .MuiSelect-select::placeholder": {
        color: '#000',
        fontSize: "14px",
      },
    }));
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel sx={{ fontSize: "12px", margin: "13px 0px 16px 0px" }}>
          <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: required ? `${placeholder} is required` : false,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <CustomSelect
                {...field}
                inputRef={ref}
                displayEmpty={true}
                disabled={disabled}
                error={!!error}
                fullWidth={fullWidth}
                value={field.value || ""}
                sx={sx}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (onchange) {
                    onchange(e.target.value);
                  }
                }}
                inputProps={{ readOnly: readOnly }}
                IconComponent={selectArrow}
              >
                <MenuItem disabled value="">
                  {placeholder}
                </MenuItem>
                {options.map((option:any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {getOptionLabel(option)}
                  </MenuItem>
                ))}
              </CustomSelect>
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
export default InputSelect;
