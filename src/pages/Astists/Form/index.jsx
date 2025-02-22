import React from 'react';
import FormikError from '../../../components/Text/FormikError';
import { CiMail, CiUser, CiPhone } from 'react-icons/ci';
import { MdOutlineEditNote } from 'react-icons/md';

const index = ({ formik, Heads, subHeads, subTypes, isUpdate }) => {
  return (
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
            Head
          </label>
          <div className="relative">
            <select
              name="head"
              id="head"
              value={formik.values.head}
              onChange={formik.handleChange}
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select head
              </option>
              {Heads?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>

            <FormikError formik={formik} fieldName={'head'} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="subhead"
          >
            Subhead
          </label>
          <div className="relative">
            <select
              name="subhead"
              id="subhead"
              value={formik.values.subhead}
              onChange={formik.handleChange}
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select subhead
              </option>
              {subHeads?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>

            <FormikError formik={formik} fieldName={'subhead'} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="subtype"
          >
            Subtype
          </label>
          <div className="relative">
            <select
              name="subtype"
              id="subtype"
              value={formik.values.subtype}
              onChange={formik.handleChange}
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select subtype
              </option>
              {subTypes?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>

            <FormikError formik={formik} fieldName={'subtype'} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="base_city"
          >
            Base City
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="base_city"
              id="base_city"
              placeholder="Enter base city"
              value={formik.values.base_city}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={'base_city'} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="gender"
          >
            Gender
          </label>
          <div className="relative">
            <select
              name="gender"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select gender
              </option>
              <option value={'male'} className="dark:bg-boxdark">
                Male
              </option>
              <option value={'female'} className="dark:bg-boxdark">
                Female
              </option>
            </select>
            <FormikError formik={formik} fieldName={'gender'} />
          </div>
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="Username"
        >
          BIO
        </label>
        <div className="relative">
          <span className="absolute left-4.5 top-4">
            <MdOutlineEditNote size={25} />
          </span>

          <textarea
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            name="bio"
            id="bio"
            rows={6}
            placeholder="Write bio here"
            value={formik.values.bio}
            onChange={formik.handleChange}
          ></textarea>
          <FormikError formik={formik} fieldName={'bio'} />
        </div>
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
  );
};

export default index;
