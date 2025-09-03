import React, { useState, useEffect } from "react";
import Advertisement from "../../components/Advertisement/advertisement";
import Card from "../../components/Card/card";
import Post from "../../components/Post/post";
import ProfileCard from "../../components/ProfileCard/profileCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleActivity = () => {
  const { id, postId } = useParams();
  const [ownData, setOwnData] = useState(null);

  const [post,setPost] = useState([]);

  const fetchDataOnLoad = async () => {
    await axios.get(`http://localhost:4000/api/post/getPostById/${postId}`).then((res) => {
      setPost(res.data.post);
    }).catch (err => {
        console.error(err);
        alert(err?.response?.data?.error || "An error occurred");
      });
  };

  useEffect(() => {
  fetchDataOnLoad();
  let userData = localStorage.getItem("userInfo");
  setOwnData(userData ? JSON.parse(userData) : null);
  }, [id]);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[25%] sm:block hidden sm:w-[23%] py-5">
        <div className="h-fit">
          <ProfileCard data={post?.user} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        <div className="my-2 flex flex-col gap-2">
          <Post item={post} personalData={ownData} postOwnerId={post?.user?._id} />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[26%] md:block hidden sm:w-[23%] py-5">
        <div>
          <Card padding={true}>
            <div className="text-xl">Nexus News</div>
            <div className="text-gray-600">Top Stories</div>
            <div className="my-1">
              <div className="text-md">Laravel in 2025</div>
              <div className="text-xs text-gray-400">5 days ago</div>
            </div>
            <div className="my-1">
              <div className="text-md">Foodpanda fires developers</div>
              <div className="text-xs text-gray-400">8 days ago</div>
            </div>
          </Card>
        </div>
        <div className="mt-5">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default SingleActivity;
