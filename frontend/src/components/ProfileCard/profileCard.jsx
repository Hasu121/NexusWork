import React from 'react';
import Card from '../Card/card';
import { useNavigate } from 'react-router-dom';

const ProfileCard = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (props.data?._id) {
      navigate(`/profile/${props.data._id}`);
    }
  };
  return (
    <Card padding={0}>
      <div className="relative cursor-pointer" onClick={handleClick}>
        {/* Cover Image */}
        <div className="relative w-full h-32 rounded-t-md overflow-hidden">
          <img
            src={props.data?.cover_pic}
            alt="Profile Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avatar Image */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <img
            src={props?.data?.profile_pic}
            alt="Profile Avatar"
            className="rounded-full border-4 border-white h-20 w-20 object-cover cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-5 pb-5 text-center cursor-pointer" onClick={handleClick}>
        <div className="text-xl font-semibold">{props?.data?.f_name}</div>
        <div className="text-sm text-gray-600">{props?.data?.headline}</div>
        <div className="text-sm text-gray-500">{props?.data?.curr_location}</div>
        <div className="text-sm text-gray-500">{props?.data?.curr_company}</div>
        <div className="mt-3">
          <button className="px-4 py-1 text-sm font-medium border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors" onClick={handleClick}>
            View Profile
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
