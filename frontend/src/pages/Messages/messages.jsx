import React from "react";
import Card from "../../components/Card/card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Conversation from "../../components/Conversation/conversation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from '@mui/icons-material/Image';
import Advertisement from "../../components/Advertisement/advertisement";

const Messages = () => {
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
                <Conversation />
              </div>
              {/* Message */}
              <div className="w-full md:w-[60%] border-gray-400">
                <div className="border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">User1</p>
                    <p className="text-sm text-gray-500">I am me</p>
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300">
                  <div className="w-full border-b-1 border-gray-300 gap-3 p-4">
                    <img
                      className="w-16 h-15 rounded-[100%] cursor-pointer"
                      src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    />
                    <div className="my-2">
                      <div className="text-md">User Name</div>
                      <div className="text-sm text-gray-500">headline</div>
                    </div>

                    <div className="w-full">
                        {/* Individual texts */}
                        <div className="flex w-full cursor-pointer border-gray-300 gap-3 p-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-[100%] cursor-pointer" src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" />
                            </div>
                            <div className="mb-2 w-full">
                                <div className="text-md">User1</div>
                                <div className="text-sm mt-6 hover:bg-gray-500">Hello, how are you?</div>
                                <div className="my-2"><img className='w-[240px] h-[240px] rounded-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/960px-Webb%27s_First_Deep_Field.jpg"/></div>
                            </div>
                        </div>

                    </div>
                  </div>
                </div>

                <div className="p-2 w-full border-b-1 border-gray-200">
                    <textarea rows = {4} className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3" placeholder="Type your message..."></textarea>
                </div>
                <div className="p-3 flex justify-between">
                    <div>
                        <label htmlFor="messageImage" className="cursor-pointer"> <ImageIcon/>  </label>
                        <input type="file" id="messageImage" className="hidden" />
                    </div>
                    <div className="px-3 py-1 cursor-pointer rounded-2xl border-1 bg-blue-950 text-white">
                        Send
                    </div>
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
