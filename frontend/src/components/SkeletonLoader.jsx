import React from "react";

const SkeletonLoader = ({ type }) => {
  if (type === "user") {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse p-4 bg-blue-100 rounded-lg shadow-md">
              <div className="h-16 w-16 rounded-full bg-blue-300 mb-4"></div>
              <div className="h-4 w-3/4 bg-blue-300 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-blue-300 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-blue-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (type === "project") {
    return (
      <div className="p-4 bg-white shadow-md rounded-xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse border p-4 rounded-lg shadow-lg">
              <div className="h-40 w-full bg-blue-300 rounded mb-4"></div>
              <div className="h-5 w-3/4 bg-blue-300 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-blue-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-blue-300 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-blue-400 rounded-md"></div>
                <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === "profile") {
    return (
      <div className="bg-[#c0d3fc] flex flex-col md:flex-row animate-pulse p-6">
        <div className="md:w-1/3 bg-[#13213f] m-7 pt-10 rounded-md shadow-2xl shadow-[#00ffff48] pb-10 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-gray-500 mb-4"></div>
          <div className="h-6 w-40 bg-gray-400 rounded mb-4"></div>
          <div className="h-10 w-32 bg-[#00ffff45] rounded mb-4"></div>
          <div className="h-20 w-3/4 bg-gray-500 rounded mb-4"></div>
        </div>
        <div className="md:w-2/3 m-7">
          <div className="min-h-[300px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-md p-5"></div>
          <div className="min-h-[300px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-lg p-5"></div>
          <div className="h-[300px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-md"></div>
        </div>
      </div>
    );
  }

  if (type === "particular_project") {
    return (
      <div className="animate-pulse bg-blue-50 shadow-md rounded-xl w-full max-w-[100vw] mx-auto min-h-[100vh] p-10">
        <div className="h-40 w-full bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] rounded-md mb-6"></div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="h-[180px] w-[180px] bg-blue-300 rounded-md"></div>
          <div className="flex flex-col w-full md:w-1/2">
            <div className="h-8 w-3/4 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 w-40 bg-[#0e2a507e] rounded-md"></div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-12 bg-blue-300 rounded-md"></div>
          ))}
        </div>
        <div className="mt-6 p-8 bg-white shadow-md rounded-lg min-h-[300px]"></div>
      </div>
    );
  }
  if(type==="dashboard"){
    return(
      <div className='min-h-[100vh] bg-[rgb(188,220,254)] p-2 flex flex-col md:flex-row gap-7 animate-pulse'>
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-1/5 bg-[#ffffff97] h-auto md:h-[100vh] rounded-lg ml-0 shadow-lg p-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className='h-10 w-full bg-gray-300 rounded mb-4'></div>
        ))}
      </div>

      {/* Middle Content Skeleton */}
      <div className="w-full md:w-4/5 ml-[auto] mr-auto">
        {/* Search Bar Skeleton */}
        <div className="bg-[#ffffff97] h-[70px] p-6 flex rounded-md shadow-md overflow-hidden">
          <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
          <div className='ml-4 w-3/4 h-10 bg-gray-300 rounded'></div>
        </div>

        {/* Filter Buttons Skeleton */}
        <div className="mt-4 flex gap-4">
          <div className='h-12 w-[220px] bg-gray-300 rounded'></div>
          <div className='h-12 w-[220px] bg-gray-300 rounded'></div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="mt-10">
          <div className='h-10 w-3/4 bg-gray-300 rounded mb-4'></div>
          <div className='h-6 w-1/2 bg-gray-300 rounded mb-4'></div>
          <div className='h-10 w-[150px] bg-gray-300 rounded'></div>
        </div>

        {/* Explore Section Skeleton */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse border p-4 rounded-lg shadow-lg">
              <div className="h-40 w-full bg-gray-300 rounded mb-4"></div>
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-400 rounded-md"></div>
                <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    );

   
  } 
  if(type==='home'){
      return (
        <div className="p-4 animate-pulse space-y-6">
        {/* Top Section */}
        <div className="h-10 w-1/3 bg-gray-300 rounded-xl" />
  
        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="h-10 w-1/2 bg-gray-300 rounded-xl" />
          <div className="h-10 w-1/6 bg-gray-300 rounded-xl" />
        </div>
  
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-4 bg-gray-200 rounded-2xl space-y-4">
              <div className="h-40 bg-gray-300 rounded-xl" />
              <div className="h-6 w-2/3 bg-gray-300 rounded-xl" />
              <div className="h-4 w-1/2 bg-gray-300 rounded-xl" />
            </div>
          ))}
        </div>
  
        {/* Footer CTA */}
        <div className="flex justify-center">
          <div className="h-10 w-32 bg-gray-300 rounded-xl" />
        </div>
      </div>
      )
    };
  return null;
};

export default SkeletonLoader;
