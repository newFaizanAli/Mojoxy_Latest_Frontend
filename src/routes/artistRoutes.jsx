import React from 'react';
import PrivateLayout from '../layout/PrivateLayout';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import CustomDashboard from '../pages/Dashboard/CustomeDashboard';
import BookingsList from '../pages/Bookings/BookingsList';

// import UpdateBooking from '../pages/Bookings/UpdateBooking';

const artistRoutes = (
  <PrivateLayout>
    <Toaster />
    <Routes>
      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="Dashboard" />
            <CustomDashboard />
          </>
        }
      />

      <Route
        path="/bookings"
        element={
          <>
            <PageTitle title="Bookings" />
            <BookingsList />
          </>
        }
      />
    </Routes>
  </PrivateLayout>
);

export default artistRoutes;
