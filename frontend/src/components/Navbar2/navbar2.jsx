import React, { useState, useEffect } from "react";
import "./navbar2.css";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar2 = () => {
  // const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      if (searchTerm === "") {
        setSearchUser([]);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      searchApiCall(debouncedTerm);
    }
  }, [debouncedTerm]);

  const searchApiCall = async (term) => {
    await axios
      .get(`http://localhost:4000/api/auth/findUser?query=${debouncedTerm}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSearchUser(res.data.users);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err?.response?.data?.message || "Failed to fetch search results"
        );
      });
  };

  const fetchNotification = async () => {
    await axios.get('http://localhost:4000/api/notification/activeNotification', { withCredentials: true })
      .then((res) => {
        setNotificationCount(res.data.notifications || 0);
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.error || "Failed to fetch notifications");
      });
  };


  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
    fetchNotification()
  }, []);

  return (
    <div className="bg-white h-13 flex justify-between py-1 px-5 x1:px-50 fixed top-0 w-[100%] z-1000">
      <div className="flex items-center gap-2">
        <Link to="/feeds">
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
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => { setSearchFocused(false); setSearchUser([]); }, 150)}
          />
          {searchUser.length > 0 && debouncedTerm !== 0 && searchFocused && searchTerm !== "" && (
            <div className="absolute w-88 left-0 bg-gray-200">
              {searchUser.map((item, index) => {
                return (
                  <Link 
                    to={`/profile/${item._id}`}
                    key={index}
                    className="flex mb-1 items-center gap-2 cursor-pointer hover:bg-gray-300 px-2 py-1"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchUser([]);
                    }}
                  >
                    <div>
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.profile_pic}
                        alt=""
                      />
                    </div>
                    <div className="text-sm">{item.f_name}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="hidden gap-7 md:flex">
        {/* Home */}
        <Link
          to={"/feeds"}
          className="flex flex-col items-center cursor-pointer"
        >
          <HomeFilledIcon
            sx={{ color: location.pathname === "/feeds" ? "black" : "gray" }}
            className="text-2xl text-gray-500"
          />
          <div
            className={`text-xs text-gray-500 ${
              location.pathname === "/feeds" ? "border-b-3" : ""
            }`}
          >
            Home
          </div>
        </Link>
        {/* My Network */}
        <Link
          to={"/myNetwork"}
          className="flex flex-col items-center cursor-pointer"
        >
          <GroupIcon
            sx={{
              color: location.pathname === "/myNetwork" ? "black" : "gray",
            }}
            className="text-2xl text-gray-500"
          />
          <div
            className={`text-xs text-gray-500 ${
              location.pathname === "/myNetwork" ? "border-b-3" : ""
            }`}
          >
            My Network
          </div>
        </Link>
        {/* Messaging */}
        <Link to={"/messages"} className="flex flex-col items-center cursor-pointer">
          <ChatIcon
            sx={{ color: location.pathname === "/messages" ? "black" : "gray" }}
            className="text-2xl text-gray-500"
          />
          <div
            className={`text-xs text-gray-500 ${
              location.pathname === "/messages" ? "border-b-3" : ""
            }`}
          >
            Messages
          </div>
        </Link>
        {/* Resume Section */}
        <Link
          to={"/resume"}
          className="flex flex-col items-center cursor-pointer"
        >
          <WorkIcon
            sx={{ color: location.pathname === "/resume" ? "black" : "gray" }}
            className="text-2xl text-gray-500"
          />
          <div
            className={`text-xs text-gray-500 ${
              location.pathname === "/resume" ? "border-b-3" : ""
            }`}
          >
            Resume
          </div>
        </Link>
        {/* Notifications */}
        <Link
          to={"/notification"}
          className="flex flex-col items-center cursor-pointer"
        >
          <div>
            <NotificationsIcon
              sx={{
                color: location.pathname === "/notification" ? "black" : "gray",
              }}
              className="text-2xl text-gray-500"
            />{" "}
            {notificationCount > 0 && (
              <span className="p-0.5 rounded-full text:sm bg-red-700 text-white">
                {notificationCount}
              </span>
            )}
          </div>
          <div
            className={`text-xs text-gray-500 ${
              location.pathname === "/notification" ? "border-b-3" : ""
            }`}
          >
            Notifications
          </div>
        </Link>
        {/* Me (avatar) */}
        <Link
          to={`/profile/${userData?._id}`}
          className="flex flex-col items-center cursor-pointer"
        >
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
