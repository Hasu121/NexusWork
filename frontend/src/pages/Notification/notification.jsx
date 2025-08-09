import React from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import Advertisement from '../../components/Advertisement/advertisement'
import Card from '@mui/material/Card'

const Notification = () => {
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[25%] sm:block hidden sm:w-[23%] py-5">
        <div className="h-fit">
          <ProfileCard />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        <Card padding={0}>
          <div className='w-full'>
            {/* For each notification */}
            <div className='border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3'>
              <img src="https://wallpapercat.com/w/full/0/1/9/1215952-1080x1920-mobile-1080p-goku-background-photo.jpg" className="w-12 h-12 rounded-full object-cover border border-gray-300 cursor-pointer" />
              <div className='flex flex-col'>
                <span className='font-semibold'>Goku</span>
                <span className='text-sm text-gray-500'>Commented on your post</span>
              </div>
            </div>
            <div className='border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3'>
              <img src="https://wallpapercat.com/w/full/0/1/9/1215952-1080x1920-mobile-1080p-goku-background-photo.jpg" className="w-12 h-12 rounded-full object-cover border border-gray-300 cursor-pointer" />
              <div className='flex flex-col'>
                <span className='font-semibold'>Goku</span>
                <span className='text-sm text-gray-500'>Commented on your post</span>
              </div>
            </div>

          </div>
        </Card>
      </div>

      {/* Right Side */}
      <div className="w-[26%] md:block hidden sm:w-[23%] py-5">

        <div className="mt-5">
            <Advertisement />
        </div>
      </div>
    </div>
  )
}

export default Notification
