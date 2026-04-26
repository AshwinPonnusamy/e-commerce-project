import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface FilterMenuOption {
    label: string;
    value: string;
}

interface FilterMenuProps {
    title: string;
    options: FilterMenuOption[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ title, options, selectedOptions, setSelectedOptions }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const filteredOptions = options.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                className="w-full flex items-center justify-between py-4 focus:outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`filter-section-${title.toLowerCase()}`}
            >
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-900 transition-colors">
                    {title}
                </span>
                <div className={`${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={14} className="text-gray-300 group-hover:text-gray-900" />
                </div>
            </button>
            
            {isOpen && (
                <div 
                    id={`filter-section-${title.toLowerCase()}`}
                    className="pb-6 space-y-4"
                    role="group"
                    aria-labelledby={`filter-title-${title.toLowerCase()}`}
                >
                    {options.length > 6 && (
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                placeholder={`Find ${title.toLowerCase()}...`}
                                aria-label={`Search ${title.toLowerCase()}`}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-gray-100 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-violet-500/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                    
                    <div className="flex flex-col space-y-4 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <label 
                                    key={option.value} 
                                    className="flex items-center group cursor-pointer select-none focus-within:bg-violet-50/30 p-1.5 -ml-1.5 rounded-xl"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions?.includes(option.value)}
                                            onChange={() => handleChange(option.value)}
                                            className="peer appearance-none w-5 h-5 border-2 border-gray-100 rounded-lg checked:bg-violet-600 checked:border-violet-600 cursor-pointer shadow-sm focus:ring-2 focus:ring-violet-500/20 outline-none"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                                            <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className={`ml-4 text-xs font-bold ${
                                        selectedOptions?.includes(option.value) 
                                            ? 'text-gray-900' 
                                            : 'text-gray-400 group-hover:text-gray-900'
                                    }`}>
                                        {option.label}
                                    </span>
                                </label>
                            ))
                        ) : (
                            <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-100">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Matches</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
