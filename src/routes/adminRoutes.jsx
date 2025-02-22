import React from 'react';
import PrivateLayout from '../layout/PrivateLayout';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import CustomDashboard from '../pages/Dashboard/CustomeDashboard';
import UserLayout from '../layout/user';
import UsersList from '../pages/Users/UsersList';
import Settings from '../pages/Settings';
import AddUser from '../pages/Users/AddUser';
import UpdateUser from '../pages/Users/UpdateUser';
import UpdateArtist from '../pages/Astists/UpdateArtist';
import AddArtist from '../pages/Astists/AddArtist';
import ArtistsList from '../pages/Astists/ArtistsList';
import AdminLayout from '../layout/artist';
import ViewArtist from '../pages/Astists/ViewArtist';
import BookingLayout from '../layout/booking';
import BookingsList from '../pages/Bookings/BookingsList';
import AddBooking from '../pages/Bookings/AddBooking';
import UpdateBooking from '../pages/Bookings/UpdateBooking';
import HeadPage from '../pages/Heads/HeadPage';
import SubheadPage from '../pages/Heads/SubheadPage';
import SubtypePage from '../pages/Heads/SubtypePage';
import RegisterArtistList from '../pages/Astists/Register/RegisterArtistList';

const adminRoutes = (
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

      <Route path="users" element={<UserLayout />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle title="Users List" />
              <UsersList />
            </>
          }
        />

        <Route
          path="add"
          element={
            <>
              <PageTitle title="Add User" />
              <AddUser />
            </>
          }
        />

        <Route
          path="update"
          element={
            <>
              <PageTitle title="Update User" />
              <UpdateUser />
            </>
          }
        />
      </Route>

      <Route path="artists" element={<AdminLayout />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle title="Artists List" />
              <ArtistsList />
            </>
          }
        />

        <Route
          path="register/list"
          element={
            <>
              <PageTitle title="Register Artist List" />
              <RegisterArtistList />
            </>
          }
        />

        <Route
          path="add"
          element={
            <>
              <PageTitle title="Add Artist" />
              <AddArtist />
            </>
          }
        />

        <Route
          path="update"
          element={
            <>
              <PageTitle title="Update Artist" />
              <UpdateArtist />
            </>
          }
        />

        <Route
          path="view"
          element={
            <>
              <PageTitle title="View Artist" />
              <ViewArtist />
            </>
          }
        />
      </Route>

      <Route path="bookings" element={<BookingLayout />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle title="Booking List" />
              <BookingsList />
            </>
          }
        />

        <Route
          path="add"
          element={
            <>
              <PageTitle title="Add Booking" />
              <AddBooking />
            </>
          }
        />

        <Route
          path="update"
          element={
            <>
              <PageTitle title="Update Booking" />
              <UpdateBooking />
            </>
          }
        />

        {/* <Route
          path="view"
          element={
            <>
              <PageTitle title="View Artist" />
              <ViewArtist />
            </>
          }
        /> */}
      </Route>

      <Route path="heads" element={<BookingLayout />}>
        <Route
          path={'main'}
          element={
            <>
              <PageTitle title="Heads" />
              <HeadPage />
            </>
          }
        />

        <Route
          path="subheads"
          element={
            <>
              <PageTitle title="Subheads" />
              <SubheadPage />
            </>
          }
        />

        <Route
          path="subtypes"
          element={
            <>
              <PageTitle title="Subtypes" />
              <SubtypePage />
            </>
          }
        />
      </Route>

      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      />
    </Routes>
  </PrivateLayout>
);

export default adminRoutes;
