import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useFetch } from '../../../hooks/useFetch';
import {
  handleDelete,
  handleQuerySearch,
  pageData,
} from '../../../utils/functions';
import { CiSearch } from 'react-icons/ci';
import Pagenator from '../../../components/Paginator';
import { DATAPERPAGE, RANDOMPASSWORD } from '../../../utils/constants';

const RegisterArtistList = () => {
  const [data, setData] = useState([]);
  const { handleFetch } = useFetch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterdData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArtists = async () => {
    try {
      const result = await handleFetch('GET', '/registerartists');
      setData(result.artists);
      setFilterData(result.artists);

    } catch (error) {
      fireToast(error.message, false);
    }
  };

  const deleteArtist = async (artist) => {
    await handleDelete(
      `Are you sure you want to delete artist ${artist.name} form ?`,
      'post',
      `/deleteartist`,
      handleFetch,
      { id: artist._id },
      fetchArtists,
    );
  };

  const handleChecked = async (values) => {
    const confirmSave = window.confirm('Are you sure you want to save the artist?')
    if(confirmSave){
      
     

      // console.log(values)

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("imageFile", values?.imageFile);
      formData.append("head", values.head._id);
      formData.append("subhead", values.subhead._id);
      formData.append("subtype", values.subtype._id);
      formData.append("base_city", values.base_city);
      formData.append("gender", values.gender);
      formData.append("email", values.email);
      formData.append("password", RANDOMPASSWORD);
 
      handleFetch('POST', '/checkedartist', formData, true)
    }
    // await handleDelete(
    //   `Are you sure you want to save the artist?`,
    //   'post',
    //   `/checkedartist`,
    //   handleFetch,
    //   { id: artist._id },
    //   fetchArtists,
    // );
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilterData, 'email');
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filterdData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb pageName="Register Artists List" />
      <div className="relative py-4">
        <span className="absolute left-4.5 top-7">
          <CiSearch color="#6C6C6C" size={25} />
        </span>
        <input
          className="w-96 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          //   id="searchQuery"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {currentData.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-gray-500 text-lg">No artists found</span>
        </div>
      ) : (
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          {currentData.map((artist, index) => (
            <div
              key={index}
              className={
                'bg-white p-4 rounded-lg shadow-md dark:bg-meta-4 dark:text-white'
              }
            >
              <div className="flex p-2 gap-2 flex-wrap">
                <div className="img">
                  <img
                    src={`data:${artist?.image?.contentType};base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(artist?.image?.data.data),
                      ),
                    )}`}
                    alt={artist?.name || 'Placeholder'}
                    className="rounded-none lg:max-w-full object-cover h-24"
                  />
                </div>
                <div className="detail">
                  <p>
                    <strong>Name:</strong> {artist?.name}
                  </p>
                  <p>
                    {artist?.email} | {artist?.phno}
                  </p>
                  <p>
                    {artist?.gender?.toUpperCase()} |{' '}
                    {artist?.subtype?.name?.toUpperCase()}-
                    {artist?.subhead?.name?.toUpperCase()} |{' '}
                    {artist?.head?.name?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="w-full h-32 border p-2 m-1 rounded overflow-scroll">
                <p className="text-sm">{artist?.bio}</p>
              </div>
              <div className={'flex justify-end space-x-2'}>
                {!artist.checked && (
                  <button
                    className={
                      ' bg-gradient-to-tr text-white rounded-lg from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 px-4 py-2'
                    }
                    onClick={() => handleChecked(artist)}
                  >
                    Checked
                  </button>
                )}
                <button
                  className={
                    'bg-gradient-to-tr from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 px-4 py-2 text-white rounded-lg'
                  }
                  onClick={() => deleteArtist(artist)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="py-3">
        <Pagenator
          DATAPERPAGE={DATAPERPAGE}
          filteredData={filterdData}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default RegisterArtistList;
