
import { FaUser, FaBookmark } from "react-icons/fa";
import { FaDeviantart } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";


 
 export const menuItems = [
   
    {
      id: 1,
      name: 'Users',
      link: '/users',
      menu: [
        { id: 1, name: 'Add User', link: '/users/add' },
        { id: 2, name: 'User List', link: '/users/list' }, 
      ],
      icon: <FaUser  size={18} />,
      roles: ['admin', 'manager'],
    },
    {
      id: 2,
      name: 'Artists',
      link: '/artists',
      menu: [
        { id: 1, name: 'Add Artist', link: '/artists/add' },
        { id: 2, name: 'Artist List', link: '/artists/list' }, 
        { id: 3, name: 'Register Artist', link: '/artists/register/list' }, 
      ],
      icon: <FaDeviantart  size={18} />,
      roles: ['admin', 'manager'],
    },
    {
      id: 3,
      name: 'Bookings',
      link: '/bookings',
      menu: [
        { id: 1, name: 'Add Booking', link: '/bookings/add' }, 
        { id: 2, name: 'Booking List', link: '/bookings/list' }, 
      ],
      icon: <FaBookmark  size={18} />,
      roles: ['admin', 'manager'],
    },
    {
      id: 4,
      name: 'Heads',
      link: '/heads',
      menu: [
        { id: 1, name: 'Heads', link: '/heads/main' }, 
        { id: 2, name: 'Subheads', link: '/heads/subheads' }, 
        { id: 3, name: 'Subtypes', link: '/heads/subtypes' }, 
      ],
      icon: <MdCategory  size={18} />,
      roles: ['admin', 'manager'],
    },
    {
      id: 5,
      name: 'Artist',
      link: '/artists/list',
      icon: <MdCategory  size={18} />,
      roles: ['user'],
    },
    {
      id: 6,
      name: 'Bookings',
      link: '/bookings',
      icon: <FaBookmark  size={18} />,
      roles: ['user', 'artist'],
    },
  ];