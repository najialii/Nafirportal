import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FollowButton from "../components/followBtn";
import pimage from "../assets/studio-portrait-beautiful-young-woman-posing.jpg";

const UserPro = () => {
    const { userId } = useParams(); 
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCurrentUser(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const endpoint = userId
                    ? `http://localhost:4000/api/user/${userId}` 
                    : "http://localhost:4000/api/user/me"; 

                const res = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <>
        <div className="">
            {/* <div className="flex justify-start gap-4 bg-gray-50 px-20 py-[80px]">
                <div>
                    <img className="rounded-md h-56" src={pimage} alt="Profile" />
                </div>

                <div className="flex flex-col">
                    <p className="text-xl font-extrabold">{user?.name}</p>
                    <div className="flex gap-4">
                        <p>{user?.followers.length} followers</p>
                        <p>{user?.following.length} following</p>
                    </div>
                    <div className=" flex gap-2 pt-2">
  {user?.skills?.map((skill, index) => {
    return (
        <span className="bg-white border border-primary-light p-1.5 " key={index}>
        {skill}
      </span>
    );
  })}
</div>

                    {currentUser && currentUser._id !== user._id && (
                        <FollowButton userId={user._id} currentUserId={currentUser._id} />
                    )}

                </div>
            </div> */}
        </div>
        <div class="max-w-full ">
  

    <div class="bg-white  rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
      <div class="relative h-48">
        <img src={pimage} alt="Cover" class="w-full h-full object-cover"/>
        <div class="absolute -bottom-12 left-6">
          <img src={pimage} alt="Profile" class="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"/>
        </div>
      </div>

      <div class="pt-16 px-6 pb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 ">{user?.name}</h1>
            <div className="flex gap-4">
                        <p>{user?.followers.length} followers</p>
                        <p>{user?.following.length} following</p>
                    </div>
          </div>
          {currentUser && currentUser._id !== user._id && (
                        <FollowButton userId={user._id} currentUserId={currentUser._id} />
                    )}
        </div>

        <p class="mt-6 text-gray-600 dark:text-gray-300">
          Hi, I'm a passionate developer with expertise in Node.js, React, and Tailwind CSS. I love building efficient and scalable web applications.
        </p>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-gray-900  mb-3">Skills</h2>
          <div class="flex flex-wrap gap-2">
          {user?.skills?.map((skill, index) => {
    return (
        <span className="bg-white border border-primary-light p-1.5 " key={index}>
        {skill}
      </span>
    );
  })}
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">about</h2>
       <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iusto provident deleniti, numquam aspernatur voluptates modi et iste ducimus similique molestiae enim animi ea aperiam velit repudiandae cupiditate perferendis impedit.
       </p>
        </div>
      </div>
    </div>
  </div>
                    </>
    );
};

export default UserPro;
