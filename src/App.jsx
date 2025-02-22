import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import { UserRoleContext } from './context';
import fireToast from './hooks/fireToast';
import { fetchData } from './utils/functions';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import artistRoutes from './routes/artistRoutes'

function App() {
  const { isLogin, login, setLoginUser, loginUser } = useContext(UserRoleContext);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  
  // authorize user
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await fetchData('GET', '/check-auth');

        if (result.token && result.token === true) {
          login();
          setLoginUser(result.loginUser);
        }

        setLoading(false);
      } catch (error) {
        fireToast('An error occurred. Please try again.', false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loader />; 

  return isLogin ? (
    loginUser.type === 'admin' ? (
      adminRoutes
    ) : loginUser.type === 'artist' ? (
      artistRoutes 
    ) : (
      userRoutes
    )
  ) : (
    publicRoutes
  );
  
}

export default App;
