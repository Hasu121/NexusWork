import React,{useState} from 'react'

const ExpModal = ({handleEditFunc, selfData, updateExpData, setUpdateExpData}) => {
  const [data, setData] = useState({
    designation: "",
    company_name: "",
    duration: "",
    info: "",
    location: "",
  });

  // When updateExpData changes, update the form fields
  React.useEffect(() => {
    if (updateExpData?.clicked && updateExpData?.data) {
      setData({
        designation: updateExpData.data.designation || "",
        company_name: updateExpData.data.company_name || "",
        duration: updateExpData.data.duration || "",
        info: updateExpData.data.info || "",
        location: updateExpData.data.location || "",
      });
    } else {
      setData({
        designation: "",
        company_name: "",
        duration: "",
        info: "",
        location: "",
      });
    }
  }, [updateExpData]);

  const onChangeHandle = (event, key) => {
    setData({...data,[key]: event.target.value});
  };

  const updateExpSave = () => {
    let newFilteredData = selfData?.experience.filter((item) => item._id !== updateExpData?.data?._id);
    let newArray = [...newFilteredData, {...data, _id: updateExpData?.data?._id}];
    let newData = {...selfData, experience: newArray};
    handleEditFunc(newData);
  };

  const onSubmit = (event) => {
    if (updateExpData?.clicked) return updateExpSave();
    let expArray = [...(selfData?.experience || []), data];
    let newData = {...selfData, experience: expArray};
    handleEditFunc(newData);
  };

  const onDelete = () => {
    let newFilteredData = selfData?.experience.filter((item) => item._id !== updateExpData?.data?._id);
    let newData = {...selfData, experience: newFilteredData};
    handleEditFunc(newData);
  };

  return (
    <div className="mt-8 w-full h-[350px] overflow-auto">
      <div className="w-full mb-4">
        <label>Role*</label>
        <input
          value={data.designation}
          onChange={(e) => onChangeHandle(e, "designation")}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your role"
        />
      </div>
      <div className="w-full mb-4">
        <label>Company*</label>
        <input
          value={data.company_name}
          onChange={(e) => onChangeHandle(e, "company_name")}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your company name"
        />
      </div>
      <div className="w-full mb-4">
        <label>Duration*</label>
        <input
          value={data.duration}
          onChange={(e) => onChangeHandle(e, "duration")}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your duration"
        />
      </div>
      <div className="w-full mb-4">
        <label>Location*</label>
        <input
          value={data.location}
          onChange={(e) => onChangeHandle(e, "location")}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your location"
        />
      </div>
      <div className="w-full mb-4">
        <label>Work Info*</label>
        <input
          value={data.info}
          onChange={(e) => onChangeHandle(e, "info")}
          type="text"
          className=" mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your work info"
        />
      </div>
      <div className="w-full mb-4 flex justify-between">
        <button className="bg-blue-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-blue-700" onClick={onSubmit}>Save Changes</button>
        {
          updateExpData?.clicked && (
            <button className="bg-red-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-red-700" onClick={onDelete}>Delete</button>
          )
        }
      </div>
      
    </div>
  )
}

export default ExpModal
