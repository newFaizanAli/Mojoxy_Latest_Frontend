import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BookingSchema } from '../../validation/schemas';
import { useFetch } from '../../hooks/useFetch';
import Form from './Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import fireToast from '../../hooks/fireToast';
import BookingCalendar from './Calendar'

const AddBooking = () => {
  const { handleFetch } = useFetch();
  const [artistBookings, setArtistBookings] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location?.state;
  
  const fetchBookings = async () => {
    // const subitemId = location.state.itemID;
    const subitemId = locationData?.itemID
    const response = await handleFetch('GET', `/artist-bookings/${subitemId}`);

    if (response.bookings) {
      setArtistBookings(response.bookings);
    }
  };

  const initalValue = {
    date: '',
    time: '',
    location: '',
    customerName: '',
    customerContact: '',
    customerEmail: '',
    subitemId: locationData?.itemID || '',
    subitemName: locationData?.itemName || '',
    subitemEmail: locationData?.itemEmail || '',
    hour: 0,
    amount: 0,
  };


  useEffect(() => {
    if (!locationData || !locationData.itemID) {
      navigate("/artists/list");
    } else {
      fetchBookings();
    }
  }, [locationData, navigate]); 
 

  const formik = useFormik({
    initialValues: initalValue,
    validationSchema: BookingSchema,
    onSubmit: async (values) => {
      try {
        if (!selectedDateTime) {
          fireToast("Please select a date and time from the calendar.", false);
          return;
        }
        const selectedDate = selectedDateTime.toISOString().split("T")[0];
        const selectedTime = selectedDateTime.toTimeString().split(" ")[0];
        values.date = selectedDate;
        values.time = selectedTime;
 
        // console.log(values)
       
        
        handleFetch("POST", "/useraddbooking", { ...values, date: selectedDate, time: selectedTime, approved: false });
      } catch (e) {
        fireToast(e.message, 'error');
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />
      <Breadcrumb pageName="Add Booking" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Booking Information
              </h3>
            </div>
            <div className="p-7">
              <Form formik={formik} locationData={locationData} />
            </div>
          </div>
        </div>
        {/* Calendar */}

        <BookingCalendar
          selectedDateTime={selectedDateTime}
           setSelectedDateTime={setSelectedDateTime}
           artistBookings={artistBookings}
         />
       
      </div>
    </div>
  );
};

export default AddBooking;
