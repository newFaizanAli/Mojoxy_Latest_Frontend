import React from 'react';

const index = ({list}) => {
  return (
    <div className="events py-3">
      {/* title */}
   
        <div className='py-4'>
          <h2 className="h2 text-2xl font-bold text-white">Upcomming Events</h2>
        </div>
        

      {/* events */}
      <div className="flex gap-4 flex-wrap">
        {list?.map((e) => {
          return (
            <>
              <div className="bg-gray-800 opacity-80 text-white w-72 p-3 rounded-xl">
                <div className="flex flex-wrap gap-3 sm:justify-center justify-between items-center">
                  <h2 className="text-lg font-semibold py-1 flex-1">
                    {e?.subitemName} perform live in {e?.location}
                  </h2>
                  <span className="border border-indigo-600 shadow-indigo-500 shadow-sm rounded-md p-1">MJX</span>
                </div>
                <p className="text-sm py-1">
                  {new Date(e?.date).toLocaleDateString()}  | {e.time}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default index;
