import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { AddArtists } from '../../validation/schemas';
import { useFetch } from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from './Form';
import PictureCard from './Card/PictureCard';

const UpdateArtist = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Heads, setHeads] = useState([]);
  const [subHeads, setSubheads] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const initalStateValue = location.state;

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

  useEffect(() => {
    if (!location.state || !location.state._id) {
      navigate('/artist/list');
    }
    const base64String = btoa(
      String.fromCharCode(
        ...new Uint8Array(initalStateValue?.image?.data.data),
      ),
    );
    setSelectedImage(
      `data:${initalStateValue?.image?.contentType};base64,${base64String}`,
    );

    fetchHeads();
  }, [navigate, location, setSelectedImage, initalStateValue, fetchHeads]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue('imageFile', file);
  };

  const initialValues = {
    _id: initalStateValue?._id,
    name: initalStateValue?.name,
    bio: initalStateValue?.bio,
    imageFile: initalStateValue?.image || '',
    base_city: initalStateValue?.base_city || '',
    gender: initalStateValue?.gender || '',
    email: initalStateValue?.email || '',
    head: initalStateValue?.head?._id || '',
    subhead: initalStateValue?.subhead?._id || '',
    subtype: initalStateValue?.subtype?._id || '',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: AddArtists,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('id', values._id);
      formData.append('name', values.name);
      formData.append('bio', values.bio);
      formData.append('head', values.head);
      formData.append('subhead', values.subhead);
      formData.append('subtype', values.subtype);
      formData.append('base_city', values.base_city);
      formData.append('gender', values.gender);
      formData.append('email', values.email);
      // previous email
      formData.append('prevemail', initalStateValue?.email);
      if (values.imageFile instanceof File) {
        formData.append('imageFile', values.imageFile);
      }

      try {
        await handleFetch('POST', '/updatesubitem', formData, true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <>
      <div className="mx-auto max-w-270">
        <Toaster />
        <Breadcrumb pageName="Update Artist" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Artist Information
                </h3>
              </div>
              <div className="p-7">
                <Form
                  formik={formik}
                  Heads={Heads}
                  subHeads={subHeads}
                  subTypes={subTypes}
                  isUpdate={true}
                />
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
              <PictureCard formik={formik} selectedImage={selectedImage} handleImageUpload={handleImageUpload} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateArtist;
