import React from 'react';
import { addUser } from '../../validation/schemas';
import { useFormik } from 'formik';
import { useFetch } from '../../hooks/useFetch';
import fireToast from '../../hooks/fireToast';
import Form from './Form'
import { RANDOMPASSWORD } from '../../utils/constants';

const AddUser = () => {
  const { handleFetch } = useFetch();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      phno: '',
      email: '',
      usertype: '',
      password: RANDOMPASSWORD,
      status: true
    },
    validationSchema: addUser,
    onSubmit: async(values) => {
      try{
        await handleFetch('POST', '/register', values)
      }
      catch(e){
         fireToast(e.message, 'error')
      }
      
    },
  });

  return (
    <Form formik={formik} title={'Add User'} />
  );
};

export default AddUser;
