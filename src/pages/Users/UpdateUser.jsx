import React, { useEffect, useMemo } from 'react';
import { addUser } from '../../validation/schemas';
import { useFormik } from 'formik';
import { useFetch } from '../../hooks/useFetch';
import fireToast from '../../hooks/fireToast';
import Form from './Form'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate()
  const location = useLocation()

  const initialValue = useMemo(
    () => ({
      name: location.state?.name,
      username: location.state?.username,
      phno: location.state?.phno,
      email: location.state?.email,
      usertype: location.state?.usertype,
      password: location.state?.password,
      status: location.state?.status,
    }),
    [location.state]
  );


  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: addUser,
    onSubmit: async(values) => {
      try{
       await handleFetch("POST", "/updateuser", values);
      }
      catch(e){
         fireToast(e.message, 'error')
      }
      
    },
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [navigate, location.state]);

  return (
    <Form formik={formik} title={'Update User'} isUpdate={true} />
  );
};

export default UpdateUser;
