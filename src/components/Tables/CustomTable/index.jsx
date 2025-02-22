import React from 'react';
import { CiSearch } from 'react-icons/ci';

const index = ({ searchQuery, setSearchQuery, children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md dark:border-strokedark dark:bg-boxdark sm:px-6 xl:pb-1">
      <div className="relative my-2 text-lg">
       <div className="relative">
          <span className="absolute left-4.5 top-4">
            <CiSearch color="#6C6C6C" size={25} />
          </span>
          <input
            className="w-96 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="searchQuery"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">{children}</table>
      </div>
    </div>
  );
};

export default index;
