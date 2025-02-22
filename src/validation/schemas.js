import * as Yup from 'yup';

export const signInSchema = Yup.object({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

export const signUpSchema = Yup.object({
  name: Yup.string().required('name is required'),
  username: Yup.string().required('username is required'),
  phno: Yup.string()
    .matches(/^[0-9]+$/, 'phone number must only contain digits')
    .matches(
      /^3\d{9}$/,
      'phone number must start with 03 and be exactly 11 digits',
    )
    .required('phone number is required'),
  // usertype: Yup.string().required("Usertype is Required"),
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

export const addUser = Yup.object({
  name: Yup.string().required('name is Required'),
  username: Yup.string().required('username is Required'),
  phno: Yup.string()
    .matches(/^[0-9]+$/, 'phone number must only contain digits')
    .matches(
      /^3\d{9}$/,
      'Phone number must start with 03 and be exactly 11 digits',
    ).required('Phone number is required'),
  usertype: Yup.string().required('usertype is required'),
  email: Yup.string().email().required('email is required'),
  password: Yup.string(),
  status: Yup.string(),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string(),
});

export const updateProfileSchema = Yup.object({
  name: Yup.string().required("name is required"),
  username: Yup.string().required("username is required"),
  phno: Yup.number().positive().required("phone number is required"),
  usertype: Yup.string().required("user type is required"),
  email: Yup.string().email("invalid email").required("email is required"),
});


export const AddArtists = Yup.object({
  name: Yup.string().required("name is required"),
  bio: Yup.string().required("bio is required"),
  imageFile: Yup.mixed(),
  head: Yup.string().required("head is required"),
  subhead: Yup.string().required("subhead is required"), 
  subtype: Yup.string().required("subtype is required"),
  base_city: Yup.string().required("city base is required"),
  gender: Yup.string().required("gender is required"),
  email: Yup.string().email().required("email is required"),
});

export const BookingSchema = () =>
  Yup.object({
    location: Yup.string().required("location is required"),
  });

export const RegisterArtistSchema = () =>
  Yup.object({
    name: Yup.string().required("name is required"),
  bio: Yup.string().required("bio is required"),
  imageFile: Yup.mixed(),
  head: Yup.string().required("head is required"),
  subhead: Yup.string().required("subhead is required"), 
  subtype: Yup.string().required("subtype is required"),
  base_city: Yup.string().required("city base is required"),
  gender: Yup.string().required("gender is required"),
  email: Yup.string().email().required("email is required"),
    phno: Yup.string()
    .matches(/^[0-9]+$/, 'phone number must only contain digits')
    .matches(
      /^3\d{9}$/,
      'phone number must start with 03 and be exactly 11 digits',
    )
    .required('phone number is required'),
  });
