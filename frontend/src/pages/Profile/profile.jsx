import React, { useState, useEffect, use } from "react";
import Advertisement from "../../components/Advertisement/advertisement";
import Card from "../../components/Card/card";
import EditIcon from "@mui/icons-material/Edit";
import Post from "../../components/Post/post";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal/modal";
import DpModal from "../../components/DPModal/dpModal";
import EditInfoModal from "../../components/EditInfoModal/editInfoModal";
import AboutModal from "../../components/AboutModal/aboutModal";
import ExpModal from "../../components/ExpModal/expModal";
import MessageModal from "../../components/MessageModal/messageModal";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [imageSetModal, setImageModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [expModal, setExpModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);
  const [updateExpData, setUpdateExpData] = useState({ clicked: "", id: "", datas: {} });



  const updateExpEdit = (data, id) => {
    setUpdateExpData({...updateExpData,
      clicked:true,id:id,data:data

    })
    setExpModal(prev => !prev);
  }

  useEffect(() => {
    fetchDataOnLoad();
  }, []);

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, setDatas, ownDatas] = await Promise.all([
        axios.get(`http://localhost:4000/api/auth/user/${id}`),
        axios.get(`http://localhost:4000/api/post/getTop5Post/${id}`),
        axios.get("http://localhost:4000/api/auth/self", {
          withCredentials: true,
        }),
      ]);
      setUserData(userDatas.data.user);
      setPostData(setDatas.data.posts);
      setOwnData(ownDatas.data.user);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to fetch data");
    }
  };
  const handleMessageModal = () => {
    setMessageModal((prev) => !prev);
  };

  const handleExpModal = () => {
    if (expModal) {
      setUpdateExpData({ clicked: false, id: "", data: {} });
      setTimeout(() => {
        fetchDataOnLoad();
      }, 300);
    }
    setExpModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
    setTimeout(() => {
      if (aboutModal) fetchDataOnLoad();
    }, 300);
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleImageModalOpenClose = () => {
    setImageModal((prev) => !prev);
  };
  const handleOnEditCover = () => {
    setImageModal(true);
    setCircularImage(false);
  };
  const handleCircularImage = () => {
    setCircularImage(true);
    setImageModal(true);
  };
  const handleEditFunc = async (data) => {
    await axios.put(`http://localhost:4000/api/auth/update`, { user: data }, { withCredentials: true }).then((res) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
      toast.error("Error updating profile");
    });
  }

  return (
    <div className="px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100">
      <div className="flex justify-between">
        {/* Left side */}
        <div className="w-full md:w-[70%]">
          <div>
            {/** Profile Card **/}
            <Card>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  <div
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white"
                    onClick={handleOnEditCover}
                  >
                    <EditIcon />
                  </div>
                  <img
                    src={userData?.cover_pic}
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                  />
                  <div
                    onClick={handleCircularImage}
                    className="absolute object-cover top-24 left-6 z-10"
                  >
                    <img
                      src={
                        userData?.profile_pic ||
                        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      className="w-35 h-35 rounded-full border-2 border-white object-cover cursor-pointer"
                    />
                  </div>
                </div>
                <div className="mt-10 relative px-8 py-2">
                  <div
                    className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white"
                    onClick={handleInfoModal}
                  >
                    <EditIcon />
                  </div>
                  <div className="w-full">
                    <div className="font-bold text-2xl">{userData?.f_name}</div>
                    <div className="text-md text-gray-700">
                      {userData?.headline || "Software Engineer"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {userData?.curr_location || "Unknown Location"}
                    </div>
                    <div className="text-md text-green-600 w-fit cursor-pointer hover:underline">
                      {userData?.friends?.length} Friends
                    </div>

                    <div className="md:flex w-full justify-between">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 border-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700">
                          {" "}
                          Open to{" "}
                        </div>
                        <div className="cursor-pointer p-2 border-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700">
                          {" "}
                          Share{" "}
                        </div>
                        <div
                          className="cursor-pointer p-2 border-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-700"
                          onClick={async () => {
                            try {
                              await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
                              localStorage.removeItem("isLogin");
                              localStorage.removeItem("userInfo");
                              window.location.href = "/login";
                            } catch (err) {
                              alert("Logout failed");
                            }
                          }}
                        >
                          Logout
                        </div>
                      </div>
                      <div className="my-5 flex gap-5">
                        <div
                          onClick={handleMessageModal}
                          className="cursor-pointer p-2 border-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                        >
                          {" "}
                          Message{" "}
                        </div>
                        <div className="cursor-pointer p-2 border-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700">
                          {" "}
                          Connect{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* About Section */}

            <div className="my-5">
              <Card padding={1}>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-lg">About</div>
                  <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    title="Edit About"
                    onClick={handleAboutModal}
                  >
                    <EditIcon fontSize="small" />
                    <span className="text-xs">Edit</span>
                  </button>
                </div>
                <div className="text-sm text-gray-800 mt-2">{userData?.about}</div>
              </Card>
            </div>

            {/* Skills Section */}
            <div className="mt-5">
              <Card padding={1}>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xl">Skills</div>
                </div>
                <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap">
                  {userData?.skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="cursor-pointer border-2 border-gray-300 bg-gray-200 hover:bg-gray-400 rounded-full py-2 px-3"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/** Activity Card **/}
            <div className="mt-">
              <Card padding={1}>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">Activities</div>
                </div>

                <div className="cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-700 text-white font-semibold hover:bg-green-800">
                  Posts
                </div>

                {/* Parent div for scrolling */}
                <div className="overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-full">
                  {postData.map((item) => {
                    return (
                      <Link
                        key={item._id || item.id}
                        to={`/profile/${id}/activities/${item._id}`}
                        className="cursor-pointer shrink-0 w-[350px] h-[560px] flex-shrink-0"
                      >
                        <Post profile={1} item={item} personalData={ownData} />
                      </Link>
                    );
                  })}
                </div>

                <div className="w-full flex justify-center items-center">
                  <Link
                    to={`/profile/${id}/activities`}
                    className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                  >
                    show all posts
                  </Link>
                </div>
              </Card>
            </div>

            {/*Experience*/}
            <div className="mt-5">
              <Card padding={1}>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xl font-bold">Experience</div>
                  <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    title="Add Experience"
                    onClick={handleExpModal}
                  >
                    <AddIcon fontSize="small" />
                    <span className="text-xs">Add</span>
                  </button>
                </div>
                <div className="mt-5">
                  {userData?.experience.map((item) => {
                    return (
                      <div key={item._id || item.company_name || Math.random()} className="flex justify-between items-start p-4 border-t border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex flex-col gap-1">
                          <div className="text-lg font-semibold">
                            {item?.designation || "Null"}
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {item?.company_name || "Null"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item?.duration || "Work Duration"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item?.location || "Location"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item?.info || "Info"}
                          </div>
                        </div>
                        <button onClick={() => updateExpEdit(item, item._id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                          title="Edit Experience"
                        >
                          <EditIcon fontSize="small" />
                          <span className="text-xs">Edit</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:flex md:w-[28%]">
          <div className="stinky top-19">
            <Advertisement />
          </div>
        </div>
      </div>
      {imageSetModal && (
        <Modal title="upload image" closeModal={handleImageModalOpenClose}>
          <DpModal handleEditFunc={handleEditFunc} selfData={ownData} isCircular={circularImage} />
        </Modal>
      )}

      {infoModal && (
        <Modal title="Edit Info" closeModal={handleInfoModal}>
          <EditInfoModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Modal>
      )}

      {aboutModal && (
        <Modal title="EditAbout" closeModal={handleAboutModal}>
          <AboutModal handleEditFunc={handleEditFunc} selfData={ownData}/>
        </Modal>
      )}

      {expModal && (
        <Modal title="Edit Experience" closeModal={handleExpModal}>
          <ExpModal handleEditFunc={handleEditFunc} selfData={ownData} updateExpData={updateExpData} setUpdateExpData={setUpdateExpData} />
        </Modal>
      )}

      {messageModal && (
        <Modal title="Send Message" closeModal={handleMessageModal}>
          <MessageModal />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
