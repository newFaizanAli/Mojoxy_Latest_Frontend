import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import fireToast from '../../hooks/fireToast';
import { validatePassword } from '../../utils/functions';
import { useFormik } from 'formik';
import { forgotPasswordSchema } from '../../validation/schemas';
import Auth from './Auth';
import FormikError from '../../components/Text/FormikError';
import { CiMail } from 'react-icons/ci';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const ForgotPassword = () => {
  const [emailValidated, setEmailValidated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const [displayPass, setDisplayPass] = useState(false);

  const { handleFetch } = useFetch();

  const handleLogin = useCallback(async (values) => {
    try {
      const resp = await handleFetch('POST', `/validate-email`, { ...values });

      if (resp.success) {
        setUserEmail(values.email);
        setEmailValidated(true);
      }
    } catch (error) {
      console.error('Error validating email:', error);
    }
  }, []);

  const handleResetPassword = useCallback(async (values) => {
    try {
      if (values.password) {
        const Password = validatePassword(values.password);
        if (Password.isValid) {
          const resp = await handleFetch('POST', '/resetpassword', {
            email: values.email,
            password: values.password,
          });

          if (resp.success) {
            navigate('/');
          }
        } else {
          fireToast(Password.message, Password.isValid);
        }
      } else {
        fireToast('Password is required', false);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      if (!emailValidated) {
        handleLogin(values);
      } else {
        handleResetPassword(values);
      }
    },
  });

  return (
    <Auth
      children={
        <>
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              {emailValidated ? 'Reset Password' : 'Forgot Password'}
            </h2>

            <form onSubmit={formik.handleSubmit}>
              {!emailValidated ? (
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
              ) : (
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
                        <RiEyeLine size={25} />
                      ) : (
                        <RiEyeCloseLine size={25} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  {' '}
                  {emailValidated ? 'Reset Password' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </>
      }
    />
  );
};

export default ForgotPassword;
