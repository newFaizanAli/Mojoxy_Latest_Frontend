import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useFormik } from "formik";
import { signUpSchema } from "../../validation/schemas";
import { useFetch } from "../../hooks/useFetch";
import FormikError from "../../components/Text/FormikError";
import { CiUser, CiMail, CiPhone, CiLock } from "react-icons/ci";
import { validatePassword } from "../../utils/functions";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { OTPEXPIRETIME } from "../../utils/constants";

const SignUp = () => {
  const { handleFetch } = useFetch();
  const [displayPass, setDisplayPass] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpTime, setOtpTime] = useState(null);

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(OTPEXPIRETIME);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const initialValues = {
    name: "",
    username: "",
    phno: "",
    email: "",
    usertype: "user",
    password: "",
  };

  const verifyEmail = async (email) => {
    const response = await handleFetch("POST", "/verify-email", { email });
    if (response.success) {
      handleGenerateOTP(email);
    }
  };

  const handleGenerateOTP = async (email) => {
    const response = await handleFetch("POST", "/generate-otp", { email });

    setGeneratedOtp(response.otp);
    setOtpTime(Date.now());
    setCountdown(OTPEXPIRETIME);
    setIsOtpExpired(false);
  };

  const handleVerifyOTP = async () => {
    const response = await handleFetch("POST", "/verify-otp", {
      email: formik.values.email,
      otp,
    });

    if (response.success) {
      await handleFetch("POST", "/signup", formik.values);
      formik.resetForm();
      setGeneratedOtp(null);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const validatePass = validatePassword(values.password);
      if (!validatePass.isValid) {
        fireToast(validatePass.message, validatePass.isValid);
      } else {
        verifyEmail(values.email);
      }
    },
  });

  useEffect(() => {
    if (otpTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - otpTime) / 1000);
        const remaining = Math.max(OTPEXPIRETIME - elapsed, 0);
        setCountdown(remaining);

        if (remaining === 0) {
          clearInterval(interval);
          setIsOtpExpired(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (generatedOtp) {
    return (
      <Auth
        children={
          <>
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Mojoxy
              </h2>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Enter OTP
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter the OTP"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                {!isOtpExpired ? (
                  <p className="text-md text-gray-500">
                    OTP expires in:{" "}
                    <span className="text-red-500">{formatTime(countdown)}</span>
                  </p>
                ) : (
                  <p className="text-md text-gray-400 mt-2">
                    OTP expired.{" "}
                    <button
                      onClick={() => handleGenerateOTP(formik.values.email)}
                      className="text-indigo-500 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </p>
                )}
              </div>

              <button
                type="button"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          </>
        }
      />
    );
  }

  return (
    <Auth
      children={
        <>
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to Mojoxy
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete="name"
                  />
                  <FormikError formik={formik} fieldName="name" />
                  <span className="absolute right-4 top-4">
                    <CiUser color="#6C6C6C" size={25} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    autoComplete="username"
                  />
                  <FormikError formik={formik} fieldName="username" />
                  <span className="absolute right-4 top-4">
                    <CiUser size={25} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="phno"
                    name="phno"
                    type="number"
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.phno}
                    onChange={formik.handleChange}
                    autoComplete="phno"
                  />
                  <FormikError formik={formik} fieldName="phno" />
                  <span className="absolute right-4 top-4">
                    <CiPhone size={25} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="email"
                  />
                  <FormikError formik={formik} fieldName="email" />
                  <span className="absolute right-4 top-4">
                    <CiMail size={25} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={displayPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    autoComplete="new-password"
                  />

                  <FormikError formik={formik} fieldName="password" />
                  <button
                    className="absolute right-4 top-4"
                    type="button"
                    onClick={() => setDisplayPass(!displayPass)}
                  >
                    {displayPass ? (
                      <RiEyeLine className="text-gray-400" size={25} />
                    ) : (
                      <RiEyeCloseLine className="text-gray-400" size={25} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Create account"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </>
      }
    />
  );
};

export default SignUp;
