import { Link } from 'react-router-dom';
import hero_img from '../../../images/home/hero_img.jpg';

const Index = () => {
  return (
    <section
    className="relative w-full h-[100vh] bg-cover bg-center pt-16 sm:pt-20 md:pt-24"
    style={{
      backgroundImage: `url(${hero_img})`,
    }}
  >
    <div className="absolute inset-0 bg-black opacity-40"></div>
    {/* Dark overlay */}
    <div className="relative z-10 flex items-center justify-end flex-wrap w-full h-full text-center text-white px-4">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{fontFamily:  "Sour Gummy"}}>
          Book Top Artists for Your Event
          {/* Booking Artist Made */}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl opacity-80">
          Discover and book talented artists for all kinds of events – from
          concerts to private parties.
        </p>
        <div>
          <Link
            to="/artists"
            className="inline-block bg-indigo-600 text-white px-8 py-3 text-lg sm:text-xl md:text-2xl rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Browse Artists
          </Link>
        </div>
      </div>
    </div>

    {/* Adding the smooth gradient shadow at the bottom of the Hero Section */}
    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
  </section>
  );
};

export default Index;
