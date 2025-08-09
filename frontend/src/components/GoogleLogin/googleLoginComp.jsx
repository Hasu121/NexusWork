import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const GoogleLoginComp = (props) => {
  const navigate = useNavigate();

  const handleOnSuccess = async(credResponse) => {
    const token = credResponse.credential;
    const res = await axios.post("http://localhost:4000/api/auth/google", {token}, {withCredentials: true});
    console.log(res);
    
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    props.changeLoginValue(true);
    navigate('/feeds');
  }
  
  return (
    <div className='w-full'>
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
