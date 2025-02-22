import React from 'react';
import artist_1 from '../../../images/home/artist_1.webp';
import artist_2 from '../../../images/home/artist_2.jpeg';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div className="py-20 flex flex-wrap justify-around text-center text-white">
      <div className="w-64 sm:w-80 md:w-96 mx-auto">
        <h1 className="text-5xl">Discover Emerging Artists</h1>
        <p className="py-4">Join Mojoxy today for FREE !</p>
        <Link to={'/auth/signup'} className="inline-block py-3 px-6 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-700 text-white transition delay-200 font-medium rounded-full">
          Join Now
        </Link>
      </div>

      <div className="relative w-64 sm:w-80 md:w-96 mx-auto">
        {/* Artist 1 - left side */}
        <div
          className="absolute w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-64 left-1/2 top-0 -translate-x-1/2 translate-y-12"
          style={{ transform: 'rotate(-45deg) translateY(-40px)' }}
        >
          <img
            src={artist_1}
            alt="Artist 1"
            className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white"
          />
        </div>

        {/* Artist 2 - center on top */}
        <div
          className="absolute w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-64 left-1/2 top-0 -translate-x-1/2 translate-y-12"
          style={{ transform: 'rotate(0deg) translateY(0px)' }}
        >
          <img
            src={artist_2}
            alt="Artist 2"
            className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
