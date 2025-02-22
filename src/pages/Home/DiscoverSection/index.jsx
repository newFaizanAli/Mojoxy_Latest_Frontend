import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const index = ({ list }) => {

  const navigate = useNavigate()

  return (
    <div className="py-10 flex flex-col justify-center items-center">
      <div className="py-4 text-center">
        <h2 className="h2 text-2xl font-bold text-white">
          Discover Best Artists
        </h2>
      </div>
    
      <div className="flex gap-2 justify-center py-10 flex-wrap">
        {list?.map((e) => (
          <div className=" cursor-pointer h-48 w-48 flex flex-col items-center gap-2 justify-center text-center" 
          onClick={() => navigate(`/artist/profile`, {
            state : e._id
          })}
          >
            
            <img
              className="w-40 h-40 sm:w-24 sm:h-24 md:w-40 md:h-40 mb-3 rounded-full shadow-lg border-2 border-white"
              width={112} 
              height={112} 
              src={
                e?.image && e?.image.contentType && e?.image.data
                  ? `data:${e?.image.contentType};base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(e?.image.data.data),
                      ),
                    )}`
                  : 'default-image-url.jpg'
              }
              alt={e?.name || 'Artist Image'}
            />

            <h2 className="text-lg font-semibold text-gray-200">{e?.name}</h2>
            <p className="text-sm font-semibold">
              {e?.subhead?.name} | {e?.subtype?.name}
            </p>
          </div>
        ))}
      </div>
      <div className="py-5">
        <Link to={'/artists'} className="px-14 py-2 border border-white rounded-lg text-white font-semibold">
          Show more
        </Link>
      </div>
    </div>
  );
};

export default index;
