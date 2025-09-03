import React, { useState, useEffect } from "react";
import ImageModal from "../Modal/ImageModal";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../Card/card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";



const Post = ({ profile, item, personalData, postOwnerId }) => {
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentOptionsIndex, setCommentOptionsIndex] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item?.desc || "");
  const [showOptions, setShowOptions] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(item?.comments || 0);

  const [liked, setLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(Array.isArray(item?.likes) ? item.likes.length : 0);

  const [commentText, setCommentText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (commentText.trim().length === 0) {
      return toast.error("Comment cannot be empty");
    }

    await axios
      .post(
        `http://localhost:4000/api/comment`,
        { postId: item?._id, comment: commentText },
        { withCredentials: true }
      )
      .then((res) => {
        setComments([res.data.comment, ...comments]);
        setCommentText("");
        setCommentCount((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error sending comment");
      });
  };

  useEffect(() => {
    let selfId = personalData?._id;
    if (Array.isArray(item?.likes)) {
      item.likes.forEach((like) => {
        if (like?.toString() === selfId?.toString()) {
          setLiked(true);
        }
      });
    }
  }, []);



  const handleDeletePost = async () => {
    if (!item?._id) return;
    try {
      await axios.delete(`http://localhost:4000/api/post/${item._id}`, { withCredentials: true });
      toast.success("Post deleted successfully", { autoClose: 2000 });
      setIsDeleted(true);
    } catch (err) {
      toast.error("Failed to delete post", { autoClose: 2000 });
    }
  };


  const handleEditPost = async () => {
    if (!item?._id || editText.trim() === "") return;
    try {
      await axios.put(`http://localhost:4000/api/post/${item._id}`, { desc: editText }, { withCredentials: true });
      toast.success("Post updated successfully", { autoClose: 2000 });
      setIsEditing(false);
      item.desc = editText;
    } catch (err) {
      toast.error("Failed to update post", { autoClose: 2000 });
    }
  };

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
        setComments(resp.data.comments);
        setCommentCount(resp.data.comments.length);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching comments");
      });
  };


  const copyToClipboard = async(postId) => {
    try{
      let string = `http://localhost:5173/profile/${item?.user?._id}/activities/${item?._id}`;
      await navigator.clipboard.writeText(string);
      toast.success("Post link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy post link", error);
    }
  };

  const desc = typeof item?.desc === "string" ? item.desc : "";
  return (
    <>
      {isDeleted ? null : (
        <Card padding={0}>
        <div className="flex gap-3 p-4">
          <div className="w-12 h-12 rounded-4xl">
            <Link to={`/profile/${item?.user?._id}`}>
              <img
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                src={item?.user?.profile_pic}
                alt=""
              />
            </Link>
          </div>
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">{item?.user?.f_name}</div>
              <div className="text-xs text-gray-500">{item?.user?.headline}</div>
            </div>
            {/* Show 3-dot options menu for post owner only if not in profile view */}
            {!profile && personalData?._id && item?.user?._id && personalData._id.toString() === item.user._id.toString() && (
              <div className="relative">
                <button
                  className="ml-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                  onClick={() => setShowOptions((prev) => !prev)}
                  title="Options"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => { setIsEditing(true); setShowOptions(false); }}
                    >
                      Edit Post
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      onClick={() => { handleDeletePost(); setShowOptions(false); }}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-md p-4 my-3 whitespace-pre-line flex-grow">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="border rounded p-2 w-full"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleEditPost}>Save</button>
                <button className="bg-gray-300 text-black px-3 py-1 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              {seeMore
                ? desc
                : desc?.length > 50
                ? `${desc.slice(0, 50)}...`
                : `${desc}`}
              {desc?.length < 50 ? null : (
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setSeeMore(!seeMore)}
                >
                  {seeMore ? " See Less" : " See More"}
                </span>
              )}
            </>
          )}
        </div>

      {item?.imageLink && (
        <div
          className="w-[100%] h-[300px] cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            className="w-full h-full object-cover"
            src={item?.imageLink}
            alt="Post"
          />
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        image={item?.imageLink}
        comments={comments.length > 0 ? comments : []}
      />

      <div className="my-2 p-4 flex justify-between items-center">
        <div className="flex gap-1 items-center cursor-pointer">
          <ThumbUpIcon sx={{ color: "blue", fontsize: 12 }} />
          <span className="text-sm text-gray-500">{numOfLikes} Likes</span>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="text-sm text-gray-500">{commentCount} Comments</span>
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
          <div
            onClick={copyToClipboard}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"
          >
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
              src={
                personalData?.profile_pic ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
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
            {comments.map((commentItem, index) => {
              const isCommentOwner =
                personalData?._id &&
                commentItem?.user?._id &&
                personalData._id.toString() === commentItem.user._id.toString();
              const isPostOwner =
                personalData?._id &&
                (item?.user?._id || postOwnerId) &&
                personalData._id.toString() === ((item?.user?._id || postOwnerId)?.toString());
              return (
                <React.Fragment key={commentItem._id || index}>
                  <div className="my-4">
                    <div className="flex gap-3 items-center">
                      <Link to={`/profile/${commentItem?.user?._id}`}>
                        <img
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                          src={
                            commentItem?.user?.profile_pic ||
                            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                          }
                          alt=""
                        />
                      </Link>
                      <div className="cursor-pointer">
                        <div className="text-md font-semibold">
                          {commentItem?.user?.f_name || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{commentItem?.user?.headline || "Unknown"}
                        </div>
                      </div>
                      {/* Show 3-dot options menu for comment owner or post owner only if not in profile view */}
                      {!profile && (isCommentOwner || isPostOwner) && (
                        <div className="relative">
                          <button
                            className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                            onClick={() => setCommentOptionsIndex(commentOptionsIndex === index ? null : index)}
                            title="Options"
                          >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <circle cx="5" cy="12" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="19" cy="12" r="2" />
                            </svg>
                          </button>
                          {commentOptionsIndex === index && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                              {isCommentOwner && (
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                  onClick={() => {
                                    setEditingCommentIndex(index);
                                    setEditCommentText(commentItem.comment);
                                    setCommentOptionsIndex(null);
                                  }}
                                >
                                  Edit Comment
                                </button>
                              )}
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  try {
                                    await axios.delete(
                                      `http://localhost:4000/api/comment/${commentItem._id}`,
                                      { withCredentials: true }
                                    );
                                    setComments(
                                      comments.filter((c) => c._id !== commentItem._id)
                                    );
                                    setCommentCount((prev) => prev - 1);
                                    toast.success("Comment deleted");
                                  } catch (err) {
                                    toast.error("Failed to delete comment");
                                  }
                                  setCommentOptionsIndex(null);
                                }}
                              >
                                Delete Comment
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="px-11 my-2">
                      {editingCommentIndex === index ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="border rounded p-2 w-full"
                            value={editCommentText}
                            onChange={e => setEditCommentText(e.target.value)}
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded"
                              onClick={async () => {
                                try {
                                  await axios.put(`http://localhost:4000/api/comment/${commentItem._id}`, { comment: editCommentText }, { withCredentials: true });
                                  setComments(comments.map((c, i) => i === index ? { ...c, comment: editCommentText } : c));
                                  toast.success("Comment updated");
                                  setEditingCommentIndex(null);
                                } catch (err) {
                                  toast.error("Failed to update comment");
                                }
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 text-black px-3 py-1 rounded"
                              onClick={() => setEditingCommentIndex(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        commentItem?.comment
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
          <ToastContainer />
        </Card>
      )}
    </>
  );
};

export default Post;
