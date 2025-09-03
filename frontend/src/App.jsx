import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar1 from './components/NavbarV1/navbar1.jsx'
import LandingPage from './pages/LandingPage/landingPage.jsx'
import Footer from './components/Footer/footer.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp/signUp.jsx'
import Login from './pages/Login/login.jsx'
import Navbar2 from './components/Navbar2/navbar2.jsx'

import Feeds from './pages/Feeds/feeds.jsx'
import MyNetwork from './pages/MyNetwork/myNetwork.jsx'
import Notification from './pages/Notification/notification.jsx'
import Profile from './pages/Profile/profile.jsx'
import Resume from './pages/Resume/resume.jsx';
import Activities from './pages/AllActivities/activities.jsx'
import SingleActivity from './pages/SingleActivity/singleActivity.jsx'
import Card from './components/Card/card.jsx'
import Messages from './pages/Messages/messages.jsx'




function App() {
  const [isLogin, setIsLoggedIn] = useState(localStorage.getItem("isLogin"));

  const changeLoginValue = (value) => {
    setIsLoggedIn(value);
  };


  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
      {isLogin?<Navbar2/> : <Navbar1 />}
      <Routes>
        <Route path="/" element={isLogin?<Navigate to={'/feeds'}/> :<LandingPage changeLoginValue={changeLoginValue} />} />
        <Route path="/resume" element={<Resume />} />

        <Route path="/signUp" element={isLogin?<Navigate to={'/feeds'}/> :<SignUp changeLoginValue={changeLoginValue} />} />

        <Route path="/login" element={isLogin?<Navigate to={'/feeds'}/> : <Login changeLoginValue={changeLoginValue} />} />

        <Route path="/feeds" element={isLogin?<Feeds /> : <Navigate to={'/login'} />} />

        <Route path="/myNetwork" element={isLogin?<MyNetwork /> : <Navigate to={'/login'} />} />

        <Route path="/notification" element={isLogin?<Notification /> : <Navigate to={'/login'} />} />

        <Route path="/profile/:id" element={isLogin?<Profile /> : <Navigate to={'/login'} />} />

        <Route path="/profile/:id/activities" element={isLogin?<Activities /> : <Navigate to={'/login'} />} />

        <Route path="/profile/:id/activities/:postId" element={isLogin?<SingleActivity /> : <Navigate to={'/login'} />} />

        <Route path="/messages" element={isLogin?<Messages /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
