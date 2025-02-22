import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import ArtistCard from './card/ArtistCard';
import { useLocation } from 'react-router-dom';
import { DATAPERPAGE } from '../../../utils/constants';
import { pageData } from '../../../utils/functions';
import Pagenator from '../../../components/Paginator';

const ArtistList = () => {
  const [data, setData] = useState([]);
  const [subheads, setSubheads] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedSubhead, setSelectedSubhead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const stateSubhead = location.state;
  const { handleFetch } = useFetch();

  const filterArtists = (id) => {
    setSelectedSubhead(id);
    setFilterData(id ? data.filter((e) => e.subhead._id === id) : data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleFetch('GET', '/subitems');
        if (result.subitems) {
          setData(result.subitems);
          setFilterData(result.subitems);
        }
        if (result.subheads) {
          setSubheads(result.subheads);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [handleFetch]);

  useEffect(() => {
    if (stateSubhead) {
      filterArtists(stateSubhead);
    }
  }, [stateSubhead, data]);


   const currentData = pageData(currentPage, filterData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="min-h-screen w-full h-full bg-gray-900 bg-center pt-16 sm:pt-20 md:pt-24">
      <div className="py-10 flex justify-center gap-3">
        {subheads?.map((subhead) => (
          <button
            key={subhead._id}
            onClick={() => filterArtists(subhead._id)}
            className={`cursor-pointer bg-gray-800/25 px-5 py-2 text-xl rounded-xl hover:bg-gray-700/25 transition delay-100 hover:shadow-lg hover:text-white ${
              selectedSubhead === subhead._id ? 'bg-gray-600/50' : ''
            }`}
          >
            {subhead.name}
          </button>
        ))}
        <button
          onClick={() => filterArtists('')}
          className={`cursor-pointer bg-gray-800/25 px-5 py-2 text-xl rounded-xl hover:bg-gray-700/25 transition delay-100 hover:shadow-lg hover:text-white ${
            selectedSubhead === null ? 'bg-gray-600/50' : ''
          }`}
        >
          All
        </button>
      </div>

      {/* Artist Cards */}
      <div className="py-5 flex justify-center flex-wrap gap-3">
        {currentData?.map((artist, index) => (
          <ArtistCard key={index} artist={artist} />
        ))}
      </div>

     <div className='py-4'>
     <Pagenator
        DATAPERPAGE={DATAPERPAGE}
        filteredData={filterData}
        paginate={paginate}
        currentPage={currentPage}
      />
     </div>
    </section>
  );
};

export default ArtistList;
