import React from 'react';

const InputField = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  imageChild,
  htmlFor
}) => {
  return (
    <div className="mb-4.5">
      {label && (
        <label className="mb-2.5 block text-black dark:text-white" htmlFor={htmlFor}>
          {label}
        </label>
      )}

      <span className="absolute left-4.5 top-4">{imageChild}</span>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <input
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            value
              ? 'text-black dark:text-white'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;
