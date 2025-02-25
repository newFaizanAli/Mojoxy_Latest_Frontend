import React from 'react';
import Header from '../components/Header/PublicHeader';
import PublicFooter from '../components/Footer/publicFooter'
import { useLocation } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const pages = ['/auth', '/artist/register']
  const isDisplay = pages.some(path => location.pathname.startsWith(path));

  return (
    // from-indigo-500 via-purple-500 to-indigo-600
    <div className="  h-auto" style={{backgroundColor:'black'}}>
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-hidden overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
       
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
        {!isDisplay && <Header  />}
          <div className="mx-auto">
            {children}
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
       
        {!isDisplay &&  <PublicFooter />}
     
      </div>
    </div>
  );
};

export default PublicLayout;
