import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import Advertisement from "../../components/Advertisement/advertisement";
import Card from "../../components/Card/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate=useNavigate();
  const [ownData, setOwnData] = useState(null);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
  }, []);


  const handleOnClickNotification = async(item) => {
    await axios.put("http://localhost:4000/api/notification/isRead", { notificationId: item._id }, {withCredentials: true})
      .then(res => {
        if (item.type === "comment" || item.type === "like") {
          // Go to the sender's activity page for comment/like notifications
          navigate(`/profile/${item?.sender?._id}/activities/${item.postId}`);
        } else {
          navigate('/myNetwork');
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching notifications");
      });
  }


  const fetchNotificationData = async () => {
    await axios
      .get("http://localhost:4000/api/notification", { withCredentials: true })
      .then((res) => {
        setNotifications(res.data.notifications);
      }).catch((err) => {
        console.log(err)
        alert("Error fetching notifications");
      });
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);


  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[25%] sm:block hidden sm:w-[23%] py-5">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-[100%] py-5 sm:w-[50%] h-[calc(100vh-200px)] overflow-y-auto">
        <Card padding={0}>
          <div className="w-full">
            {/* For each notification */}
            {notifications.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleOnClickNotification(item);
                  }}
                  className={`border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3 ${item?.isRead ? "bg-gray-100" : "bg-white"}`}
                >
                  <img
                    src={item?.sender?.profile_pic}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 cursor-pointer"
                  />
                  <div>{item?.content}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Right Side */}
      <div className="w-[26%] md:block hidden sm:w-[23%] py-5">
        <div className="mt-5">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Notification;
