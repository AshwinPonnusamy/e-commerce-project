import React, { forwardRef } from "react";
import { Controller, Control } from "react-hook-form";

interface InputTextProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard"; // Kept for prop compatibility, but styling will be unified or adapted
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
  multiline?: boolean;
  rows?: number;
}

const InputText = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputTextProps>(
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
      multiline = false,
      rows = 3,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col mb-4">
        {label && (
          <label className="mb-1.5 ml-1 text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
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
          render={({ field, fieldState: { error } }) => {
            const hasError = !!error;
            const baseInputClasses = `block ${fullWidth ? 'w-full' : ''} bg-gray-50 border ${hasError ? 'border-red-500 bg-red-50/50' : 'border-gray-100'} rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all placeholder:text-gray-400 placeholder:font-medium hover:border-gray-200`;
            
            return (
              <>
                <div className="relative flex items-center group">
                  {startAdornment && (
                    <div className="absolute left-4 text-gray-400 group-focus-within:text-violet-600 transition-colors flex items-center">
                      {startAdornment}
                    </div>
                  )}
                  
                  {multiline ? (
                    <textarea
                      {...field}
                      {...(props as any)}
                      ref={ref as any}
                      placeholder={placeholder}
                      disabled={disabled}
                      readOnly={readOnly}
                      rows={rows}
                      className={`${baseInputClasses} py-3 ${startAdornment ? 'pl-11' : 'pl-4'} ${endAdornment ? 'pr-11' : 'pr-4'}`}
                    />
                  ) : (
                    <input
                      {...field}
                      {...(props as any)}
                      ref={ref as any}
                      type={type}
                      placeholder={placeholder}
                      disabled={disabled}
                      readOnly={readOnly}
                      className={`${baseInputClasses} h-13 ${startAdornment ? 'pl-11' : 'pl-4'} ${endAdornment ? 'pr-11' : 'pr-4'}`}
                    />
                  )}
 
                  {endAdornment && (
                    <div className="absolute right-4 text-gray-400 group-focus-within:text-violet-600 transition-colors flex items-center">
                      {endAdornment}
                    </div>
                  )}
                </div>
                
                {(error || helperText) && (
                  <p className={`mt-1.5 ml-1 text-[10px] font-bold uppercase tracking-wider ${error ? 'text-red-500' : 'text-gray-500'}`}>
                    {error?.message || helperText}
                  </p>
                )}
              </>
            );
          }}
        />
      </div>
    );
  }
);

export default InputText;
