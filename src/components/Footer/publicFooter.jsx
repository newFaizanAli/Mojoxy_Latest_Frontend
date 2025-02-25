import React from 'react';
// import Logo from '../../images/logo/logo-icon.svg';
import Logo from '../../images/logo/logo.png';

import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <div className="bg-gray-800 py-6 px-4">
      <div className="flex flex-wrap items-center justify-center sm:justify-between text-center sm:text-left gap-y-6 sm:gap-y-0">

        {/* Logo Section */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Link to="/">
            <img src={Logo} alt="MOJOXY Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="text-white w-full sm:w-auto">
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm sm:text-base">
            <li>
              <Link to="/artists" className="hover:underline">
                Our Artists
              </Link>
            </li>
            <li>
              <Link to="/artist/register" className="hover:underline">
                Register as Artist
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Text & Buttons */}
        <div className="text-white text-center sm:text-left w-full sm:w-auto">
          <p className="text-xs sm:text-sm py-1 sm:py-2">MOJOXY</p>
          <h2 className="text-lg sm:text-2xl font-bold">Live Artist Booking</h2>
          <h2 className="text-lg sm:text-2xl font-bold">Made Easy!</h2>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-2 py-3 items-center sm:items-start">
            <Link to="/auth/signin" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto py-2 px-4 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold">
                Log In
              </button>
            </Link>
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto py-2 px-4 text-sm sm:text-base text-indigo-600 font-semibold border border-indigo-500 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <hr className="my-4 border-gray-600" />
      <div className="flex justify-center text-white py-2">
        <p className="text-xs sm:text-sm">&copy; 2025 All rights reserved</p>
      </div>
    </div>
  );
};


export default PublicFooter;
