import React from 'react';

const FormikError = ({ formik, fieldName }) => {
  // Check if the field has been touched and has an error
  return (
    formik && formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-indigo-500 text-sm">{formik.errors[fieldName]}</div>
    ) : null
  );
}

export default FormikError;
