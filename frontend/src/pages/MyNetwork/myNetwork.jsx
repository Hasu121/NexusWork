import React, { useState } from 'react';
import ProfileCard from '../../components/ProfileCard/profileCard';

const MyNetwork = () => {
  const [text, setText] = useState("Catch up with devs");

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="py-4 px-10 border border-gray-400 w-full flex justify-between my-5 text-xl bg-white rounded-xl">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            onClick={() => setText("Catch up with devs")}
            className={`p-1 cursor-pointer border rounded-lg border-gray-300 hover:bg-yellow-100 ${
              text === "Catch up with devs" ? 'bg-yellow-500 text-black' : ''
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setText("Pending Request")}
            className={`p-1 cursor-pointer border rounded-lg border-gray-300 hover:bg-yellow-100 ${
              text === "Pending Request" ? 'bg-yellow-500 text-black' : ''
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 pb-20">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ProfileCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default MyNetwork;
