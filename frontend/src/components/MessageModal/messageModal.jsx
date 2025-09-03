import React, {useState} from "react";
import axios from "axios";

const MessageModal = ({selfData,userData}) => {

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
      await axios.post("http://localhost:4000/api/conversation/add-conversation", {
        receiverId: userData?._id,
        message
      }, { withCredentials: true }).then(res => {
        window.location.reload();
      }).catch (err => {
        alert(err?.response?.data?.error)
      });
  };

  return (
    <div className='my-5'>
      <div className="w-full mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          cols={10}
          rows={10}
          name="message"
          id="message"
          className="mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your message"
        ></textarea>
      </div>

      <div onClick={handleSendMessage} className="w-full mb-4">
        <button className="bg-blue-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
};

export default MessageModal;
