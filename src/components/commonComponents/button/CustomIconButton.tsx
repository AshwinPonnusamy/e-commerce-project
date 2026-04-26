import React from "react";

interface CustomIconButtonProps {
    icon: React.ReactNode;
    onClick?: (e?: React.MouseEvent) => void;
    iconColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
    tooltip?: string;
    className?: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
    icon,
    onClick,
    iconColor = "primary",
    className = "",
}) => {
    // Map standard MUI colors to Tailwind
    let colorClasses = "text-gray-600 hover:text-gray-900";
    if (iconColor === "primary") colorClasses = "text-violet-600 hover:text-violet-800";
    else if (iconColor === "secondary") colorClasses = "text-purple-600 hover:text-purple-800";
    else if (iconColor === "error") colorClasses = "text-red-600 hover:text-red-800";
    else if (iconColor === "success") colorClasses = "text-green-600 hover:text-green-800";
    else if (iconColor === "warning") colorClasses = "text-yellow-600 hover:text-yellow-800";
    else if (iconColor === "info") colorClasses = "text-cyan-600 hover:text-cyan-800";

    return (
        <div className="relative group inline-block">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if (onClick) onClick(e);
                }} 
                className={`p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 focus:outline-none flex items-center justify-center ${colorClasses} ${className}`}
            >
                {icon}
            </button>
        </div>
    );
};

export default CustomIconButton;
