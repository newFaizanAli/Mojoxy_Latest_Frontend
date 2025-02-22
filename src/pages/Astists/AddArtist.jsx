import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { AddArtists } from '../../validation/schemas';
import { useFetch } from '../../hooks/useFetch';
import Form from './Form'
import PictureCard from './Card/PictureCard'
import { RANDOMPASSWORD } from '../../utils/constants';

const AddArtist = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Heads, setHeads] = useState([]);
  const [subHeads, setSubheads] = useState([]);
  const [subTypes, setSubTypes] = useState([]);

  const { handleFetch } = useFetch();

  const fetchHeads = useCallback(async () => {
    const resp = await handleFetch('GET', '/addsubitems');
    if (resp.heads) {
      setHeads(resp.heads);
    }
    if (resp.subhead) {
      setSubheads(resp.subhead);
    }
    if (resp.subtypes) {
      setSubTypes(resp.subtypes);
    }
  }, []);

  useEffect(() => {
    fetchHeads();
  }, [fetchHeads]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue('imageFile', file);
  };

  const initialValues = {
    name: '',
    bio: '',
    imageFile: '',
    base_city: '',
    gender: '',
    email: '',
    head: '',
    subhead: '',
    subtype: '',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: AddArtists,
    onSubmit: async(values) => {
      //   handleFetch('POST', '/profile', values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("imageFile", values.imageFile);
      formData.append("head", values.head);
      formData.append("subhead", values.subhead);
      formData.append("subtype", values.subtype);
      formData.append("base_city", values.base_city);
      formData.append("gender", values.gender);
      formData.append("email", values.email);
      formData.append("password", RANDOMPASSWORD);
      try {
        // console.log(formData)
        await handleFetch("POST", "/addsubitem", formData, true);
        formik.resetForm()
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <div className="mx-auto max-w-270">
        <Toaster />
        <Breadcrumb pageName="Add Artist" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Artist Information
                </h3>
              </div>
              <div className="p-7">
                <Form formik={formik} Heads={Heads} subHeads={subHeads} subTypes={subTypes} />
              </div>
            </div>
          </div>
          {/* Pic */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Artist Picture
                </h3>
              </div>
              <PictureCard formik={formik} handleImageUpload={handleImageUpload} selectedImage={selectedImage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddArtist;
