import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Post = ({ profile, item, key, personalData }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);

  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(item?.likes.length || 0);

  const [commentText, setCommentText] = useState("");

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (commentText.trim().length === 0) {
      return toast.error("Comment cannot be empty");
    }

    await axios.post(`http://localhost:4000/api/comment`,{postId:item?._id, comment:commentText},{withCredentials: true}).then((res) => {
      setComments([res.data.comment,...comments]);
      setCommentText("");
    }).catch((err) => {
      console.log(err);
      toast.error("Error sending comment");
    });
  };

  
  useEffect(() => {
    let selfId = personalData?._id;
    item?.likes?.map((item) => {
      if (item.toString() === selfId.toString()) {
        setLiked(true);
        return;
      } else {
        setLiked(false);
      }
    });
  }, []);

  const handleLikeFunc = async () => {
    await axios
      .post(
        "http://localhost:4000/api/post/likeDislike",
        { postId: item?._id },
        { withCredentials: true }
      )
      .then((res) => {
        if (liked) {
          setLiked(false);
          setNumOfLikes((prev) => prev - 1);
        } else {
          setLiked(true);
          setNumOfLikes((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error liking/disliking post");
      });
  };

  const handleCommentBoxOpenClose = async () => {
    setComment((prev) => !prev);
    await axios
      .get(`http://localhost:4000/api/comment/${item?._id}`)
      .then((resp) => {
        console.log(resp);
        setComments(resp.data.comments);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching comments");
      });
  };

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
          <ThumbUpIcon sx={{ color: "blue", fontsize: 12 }} />
          <span className="text-sm text-gray-500">{numOfLikes} Likes</span>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="text-sm text-gray-500">
            {item?.comments || 0} Comments
          </span>
        </div>
      </div>

      {!profile && (
        <div className="flex p-1">
          <div
            onClick={handleLikeFunc}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100 group"
          >
            {liked ? (
              <>
                <ThumbUpIcon sx={{ color: "blue", fontsize: 22 }} />
                <span className="group-hover:hidden">Liked</span>
                <span className="hidden group-hover:inline">Unlike</span>
              </>
            ) : (
              <>
                <ThumbUpOffAltIcon sx={{ color: "blue", fontsize: 22 }} />
                <span>Like</span>
              </>
            )}
          </div>
          <div
            onClick={handleCommentBoxOpenClose}
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
              src={personalData?.profile_pic || "https://via.placeholder.com/150" }
              alt=""
            />
            <form className="w-full flex gap-2" onSubmit={handleSendComment}>
              <input
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
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
            {comments.map((item, index) => {
              return (
                <div className="my-4">
                  <div className="flex gap-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src={item?.user?.profile_pic || "https://via.placeholder.com/150"}
                      alt=""
                    />
                    <div className="cursor-pointer">
                      <div className="text-md font-semibold">{item?.user?.f_name || "Unknown User"}</div>
                      <div className="text-xs text-gray-500">@{item?.user?.headline || "Unknown"}</div>
                    </div>
                  </div>
                  <div className="px-11 my-2">{item?.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ToastContainer />
    </Card>
  );
};

export default Post;
