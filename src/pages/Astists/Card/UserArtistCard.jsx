import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Artist Info Section */}
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={
            artist?.image && artist?.image.contentType && artist?.image.data
              ? `data:${artist?.image.contentType};base64,${btoa(
                  String.fromCharCode(
                    ...new Uint8Array(artist?.image.data.data),
                  ),
                )}`
              : 'default-image-url.jpg'
          }
          alt={artist?.name || 'Artist Image'}
        />

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {artist?.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`${artist?.subtype?.name} ${artist?.subhead?.name}`}
        </span>

        <div className="flex mt-4 md:mt-6">
          <button
            onClick={() =>
              navigate('/artist/view', {
                state: {
                  artistId: artist._id,
                },
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:bg-gradient-to-l from-indigo-700 to-purple-800 rounded-lg focus:ring-4 focus:outline-none"
          >
            View Profile
          </button>
          {/* <button
            onClick={() => {
              isLogin === true
                ? navigate('/book/add', {
                    state: {
                      itemID: artist._id,
                      itemName: artist.name,
                      itemEmail: artist.email,
                    },
                  })
                : navigate('/auth');
            }}
            className="py-2 px-4 ms-2 text-sm font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Booked
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
