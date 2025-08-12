import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { ToastContainer } from "react-toastify";
import { Form } from "react-router-dom";
import axios from "axios";

const AddModal = (props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [desc, setDesc] = useState("");

  // cloudname = dk9ciwgj9
  // presetName = nexuswork

  const handlePost = async () => {
    if (desc.trim().length === 0 && !imageUrl)
      return alert("Please enter any description or upload an image");
    await axios.post("http://localhost:4000/api/post", {desc: desc, imageLink: imageUrl}, {withCredentials: true}).then((res => {
      window.location.reload();
    })).catch((error) => {
      console.error("Error posting data:", error);
    });
  };



  const handleUploadImage = async (e) => {
    const file = e.target.files;
    const data = new FormData();
    data.append("file", file[0]);

    data.append("upload_preset", "nexuswork");
    try{
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dk9ciwgj9/image/upload", data
      );

      const imageUrl = response.data.url;
      setImageUrl(imageUrl);
 
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            className="w-15 h-15 rounded-4xl"
            src={
              props.personalData?.profile_pic ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt=""
          />
        </div>
        <div className="text-2xl">
          {props.personalData?.f_name || "John Doe"}
        </div>
      </div>

      <div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          cols={50}
          rows={5}
          placeholder="What do you want to talk about?"
          className="my-3 outline-0 text-xl p-2"
        ></textarea>
      </div>

      {imageUrl && (
        <div>
          <img
            className="w-20 h-20 rounded-xl"
            src={imageUrl}
            alt=""
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="my-6">
          <label className="cursor-pointer" htmlFor="inputFile">
            <ImageIcon />
          </label>
          <input onChange={handleUploadImage} type="file" id="inputFile" className="hidden" />
        </div>
        <div>
          <button
            className="bg-blue-600 text-white cursor-pointer px-3 py-1 rounded-2xl hover:bg-blue-700 h-fit"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
