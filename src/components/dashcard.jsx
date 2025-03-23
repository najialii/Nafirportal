import { Card, Statistic, Row, Col, Button } from 'antd';
import { UserOutlined, TeamOutlined, ScheduleOutlined, RocketOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const cardStyle = {
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: '0.3s',
  background: '#fff',
  minHeight: 140,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: "237px",
  textAlign: 'center',
  padding: 16,
};

const iconStyle = { fontSize: 20, color: '#fff' }; 

const titleStyle = {
  color: '#B0B0B0', 
  fontWeight: 'lighter',
  fontSize: '14px', 
};

const numberStyle = {
  fontSize: '48px', 
  fontWeight: 'bold',
};

const buttonStyle = {
  backgroundColor: '#221F42',
  borderRadius: '20%',
  width: '36px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const DashboardCards = () => {
  const [resp1, setResp1] = useState(null);
  const [resp2, setResp2] = useState(null);
  const [resp3, setResp3] = useState(null);
  const [resp4, setResp4] = useState(null);

  const token = localStorage.getItem('userToken');
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:4000/api/mentorsessions', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:4000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:4000/api/activities')
    ]).then(reses => {
      const res1 = reses[0].data.docs.length;
      const res2 = reses[1].data.length;
      const res3 = reses[2].data.length;
      const res4 = reses[1].data.filter(user => user.role === 'mentor' && user.isApproved).length;

      setResp2(res2);
      setResp1(Number(res1));
      setResp3(res3);
      setResp4(res4);
    });
  }, [token]);

  const stats = [
    { title: "Total Users", value: resp2, icon: <UserOutlined style={iconStyle} /> },
    { title: "Active Sessions", value: resp1, icon: <ScheduleOutlined style={iconStyle} /> },
    { title: "Activities", value: resp3, icon: <RocketOutlined style={iconStyle} /> },
    { title: "Total Mentors", value: resp4, icon: <TeamOutlined style={iconStyle} /> },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} justify="center">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            
            {/* <Card hoverable color='#fff' style={{color: '#221F42'}}> */}
              <div className='flex flex-col shadow-gray-50 items-center bg-white border  rounded-md border-gray-100 overflow-hidden shadow-md min-h-32 h-32 w-[237px]'>
        
              <span className='grid grid-cols-2 w-full justify-around  h-full items-center'>
             
             
             <div className='flex flex-col justify-center items-center'>
             <div className='text-gray-400  '>{stat.title}</div>
              <Statistic
                value={stat.value}
                style={numberStyle}
                />
                </div>

<div className='bg-primary-dark  rounded-md text-3xl w-full h-full flex justify-center p-1.5 text-primary-light  '>
                <button 
                style={iconStyle}
                >{stat.icon}</button>
              </div>


</span>
              </div>
            {/* </Card> */}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardCards;
