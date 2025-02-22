import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import ViewArtistCard from '../card/ViewArtistCard';

const index = () => {
  const [data, setData] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const artistId = location.state;

  const { handleFetch } = useFetch();

  const fetchData = async () => {
    try {
      const result = await handleFetch('GET', `/subitems/${artistId}`);
      setData(result)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    if (!artistId) {
      navigate('/artits');
    }else{
        fetchData()
    }
  }, []);

  return (
    <section className="min-h-screen w-full h-full bg-gray-900 bg-center pt-16 sm:pt-20 md:pt-24">
      <ViewArtistCard artist={data.subitem} totalBooking={data.totalBooking} />
    </section>
  );
};

export default index;
