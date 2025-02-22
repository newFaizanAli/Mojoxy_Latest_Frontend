import { Formik, useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FormikError from '../../../components/Text/FormikError';
import { RegisterArtistSchema } from '../../../validation/schemas';
import { CiMail, CiUser, CiPhone } from 'react-icons/ci';
import { MdOutlineEditNote } from 'react-icons/md';
import { useFetch } from '../../../hooks/useFetch';
import PictureCard from '../Card/PictureCard';

const RegisterArtist = () => {
  const { handleFetch } = useFetch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [heads, setHeads] = useState([]);
  const [subHeads, setSubHeads] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [subheadList, setSubheadList] = useState([]);
  const [subtypeList, setSubtypeList] = useState([]);

  const fetchHeads = useCallback(async () => {
    const response = await handleFetch('GET', '/addartist');
    if (response) {
      setHeads(response?.heads || []);
      setSubHeads(response?.subhead || []);
      setSubTypes(response?.subtypes || []);
    }
  }, [handleFetch]);

  useEffect(() => {
    fetchHeads();
  }, []);

  const handleSubhead = (id) => {
    if (id) {
      const filterSubhead = subHeads.filter((e) => {
        return e.head._id === id;
      });
      setSubheadList(filterSubhead);
    }
  };

  const handleSubtype = (id) => {
    if (id) {
      const filterSubtype = subTypes.filter((e) => {
        return e.subhead._id === id;
      });
      setSubtypeList(filterSubtype);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue('imageFile', file);
  };

  const initialValues = useMemo(
    () => ({
      name: '',
      bio: '',
      imageFile: '',
      base_city: '',
      gender: '',
      email: '',
      head: '',
      subhead: '',
      subtype: '',
      phno: 0,
    }),
    [],
  );

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterArtistSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('bio', values.bio);
      formData.append('imageFile', values.imageFile);
      formData.append('head', values.head);
      formData.append('subhead', values.subhead);
      formData.append('subtype', values.subtype);
      formData.append('base_city', values.base_city);
      formData.append('gender', values.gender);
      formData.append('email', values.email);
      formData.append('phno', values.phno);
      try {
        await handleFetch('POST', '/registerartist', formData, true);
        formik.resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 min-h-screen w-full h-full bg-gray-900">
     
      <div className="grid grid-cols-5 gap-8 bg-gray-800/30 px-3 py-5">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm px-3">
            <h2 className="text-2xl font-semibold py-3">Register as Artist</h2>

            <div className="">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiUser color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
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
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="phno"
                    >
                      Contact No
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiPhone color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
                        type="number"
                        name="phno"
                        id="phno"
                        placeholder="Enter your contact no"
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
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="emailAddress"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CiMail color="#6C6C6C" size={25} />
                      </span>
                      <input
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
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
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="emailAddress"
                    >
                      Head
                    </label>
                    <div className="relative">
                      <select
                        name="head"
                        id="head"
                        value={formik.values.head}
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleSubhead(e.target.value);
                        }}
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
                      >
                        <option value="" className="dark:bg-boxdark">
                          select head
                        </option>
                        {heads?.map((e, index) => (
                          <option
                            key={index}
                            value={e._id}
                            className="dark:bg-boxdark"
                          >
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
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="subhead"
                    >
                      Subhead
                    </label>
                    <div className="relative">
                      <select
                        name="subhead"
                        id="subhead"
                        value={formik.values.subhead}
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                    formik.handleChange(e);
                    handleSubtype(e.target.value);
                  }}
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
                      >
                        <option value="" className="dark:bg-boxdark">
                          select subhead
                        </option>
                        {subheadList?.map((e, index) => (
                          <option
                            key={index}
                            value={e._id}
                            className="dark:bg-boxdark"
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>

                      <FormikError formik={formik} fieldName={'subhead'} />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
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
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
                      >
                        <option value="" className="dark:bg-boxdark">
                          select subtype
                        </option>
                        {subtypeList?.map((e, index) => (
                          <option
                            key={index}
                            value={e._id}
                            className="dark:bg-boxdark"
                          >
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
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="base_city"
                    >
                      Base City
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
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
                      className="mb-3 block text-sm font-medium text-white"
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
                        className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
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
                    className="mb-3 block text-sm font-medium text-white"
                    htmlFor="Username"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <MdOutlineEditNote size={25} />
                    </span>

                    <textarea
                      className="w-full rounded border py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-gray-800 text-white focus:border-primary"
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
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Pic */}
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm  bg-gray-800">
            <div className=" py-4 px-7 ">
              <h3 className="font-medium text-white">Artist Picture</h3>
            </div>
            <PictureCard
              formik={formik}
              handleImageUpload={handleImageUpload}
              selectedImage={selectedImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterArtist;
