import React from 'react';


const SkeletonCard = ({ isDarkMode }) => {
  const baseColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const highlightColor = isDarkMode ? 'bg-gray-600' : 'bg-gray-300';
  return (
    <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {/* Header */}
      <div className={`h-10 ${baseColor} animate-pulse flex items-center px-4`}>
        <div className={`h-4 w-1/3 ${highlightColor} rounded`}></div>
      </div>
      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className={`h-6 ${baseColor} animate-pulse rounded w-3/4`}></div>
        {/* Description */}
        <div className={`h-4 ${baseColor} animate-pulse rounded w-1/2`}></div>
        {/* Stats */}
        <div className="flex space-x-4">
          <div className={`h-4 ${baseColor} animate-pulse rounded w-1/4`}></div>
          <div className={`h-4 ${baseColor} animate-pulse rounded w-1/4`}></div>
        </div>
        {/* Tags */}
        <div className="flex space-x-2">
          <div className={`h-6 w-16 ${baseColor} animate-pulse rounded-full`}></div>
          <div className={`h-6 w-16 ${baseColor} animate-pulse rounded-full`}></div>
        </div>
      </div>
      {/* Footer */}
      <div className={`h-12 ${baseColor} animate-pulse flex items-center justify-end px-4`}>
        <div className={`h-8 w-24 ${highlightColor} rounded`}></div>
      </div>
    </div>
  );
};
export default SkeletonCard;