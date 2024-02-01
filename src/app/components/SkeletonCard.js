import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded p-4 shadow-md animate-pulse">
      {/* Placeholder for signal image */}
      <div className="h-32 bg-gray-300 mb-4 rounded"></div>

      {/* Placeholder for signal information */}
      <div>
        <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/4 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
        {/* Add more placeholder elements as needed */}
      </div>
    </div>
  );
};

export default SkeletonCard;
