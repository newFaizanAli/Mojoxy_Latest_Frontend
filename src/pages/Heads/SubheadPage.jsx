import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserRoleContext } from '../../context';
import { useFetch } from '../../hooks/useFetch';
import fireToast from '../../hooks/fireToast';
import {
  handleDelete,
  handleQuerySearch,
  pageData,
} from '../../utils/functions';
import { DATAPERPAGE } from '../../utils/constants';
import Pagenator from '../../components/Paginator';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomTable from '../../components/Tables/CustomTable';
import { MdOutlineEditNote, MdOutlineDeleteOutline } from 'react-icons/md';

const SubheadPage = () => {
  const { loginUser } = useContext(UserRoleContext);
  const [data, setData] = useState([]);
  const [allHeads, setHeads] = useState([]);
  const [selectedSubhead, setSelectedSubhead] = useState(null);
  const [subheadName, setSubheadName] = useState('');
  const [selectedHead, setSelectedHead] = useState('');
  const { handleFetch } = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterdData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async (method, url, body) => {
    try {
      const resp = await handleFetch(method, url, body);
      return resp;
    } catch (error) {
      console.error('Error fetching subheads:', error);
    }
  }, []);

  const fetchSubheads = async () => {
    const resp = await fetchData('GET', '/getsubheads');
    if (resp.subheads) {
      setData(resp.subheads);
      setFilteredData(resp.subheads);
    }

    if (resp.heads) {
      setHeads(resp.heads);
    }
  };

  const deleteSubhead = async (id) => {
    try {
      if (loginUser.type === 'subadmin') {
        fireToast('Subadmin not allowed to delete', false);
      }
      await handleDelete(
        `Are you sure you want to delete this Subhead?.`,
        'POST',
        `/deletesubhead/${id}`,
        handleFetch,
        {},
        fetchSubheads,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateSubhead = (id) => {
    const selected = data.find((subhead) => subhead._id === id);
    setSelectedSubhead(selected);
    setSubheadName(selected.name);
    setSelectedHead(selected.head._id);
  };

  const updateSubhead = async (e) => {
    e.preventDefault();
    if (!subheadName || !selectedHead) {
      fireToast('All fields are required', false);
      return;
    }

    try {
      if (selectedSubhead) {
        await fetchData('POST', `/updatesubhead/${selectedSubhead._id}`, {
          name: subheadName,
          head: selectedHead,
        }).then(() => fetchSubheads());
      } else {
        await fetchData('POST', `/addsubhead/${selectedHead}`, {
          name: subheadName,
        }).then(() => fetchSubheads());
      }

      setSelectedSubhead('');
      setSubheadName('');
      setSelectedHead('');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((head) =>
        head.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredData(filtered);
  }, [searchQuery]);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, 'name');
  }, [searchQuery, data]);

  useEffect(() => {
    fetchSubheads()
  }, []);

  const currentData = pageData(currentPage, filterdData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb pageName="Subheads" />
      <form onSubmit={updateSubhead}>
        <div className="flex justify-end my-2 gap-2">
          <div>
            <input
              className="w-64 rounded border border-stroke bg-gray p-2  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              id="subheadName"
              placeholder="Enter subhead name"
              value={subheadName}
              onChange={(e) => setSubheadName(e.target.value)}
            />
          </div>
          <div>
            <select
              id="head"
              value={selectedHead}
              onChange={(e) => setSelectedHead(e.target.value)}
              className="w-full rounded border border-stroke bg-gray p-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select head
              </option>
              {allHeads?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="flex justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90">
              {selectedSubhead ? 'Update Subhead' : 'Add Subhead'}
            </button>
          </div>
        </div>
      </form>

      <CustomTable searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Head</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((list, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{list?.name}</td>
              <td className="p-3">{list?.head?.name}</td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => handleUpdateSubhead(list._id)}
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    className="hover:text-danger"
                    onClick={() => deleteSubhead(list._id)}
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>

      <Pagenator
        DATAPERPAGE={DATAPERPAGE}
        filteredData={filterdData}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default SubheadPage;
