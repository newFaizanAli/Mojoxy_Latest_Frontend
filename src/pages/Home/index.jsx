import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import EventsSection from './EventsSection';
import DiscoverSection from './DiscoverSection';
import TopArtists from './TopArtists';
import FAQSection from './FAQSection';
import JoinSection from './JoinSection';
import Categories from './Category';

import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';

const Home = () => {
  const { handleFetch } = useFetch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);

  const fetchData = async () => {
    try {
      const result = await handleFetch('GET', '/indexpage');
      setData(result);
    } catch (error) {
      fireToast(error.message, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative">
      <HeroSection />
      <div className="bg-gray-900 px-15 ">
        <ServicesSection />
        <EventsSection list={data?.upcomingEvents} />
        <Categories list={data?.subheads} />
        <DiscoverSection list={data?.subitems} />
        <TopArtists list={data?.topArtists} />
        <FAQSection />
        <JoinSection />
      </div>
    </div>
  );
};

export default Home;
