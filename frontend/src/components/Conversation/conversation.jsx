import React from "react";

const Conversation = () => {
  return (
    <div className="flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200">
      <div className="shrink-0">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          alt=""
        />
      </div>
      <div>
        <div className="text-md">User Name</div>
        <div className="text-sm text-gray-500">headline</div>
      </div>
    </div>
  );
};

export default Conversation;
