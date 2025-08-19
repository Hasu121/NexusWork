import React from "react";

const MessageModal = () => {
  return (
    <div className='my-5'>
      <div className="w-full mb-4">
        <textarea
          cols={10}
          rows={10}
          name="message"
          id="message"
          className="mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your message"
        ></textarea>
      </div>

      <div className="w-full mb-4">
        <button className="bg-blue-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
};

export default MessageModal;
