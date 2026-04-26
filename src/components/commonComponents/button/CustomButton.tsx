import React from 'react';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  sx?: any; // Kept for backwards compatibility but not applied
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
  className = '',
  onClick,
  ...props
}) => {
  // Base classes for all buttons
  let buttonClasses = `inline-flex items-center justify-center rounded-xl font-black uppercase tracking-widest transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 ${className}`;

  // Full width
  if (fullWidth) {
    buttonClasses += ' w-full';
  }

  // Size variations
  switch (size) {
    case 'small':
      buttonClasses += ' px-3 py-1.5 text-xs';
      break;
    case 'large':
      buttonClasses += ' px-6 py-3 text-lg';
      break;
    case 'medium':
    default:
      buttonClasses += ' px-4 py-2 text-sm';
      break;
  }

  // Handle Disabled
  if (disabled) {
    buttonClasses += ' opacity-50 cursor-not-allowed';
  } else {
    // Styling variants mapping for standard colors
    const isPrimary = color === 'primary' || color === '#7c3aed' || color.includes('primary');
    
    if (variant === 'contained') {
      if (isPrimary) buttonClasses += ' bg-[#7c3aed] hover:bg-violet-700 text-white focus:ring-[#7c3aed] border border-transparent';
      else buttonClasses += ' bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-800 border border-transparent';
    } else if (variant === 'outlined') {
      if (isPrimary) buttonClasses += ' border border-[#7c3aed] text-[#7c3aed] hover:bg-violet-50 focus:ring-[#7c3aed]';
      else buttonClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500';
    } else if (variant === 'text') {
      if (isPrimary) buttonClasses += ' text-[#7c3aed] hover:bg-violet-50 focus:ring-[#7c3aed] border border-transparent';
      else buttonClasses += ' text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-transparent';
    }
  }

  // Apply custom inline color if it's a hex code and not primary/disabled (best effort fallback for MUI migration)
  const style: React.CSSProperties = {};
  if (!disabled && color.startsWith('#') && color !== '#7c3aed') {
    if (variant === 'contained') {
      style.backgroundColor = color;
      style.color = '#fff';
    } else if (variant === 'outlined') {
      style.borderColor = color;
      style.color = color;
    } else if (variant === 'text') {
      style.color = color;
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      style={style}
      {...props}
    >
      {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
      {label}
      {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
    </button>
  );
};

export default CustomButton;
