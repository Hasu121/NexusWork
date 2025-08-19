import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import Card from '../../components/Card/card'
import Advertisement from '../../components/Advertisement/advertisement'
import { useParams } from 'react-router-dom'
import Post from '../../components/Post/post'
import axios from 'axios'


const Activities = () => {
    const { id } = useParams();
    const [post,setPosts] = useState([])

    const [ownData,setOwnData] = useState(null)
    
    const fetchDataOnLoad = async () => {
      await axios.get(`http://localhost:4000/api/post/getAllPostsForUser/${id}`).then(res => {
        console.log(res);
        setPosts(res.data.posts);
      }).catch (err => {
        console.error(err);
        alert(err?.response?.data?.error || "An error occurred");
      });
    }



    useEffect(() => {
      fetchDataOnLoad();
      
      let userData = localStorage.getItem("userInfo");
        setOwnData(userData ? JSON.parse(userData) : null);
    },[id])

  return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[25%] sm:block hidden sm:w-[23%] py-5">
        <div className="h-fit">
          <ProfileCard data = {post[0]?.user} />
        </div>
        
      </div>

      {/* Middle Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        
        <div>
            <Card padding={1}>
                <div className='text-xl'> All posts </div>
                <div className='cursor-pointer w-fit p-2 border-1 rounded-4xl bg-green-600 my-2 text-white font-semibold'>Posts</div>
                <div className='my-2 flex flex-col gap-2'>
                  {
                    post.map((item,index) => {
                        return (
                          <div>
                            <Post item = {item} personalData={ownData} />
                          </div>
                        )
                    })
                  }

                  
                </div>


            </Card>
        </div>
        
      </div>

      {/* Right Side */}
      <div className="w-[26%] md:block hidden sm:w-[23%] py-5">
        <div>
            <Card padding={true}>
                <div className="text-xl">Nexus News</div>
                <div className="text-gray-600">Top Stories</div>
                <div className="my-1">
                    <div className="text-md">Laravel in 2025</div>
                    <div className="text-xs text-gray-400">5 days ago</div>
                </div>
                <div className="my-1">
                    <div className="text-md">Foodpanda fires developers</div>
                    <div className="text-xs text-gray-400">8 days ago</div>
                </div>
            </Card>
        </div>
        <div className="mt-5">
            <Advertisement />
        </div>
      </div>
    </div>
  )
}

export default Activities
