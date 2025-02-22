import React, { useEffect, useState } from 'react';
import CardDataStats from '../../../components/CardDataStats';
import { TbBrandBooking, TbUsers, TbMilitaryRank } from 'react-icons/tb';
import { SiMoneygram } from 'react-icons/si';
import { useFetch } from '../../../hooks/useFetch';
import { Toaster } from 'react-hot-toast';
import Loader from '../../../common/Loader';
import LocationCard from '../../../components/Card/locationCard';
import TopArtistsTable from '../../../components/Tables/ArtistTable';
import TableThree from '../../../components/Tables/TableThree';
import TableTwo from '../../../components/Tables/TableTwo';
import EventTable from '../../../components/Tables/EventTable';

const index = () => {
  const [data, setData] = useState({});
  const { handleFetch } = useFetch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await handleFetch('GET', '/analytics');
        setData(result);
        // console.log(result)
      } catch (error) {
        fireToast('An error occurred. Please try again.', false);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Toaster />
        {data?.bookingsDetails && (
          <CardDataStats
            Icon={TbBrandBooking}
            title={'Total Bookings'}
            total={
              data?.bookingsDetails?.approvedBookings +
              data?.bookingsDetails?.unapprovedBookings
            }
          >
            <p className="font-bold">Bookings</p>
            <div className="flex gap-1">
              {data?.bookingsDetails?.total && (
                <p className="font-bold">
                  Approved : {data?.bookingsDetails?.approvedBookings}
                </p>
              )}
              |<p>Unapproved : {data?.bookingsDetails?.unapprovedBookings} </p>
            </div>
          </CardDataStats>
        )}

        {(data?.totalRevenue !== undefined ||
          data?.bookingsDetails?.happenedEvents) && (
          <CardDataStats
            Icon={SiMoneygram}
            title={
              data?.totalRevenue !== undefined ? 'Total Revenue' : 'Total Shows'
            }
            total={
              data?.totalRevenue !== undefined
                ? data?.totalRevenue
                : (data?.bookingsDetails?.happenedEvents ?? 0) +
                  (data?.bookingsDetails?.expiredBookings ?? 0)
            }
          >
            <p className="font-bold">Shows</p>
            <div className="flex gap-1">
              <p className="font-bold">
                Completed: {data?.bookingsDetails?.happenedEvents ?? 0}
              </p>
              |<p>Cancelled: {data?.bookingsDetails?.expiredBookings ?? 0}</p>
            </div>
          </CardDataStats>
        )}

        {data?.usersDetails && (
          <CardDataStats
            Icon={TbUsers}
            title={'Total Users'}
            total={data?.usersDetails?.total}
          >
            <p className="font-bold">Types</p>
            <div className="flex gap-1">
              {' '}
              <p className="font-bold">Users : {data?.usersDetails?.users}</p> |
              <p>Artists : {data?.usersDetails?.artists} </p>
            </div>
          </CardDataStats>
        )}

        {data?.rankDetails && (
          <CardDataStats
            Icon={TbMilitaryRank}
            title={'Rank'}
            total={data?.rankDetails?.rank}
          >
            <div className="flex gap-1">
              {' '}
              <p className="font-bold">Out of : {data?.rankDetails?.outOf}</p>
            </div>
          </CardDataStats>
        )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {data?.topArtists && (
          <div className="col-span-12 xl:col-span-8">
            <TopArtistsTable list={data?.topArtists} />
          </div>
        )}
        {data?.topLocations && <LocationCard list={data?.topLocations} />}
      </div>

      {data?.upcomingEvents && (
        <div className="my-4">
          <EventTable list={data?.upcomingEvents} />
        </div>
      )}
    </>
  );
};

export default index;
