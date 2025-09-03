import React, { useState, useEffect } from "react";
import Card from "../../components/Card/card";
import ProfileCard from "../../components/ProfileCard/profileCard";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArticleIcon from '@mui/icons-material/Article';
import Advertisement from "../../components/Advertisement/advertisement";
import Post from "../../components/Post/post";
import Modal from "../../components/Modal/modal";
import AddModal from "../../components/AddModal/addModal";
import Loader from "../../components/Loader/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Feeds = () => {

  const [personalData, setPersonalData] = useState(null);
  const [post, setPost] = useState([]);

  const [addPostModal, setAddPostModal] = useState(false);

  // const fetchSelfData = async () => {
  //   await axios.get('http://localhost:4000/api/auth/self', { withCredentials: true })
  //     .then(res => {
  //       setPersonalData(res.data.user);
  //     })
  //     .catch(err => {
  //       console.error("API Error:", err);
  //       toast.error(err?.response?.data?.message || "Failed to fetch self data");
  //     });
  // };

  const fetchData = async () => {
    try{
      const [userData, postData] = await Promise.all([
        await axios.get('http://localhost:4000/api/auth/self', { withCredentials: true }),
        await axios.get('http://localhost:4000/api/post/getAllPost')
      ]);

      setPersonalData(userData.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userData.data.user));
      setPost(postData.data.posts);

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    }
  }

  useEffect(()=>{
    // fetchSelfData()
    fetchData()
  },[])

  const handleOpenPostModal = ()=>{
    setAddPostModal(prev=>!prev);
  };

  // Use totalPostLikes from backend
  const totalLikes = personalData?.totalPostLikes ?? 0;
  // Profile likes from user data
  const profileLikes = Array.isArray(personalData?.profileLikes) ? personalData.profileLikes.length : 0;

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[25%] sm:block hidden sm:w-[23%] py-5">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card padding={true}>
            <div className="w-full flex justify-between mb-2">
              <div className="text-md font-semibold">Total Post Likes</div>
              <div className="text-blue-900">{totalLikes}</div>
            </div>
            <div className="w-full flex justify-between mb-2">
              <div className="text-md font-semibold">Profile Likes</div>
              <div className="text-blue-900">{profileLikes}</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        {/* Post Creation Section */}
        <div>
          <Card padding={true}>
            <div className="flex gap-2 items-center">
              <img
                src={personalData?.profile_pic || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                alt="Your profile"
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <div onClick={()=>setAddPostModal(true)} className="w-full border-1 py-3 px-3 rounded-3xl cursor-pointer hover:bg-gray-100">
                Make a post
              </div>
            </div>
            <div className="w-full mt-3 flex">
              <div onClick={()=>setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                <VideocamIcon sx={{color:"green"}}/>Video
              </div>
              <div onClick={()=>setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                <AddPhotoAlternateIcon sx={{color:"blue"}}/>Photo
              </div>
              <div onClick={()=>setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                <ArticleIcon sx={{color:"purple"}}/>Article
              </div>
            </div>
          </Card>
        </div>
        
        <div className="border-b-1 border-gray-400 w-[100%] my-5"/>
        
        <div className="w-full flex flex-col gap-5">
            
            {
              post.map((item) => {
                return <Post item={item} key={item._id || item.id} personalData={personalData} />
              })
            }


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

      {
        addPostModal && <Modal closeModal={handleOpenPostModal} title="Create a Post">
            <AddModal personalData={personalData} />
          </Modal>
      }
      <ToastContainer />
      
    </div>
  );
};

export default Feeds;
