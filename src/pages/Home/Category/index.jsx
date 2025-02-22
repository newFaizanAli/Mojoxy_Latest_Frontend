import React from 'react';
import { useNavigate } from 'react-router-dom';


const Index = ({list}) => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-gray-900 py-10">
      <div className="max-w-screen-xl mx-auto  text-center">
    
        <div className="flex flex-wrap gap-3 justify-center space-x-6">
          {list?.map((category, index) => (
            <span
              onClick={() => navigate('/artists', {
                state : category?._id
              })}
              key={index}
              className="text-md bg-gray-800 bg-opacity-30 backdrop-blur-sm font-medium cursor-pointer py-2 px-4 rounded-lg shadow-indigo-500 shadow-sm transition duration-300 hover:bg-indigo-700 hover:text-white"
            >
              {category?.name?.toUpperCase()}
            </span>
          ))}
          <span className="text-md text-white bg-indigo-500 bg-opacity-30 backdrop-blur-sm font-medium cursor-pointer py-2 px-4 rounded-lg">
            All
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
