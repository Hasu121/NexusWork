import React, { useState,useEffect } from "react";
import "./navbar2.css";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkIcon from '@mui/icons-material/Work';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';

const Navbar2 = () => {
  // const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(()=> {
    if (debouncedTerm) {
      searchApiCall(debouncedTerm);
    }
  }, [debouncedTerm]);

  const searchApiCall = async (term) => {
  await axios.get(`http://localhost:4000/api/user/findUser?query=${debouncedTerm}`, { withCredentials: true }).then((res) => {
      setSearchUser(res.data.users);
    }).catch (err => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to fetch search results");
      });
  }

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="bg-white h-13 flex justify-between py-1 px-5 x1:px-50 fixed top-0 w-[100%] z-1000">
      <div className="flex items-center gap-2">
        <Link to ='/feeds'>
          <img
            src="https://i.pinimg.com/736x/aa/64/ad/aa64ad43fcf3c6d512c9a486a62d1f27.jpg"
            alt="logo"
            className="w-10 h-10"
          />
        </Link>
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4"
            placeholder="Search"
          />
          { searchUser.length>0 &&
            <div className="absolute w-88 left-0 bg-gray-200">
              {
                searchUser.map((item, index) => {
                  return (
                    <div key={index} className="flex mb-1 items-center gap-2 cursor-pointer hover:bg-gray-300 px-2 py-1">
                      <div>
                        <img
                          className="w-10 h-10 rounded-full"
                          src={item.profile_pic}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">{item.f_name}</div>
                    </div>
                  );
                })
              }
            </div>
          }
        </div>
      </div>



      <div className="hidden gap-7 md:flex">
        {/* Home */}
        <Link to={'/feeds'} className="flex flex-col items-center cursor-pointer">
            <HomeFilledIcon sx={{color:location.pathname === '/feeds'?"black":"gray"}} className="text-2xl text-gray-500" />
            <div className={`text-xs text-gray-500 ${location.pathname === '/feeds' ? "border-b-3" : ""}`}>Home</div>
        </Link>
        {/* My Network */}
        <Link to={'/myNetwork'} className="flex flex-col items-center cursor-pointer">
            <GroupIcon sx={{color:location.pathname === '/myNetwork'?"black":"gray"}} className="text-2xl text-gray-500" />
            <div className={`text-xs text-gray-500 ${location.pathname === '/myNetwork' ? "border-b-3" : ""}`}>My Network</div>
        </Link>
        {/* Messaging */}
        <div className="flex flex-col items-center cursor-pointer">
            <ChatIcon sx={{color:location.pathname === '/messages'?"black":"gray"}} className="text-2xl text-gray-500" />
            <div className={`text-xs text-gray-500 ${location.pathname === '/messages' ? "border-b-3" : ""}`}>Messages</div>
        </div>
        {/* Jobs Section */}
        <div className="flex flex-col items-center cursor-pointer">
            <WorkIcon sx={{color:location.pathname === '/jobs'?"black":"gray"}} className="text-2xl text-gray-500" />
            <div className={`text-xs text-gray-500 ${location.pathname === '/jobs' ? "border-b-3" : ""}`}>Jobs</div>
        </div>
        {/* Notifications */}
        <Link to={'/notification'} className="flex flex-col items-center cursor-pointer">
            <div><NotificationsIcon sx={{color:location.pathname === '/notification'?"black":"gray"}} className="text-2xl text-gray-500" /> <span className="p-0.5 rounded-full text:sm bg-red-700 text-white">1</span> </div>
            <div className={`text-xs text-gray-500 ${location.pathname === '/notification' ? "border-b-3" : ""}`}>Notifications</div>
        </Link>
        {/* Me (avatar) */}
        <Link to={`/profile/${userData?._id}`} className="flex flex-col items-center cursor-pointer">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={userData?.profile_pic}
            alt="Me"
          />
          <div className="text-xs text-gray-500">Me</div>
        </Link>


      </div>
    </div>
  );
};

export default Navbar2;
