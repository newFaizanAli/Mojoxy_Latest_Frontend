import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingSchema } from '../../validation/schemas';
import { useFetch } from '../../hooks/useFetch';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Toaster } from 'react-hot-toast';
import Form from './Form';
import BookingCalendar from './Calendar';
import fireToast from '../../hooks/fireToast';

const UpdateBooking = () => {
  const { handleFetch } = useFetch();
  const [artistBookings, setArtistBookings] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location?.state;

  const fetchBookings = async () => {
    const subitemId = locationData.subitemId;

    const response = await handleFetch('GET', `/artist-bookings/${subitemId}`);

    if (response.bookings) {
      setArtistBookings(response.bookings);
    }
  };

  const initialValue = {
    _id: locationData?._id || '',
    subitemId: locationData?.subitemId || '',
    date: locationData?.date
      ? new Date(locationData?.date).toISOString().substring(0, 10)
      : '',
    time: locationData?.time || '',
    location: locationData?.location || '',
    customerName: locationData?.customerName || '',
    customerContact: locationData?.customerContact || '',
    customerEmail: locationData?.customerEmail || '',
    subitemName: locationData?.subitemName || '',
    subitemEmail: locationData?.subitemEmail || '',
    approved: locationData?.approved,
    hour: locationData?.hour,
    amount: locationData?.amount,
  };

  useEffect(() => {
    if (!locationData) {
      navigate('/artists/list');
    } else {
      const initialDate = locationData?.date
        ? new Date(locationData?.date)
        : null;

      setSelectedDateTime(initialDate);
      fetchBookings();
    }
  }, [locationData, navigate]);

  // const approvedBooking = async () => {
  //   const confirmApproved = window.confirm(
  //     `Are you sure you want to approve the booking for ${
  //       locationData.subitemName
  //     } on ${new Date(
  //       locationData.date,
  //     ).toLocaleDateString()}? After approving, you can't unapprove it.`,
  //   );
  //   if (!confirmApproved) return;
  //   try {

  //    const resp =  await handleFetch('POST', '/updatebooking', {
  //       ...locationData,
  //       approved: true,
  //     });
  //    if(resp.success){
  //     navigate('/bookings/list')
  //    }

  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: BookingSchema,
    onSubmit: async (values) => {
      try {
        if (!selectedDateTime) {
          toastDisplay('Please select a date and time from the calendar.');
          return;
        }
        const selectedDate = selectedDateTime.toISOString().split('T')[0];
        const selectedTime = selectedDateTime.toTimeString().split(' ')[0];

        values.date = selectedDate;
        values.time = selectedTime;

        if (values.approved && (!values.amount || !values.hour)) {
          fireToast('Kindly provide event timing and amount');
          return;
        }

        await handleFetch('POST', '/updatebooking', {
          ...values,
          date: selectedDate,
          time: selectedTime,
        });
      } catch (e) {
        fireToast(e.message, 'error');
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />
      <Breadcrumb pageName="Update Booking" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Booking Information
              </h3>
            </div>
            <div className="p-7">
              <Form
                formik={formik}
                isUpdate={true}
                isApprove={locationData?.approved}
                approvedBooking={() => approvedBooking()}
              />
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

export default UpdateBooking;
