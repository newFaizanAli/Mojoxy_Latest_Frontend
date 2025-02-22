import React, { useContext, useEffect, useState } from 'react';
import fireToast from '../../hooks/fireToast';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Pagenator from '../../components/Paginator';
import { DATAPERPAGE } from '../../utils/constants';
import { CiSearch } from 'react-icons/ci';

import BookingCard from './Card';

import {
  handleDelete,
  handleQuerySearch,
  pageData,
} from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { UserRoleContext } from '../../context';

const ArtistsList = () => {
  const [data, setData] = useState([]);
  const [filterdData, setFilterData] = useState([]);
  const { handleFetch } = useFetch();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserRoleContext);

  const fetchBookings = async () => {
    try {
      const url =
        loginUser.type === 'user'
          ? '/userbookings'
          : loginUser.type === 'artist'
          ? '/artistbookings'
          : '/bookings';
      const result = await handleFetch('GET', url);

      setData(result.bookingList);
      setFilterData(result.bookingList);
    } catch (error) {
      fireToast(error.message, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (booking) => {
    await handleDelete(
      `Are you sure you want to delete booking for ${
        booking.subitemName
      } on ${new Date(booking.date).toLocaleDateString()}?`,
      'POST',
      '/deletebooking',
      handleFetch,
      {
        bookingId: booking._id,
      },
      fetchBookings,
    );
  };

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilterData, 'code');
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filterdData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="Bookings List" />

      <div className="relative my-3">
        <span className="absolute left-4.5 top-4">
          <CiSearch color="#6C6C6C" size={25} />
        </span>
        <input
          className="w-96 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          id="searchQuery"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {currentData.map((booking, index) => {
          return (
            <BookingCard
              key={index}
              booking={booking}
              navigate={navigate}
              deleteBooking={deleteBooking}
              loginUser={loginUser}
            />
          );
        })}
      </div>

      <Pagenator
        DATAPERPAGE={DATAPERPAGE}
        filteredData={filterdData}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default ArtistsList;
