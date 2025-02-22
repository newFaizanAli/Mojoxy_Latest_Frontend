import React from 'react';
import { CiLocationOn, CiCalendarDate  } from 'react-icons/ci';
import { monthNames } from '../../../utils/constants';
import { MdOutlineEditNote, MdOutlineDeleteOutline } from 'react-icons/md';

const index = ({ booking, navigate, deleteBooking, loginUser }) => {

  return (
    <div className="flex  bg-white dark:bg-boxdark text-gray-900 dark:text-white rounded-lg mb-4 relative">
      <div className="w-1/4 flex flex-col items-center justify-center border-r-2 border-dashed border-gray-300 dark:border-gray-600 relative">
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#f1f5f9] dark:bg-[#1a222c] rounded-full"></div>
        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#f1f5f9] dark:bg-[#1a222c] rounded-full"></div>

        <time className="flex flex-col items-center text-lg font-bold">
          <span className="text-3xl text-black dark:text-white">
            {new Date(booking.date).getDate()}
          </span>
          <span className="uppercase text-gray-600 dark:text-gray-300 text-sm">
            {monthNames[new Date(booking.date).getMonth()]}
          </span>
        </time>
      </div>

      <div className="w-3/4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <small className="text-gray-500 dark:text-gray-400 font-medium">
            <b>{booking.code}</b>
          </small>
          <span
            className={`inline-flex rounded-full bg-opacity-20 py-1 px-3 text-sm font-medium
              ${
                booking.approved
                  ? 'bg-success text-success'
                  : 'bg-danger text-danger'
              }
            `}
          >
            <b>{booking.approved ? 'Approved' : 'Unapproved'}</b>
          </span>
        </div>

        {!loginUser.type === 'artist' && (
          <h3 className="text-lg font-semibold mt-2">
            {booking.subitemName} Live in {booking.location}
          </h3>
        )}
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mt-2">
        <CiCalendarDate size={20} />
          <time className="text-sm">
            {new Date(booking.date).toLocaleDateString()} at {booking.time}
          </time>
         
        </div>

        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mt-2">
          <CiLocationOn size={20} />
          <h3 className="text-md font-semibold ">
            {booking.location}
          </h3>
         
        </div>

        {loginUser.type === 'admin' && (
          <div className="m-2">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Customer details
            </h3>
            <small className="text-gray-500 dark:text-gray-400 block">
              {booking.customerName} | {booking.customerEmail} |{' '}
              {booking.customerContact}
            </small>
          </div>
        )}

       

        <br />
 
        {/* Disable buttons if the booking is approved */}
        {loginUser.type !== 'artist' && <div className="absolute bottom-4 right-4 flex flex-wrap gap-1">
          <>
            <button
              className="hover:text-primary"
              onClick={() =>
                navigate('/bookings/update', {
                  state: booking,
                })
              }
            >
              <MdOutlineEditNote size={25} />
            </button>
            <button
              className="hover:text-danger"
              onClick={() => deleteBooking(booking)}
            >
              <MdOutlineDeleteOutline size={25} />
            </button>
          </>
        </div>}
      </div>
    </div>
  );
};
export default index;
