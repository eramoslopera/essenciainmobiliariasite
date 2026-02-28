import React from 'react';

interface PropertySkeletonProps {
    count?: number;
}

const PropertySkeleton: React.FC<PropertySkeletonProps> = ({ count = 6 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 overflow-hidden animate-pulse">
                    {/* Image skeleton */}
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-6 space-y-4">
                        {/* Title */}
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        {/* Location */}
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                        {/* Price */}
                        <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
                        {/* Details row */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-3 bg-gray-100 rounded w-12" />
                            <div className="h-3 bg-gray-100 rounded w-12" />
                            <div className="h-3 bg-gray-100 rounded w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PropertySkeleton;
