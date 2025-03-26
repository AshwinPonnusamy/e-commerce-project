import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    Typography,
    InputBase,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";

interface FilterMenuProps {
    title: string;
    options: any[];
    selectedOptions?: any;
    setSelectedOptions?: any
}

const FilterMenu: React.FC<FilterMenuProps> = ({ title, options, selectedOptions, setSelectedOptions }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (option: string) => {
        setSelectedOptions((prev: any) =>
            prev.includes(option) ? prev.filter((o: string) => o !== option) : [...prev, option]
        );
    };

    // Filter options based on search input
    const filteredOptions = options.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold" fontSize="14px">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {options.length > 6 && (
                    <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: 1, px: 1 }}>
                        <Search sx={{ color: "gray", fontSize: 20, mr: 1 }} />
                        <InputBase
                            placeholder="Search..."
                            fullWidth
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            sx={{ fontSize: 14 }}
                        />
                    </Box>
                )}
                {filteredOptions.length > 0 ? (
                    filteredOptions.slice(0, 6).map((option) => (
                        <FormControlLabel
                            key={option.value}
                            control={
                                <Checkbox
                                    checked={selectedOptions?.includes(option.value)}
                                    onChange={() => handleChange(option.value)}
                                />
                            }
                            label={option.label}
                        />
                    ))
                ) : (
                    <Typography color="gray" fontSize={14}>
                        No results found
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterMenu;
