import React, { useCallback, useEffect, useState } from 'react';
import fireToast from '../../hooks/fireToast';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Pagenator from '../../components/Paginator';
import { DATAPERPAGE } from '../../utils/constants';
import CustomTable from '../../components/Tables/CustomTable';
import { MdOutlineEditNote, MdOutlineDeleteOutline } from 'react-icons/md';
import { handleQuerySearch, pageData, handleDelete } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [data, setData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { handleFetch } = useFetch();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      const result = await handleFetch('GET', '/users');
      setData(result.users);
      setFilteredUsers(result.users);
    } catch (error) {
      fireToast(error.message, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = useCallback(async (user) => {
    await handleDelete(
      `Are you sure you want to delete : ${user.name}?`,
      'POST',
      '/deleteuser',
      handleFetch,
      { email: user.email },
      fetchUsers,
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredUsers, 'name');
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredUsers);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="Users List" />
      <CustomTable searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-meta-4">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone #</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr key={index} className=" dark:bg-meta-4">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phno}</td>
                <td className="p-3">{user.usertype?.toLowerCase()}</td>
                <td
                  className={`
                          inline-flex rounded-full bg-opacity-20 mt-3 py-1 px-3 text-sm font-medium
                           ${
                             user.status
                               ? 'bg-success text-success'
                               : 'bg-danger text-danger'
                           }`}
                >
                  {user.status ? 'active' : 'blocked'}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() =>
                        navigate('/users/update', {
                          state: user,
                        })
                      }
                    >
                      <MdOutlineEditNote size={25} />
                    </button>
                    <button
                      className="hover:text-danger"
                      onClick={() => deleteUser(user)}
                    >
                      <MdOutlineDeleteOutline size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CustomTable>
      <Pagenator
        DATAPERPAGE={DATAPERPAGE}
        filteredData={filteredUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default UsersList;
