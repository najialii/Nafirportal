import {useState , useEffect, useRef} from 'react'
import axios from 'axios' 
import {List, Avatar, Button} from 'antd'
function Mentoreq() {
const [menReq, setMenReq] =  useState([])
 const [selectedReq , setSelectedReq] = useState(null)
// const reqId = useRef(null)


const token = localStorage.getItem("userToken");
if (!token) {
    console.log(token);
  }
const getMentorReq = async ()=>{

try{
const res =  await axios.get(`http://localhost:4000/api/user/accountsbystatus`, {
    headers: { Authorization: `Bearer ${token}` },
})
console.log(`the reaponse `, res.data)
setMenReq(res.data)
} catch(error)
{
    console.error(error.messsage)
}
}



useEffect(()=>{
    getMentorReq() 
 
},[])



  const handleReq = async (id)=>{
try{

const res = await axios.patch(`http://localhost:4000/api/user/approve-mentor/${id}`,{} , {
    headers: { Authorization: `Bearer ${token}` },
})
console.log(res)
setMenReq(prevReqs => prevReqs.filter(req => req._id !== id));
} catch (error){
console.error(error.message)
}
}





  return (
    <div className='h-full bg-white p-10 text-20 rounded-xl' 
    // style={{  margin: '20px auto', padding: '10px' }}
    >
        <div className='flex justify-start mb-4 text-3xl font-bold '>
    <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Mentor Requests</h2>

        </div>
    <List
      itemLayout="horizontal"
      dataSource={menReq}
      renderItem={(req) => (
        <List.Item
          key={req._id}
          actions={[
            <Button type="primary" onClick={() => handleReq(req._id, 'approve')}>Accept</Button>,
            <Button danger onClick={() => handleReq(req._id, 'decline')}>Decline</Button>,
            <div className='text-xl font-bold cursor-pointer'>
            ...
            </div>
          ]}
          style={{
            padding: '10px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            background : '#fff',
            alignItems: 'center',
            // boxShadow : "10px 5px 5px black",

          }}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} src={req.profilePicture || "https://www.example.com/default-avatar.png"} />}
            title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{req.name || "Unknown"}</span>}
            description={<span style={{ color: 'gray' }}>Wants to be a mentor</span>}
          />
        </List.Item>
      )}
    />
  </div>

  )
}

export default Mentoreq