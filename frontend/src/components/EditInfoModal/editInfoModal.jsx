import React,{useState} from "react";

const EditInfoModal = ({handleEditFunc, selfData}) => {
  const [data, setData] = useState({
    f_name: selfData.f_name,
    headline: selfData.headline,
    curr_company: selfData.curr_company,
    curr_location: selfData.curr_location
  });
  const onChangeHandle = (event, key) => {
    setData({...data,[key]: event.target.value});
  }

  const handleSaveBtn = () => {
    let newData = {...selfData, ...data};
    handleEditFunc(newData);
  }

  return (
    <div className="mt-8 w-full h-[350px] overflow-auto">
      <div className="w-full mb-4">
        <label>Full Name*</label>
        <input
          value={data.f_name}
          onChange={(e) => {onChangeHandle(e, 'f_name')}}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your full name"
        />
      </div>
      
      <div className="w-full mb-4">
        <label>Headline*</label>
        <textarea value={data.headline} onChange={(e) => {onChangeHandle(e, 'headline')}}cols="30" rows="3" name="headline" id="headline" className="mt-1 border-1 rounded-md p-2 w-full" placeholder="Enter your headline"></textarea>
      </div>

      <div className="w-full mb-4">
        <label>Current Company*</label>
        <input
          value={data.curr_company}
          onChange={(e) => {onChangeHandle(e, 'curr_company')}}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your current company"
        />
      </div>

      <div className="w-full mb-4">
        <label>Location*</label>
        <input
          value={data.curr_location}
          onChange={(e) => {onChangeHandle(e, 'curr_location')}}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your location"
        />
      </div>

      <div className="w-full mb-4">
        <button className="bg-blue-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-blue-700" onClick={handleSaveBtn}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditInfoModal;
