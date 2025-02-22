import React, {
  useMemo,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRoleContext } from '../../context';
import { useFetch } from '../../hooks/useFetch';
import { MdOutlineDescription } from 'react-icons/md';

const ViewArtist = () => {
  const { isLogin } = useContext(UserRoleContext);
  const [artist, setArtist] = useState({});
  const [totalBooking, setTotalBooking] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { artistId } = location.state || {};

  const { handleFetch } = useFetch();

  const fetchData = useCallback(async (method, url, body) => {
    const resp = await handleFetch(method, url, body);
    if (resp.subitem) {
      setArtist(resp.subitem);
    }
    if (resp.totalBookings) {
      setTotalBooking(resp.totalBookings);
    }
    // setArtist(resp);
  }, []);

  useEffect(() => {
    if (!artistId) {
      navigate('/');
    } else {
      fetchData('GET', `/subitems/${artistId}`);
    }
  }, [navigate, artistId]);

  const imageSrc = useMemo(() => {
    if (artist?.image?.contentType && artist?.image?.data?.data) {
      return `data:${artist.image.contentType};base64,${btoa(
        String.fromCharCode(...new Uint8Array(artist.image.data.data)),
      )}`;
    }
    return 'path/to/placeholder-image.jpg';
  }, [artist]);

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/* Artist Profile Section */}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {artist?.name || 'Unknown Artist'}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-800 opacity-35"></div>

            <p className="pt-2 text-gray-900 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <div
                className="icon-category pr-4 text-indigo-800"
                data-tippy-content="Description Icon - Material"
              >
                <MdOutlineDescription size={30} />
              </div>
              {`${artist?.gender?.toUpperCase()} | ${artist?.subtype?.name?.toUpperCase()} - ${artist?.subhead?.name?.toUpperCase()} | ${artist?.base_city?.toUpperCase()}`}
              {/* {`${artist?.subtype?.name || 'No subtype'} | ${
                artist?.subhead?.name || 'No subhead'
              }`} */}
            </p>

            <p className="pt-8 text-sm">
              {artist?.bio || 'No description available.'}
            </p>

            {/* Events & Paid Info */}

            <div className="mt-3">
              <span className="text-sm font-medium text-white bg-gray-500 rounded-lg p-2">
                {totalBooking > 0 && totalBooking} Successful Events
              </span>
            </div>

            {/* Booking Button */}
            <div className="pt-12 pb-8">
              <button
                onClick={() => {
                  isLogin
                    ? navigate('/bookings/add', {
                        state: {
                          itemID: artist._id,
                          itemName: artist.name,
                          itemEmail: artist.email,
                        },
                      })
                    : navigate('/auth');
                }}
                className="bg-gradient-to-r from-indigo-700 to-purple-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-full"
              >
                Book now
              </button>
            </div>
          </div>
        </div>

        {/* Artist Image Section */}
        <div className="w-full lg:w-2/5">
          <img
            src={imageSrc}
            alt={artist?.name || 'Placeholder'}
            className="rounded-none lg:rounded-lg shadow-2xl w-full max-w-96 lg:max-w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewArtist;
