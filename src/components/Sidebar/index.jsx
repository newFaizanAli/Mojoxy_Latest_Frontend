import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo.png';
import { UserRoleContext } from '../../context';
import SidebarLinkGroup from './SidebarLinkGroup';
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { RiAppsFill, RiFolderLockLine, RiCalendar2Line } from 'react-icons/ri';

import { menuItems } from './menus';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { loginUser } = useContext(UserRoleContext);
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // const filteredMenuItems = menuItems.filter((item) =>

  //   item.roles.includes(loginUser.type),
  // );

  const filteredMenuItems = menuItems.filter(
    (item) => Array.isArray(item.roles) && item.roles.includes(loginUser.type),
  );

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        {/* <NavLink to="/dashboard">
          <img src={Logo} alt="Logo" />
        </NavLink> */}
        <NavLink to={'/dashboard'} className="flex items-center space-x-2">
          {/* Logo Icon */}
          <img src={Logo} alt="Logo-icon" className="h-14 w-14" />

          {/* Logo Text */}
          <div className="flex flex-col items-center text-gray-200 pt-3">
            <h2 className="icon-text text-4xl font-bold">MOJOXY</h2>
            <hr className="w-32 border-t-1 border-gray-400 my-3" />
            <h3 className="icon-text text-xs tracking-wide">
              Entertainment Unleashed
            </h3>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <MdKeyboardDoubleArrowLeft width={20} height={18} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}

        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <RiAppsFill size={18} />
                  Dashboard
                </NavLink>
              </li>

              {filteredMenuItems.map((item) => (
                <li key={item.id}>
                  {item.menu ? (
                    <SidebarLinkGroup activeCondition={pathname === item.link}>
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <NavLink
                              to="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                pathname === item.link &&
                                'bg-graydark dark:bg-meta-4'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {item.icon}
                              {item.name}
                              <MdOutlineKeyboardArrowDown
                                size={20}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && 'rotate-180'
                                }`}
                              />
                            </NavLink>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && 'hidden'
                              }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                {item.menu.map((e, index) => (
                                  <li key={index}>
                                    <NavLink
                                      to={e.link}
                                      className={({ isActive }) =>
                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                        (isActive && '!text-white')
                                      }
                                    >
                                      {e.name}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  ) : (
                    <NavLink
                      to={item.link}
                      className={`group flex items-center gap-2.5 py-2 px-4 font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes(item.link) &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>

        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
