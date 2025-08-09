import React from "react";
import Card from "../Card/card";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";

const Post = ({ profile, item, key, personalData }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);

  const handleSendComment = (e) => {
    e.preventDefault();
  };
  console.log("item", item);

  const desc = item?.desc;
  return (
    <Card padding={0}>
      <div className="flex gap-3 p-4">
        <div className="w-12 h-12 rounded-4xl">
          <img
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
            src={item?.user?.profile_pic}
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{item?.user?.f_name}</div>
          <div className="text-xs text-gray-500">{item?.user?.headline}</div>
        </div>
      </div>

      {desc.length > 1 && (
        <div className="text-md p-4 my-3 white-space-pre-line flex-grow">
          {seeMore ? desc : `${desc.slice(0, 150)}` + "..."}
          {desc.length < 150 ? null : (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setSeeMore(!seeMore)}
            >
              {seeMore ? " See Less" : " See More"}
            </span>
          )}
        </div>
      )}

      {item?.imageLink && (
        <div className="w-[100%] h-[300px]">
          <img className="w-full h-full object-cover" src={item?.imageLink} />
        </div>
      )}

      <div className="my-2 p-4 flex justify-between items-center">
        <div className="flex gap-1 items-center cursor-pointer">
          <ThumbUpOffAltIcon sx={{ color: "blue", fontsize: 12 }} />
          <span className="text-sm text-gray-500">
            {item?.likes.length || 0} Likes
          </span>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="text-sm text-gray-500">
            {item?.comments || 0} Comments
          </span>
        </div>
      </div>

      {!profile && (
        <div className="flex p-1">
          <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
            {" "}
            <ThumbUpOffAltIcon /> <span>Like</span>
          </div>
          <div
            onClick={() => setComment(true)}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"
          >
            {" "}
            <CommentIcon /> <span>Comment</span>
          </div>
          <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
            {" "}
            <SendIcon /> <span>Send</span>
          </div>
        </div>
      )}

      {/*Comments section */}
      {comment && (
        <div className="p-4 w-full">
          <div className="flex gap-2 items-center">
            <img
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://www.parismatch.be/resizer/v2/QZXNSG5XVVCYHJNS5EZBZUL33Y.jpg?auth=fda480ffafedf925d1cf3fcf319a438d12a9723c8b4f9b0102fcda0f0890ef7e&width=1200&height=800&quality=85&focal=2689%2C1802"
              alt=""
            />
            <form className="w-full flex gap-2" onSubmit={handleSendComment}>
              <input
                placeholder="Add a comment..."
                className="w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100"
              />
              <button
                type="submit"
                className="cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3"
              >
                Send
              </button>
            </form>
          </div>

          {/*Others Comments List */}
          <div className="w-full p-4">
            <div className="my-4">
              <div className="flex gap-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://www.parismatch.be/resizer/v2/QZXNSG5XVVCYHJNS5EZBZUL33Y.jpg?auth=fda480ffafedf925d1cf3fcf319a438d12a9723c8b4f9b0102fcda0f0890ef7e&width=1200&height=800&quality=85&focal=2689%2C1802"
                  alt=""
                />
                <div className="cursor-pointer">
                  <div className="text-md font-semibold">Henry Cavill</div>
                  <div className="text-xs text-gray-500">@Actor</div>
                </div>
              </div>
              <div className="px-11 my-2">Hi this is cool</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
