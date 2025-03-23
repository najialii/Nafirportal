import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Tables from '../../components/tables'
import { Avatar } from 'antd'
function Sessionsman() {
    const [sessions, setSessions] = useState([])
const token = localStorage.getItem('userToken')
    const getsessions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/mentorsessions', 
              {  headers: { Authorization: `Bearer ${token}` } }

            )
            console.log(response.data.docs)
            console.log("Sessions data type:", Array.isArray(sessions));

            setSessions(response?.data?.docs)
        } catch (error) {
            console.error(error.message, error)
        }
    }
    useEffect(() => {
        getsessions()
    }, [])



    const  columns = [
        {
            title: 'mentorName',
            dataIndex: 'mentorName',
            key: 'mentorName',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={record.profilePicture} size="small" style={{ marginRight: '8px' }} />
                    {text}
                </div>
            ),
        },
        {
            title: 'requests',
            dataIndex: 'requests',
            key: 'requests',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {text.length}
                </div>
            ),
        },

    ]
    // const columns = [
    //     {
    //       title: 'mentorName',
    //       dataIndex: 'mentorName',
    //       key: 'mentorName',
    //       render: (text, record) => (
    //           <div style={{ display: 'flex', alignItems: 'center' }}>
    //               <Avatar src={record.profilePicture} size="small" style={{ marginRight: '8px' }} />
    //               {text}
    //           </div>
    //       ),
    //   },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         key: 'email',
    //     },
    //     {
    //         title: 'Role',
    //         dataIndex: 'role',
    //         key: 'role',
    //         render: (role) => (
    //           <Tag color={role ? '#221F42' : ''}>
    //               {role ? 'mentor' : 'mentee'}
    //           </Tag>
    //       ),
    //     },
    //     {
    //         title: 'Country',
    //         dataIndex: 'country',
    //         key: 'country',
    //     },
    //     {
    //         title: 'Exp Years',
    //         dataIndex: 'experienceYears',
    //         key: 'experienceYears',
    //     },
    //     // {
    //     //     title: 'Status',
    //     //     dataIndex: 'isApproved',
    //     //     key: 'isApproved',
    //     //     render: (isApproved) => (
    //     //         <Tag  color={isApproved ? 'green' : 'red'}>
    //     //             {isApproved ? 'Approved' : 'Not Approved'}
    //     //         </Tag>
    //     //     ),
    //     // },
    //     // {
    //     //     title: 'Ban',
    //     //     dataIndex: 'status',
    //     //     key: 'status',
    //     //     render: (status) => <Switch  checked={status} onChange={onChange} />,
    //     // },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (text, record) => (
    //             <Button 
    //                 type="text" 
    //                 icon={<EllipsisOutlined style={{ fontSize: '18px', color: '#000' }} />} 
    //                 // onClick={() => showModal(record)}
    //             />
    //         ),
    //     },
    //   ];
      

    //   useEffect(()=>{console.log(sessions)},[sessions])

  return (
    <div>
    <Tables columns={columns} dataSource={sessions}  />
    </div>
  )
}

export default Sessionsman