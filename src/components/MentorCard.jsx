import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import mentorImg from '../assets/studio-portrait-beautiful-young-woman-posing.jpg';
import useAuthContext from '../hooks/useAuthContext';

const MentorCard = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const { user } = useAuthContext();

  const getMentorsData = async () => {
    try {
      if (!user?.token) {
        console.error('No token found');
        return;
      }
      const res = await axios.get('http://localhost:4000/api/mentorsessions', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setMentors(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (user) getMentorsData();
  }, [user]);

  return (
    <div className="p-6 flex flex-col gap-6">
      {mentors.map((mentor) => (
        <div 
          key={mentor._id} 
          onClick={() => navigate(`/mentor/${mentor._id}`)}
          className="cursor-pointer w-[600px]  shadow-md rounded-lg overflow-hidden border grid grid-cols-3 border-gray-200 hover:shadow-lg transition duration-300"
        >
          <img 
            src={mentorImg} 
            alt={mentor.mentorName} 
            className="w-40 h-40 object-cover"
          />
          <div className="p-4 col-span-2 bg-white">
            <h2 className="text-lg font-semibold text-gray-800">{mentor.mentorName}</h2>
            <p className="text-sm text-gray-600 mt-1">{mentor.mentorExpertise}</p>
            <p className="text-sm text-gray-500 mt-2">{mentor.availableTimes.join(', ')}</p>
            <p className="text-sm text-gray-700 mt-2">{mentor.aboutMentor}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorCard;
