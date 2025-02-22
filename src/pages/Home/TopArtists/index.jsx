import React from 'react';

// const artists = [
//   {
//     name: 'John Doe',
//     events: 20,
//   },
//   {
//     name: 'Emily Grace',
//     events: 18,
//   },
//   {
//     name: 'The Sound Waves',
//     events: 14,
//   },
// ];

const index = ({list}) => {
  return (
    <div className="py-10 flex flex-col justify-center items-center">
      <h2 className="text-white text-3xl font-bold">
        Best <span className="text-purple-600">Artists</span> of Week 
      </h2>
      <div className="overflow-x-auto w-full  py-10 px-30">
        <table className="bg-transparent w-full ">
          <thead className=''>
            <tr className='bg-gray-700 opacity-40 text-white'>
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Genres</th>
              <th className="px-6 py-3 text-left">Events</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((list, index) => (
              <tr key={index}>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{list?.subitemDetails?.name}</td>
                <td className="px-6 py-3">{list?.subtypeDetails?.name}</td>
                <td className="px-6 py-3">{list?.totalEvents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
