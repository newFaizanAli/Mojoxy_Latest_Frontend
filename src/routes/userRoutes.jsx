import React from 'react';
import PrivateLayout from '../layout/PrivateLayout';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import CustomDashboard from '../pages/Dashboard/CustomeDashboard';
import ArtistsList from '../pages/Astists/ArtistsList';
import ViewArtist from '../pages/Astists/ViewArtist';
import BookingsList from '../pages/Bookings/BookingsList';
import AddBooking from '../pages/Bookings/AddBooking';
import UpdateBooking from '../pages/Bookings/UpdateBooking';
// import UpdateBooking from '../pages/Bookings/UpdateBooking';

const userRoutes = (
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
        path="/artists/list"
        element={
          <>
            <PageTitle title="Artists List" />
            <ArtistsList />
          </>
        }
      />
      <Route
        path="/artist/view"
        element={
          <>
            <PageTitle title="View Artists" />
            <ViewArtist />
          </>
        }
      />
      {/* <Route
        path="/calendar"
        element={
          <>
            <PageTitle title="Calendar" />
            <Calendar />
          </>
        }
      /> */}

      <Route
        path="/bookings/add"
        element={
          <>
            <PageTitle title="Add Booking" />
            <AddBooking />
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

      <Route
        path="/bookings/update"
        element={
          <>
            <PageTitle title="Update Bookings" />
            <UpdateBooking />
          </>
        }
      />

      {/* <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile" />
            <Profile />
          </>
        }
      /> */}

      {/* <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      /> */}
    </Routes>
  </PrivateLayout>
);

export default userRoutes;
