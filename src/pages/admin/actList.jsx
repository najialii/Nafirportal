import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Input, Select, Modal, Form, Input as AntdInput, Button, Row, Col } from 'antd';
import  useAuthContext from '../../hooks/useAuthContext.js'
import  Tables from '../../components/tables'
import Filters   from '../../components/dashfilters'
const { Search } = Input;
const { Option } = Select;

function ACtivitesList() {
    const [actList, setList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);
    const [form] = Form.useForm();
      const user = useAuthContext()
      
      const token = localStorage.getItem('userToken')
      const userDep = user?.user?.department
   console.log('here is the user data',userDep)
      
      const getActList = async () => {
          try {


            console.log(" departmentId", userDep);
            const response = await axios.get(`http://localhost:4000/api/activity/byDep/${userDep}`);
            
            setList(response.data);
            setFilteredData(response.data); 
            console.log(response.data);
        } catch (error) {
            console.error(error.message, error);
        }
    };
    useEffect(() => {
        if (userDep) {

            getActList();
        } else {
            console.warn(" userDepundefined");
        }
    }, [userDep]);

    const handleFilterChange = (value) => {
        setFilter(value);
        if (value === 'upcoming') {
            const upcoming = actList.filter((activity) => new Date(activity.date) > new Date());
            setFilteredData(upcoming);
        } else if (value === 'past') {
            const past = actList.filter((activity) => new Date(activity.date) < new Date());
            setFilteredData(past);
        } else {
            setFilteredData(actList);
        }
    };

    const showModal = (activity) => {
        setCurrentActivity(activity);
        form.setFieldsValue(activity); 
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const updatedActivity = await axios.put(`http://localhost:4000/api/activity/${currentActivity._id}`, form.getFieldsValue());
            setList(actList.map(activity => activity._id === updatedActivity.data._id ? updatedActivity.data : activity));
            setFilteredData(filteredData.map(activity => activity._id === updatedActivity.data._id ? updatedActivity.data : activity));
            setIsModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            //console.log(currentActivity._id)
            await axios.delete(`http://localhost:4000/api/activity/${currentActivity._id}`,{
                headers : {"Authorization" : `Bearer ${token}`}
            });
            setList(actList.filter(activity => activity._id !== currentActivity._id));
            setFilteredData(filteredData.filter(activity => activity._id !== currentActivity._id));
        setIsModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Participants',
            dataIndex: 'registeredUsers',
            key: 'registeredUsers',
            render: (registeredUsers) => registeredUsers ? registeredUsers.length : 0,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <div className=' p-6 rounded-xl ' style={{ maxWidth: '1200px', margin: 'auto' }}>

{/*      

            <div className='flex flex-col mb-4  bg-white  rounded-xl'>
            <div className='flex justify-start my-4 mx-6 text-3xl font-bold'>
                <h1>Activities</h1>
            </div>
            <div className='flex justify-between p-4 '>
                <Search
                    placeholder="Search by name or location"
                    onSearch={(value) => handleFilterChange(value)}
                    style={{ width: 300 }}
                    enterButton
                />
                <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    onChange={handleFilterChange}
                >
                    <Option value="all">All Activities</Option>
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="past">Past</Option>
                </Select>
                </div>
            </div> */}
            <Filters title="Activities" onSearch={handleFilterChange} onFilterChange={handleFilterChange} />
<div className = 'bg-white p-6 rounded-xl'>

     
                <Tables columns={columns} dataSource={filteredData}  />

                </div>

 
            <Modal
                title="Edit Activity"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="delete" danger onClick={handleDelete}>Delete</Button>,
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>Update</Button>,
                ]}
            >
                {currentActivity && (
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
    );
}

export default ACtivitesList;
