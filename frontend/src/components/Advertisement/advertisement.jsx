import Card from "../../components/Card/card";
import React, {useState, useEffect} from "react";

const Advertisement = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="sticky top-20 w-full h-fit">
      <Card padding={0}>
        <div className="relative">
          {/* Cover Image */}
          <div className="relative w-full h-32 rounded-t-md overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIM40M__4Lns_gf9ts1qQs4UNMhUHRz9ob6Q&s"
              alt="Ad Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Avatar Image (centered) */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
            <img
              src={userData?.profile_pic || "https://via.placeholder.com/150"}
              alt="Ad Avatar"
              className="rounded-full border-4 border-white h-20 w-20 object-cover cursor-pointer"
            />
          </div>
        </div>

        {/* Ad content */}
        <div className="pt-14 pb-5 px-5 text-center">
          <div className="text-lg font-semibold">{userData?.f_name || "John Doe"}</div>
          <div className="text-sm text-gray-600 mt-1">
            Get info on {userData?.headline || "Your Profession"}
          </div>

          {/* Explore Button */}
          <button
            className="mt-4 px-5 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            Explore
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;
