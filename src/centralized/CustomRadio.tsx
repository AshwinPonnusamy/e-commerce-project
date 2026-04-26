import React from 'react';

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
  const isSelected = selectedValue === value;
  
  return (
    <div className={`p-4 mb-4 rounded-lg border transition-all duration-200 ${isSelected ? 'border-[#7c3aed] bg-violet-50/30 shadow-md' : 'border-gray-200 bg-white shadow-sm hover:border-violet-300'}`}>
      <label className="flex items-start w-full cursor-pointer">
        <div className="flex items-center h-6">
          <input
            type="radio"
            value={value}
            checked={isSelected}
            onChange={() => onChange(value)}
            className="w-4 h-4 text-[#7c3aed] bg-white border-gray-300 focus:ring-[#7c3aed] focus:ring-2 mt-1 cursor-pointer"
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold text-gray-900">
            {label}
          </div>
          {description && (
            <div className="text-sm text-gray-500 mt-1">
              {description}
            </div>
          )}
          {isSelected && children && (
            <div className="mt-4 w-full cursor-default" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default CustomRadio;
