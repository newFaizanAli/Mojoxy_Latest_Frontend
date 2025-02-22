import { Link } from 'react-router-dom';
// import Logo from '../../../images/logo/logo-icon.svg';
import Logo from '../../../images/logo/logo.png';

import DarkModeSwitcher from '../DarkModeSwitcher';

const Header = () => {
  return (
    <div className="fixed top-5 left-0 right-0 mx-auto z-999 flex w-[90%] max-w-screen-2xl bg-transparent backdrop-blur-md dark:bg-boxdark/30 rounded-full flex-grow items-center justify-center px-4 py-4 shadow-md md:px-6 2xl:px-11 ">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Main link */}
        <Link className="block flex-shrink-0" to="/">
          <img src={Logo} height={50} width={50} alt="Logo-icon" />
        </Link>
        {/* Mojoxy */}
      </div>

      <div className="hidden sm:block mx-auto">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 2xsm:gap-7">
        {/* <ul className="flex items-center gap-2 2xsm:gap-4">
         
          <DarkModeSwitcher />
        </ul> */}

        {/* Auth Area */}
        <div>
          <Link
            to={'/auth/signin'}
            className="inline-block py-2 px-4 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-700 text-white transition delay-200 hover:bg-gray-100 hover:text-indigo-700 font-medium rounded-full"
          >
            Sign In
          </Link>
        </div>
        {/* Auth Area */}
      </div>
    </div>
  );
};

export default Header;
