import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Conversation from "../../components/Conversation/conversation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from '@mui/icons-material/Image';
import Advertisement from "../../components/Advertisement/advertisement";
import axios from "axios";
import socket from "../../../socket";


const Messages = () => {
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [ownData, setOwnData] = useState(null);
  const [activeConvId, setActiveConvId] = useState(null);
  const [selectedConvDetails, setSelectedConvDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [messageText, setMessageText] = useState("");


  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSelectedConv = (id, userData) => {
    setActiveConvId(id);
    socket.emit("joinConversation", id);
    setSelectedConvDetails(userData);
  }

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    fetchConversationOnLoad();
  }, []);

  useEffect(() => {
    if (activeConvId) {
      fetchMessages()
    }
  }, [activeConvId])

  useEffect(() => {
    // Listen for new messages and append them correctly
    const handleReceiveMessage = (messageObj) => {
      setMessages(prev => [...prev, messageObj]);
    };
    socket.on("receiveMessage", handleReceiveMessage);
    // Cleanup listener on unmount
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const fetchConversationOnLoad = async () => {
    await axios.get(`http://localhost:4000/api/conversation/get-conversation`, { withCredentials: true }).then(res => {
      setConversations(res.data.conversations)
      setActiveConvId(res.data.conversations[0]?._id);
      socket.emit("joinConversation", res.data.conversations[0]?._id);
      let ownId = ownData?._id;
      let arr = res.data.conversations[0]?.members?.filter((A) => A._id !== ownId)
      setSelectedConvDetails(arr[0]);
    }).catch((err) => {
      console.log(err);
      alert("Error fetching conversations");
    });
  }


  const fetchMessages = async () => {
    await axios.get(`http://localhost:4000/api/message/${activeConvId}`, { withCredentials: true }).then(res => {
      console.log(res.data);
      setMessages(res.data.message)
    }).catch(err => {
      console.log(err);
      alert("Error fetching messages");
    });
  }

  const handleInputImage = async (e) => {
    const file = e.target.files;
    const data = new FormData();
    data.append("file", file[0]);

    data.append("upload_preset", "nexuswork");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dk9ciwgj9/image/upload",
        data
      );

      const imageUrl = response.data.url;
      setImageLink(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
  const handleEditMessage = async (id) => {
    await axios.put(`http://localhost:4000/api/message/${id}`, { message: editMessageText }, { withCredentials: true })
      .then(res => {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, message: editMessageText } : msg));
        setEditMessageId(null);
        setEditMessageText("");
      })
      .catch(err => {
        console.log(err);
        alert("Error editing message");
      });
  };

  const handleDeleteMessage = async (id) => {
    await axios.delete(`http://localhost:4000/api/message/${id}`, { withCredentials: true })
      .then(res => {
        setMessages(messages.filter(msg => msg._id !== id));
      })
      .catch(err => {
        console.log(err);
        alert("Error deleting message");
      });
  };
    await axios.post(`http://localhost:4000/api/message/`, { conversation: activeConvId, message: messageText, picture: imageLink }, { withCredentials: true }).then(res => {
      socket.emit("sendMessage", activeConvId, res.data.populatedMessage);
      setMessageText("");
    }).catch(err => {
      console.log(err);
      alert("Error fetching messages");
    });
  }



  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full justify-between flex pt-5">

        {/* Chat Area */}
        <div className="w-full md:w-[70%]">
          <Card padding={0}>
            <div className="border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg">
              Messages
            </div>
            <div className="border-b-1 border-gray-300 px-5 py-2">
              <div className="py-2 px-3 cursor-pointer hover:bg-green-700 bg-green-600 font-semibold flex gap-2 w-fit rounded-2xl text-white">
                {" "}
                Focused <ArrowDropDownIcon />{" "}
              </div>
            </div>

            {/* Chat part */}
            <div className="w-full md:flex">
              <div className="h-[500px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400">
                {/* Chat list */}

                {
                  conversations.map((item, index) => {
                    return (
                      <Conversation activeConvId={activeConvId} handleSelectedConv={handleSelectedConv} item={item} key={index} ownData={ownData} />
                    )
                  })
                }

              </div>
              {/* Message */}
              <div className="w-full md:w-[60%] border-gray-400">
                <div className="border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">{selectedConvDetails?.f_name}</p>
                    <p className="text-sm text-gray-500">{selectedConvDetails?.headline}</p>
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300">
                  <div className="w-full border-b-1 border-gray-300 gap-3 p-4">
                    <img
                      className="w-16 h-15 rounded-[100%] cursor-pointer"
                      src={selectedConvDetails?.profile_pic}
                    />
                    <div className="my-2">
                      <div className="text-md">{selectedConvDetails?.f_name}</div>
                      <div className="text-sm text-gray-500">{selectedConvDetails?.headline}</div>
                    </div>

                    <div className="w-full">
                      {/* Individual texts */}
                      {
                        messages.map((item, index) => {
                          const isOwn = item?.sender?._id === ownData?._id;
                          return (
                            <div ref={ref} key={index} className="flex w-full cursor-pointer border-gray-300 gap-3 p-4 relative">
                              <div className="shrink-0">
                                <img className="w-8 h-8 rounded-[100%] cursor-pointer" src={item?.sender?.profile_pic || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} />
                              </div>
                              <div className="mb-2 w-full">
                                <div className="flex justify-between items-center">
                                  <div className="text-md">{item?.sender?.f_name || "Unknown User"}</div>
                                  {isOwn && (
                                    <div>
                                      <MoreHorizIcon style={{ cursor: 'pointer' }} onClick={() => setMenuOpenId(menuOpenId === item._id ? null : item._id)} />
                                      {menuOpenId === item._id && (
                                        <div className="absolute right-0 top-8 bg-white border rounded shadow-md z-10">
                                          <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left" onClick={() => { setEditMessageId(item._id); setEditMessageText(item.message); setMenuOpenId(null); }}>Edit</button>
                                          <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left" onClick={() => { handleDeleteMessage(item._id); setMenuOpenId(null); }}>Delete</button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {editMessageId === item._id ? (
                                  <div className="flex gap-2 items-center mt-2">
                                    <input type="text" value={editMessageText} onChange={e => setEditMessageText(e.target.value)} className="border rounded px-2 py-1 w-full" />
                                    <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => handleEditMessage(item._id)}>Save</button>
                                    <button className="px-2 py-1 bg-gray-400 text-white rounded" onClick={() => setEditMessageId(null)}>Cancel</button>
                                  </div>
                                ) : (
                                  <div className="text-sm mt-6 hover:bg-gray-500">{item?.message || "No message content"}</div>
                                )}
                                {item?.picture && (
                                  <div className="my-2">
                                    <img className='w-[240px] h-[240px] rounded-md' src={item?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/960px-Webb%27s_First_Deep_Field.jpg"} />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      }

                    </div>
                  </div>
                </div>

                <div className="p-2 w-full border-b-1 border-gray-200">
                  <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={4} className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3" placeholder="Type your message..."></textarea>
                </div>
                <div className="p-3 flex justify-between">
                  <div>
                    <label htmlFor="messageImage" className="cursor-pointer"> <ImageIcon />  </label>
                    <input type="file" onChange={handleInputImage} id="messageImage" className="hidden" />
                  </div>
                  {
                    (!loading) && <div onClick={handleSendMessage} className="px-3 py-1 cursor-pointer rounded-2xl border-1 bg-blue-950 text-white">
                      Send
                    </div>
                  }
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/*Advertisement */}
        <div className="hidden md:flex md:w-[25%]">
          <div className="sticky top-19">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
