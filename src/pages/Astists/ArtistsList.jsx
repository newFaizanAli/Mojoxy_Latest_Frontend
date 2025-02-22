import React, { useCallback, useContext, useEffect, useState } from 'react';
import fireToast from '../../hooks/fireToast';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Pagenator from '../../components/Paginator';
import { DATAPERPAGE } from '../../utils/constants';
import CustomTable from '../../components/Tables/CustomTable';
import { IoIosEye } from 'react-icons/io';
import { MdOutlineEditNote, MdOutlineDeleteOutline } from 'react-icons/md';
import {
  handleDelete,
  handleQuerySearch,
  pageData,
} from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import UserArtistCard from './Card/UserArtistCard';
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

  const fetchArtists = async () => {
    try {
      const result = await handleFetch('GET', '/subitems');
      setData(result.subitems);

      setFilterData(result.subitems);
    } catch (error) {
      fireToast(error.message, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const deleteArtist = useCallback(async (artist) => {
    await handleDelete(
      `Are you sure you want to delete : ${artist.name}?`,
      'post',
      `/deletesubitem/${artist._id}`,
      handleFetch,
      {},
      fetchArtists,
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilterData, 'email');
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filterdData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="Artists List" />

      {loginUser.type === 'user' ? (
        <div className="flex gap-3 flex-wrap justify-center">
          {currentData.map((artist, index) => (
            <UserArtistCard key={index} artist={artist} />
          ))}
        </div>
      ) : (
        <CustomTable searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <thead>
            <tr className="bg-gray-200 dark:bg-meta-4">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((artist, index) => (
              <tr key={index} className=" dark:bg-meta-4">
                <td className="p-3">{artist.name}</td>
                <td className="p-3">{artist.email}</td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() =>
                        navigate('/artists/view', {
                          state: {
                            artistId: artist._id,
                          },
                        })
                      }
                    >
                      <IoIosEye size={25} />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() =>
                        navigate('/artists/update', {
                          state: artist,
                        })
                      }
                    >
                      <MdOutlineEditNote size={25} />
                    </button>
                    <button
                      className="hover:text-danger"
                      onClick={() => deleteArtist(artist)}
                    >
                      <MdOutlineDeleteOutline size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </CustomTable>
      )}

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
