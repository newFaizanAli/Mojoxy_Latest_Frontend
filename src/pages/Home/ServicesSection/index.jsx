import React from 'react';
import { FaGuitar, FaRegUser } from 'react-icons/fa6';

const Index = () => {
  return (
    <div className="w-full  py-3">
      <div className="flex justify-center">
        <p className="text-center text-lg sm:text-xl font-bold opacity-80 max-w-3xl px-4">
          We help users discover the best artists for their events while
          providing artists with opportunities to find high-paying gigs.
        </p>
      </div>
      <div className="flex flex-wrap sm:gap-3 justify-between sm:justify-around my-25">
        {/* Left */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start w-full sm:w-auto">
          <div className="text-center sm:text-end w-full sm:w-64">
            <p className="text-lg">ARTISTS</p>
            <p className="text-sm">
              Join our platform to showcase your talent, connect with clients,
              and build a profitable career.
            </p>
          </div>
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-red-500 flex items-center justify-center">
            <div className="innerDiv bg-white p-2 text-red-500 rounded-xl">
              <FaGuitar size={36} />
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center justify-center space-x-4 my-6 sm:my-0">
          <div className="bg-gray-400 rounded-full p-2 w-6 h-6 sm:w-4 sm:h-4 relative">
            <div className="absolute inset-0 bg-gray-900 rounded-full m-auto w-3 h-3 sm:w-2 sm:h-2"></div>
          </div>
          <div className="w-16 sm:w-24 h-0 border-t-[1px] border-dotted border-gray-400 mx-2"></div>
          <div className="bg-gray-400 rounded-full p-2 w-6 h-6 sm:w-4 sm:h-4 relative">
            <div className="absolute inset-0 bg-gray-900 rounded-full m-auto w-3 h-3 sm:w-2 sm:h-2"></div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start w-full sm:w-auto">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-green-500 flex items-center justify-center">
            <div className="innerDiv bg-white p-2 text-green-500 rounded-xl">
              <FaRegUser size={36} />
            </div>
          </div>
          <div className="text-center sm:text-start w-full sm:w-64">
            <p className="text-lg">USERS</p>
            <p className="text-sm">
              Our platform helps you easily find and book the perfect artist for
              your event's unique needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
