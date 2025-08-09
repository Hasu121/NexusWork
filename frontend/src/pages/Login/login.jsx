import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (event, key) => {
    setLoginField({ ...loginField, [key]: event.target.value });
  };

  const handleLogin = async () => {
    if (loginField.email.trim().length === 0 ||loginField.password.trim().length === 0) {
      return toast.error("Please fill all fields");
    }
    await axios.post("http://localhost:4000/api/auth/login", loginField, {withCredentials: true,}).then((res) => {
        props.changeLoginValue(true);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
        navigate("/feeds");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[85%] md:w-[28%] rounded-sm shadow-xl box p-10">
        <div className="text-3xl mb-5">Sign In</div>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlForm="email">Email</label>
            <input
              type="text"
              value={loginField.email}
              onChange={(e) => onChangeInput(e, "email")}
              className="w-full text-x1 border-2 rounded-lg px-5 py-1"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlForm="password">Password</label>
            <input
              type="password"
              value={loginField.password}
              onChange={(e) => onChangeInput(e, "password")}
              className="w-full text-x1 border-2 rounded-lg px-5 py-1"
              placeholder="Enter your password"
            />
          </div>
          <div
            onClick={handleLogin}
            className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer"
          >
            Login
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center my-6">
          <div className="border-b-1 border-gray-400 w-[45%]" /> <div>or</div>{" "}
          <div className="border-b-1 border-gray-400 w-[45%] my-6" />
        </div>
        <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
      </div>

      <div className="mt-4 mb-10 gap-2">
        New to Nexus?{" "}
        <Link to={"/signUp"} className="text-blue-800 cursor-pointer">
          Join Now
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
