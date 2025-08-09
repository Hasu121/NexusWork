import React from 'react'
import{ Link } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'

const LandingPage = (props) => {
  return (
    <div className='my-4 py-[50px] md:pl-[120px] px-5 md:flex justify-between'>
        <div className='md:w-[40%]'>
            <div className='text-4xl mx-auto text-gray-500'>Welcome to Nexus</div>
            
            <div className='my-3 flex mx-auto mt-[20px] bg-white gap-2 rounded-3xl w-[70%] text-black cursor-pointer'>
              <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
            </div>

            <Link to={'/login'} className='flex mx-auto mt-[20px] py-2 bg-white gap-2 rounded-3xl items-center w-[70%] justify-center text-black hover:bg-gray-100 border-2 cursor-pointer'>Sign in with email</Link>
            <div className='mx-auto mb-4 text-sm w-[70%] mt-6'>By clicking Continue to join or sign in, you agree to <span className='text-blue-800 cursor-pointer hover:underline'>Nexus User Agreement</span>, <span className='text-blue-800 cursor-pointer hover:underline'>Privacy Policy</span>, <span className='text-blue-800 cursor-pointer hover:underline'>Policy</span>.</div>
            <Link to={'/signUp'} className='mx-auto text-center mb-4 text-lg w-[70%] mt-4'>New to Nexus? <span className='text-blue-800 cursor-pointer hover:underline'>Join now</span></Link>
        </div>
        <div className='md:w-[50%] h-120'>
            <img src="https://bairesdev.mo.cloudinary.net/blog/2021/07/software-developing-team.jpg?tx=w_1920,q_auto" alt="image" className='w-50% h-50%'/>
        </div>
    </div>
  )
}

export default LandingPage
