import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const DpModal = ({ isCircular, selfData, handleEditFunc }) => {
  const [imgLink, setImageLink] = useState(
    isCircular ? selfData?.profile_pic : selfData?.cover_pic
  );

  const [loading, setLoading] = useState(false);

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

  const handleSubmitBtn = async () => {
    let { data } = { ...selfData };
    if (isCircular) {
      data = { ...data, ['profile_pic']: imgLink };
    } else {
      data = { ...data, ['cover_pic']: imgLink };
    } handleEditFunc(data);
  };


  return (
    <div className="p-5 relative flex items-center flex-col h-full">
      {isCircular ? (
        <img
          className="rounded-full w-[150px] h-[150px] object-cover"
          src={imgLink}
        />
      ) : (
        <img
          className="rounded-xl w-full h-[200px] object-cover"
          src={imgLink}
        />
      )}

      <label
        htmlFor="dp-upload"
        className="absolute bottom-10 left-0 p-3 bg-blue-800 text-white rounded-2xl cursor-pointer"
      >
        Upload
      </label>
      <input
        onChange={handleInputImage}
        type="file"
        id="dp-upload"
        className="hidden"
      />

      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="absolute bottom-10 right-0 p-3 bg-blue-800 text-white rounded-2xl cursor-pointer" onClick={handleSubmitBtn}>
          {" "}
          Submit
        </div>
      )}
    </div>
  );
};

export default DpModal;
