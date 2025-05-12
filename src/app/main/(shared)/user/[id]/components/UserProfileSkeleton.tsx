import React from "react";

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      {/* Profile Header Skeleton */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
        <div className="relative w-40 h-40 flex-shrink-0 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="h-5 bg-gray-200 rounded w-28"></div>
            <div className="h-5 bg-gray-200 rounded w-36"></div>
          </div>

          <div className="flex gap-3 mt-6">
            <div className="h-10 bg-gray-200 rounded-md w-32"></div>
          </div>
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="mb-10">
        <div className="h-7 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Listings Section Skeleton */}
      <div className="mb-10">
        <div className="h-7 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-2"></div>
              <div className="flex justify-between">
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-5 bg-gray-200 rounded w-10"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-20 mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div>
        <div className="h-7 bg-gray-200 rounded w-24 mb-4"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mt-1"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
