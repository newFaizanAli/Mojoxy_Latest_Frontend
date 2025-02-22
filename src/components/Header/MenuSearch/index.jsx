import { useNavigate } from 'react-router-dom';
import { menuItems } from '../../Sidebar/menus';
import { useState, useContext, useEffect } from 'react';
import { UserRoleContext } from '../../../context'; // Assuming you have a context for the user's role

const MenuSearch = () => {
  const { loginUser } = useContext(UserRoleContext); // Get the logged-in user context (user's role)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  // Log the loginUser for debugging purposes
  useEffect(() => {
    // console.log('Login User:', loginUser); // Check if loginUser is correctly fetched
  }, [loginUser]);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the menu items based on the search query and the user's role
    const filtered = menuItems
      .map((menu) => {
        if (menu && menu.menu) {
          // Check if the user has access to the menu based on roles
          const hasAccess = menu.roles ? menu.roles.includes(loginUser.type) : true;

          // Filter submenus based on the search query if the user has access
          if (hasAccess) {
            const filteredSubMenu = menu.menu.filter((subMenu) =>
              subMenu.name.toLowerCase().includes(query) &&
              (subMenu.roles ? subMenu.roles.includes(loginUser.type) : true) // Filter submenus by roles
            );

            // Return the menu only if the main name or submenus match the query
            if (
              menu.name.toLowerCase().includes(query) ||
              filteredSubMenu.length > 0 ||
              menu.link.toLowerCase().includes(query)
            ) {
              return { ...menu, menu: filteredSubMenu };
            }
          }
        }
        return null; // Ensure null is returned when no valid menu is found
      })
      .filter(Boolean); // Remove null entries

    setFilteredMenu(filtered);
  };

  const handleMenuSelect = (link) => {
    navigate(link);

    setSearchQuery('');
    setFilteredMenu([]);
  };

  return (
    <div className="relative">
      {/* Search box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for menu..."
        className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
      />

      {/* Filtered menu list - displayed only when search query is not empty */}
      {searchQuery && filteredMenu.length > 0 && (
        <div className="absolute mt-2 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          <div className="max-h-60 overflow-y-auto">
            {filteredMenu.map((menu) => (
              <div key={menu.id} className="p-2">
                <h3 className="text-sm font-semibold dark:text-white">{menu.name}</h3>
                <ul className="ml-4">
                  {menu.menu.map((subMenu) => (
                    <li key={subMenu.id}>
                      <button
                        onClick={() => handleMenuSelect(subMenu.link)} // Close menu on selection
                        className="text-sm text-blue-600 hover:underline block py-1 dark:text-blue-400"
                      >
                        {subMenu.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message when no results are found */}
      {searchQuery && filteredMenu.length === 0 && (
        <div className="absolute mt-2 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 p-2">
          <div className="text-gray-600 dark:text-gray-400">No results found</div>
        </div>
      )}
    </div>
  );
};

export default MenuSearch;
