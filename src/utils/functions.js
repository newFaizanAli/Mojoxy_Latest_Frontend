import fireToast from '../hooks/fireToast';
import { MINPASSLENGTH, MAXPASSLENGTH, DATAPERPAGE } from './constants';

export const fetchData = async (method, url, body, form) => {
  const fullUrl = `http://localhost:8000${url}`;
  // const vercelUrl = `https://mojoxy-backend.vercel.app${url}`;
  const options = {
    method: method,
    body: form ? body : JSON.stringify(body),
    credentials: 'include',
  };

  if (!form) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    // vercel url
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error.message);
    throw error;
  }
};

// Password validator

export function validatePassword(password) {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  if (password.length < MINPASSLENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MINPASSLENGTH} characters long.`,
    };
  }

  if (password.length > MAXPASSLENGTH) {
    return {
      isValid: false,
      message: `Password must not exceed ${MAXPASSLENGTH} characters.`,
    };
  }

  if (!upperCaseRegex.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter.',
    };
  }

  if (!lowerCaseRegex.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter.',
    };
  }

  if (!numberRegex.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number.',
    };
  }

  if (!specialCharacterRegex.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character.',
    };
  }

  return { isValid: true, message: 'Password is valid.' };
}

// Query Search

export function handleQuerySearch(
  data,
  searchQuery,
  setFilterData,
  searchField,
) {
  if (!searchQuery) {
    setFilterData(data);
    return;
  }

  const filtered = data.filter((list) =>
    list[searchField]?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  setFilterData(filtered);
}

// pagination index

export const pageData = (currentPage, filterdData) => {
  const indexOfLastData = currentPage * DATAPERPAGE;
  const indexOfFirstData = indexOfLastData - DATAPERPAGE;
  return filterdData.slice(indexOfFirstData, indexOfLastData);
};

// hanlde Delete

export const handleDelete = async (confirmMessage, method, url, handleFetch, body, reFetch) => {
  const confirmDelete = window.confirm(
    confirmMessage
  );
  if (!confirmDelete) return;

  try {
    await handleFetch(method, url, body && body);

    await reFetch();
  } catch (error) {
   console.error(error.message)
  }
};
