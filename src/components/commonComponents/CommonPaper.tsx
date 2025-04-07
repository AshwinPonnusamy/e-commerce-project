import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface CommonPaperProps {
    title?: string;
    children: React.ReactNode;
    spacing?: number;
    elevation?: number;
    sx?: object;
}

const CommonPaper: React.FC<CommonPaperProps> = ({
    title,
    children,
    spacing = 3,
    elevation = 1,
    sx = {}
}) => {

    return (
        <Box
            sx={{ ...sx }}
        >
            <Paper
                elevation={elevation}
                sx={{
                    p: spacing,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {title && (
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                )}
                <Box sx={{ flex: 1 }}>{children}</Box>
            </Paper>
        </Box>
    );
};

export default CommonPaper;