import React,{useState} from "react";

const AboutModal = ({handleEditFunc, selfData}) => {
  const [data, setData] = useState({
    about: selfData?.about,
    skillInput: selfData?.skills?.join(", "),
  });

  const onChangeHandle = (event, key) => {
    setData({...data,[key]: event.target.value});
  }

  const handleOnSave = () => {
    let arr = data?.skillInput.split(",")
    let newData = {...selfData, about: data?.about, skills: arr};
    handleEditFunc(newData);
  };

  return (
    <>
      <div className="w-full mb-4">
        <label>About*</label>
        <br />
        <textarea
          value={data.about}
          onChange={(e) => onChangeHandle(e, 'about')}
          cols={30}
          rows={3}
          name="about"
          id="about"
          className="mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your about information"
        ></textarea>
      </div>
      <div className="w-full mb-4">
        <label>Skills* (Add by separating comma)</label>
        <br />
        <textarea
          value={data.skillInput}
          onChange={(e) => onChangeHandle(e, 'skillInput')}
          cols={30}
          rows={3}
          name="skills"
          id="skills"
          className="mt-1 border-1 rounded-md p-2 w-full"
          placeholder="Enter your skills information"
        ></textarea>
      </div>
      
      <div className="w-full mb-4">
        <button onClick={handleOnSave} className="bg-blue-800 text-white py-2 px-3 rounded-4xl cursor-pointer hover:bg-blue-700">Save Changes</button>
      </div>
    </>
  );
};

export default AboutModal;
