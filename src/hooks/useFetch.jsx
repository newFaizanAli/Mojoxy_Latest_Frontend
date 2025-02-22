import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/functions';
import { UserRoleContext } from '../context';
import fireToast from './fireToast';

export const useFetch = () => {
  const navigate = useNavigate();
  const { logout, login, setLoginUser } = useContext(UserRoleContext);

  const handleFetch = useCallback(
    async (method, url, body, form) => {
      try {
        const result = await fetchData(method, url, body, form);
        

        if (result.message) {
          fireToast(result.message, result.success);
        }

        if(result.loginUser){
          setLoginUser(result.loginUser)
        }

        if (result.login && result.login === true) {
          login();
          navigate("/dashboard");
        }


        if (result.token === false) {
          logout();
          navigate("/");
          // return;
        }

        // if (result.message) {
        //   toastDisplay(result.message);
        // }

        return result;
      } catch (e) {
        console.error('Error during fetch:', e.message);
        fireToast("An error occurred. Please try again.", false);
      }
    },
    [logout, navigate],
  );

  return { handleFetch };
};
