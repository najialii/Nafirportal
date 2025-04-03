
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Table, Input, Select, Modal, Form,Switch ,Input as AntdInput ,Avatar, Button,Tag , Row, Col } from 'antd';
import Tables from '../../components/tables.jsx'
import useApi from '../../hooks/useFetch.js';
import { EllipsisOutlined } from '@ant-design/icons';
import useAuthContext from '../../hooks/useAuthContext.js'

const { Search } = Input;
const { Option } = Select;


function Manageusers() {
  const user = useAuthContext() 
  const {req, loading, error, data, headers} = useApi('http://localhost:4000/api/user')
const [users, setUsers] = useState([])
const [isModalVisible, setIsModalVisible] = useState(false);
const [currentUser, setcurrentUser] = useState(null);
const userDep = user?.user?.department
    const [form] = Form.useForm();

console.log('user deparment', userDep)
const usertoken = localStorage.getItem('userToken')
const userole = localStorage.getItem('user')

const uibj = JSON.parse(userole)
console.log('ls roel', uibj)


const getUsers = async ()=>{
  try{
const res = await axios.get(`http://localhost:4000/api/user/allusers`,{
  headers: { Authorization: `Bearer ${usertoken}` }
})
setUsers(res.data)
console.log(res.data)
  }catch (error){
    console.error(error)
  } 
}


// useEffect(()=>{
//   console.log('this is the currnet uer',currentUser)
// },[currentUser])

const showModal = (users) => {
  setcurrentUser(users);
 form.setFieldsValue(users); 
  setIsModalVisible(true);
};

const userByD = async () => {
  try {
    const res = await req("GET", `/allusers`, {
      headers: { Authorization: `Bearer ${usertoken}` },
    });
    setUsers(res.data); 
    console.log("Users fetched:", res);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};


useEffect(()=>{
  if(!userDep || !usertoken) return 
  getUsers()

  
},[userDep])


const HandleUserBan = async()=>{
  try{
const res = await axios.post(`http://localhost:4000/api/users/toggle-ban/${currentUser._id}`) 
console.log(res)
  }catch(error){
    console.error(error)
  }
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={record.profilePicture} size="small" style={{ marginRight: '8px' }} />
            {text}
        </div>
    ),
},
  {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
  },
  {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role ? '#221F42' : ''}>
            {role ? 'mentor' : 'mentee'}
        </Tag>
    ),
  },
  {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
  },
  {
      title: 'Exp Years',
      dataIndex: 'experienceYears',
      key: 'experienceYears',
  },
  {
      title: 'Status',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (isApproved) => (
          <Tag  color={isApproved ? 'green' : 'red'}>
              {isApproved ? 'Approved' : 'Not Approved'}
          </Tag>
      ),
  },
  {
      title: 'Ban',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Switch checked={status} onChange={onChange} />,
  },
  {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <Button 
              type="text" 
              icon={<EllipsisOutlined style={{ fontSize: '18px', color: '#000' }} />} 
              onClick={() => showModal(record)}
          />
      ),
  },
];

    const handleCancel = () => {
      setIsModalVisible(false);
  };

    const onChange = (checked) => {
      console.log(`switch to ${checked}`);
    };


    
  return (
<div>
  
  <div className='bg-white flex flex-col rounded-xl mb-4 p-4'>

<h1 className='text-3x font-expo tes font-blod'>
  Manage Users
</h1>
 <div className='flex items-center justify-between p-4 '>
                <Search
                    placeholder="Search by name or location"
                    // onSearch={(value) => handleFilterChange(value)}
                    style={{ width: 300 }}
                    enterButton
                />
                <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    // onChange={handleFilterChange}
                >
                    <Option value="all">All Activities</Option>
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="past">Past</Option>
                </Select>
                </div>
  </div>

  <div className='bg-white p-4 rounded-2xl h-full'>
    
                <Tables columns={columns} dataSource={users}  />

                  <Modal
                                  title="Edit User"
                                  visible={isModalVisible}
                                  // onOk={handleOk}
                                  // onCancel={handleCancel}
                                  footer={[
                                      <Button key="delete" danger 
                                      // onClick={handleDelete}
                                      >Delete</Button>,
                                      <Button key="back" 
                                      onClick={handleCancel}
                                      >Cancel</Button>,
                              <Button key="submit" type="primary" onClick={HandleUserBan}>Update</Button>,
                                  ]}
                              >
                                  {currentUser && (
                                      <Form form={form} layout="vertical">
                                          <Row gutter={16}>
                                              <Col span={12}>
                                                  <Form.Item label="Name" name="name">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Location" name="location">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Date" name="date">
                                                      <AntdInput type="date" />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Time" name="time">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Description" name="description">
                                                      <AntdInput.TextArea />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Department ID" name="departmentId">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Link" name="link">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Meeting ID" name="meeting_id">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                  <Form.Item label="Passcode" name="passcode">
                                                      <AntdInput />
                                                  </Form.Item>
                                              </Col>
                                          </Row>
                                      </Form>

                                  
                                  )}
                              </Modal>


                </div>
</div>
  )
}

export default Manageusers