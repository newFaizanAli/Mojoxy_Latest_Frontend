import React, { useContext } from 'react';
import { UserRoleContext } from '../../../context';
import { CiMail, CiUser, CiLocationOn } from 'react-icons/ci';
import FormikError from '../../../components/Text/FormikError';

const index = ({
  formik,
  isUpdate,
  isApprove,
  approvedBooking,
  locationData,
}) => {
  const { loginUser } = useContext(UserRoleContext);
  const isDisplay = false;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        {locationData && (
          <span className="p-2 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary rounded-md bg-indigo-50">
            Selected Artist | {locationData?.itemName}
          </span>
        )}
      </div>

      {loginUser.type === 'admin' && (
        <>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="location"
              >
                Customer Name
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <CiUser color="#6C6C6C" size={25} />
                </span>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="customerName"
                  id="customerName"
                  placeholder="Enter customer name"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  disabled={isDisplay}
                />
                <FormikError formik={formik} fieldName={'customerName'} />
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="customerContact"
              >
                Customer Contact
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <CiUser color="#6C6C6C" size={25} />
                </span>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="customerContact"
                  id="customerContact"
                  placeholder="Enter customer contact"
                  value={formik.values.customerContact}
                  onChange={formik.handleChange}
                  disabled={isDisplay}
                />
                <FormikError formik={formik} fieldName={'customerContact'} />
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="customerEmail"
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
                  name="customerEmail"
                  id="customerEmail"
                  placeholder="Enter customer email"
                  value={formik.values.customerEmail}
                  onChange={formik.handleChange}
                  disabled={isDisplay}
                />
                <FormikError formik={formik} fieldName={'customerEmail'} />
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="hour"
              >
                Hour
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="hour"
                  id="hour"
                  placeholder="Enter event hour"
                  value={formik.values.hour}
                  onChange={formik.handleChange}
                  disabled={isDisplay}
                />
                <FormikError formik={formik} fieldName={'hour'} />
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="amount"
              >
                Amount
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  disabled={isDisplay}
                />
                <FormikError formik={formik} fieldName={'amount'} />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="location"
          >
            Location
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-4">
              <CiLocationOn color="#6C6C6C" size={25} />
            </span>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="location"
              id="location"
              placeholder="Enter location"
              value={formik.values.location}
              onChange={formik.handleChange}
              disabled={isDisplay}
            />
            <FormikError formik={formik} fieldName={'location'} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <div className="flex justify-end gap-4.5">
          {/* Display the 'Update' or 'Save' button */}
          {!isApprove && (
            <>
             {(loginUser.type === 'admin' || loginUser.type === 'manager' ) && <div className="">
                <div className="relative">
                  <select
                    name="approved"
                    id="approved"
                    value={formik.values.approved}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'approved',
                        e.target.value === 'true',
                      ); // Convert string to boolean
                    }}
                    className="w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <option value="" className="dark:bg-boxdark">
                      Select approval
                    </option>
                    <option value="true" className="dark:bg-boxdark">
                      Approved
                    </option>
                    <option value="false" className="dark:bg-boxdark">
                      Unapproved
                    </option>
                  </select>

                  <FormikError formik={formik} fieldName={'head'} />
                </div>
              </div>}
              <div>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  {isUpdate ? 'Update' : 'Save'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default index;
