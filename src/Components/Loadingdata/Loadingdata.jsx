import React from "react";


export default function e() {
  return (
    <div className="min-h-screen mt-20 bg-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="rounded border border-gray-700 px-6 py-5 shadow-md bg-gray-900 animate-pulse"
          >
            <div className="h-48 bg-gray-700 rounded"></div>
            <div className="mt-4 h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="mt-3 h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
    </div>
  );
}
