import React from 'react';
const localizer = momentLocalizer(moment);
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import fireToast from '../../../hooks/fireToast';

const index = ({ selectedDateTime, setSelectedDateTime, artistBookings }) => {
  const handleSelectSlot = (slotInfo) => {
    fireToast('time & date is selected', true);
    const selectedDate = new Date(slotInfo.start);
    setSelectedDateTime(selectedDate);
  };

  const events = artistBookings.map((booking) => ({
    title: 'Booked',
    start: moment(booking.date).toDate(),
    end: moment(booking.date).toDate(),
  }));

  return (
    <div className="col-span-5 xl:col-span-2">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Time Slot</h3>
          {selectedDateTime ? (
            <p className="text-gray-700 dark:text-gray-100">
              {selectedDateTime.toString()}
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-100">
              No date and time selected
            </p>
          )}
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          defaultView="month"
          className="h-[400px] w-full bg-calendar-bg text-calendar-text dark:bg-calendar-bg-dark dark:text-calendar-text-dark"
        />
      </div>
    </div>
  );
};

export default index;
