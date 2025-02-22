import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-900/30 max-w-lg w-full h-auto md:h-56 rounded-xl m-3 shadow-sm shadow-gray-600">
      <p className="absolute top-[-10px] right-[-10px] bg-white text-gray-800 px-2 py-1 rounded-b-lg shadow-lg text-sm md:text-base">
        {artist?.subtype?.name} | {artist?.subhead?.name}
      </p>

      <div className="flex flex-col md:flex-row justify-between rounded-xl">
        <div className="md:basis-2/5 w-full md:w-auto">
          <img
            className="h-48 md:h-56 w-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
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
        </div>

        <div className="md:basis-3/5 py-4 px-4 md:py-6">
          <h2 className="text-lg md:text-2xl text-white">{artist?.name}</h2>
          <p className="text-sm md:text-base">
            {artist?.bio.slice(0, 140)} ...
          </p>
          <button
            className="mt-3 px-3 py-2 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg text-white text-sm md:text-base"
            onClick={() => navigate('/artist/profile', {
              state : artist?._id
            })}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
