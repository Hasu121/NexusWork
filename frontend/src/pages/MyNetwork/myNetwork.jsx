import React, { useState, useEffect } from 'react';
import ProfileCard from '../../components/ProfileCard/profileCard';
import axios from 'axios';


const MyNetwork = () => {
  const [text, setText] = useState("Catch up with devs");
  const [data, setData] = useState([]);

  const handleFriends = async () => {
    setText("Catch up with devs");
  }
  const handlePending = async () => {
    setText("Pending Request");
  }

  const fetchFriendList = async () => {
  await axios.get('http://localhost:4000/api/auth/friendList', { withCredentials: true }).then((res) => {
      console.log(res);
      setData(res.data.friends); 
    }).catch((err) => {
      console.log(err);
      alert("Error fetching friend list");
    });
  }

  const fetchPendingRequests = async () => {
  await axios.get('http://localhost:4000/api/auth/pendingFriendList', { withCredentials: true }).then((res) => {
      console.log(res);
      setData(res.data.pendingFriends);
    }).catch((err) => {
      console.log(err);
      alert("Error fetching pending requests");
    });
  }

  useEffect(() => {
      if (text === "Catch up with devs") {
        fetchFriendList()
      } else {
        fetchPendingRequests()
      }
  }, [text]);


  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="py-4 px-10 border border-gray-400 w-full flex justify-between my-5 text-xl bg-white rounded-xl">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            onClick={handleFriends}
            className={`p-1 cursor-pointer border rounded-lg border-gray-300 hover:bg-yellow-100 ${
              text === "Catch up with devs" ? 'bg-yellow-500 text-black' : ''
            }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
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
        {
          data.map((item, index) => {
            return (
              <div key={item._id || index}>
                <ProfileCard data = {item} />
              </div>
            )
          })
        }

        {
          data.length === 0 ? text === "Catch up with devs" ? <div>No friends found</div> : <div>No pending requests found</div> : null
        }
      </div>
    </div>
  );
};

export default MyNetwork;
