import React, { useContext, useEffect, useRef } from 'react';
import { UserRoleContext } from '../../../context';
import { BsThreeDots } from 'react-icons/bs';

const HeadCard = ({
  head,
  hanldeUpdate,
  handleDelete,
  activeDropdown,
  setActiveDropdown,
  index,
}) => {
  const { name } = head;

  const { loginUser } = useContext(UserRoleContext);
  const isDropdownOpen = activeDropdown === index;

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-56 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-end px-3 pt-2 relative" ref={dropdownRef}>
        <button
          id={`dropdownButton-${index}`} // Unique ID for each button
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <BsThreeDots size={25} />
        </button>

        {isDropdownOpen && (
          <div
            id={`dropdown-${index}`} // Unique ID for each dropdown menu
            className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute right-0 mt-2"
          >
            <ul className="py-2" aria-labelledby={`dropdownButton-${index}`}>
              <li>
                <button
                  onClick={() => hanldeUpdate(head._id)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800 w-full"
                >
                  Edit
                </button>
              </li>
              {(loginUser.type === 'admin' || loginUser.type === 'manager') && (
                <li>
                  <button
                    onClick={() => handleDelete(head._id)}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-200  dark:hover:bg-gray-800 w-full"
                  >
                    Delete
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="py-3 px-5">
        <p className="text-sm ps-2 font-medium text-gray-500 dark:text-white">
          Head
        </p>
        <p className="mb-2 ps-2 text-xl font-medium text-gray-700 dark:text-white">
          {name}
        </p>
      </div>
    </div>
  );
};

export default HeadCard;
