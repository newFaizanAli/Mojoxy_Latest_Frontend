import React, { useCallback, useContext, useEffect, useState } from 'react';
import Pagenator from '../../components/Paginator';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { UserRoleContext } from '../../context';
import { useFetch } from '../../hooks/useFetch';
import HeadCard from './Card/HeadCard';
import { handleDelete } from '../../utils/functions';
import fireToast from '../../hooks/fireToast';

const HeadPage = () => {
  const { loginUser } = useContext(UserRoleContext);
  const [data, setData] = useState([]);
  const { handleFetch } = useFetch();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchData = useCallback(async (method, url, body) => {
    try {
      await handleFetch(method, url, body);
    } catch (error) {
      console.error('Error fetching heads:', error);
    }
  }, []);

  const fetchHeads = async () => {
    const resp = await handleFetch('GET', '/heads');
    if (resp.heads) {
      setData(resp.heads);
    }
  };

  const updateHead = async (id) => {
    try {
      const name = prompt('Enter Head Name');
      if (name) {
        await fetchData('POST', `/updatehead/${id}`, { name }).then(() => fetchHeads());
      
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHead = async (id) => {
    try {
      if (loginUser.type === 'subadmin') {
        fireToast('Subadmin not allowed to delete', false);
      } else {
        handleDelete(
          `Are you sure you want to delete?`,
          'POST',
          `/deletehead/${id}`,
          handleFetch,
          {},
          fetchHeads,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addHead = async () => {
    try {
      const name = prompt("Enter Head Name");
      if (name) {
        await fetchData("POST", "/addhead", { name });
        await fetchHeads();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHeads();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Heads" />
       <div className='flex justify-end'>
       <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          onClick={addHead}
        >
          Add Head
        </button>
       </div>
      <div className="flex gap-2">
        {data.length > 0 ? (
          data.map((head, index) => (
            <HeadCard
              key={index}
              head={head}
              handleDelete={() => deleteHead(head._id)}
              hanldeUpdate={() => updateHead(head._id)}
              index={index}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          ))
        ) : (
          <div className="h-48">
            <span className="text-gray-500 text-md">No heads found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default HeadPage;
