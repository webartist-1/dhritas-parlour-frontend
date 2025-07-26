// src/components/loading/Skeleton.tsx

import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = 'w-full',
    height = 'h-4',
    className = '',
    rounded = 'md'
}) => {
    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
    };

    return (
        <div
            className={`bg-gray-200 animate-pulse ${width} ${height} ${roundedClasses[rounded]} ${className}`}
        />
    );
};

// Skeleton container for consistent spacing
export const SkeletonContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
            {children}
        </div>
    );
};
