import React from 'react';

interface CommonPaperProps {
    title?: string;
    children: React.ReactNode;
    spacing?: number;
    elevation?: number;
    className?: string;
}

const CommonPaper: React.FC<CommonPaperProps> = ({
    title,
    children,
    className = "",
}) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full ${className}`}>
            {title && (
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 border-b border-gray-50 pb-4">
                    {title}
                </h3>
            )}
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default CommonPaper;
