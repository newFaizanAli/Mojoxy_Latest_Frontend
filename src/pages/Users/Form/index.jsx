import React, { useContext } from 'react';
import { UserRoleContext } from '../../../context';
import { Toaster } from 'react-hot-toast';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { CiMail, CiUser } from 'react-icons/ci';
import FormikError from '../../../components/Text/FormikError';

const index = ({ formik, title, isUpdate }) => {
  const { loginUser } = useContext(UserRoleContext);

  return (
    <div className="mx-auto max-w-270">
      <Toaster />
      <Breadcrumb pageName={title} />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiUser color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your full name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      <FormikError formik={formik} fieldName={'name'} />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiUser color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="enter your username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      />
                      <FormikError formik={formik} fieldName={'name'} />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiMail color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <FormikError formik={formik} fieldName={'email'} />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Phno
                    </label>
                    <div className="relative">
                      {/* <span className="absolute left-4.5 top-4">
                          <CiMail color="#6C6C6C" size={25} />
                        </span> */}
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="phno"
                        id="phno"
                        placeholder="Enter phone number"
                        value={formik.values.phno}
                        onChange={formik.handleChange}
                      />
                      <FormikError formik={formik} fieldName={'phno'} />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="usertype"
                    >
                      Usertype
                    </label>
                    <select
                      name="usertype"
                      id="usertype"
                      value={formik.values.usertype}
                      onChange={formik.handleChange}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    >
                      <option value="" className="dark:bg-boxdark">
                        select user-type
                      </option>
                      <option value="subadmin" className="dark:bg-boxdark">
                        Subadmin
                      </option>
                      {/* <option value="artist" className="dark:bg-boxdark">
                        Artist
                      </option> */}
                      <option value="user" className="dark:bg-boxdark">
                        User 
                      </option>
                      {loginUser.type === 'manager' && (
                        <>
                          <option value="admin" className="dark:bg-boxdark">
                            Admin
                          </option>
                          <option value="manager" className="dark:bg-boxdark">
                            Manager
                          </option>
                        </>
                      )}
                    </select>
                    <FormikError formik={formik} fieldName="usertype" />
                  </div>

                  {isUpdate && (
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      >
                        <option value="" className="dark:bg-boxdark">
                          select status
                        </option>
                        <option value={true} className="dark:bg-boxdark">
                          Active
                        </option>
                        <option value={false} className="dark:bg-boxdark">
                          Blocked
                        </option>
                      </select>
                      <FormikError formik={formik} fieldName="status" />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    {isUpdate ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
