import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, Avatar, Button, Skeleton, Tag, message } from 'antd';
import useAuthContext from '../hooks/useAuthContext';
import mentorImg from '../assets/WhatsApp Image 2025-03-08 at 01.01.56_b5b5a7a1.jpg';

const MentorCard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 3; // Adjust page size as needed

  const getMentorsData = async (page) => {
    if (!user?.token) {
      message.error('No token found');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:4000/api/mentorsessions?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setMentors(res.data.docs);
    } catch (err) {
      message.error('Failed to fetch mentors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMentorsData(page);
  }, [user, page]);

  return (

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
    </div>
  );
};

export default MentorCard;
