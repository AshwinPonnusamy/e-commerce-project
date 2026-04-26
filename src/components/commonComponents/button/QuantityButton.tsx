import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityButtonProps {
    onQuant?: number;
    onRemove?: () => void;
    onAdd?: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ onQuant, onRemove, onAdd }) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg w-fit border border-gray-200">
            {/* Decrease Quantity */}
            <button 
                onClick={onRemove} 
                disabled={onQuant === 1} 
                className="p-1.5 text-violet-600 hover:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors rounded-l-lg focus:outline-none"
            >
                <Minus size={18} />
            </button>

            {/* Quantity Display */}
            <span className="min-w-[40px] text-center text-sm font-black text-gray-800 px-2">
                {onQuant}
            </span>

            {/* Increase Quantity */}
            <button 
                onClick={onAdd} 
                disabled={onQuant === 10} 
                className="p-1.5 text-violet-600 hover:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors rounded-r-lg focus:outline-none"
            >
                <Plus size={18} />
            </button>
        </div>
    );
};

export default QuantityButton;
