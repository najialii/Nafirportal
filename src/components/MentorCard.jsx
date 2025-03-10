import { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { List, Avatar, Button, Skeleton, Tag, message } from 'antd';
import useAuthContext from '../hooks/useAuthContext';
import mentorImg from '../assets/WhatsApp Image 2025-03-08 at 01.01.56_b5b5a7a1.jpg';
=======
import { useNavigate } from 'react-router-dom';
import mentorImg from '../assets/studio-portrait-beautiful-young-woman-posing.jpg';
import useAuthContext from '../hooks/useAuthContext';
>>>>>>> Stashed changes

const MentorCard = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const { user } = useAuthContext();


const page = 1
const limit = 3
  const getMentorsData = async () => {
    try {
      if (!user?.token) {
        console.error('No token found');
        return;
      }    
      const res = await axios.get(`http://localhost:4000/api/mentorsessions?page=${page}&limit=${limit}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      console.log(res.data)
    //  console.log(res.data.docs)
      setMentors(res.data.docs);
    } catch (err) {
      console.error(err.message);
    }
  };

  const hanProNavagte = ()=>{
     navigate(`/user/${mentors.data.mentorId}`)
   }
  useEffect(() => {
    if (user) getMentorsData();
  }, [user]);

  return (
<<<<<<< Updated upstream

    <div className='bg-gray-100   '>
    <List
      className="mentor-list"
      loading={loading}
      itemLayout="vertical" 
      size="large"
      pagination={{
        current: page,
        pageSize: limit,
        total: 10, 
        onChange: (page) => setPage(page),
      }}
      dataSource={mentors}
      renderItem={(mentor) => (
        <List.Item
          key={mentor._id}
          actions={[
            // <Button type="primary" onClick={() => navigate(`/mentor/${mentor._id}`)} key="view">
            //   View Profile
            // </Button>,
          ]}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={<Avatar src={mentor.mentorImage || mentorImg} size={32} />}
              title={<a onClick={() => navigate(`/mentor/${mentor._id}`)}>{mentor.mentorName}</a>}
              description={
                <div className='bg-white max-w-[500px] p-2'>
                  <p>{mentor.aboutMentor}</p>
                  {mentor.mentorExpertise.length > 0 && (
                    <div>
                    
                      <strong>Expertise:</strong>{' '}
                      {mentor.mentorExpertise.map((expertise, index) => (
                        <Tag color="blue" key={index}>
                          {expertise}
                        </Tag>
                      ))}
                    </div>
                  )}
                  {mentor.availableTimes.length > 0 && (
                    <div className='flex justify-end'>
                      {/* <strong>Available Times:</strong>{' '} */}
                      {mentor.availableTimes.map((time, index) => (
                        <Tag color="green" key={index}>
                          {time.day}: {time.startTime} - {time.endTime}
                        </Tag>
                      ))}
                    </div>
                  )}
                    <div className=' w-full py-2'>
                        <img src={mentorImg} alt="" srcset="" />
                        </div>
                </div>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
=======
    <div className="p-6 flex flex-col gap-6">
      {mentors.map((mentor) => (
        <div 
          key={mentor._id} 
          onClick={() => navigate(`/mentor/${mentor._id}`)}
          className="cursor-pointer w-[800px]  p-4  shadow-md rounded-lg overflow-hidden border grid grid-cols-3 border-gray-500 hover:shadow-lg transition duration-300"
        >
          <img 
          //  onClick={()=>navigate(`/profile/${mentor.mentorId}`)}
            src={mentorImg} 
            alt={mentor.mentorName} 
            className="w-40 h-40 object-cover"
          />
          <div className="p-4 col-span-2 ">
            <h2 className="text-lg font-semibold text-gray-800">{mentor.mentorName}</h2>
            <p className="text-sm text-gray-600 mt-1">{mentor.mentorExpertise}</p>
            {/* <p className="text-sm text-gray-500 mt-2">{mentor.availableTimes.join(', ')}</p> */}
            <p className="text-sm text-gray-700 mt-2">{mentor.aboutMentor}</p>
            <div className=" p-4 flex w-full items-center justify-center">
            <button className="bg-primary-light text-white cursour-pointer p-2 rounded-bl-lg w-full rounded-tr-lg">Book</button>

            </div>
          </div>
          
        </div>
      ))}
>>>>>>> Stashed changes
    </div>
  );
};

export default MentorCard;
