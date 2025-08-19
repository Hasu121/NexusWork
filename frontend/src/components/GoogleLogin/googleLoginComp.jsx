import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const GoogleLoginComp = (props) => {
  const navigate = useNavigate();

  const [company, setCompany] = React.useState("");

  const handleOnSuccess = async(credResponse) => {
    if (!company.trim()) {
      alert("Please enter your company before Google login.");
      return;
    }
    // Check company affiliation before Google login
    try {
      const check = await axios.post("http://localhost:4000/api/auth/check-company", { company });
      if (!check.data.exists) {
        alert("Company is not affiliated. Google login denied.");
        return;
      }
    } catch (err) {
      alert("Error checking company affiliation.");
      return;
    }
    const token = credResponse.credential;
    const res = await axios.post("http://localhost:4000/api/auth/google", {token, company}, {withCredentials: true});
    console.log(res);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    props.changeLoginValue(true);
    navigate('/feeds');
  }
  
  return (
    <div className='w-full'>
      <input
        type="text"
        value={company}
        onChange={e => setCompany(e.target.value)}
        className="w-full text-x1 border-2 rounded-lg px-5 py-1 mb-2"
        placeholder="Enter your company (required for Google login)"
      />
      <GoogleLogin
        onSuccess={(credentialResponse)=>handleOnSuccess(credentialResponse)}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </div>
  )
}

export default GoogleLoginComp
