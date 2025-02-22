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

const SubtypePage = () => {
  const { loginUser } = useContext(UserRoleContext);
  const [data, setData] = useState([]);
  const [allSubheads, setSubheads] = useState([]);
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [subheadName, setSubheadName] = useState('');
  const [selectedSubhead, setSelectedSubhead] = useState('');
  const { handleFetch } = useFetch();
  const [filterdData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (method, url, body) => {
    try {
      const resp = await handleFetch(method, url, body);

      return resp;
    } catch (error) {
      console.error('Error fetching subheads:', error);
    }
  }, []);

  const fetchSubheads = async () => {
    try {
      const resp =  await fetchData('GET', '/getsubtypes');
      if (resp.subtypes) {
        setData(resp.subtypes);
        setFilteredData(resp.subtypes);
      }

      if (resp.subheads) {
        setSubheads(resp.subheads);
      }

    } catch (error) {
      console.error('Error during initial fetch:', error);
    }
  };

  const deleteSubtype = async (id) => {
    try {
      if (loginUser.type === 'subadmin') {
        fireToast('Subadmin not allowed to delete', false);
      }
      await handleDelete(
        `Are you sure you want to delete this subtype?.`,
        'POST',
        `/deletesubtype/${id}`,
        handleFetch,
        {},
        fetchSubheads,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateSubtype = (id) => {
    const selected = data.find((subtype) => subtype._id === id);
    setSelectedSubtype(selected);
    setSubheadName(selected.name);

    setSelectedSubhead(selected.subhead ? selected.subhead._id : '');
  };

  const updateSubtype = async (e) => {
    e.preventDefault();
    if (!subheadName || !selectedSubhead) {
      alert('All fields are required');
      return;
    }

    try {
      if (selectedSubtype) {
        await handleFetch('POST', `/updatesubtype/${selectedSubtype._id}`, {
          name: subheadName,
          subhead: selectedSubhead,
        }).then(() => fetchSubheads());
      } else {
        await handleFetch('POST', `/addsubtype/${selectedSubhead}`, {
          name: subheadName,
        }).then(() => fetchSubheads());
      }

      setSelectedSubtype(null);
      setSubheadName('');
      setSelectedSubhead('');
    } catch (e) {
      console.error(e);
    }
  };

  // const updateSubhead = async (e) => {
  //   e.preventDefault();
  //   if (!subheadName || !selectedHead) {
  //     fireToast('All fields are required', false);
  //     return;
  //   }

  //   try {
  //     if (selectedSubhead) {

  //       await fetchData('POST', `/updatesubhead/${selectedSubhead._id}`, {
  //         name: subheadName,
  //         head: selectedHead,
  //       });
  //       await fetchData('GET', '/getsubheads');
  //     } else {
  //       await fetchData('POST', `/addsubhead/${selectedHead}`, {
  //         name: subheadName,
  //       });
  //       await fetchData('GET', '/getsubheads');
  //     }

  //     setSelectedSubhead('');
  //     setSubheadName('');
  //     setSelectedHead('');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    fetchSubheads();
  }, []);

  // useEffect(() => {
  //   const fetchSubheads = async () => {
  //     try {
  //       await fetchData('GET', '/getsubtypes');
  //     } catch (error) {
  //       console.error('Error during initial fetch:', error);
  //     }
  //   };

  //   fetchSubheads();
  // }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, 'name');
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filterdData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb pageName="Subtypes" />
      <form onSubmit={updateSubtype}>
        <div className="flex justify-end my-2 gap-2">
          <div>
            <input
              className="w-64 rounded border border-stroke bg-gray p-2  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              placeholder="Enter subtype name"
              id="subtypeName"
              value={subheadName}
              onChange={(e) => setSubheadName(e.target.value)}
            />
          </div>
          <div>
            <select
              id="subhead"
              value={selectedSubhead}
              onChange={(e) => setSelectedSubhead(e.target.value)}
              className="w-full rounded border border-stroke bg-gray p-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="" className="dark:bg-boxdark">
                select subhead
              </option>
              {allSubheads?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="flex justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90">
              {selectedSubtype ? 'Update Subtype' : 'Add Subtype'}
            </button>
          </div>
        </div>
      </form>

      <CustomTable searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Subhead</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((list, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{list?.name}</td>
              <td className="p-3">{list?.subhead?.name}</td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => handleUpdateSubtype(list._id)}
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    className="hover:text-danger"
                    onClick={() => deleteSubtype(list._id)}
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

export default SubtypePage;
