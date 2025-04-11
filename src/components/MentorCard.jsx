import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import bizzman from '../assets/mmm.jpg';
import useAuthContext from '../hooks/useAuthContext';
const MentorCard = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);  
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const page = 1;
  const limit = 3;

  const getMentorsData = async () => {
    try {
      if (!user?.token) {
        console.error('No token found');
        return;
      }
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/api/mentorsessions?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMentors(res.data?.docs || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMentorsData();
  }, [user]);

  return (
    <div dir='rtl' className="grid grid-cols-3 gap-2 justify-center">
      {loading ? (
        <div>Loading...</div> 
      ) : (
        mentors.map((mentor) => (
          <div 
            key={mentor._id} 
            className="relative max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-auto cursor-pointer" 
            onClick={() => navigate(`/mentor/${mentor._id}`)}
          >
            <div className="absolute top-4 left-4 bg-white p-2 rounded-md z-10">
              <FaRegHeart  className="  text-xl cursor-pointer" />
            </div>
            <img
              className="w-full h-64 object-cover object-center"
              src={bizzman}
              alt={mentor.mentorName}
            />
            <div className="py-4 px-6 text-right">
              <h1 className="text-lg font-semibold text-gray-800">{mentor.mentorName}</h1>
              <p className='text-lg text-gray-400'>خبير تسويق واعمال ادراية</p>
              <div className="flex items-center mt-2 text-gray-700 text-sm gap-2 flex-wrap justify-end">
                {mentor.availableTimes?.map((time, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {time.day}: {time.startTime} - {time.endTime}
                  </span>
                ))}
              </div>
              <div>
                <h2>زمن الجلسة: 30 دقيقة</h2>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-primary-light text-white px-4 py-2 rounded-lg font-medium">
                  احجز جلسة
                </button>
                <button className="bg-[#F2F7EE] text-primary-light px-4 py-2 rounded-lg font-medium">
                  الملف الشخصي
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorCard;
