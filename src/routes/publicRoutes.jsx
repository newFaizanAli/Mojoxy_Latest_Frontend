import React from 'react';
import PublicLayout from '../layout/PublicLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import PageTitle from '../components/PageTitle';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Artists from '../pages/publicPages/Artist';
import ArtistProfile from '../pages/publicPages/Artist/profile'
import RegisterArtist from '../pages/Astists/Register/RegisterArtist';

const publicRoutes = (
  <PublicLayout>
    <Toaster />
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Home" />
            <Home />
          </>
        }
      />
       <Route
        path='/artists'
        element={
          <>
            <PageTitle title="Our Artists" />
            <Artists />
          </>
        }
      />
      <Route
        path='/artist/profile'
        element={
          <>
            <PageTitle title="Artist Profile" />
            <ArtistProfile />
          </>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup" />
            <SignUp />
          </>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <>
            <PageTitle title="Forgot Password" />
            <ForgotPassword />
          </>
        }
      />
        <Route
        path="/artist/register"
        element={
          <>
            <PageTitle title="Register Artist" />
            <RegisterArtist />
          </>
        }
      />
    </Routes>
  </PublicLayout>
);

export default publicRoutes;
