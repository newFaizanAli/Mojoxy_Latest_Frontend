import React from 'react';
// import Logo from '../../images/logo/logo-icon.svg';
import Logo from '../../images/logo/logo.png';

import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <div className="bg-gray-800 py-5">
    <div className="flex flex-wrap text-center sm:text-left justify-center sm:justify-between items-center px-6 sm:px-20 gap-y-4">
      
      {/* Logo Section */}
      <div className="p-3">
        <Link className="block flex-shrink-0" to="/">
          <img src={Logo} alt="MOJOXY Logo" className="w-20 h-20 mx-auto sm:mx-0" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="text-white">
        <ul className="flex flex-col sm:flex-row gap-3 sm:gap-8">
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
      <div className="text-white text-center sm:text-left">
        <p className="text-sm py-2">MOJOXY</p>
        <h2 className="text-2xl font-bold">Live Artist Booking</h2>
        <h2 className="text-2xl font-bold">Made Easy!</h2>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-2 py-3 justify-center sm:justify-start">
          <Link to="/auth/signin">
            <button className="w-full sm:w-auto py-2 px-4 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold">
              Log In
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="w-full sm:w-auto py-2 px-4 cursor-pointer text-indigo-600 font-semibold border border-indigo-500 rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>

    {/* Footer Bottom Section */}
    <hr className="my-3 border-gray-600" />
    <div className="flex justify-center text-white py-3">
      <p className="text-sm">&copy; 2025 All rights reserved</p>
    </div>
  </div>
  );
};

export default PublicFooter;
