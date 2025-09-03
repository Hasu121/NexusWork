import React, {useState, useEffect} from "react";

const Conversation = ({item,key,ownData, handleSelectedConv, activeConvId}) => {

  const [memberData,setMemberData] = useState(null);

  useEffect(() => {
    let ownId = ownData?._id;
    let arr = item?.members?.filter((A)=>A._id !== ownId)
    setMemberData(arr[0]);
  }, [item, ownData]);

  const handleClickFunc = async() => {
    handleSelectedConv(item?._id, memberData);
  }

  return (
    <div onClick={handleClickFunc} key={key} className={`flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200 ${activeConvId === item?._id ? "bg-gray-200" : ""}`}>
      <div  className="shrink-0">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={memberData?.profile_pic || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt=""
        />
      </div>
      <div>
        <div className="text-md">{memberData?.f_name || "Unknown User"}</div>
        <div className="text-sm text-gray-500">{memberData?.headline || ""}</div>
      </div>
    </div>
  );
};

export default Conversation;
