import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';
import useAuthContext from '../hooks/useAuthContext.js'
const { Option } = Select;
const {TextArea} = Input
const CreateActivity = () => {
  const [form] = Form.useForm();
  const user = useAuthContext()
const  [dep , setDep] = useState([])
const [selectedep , setSelectedDep] = useState()
  const userId = user?.user?.userid

  const getdep = async()=>{

    const response = await axios.get('http://localhost:4000/api/department')
    console.log(response.data)
    setDep(response.data)
    console.log('here are the dep',response.data.data) 

}

useEffect(()=>{
    getdep()
},[])




useEffect(()=>{
    console.log('the axdsadsa',selectedep)
},[selectedep])


  console.log(user)
  const handleSubmit = async (values) => {
    try {
      const formData = {
          userId,
          departmentId :selectedep,
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
      };
      console.log(formData)
      const response = await axios.post(`http://localhost:4000/api/activity`, formData);
      
      console.log('Activity Created:', response.data);
      alert('Activity created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating activity:', error);
      alert(error.message);
    }
  };

  return (
    
    <Form form={form} onFinish={handleSubmit} layout="vertical">
     
      <Form.Item name="name" label="Activity Name" rules={[{ required: true, message: 'Required' }]}> 
        <Input placeholder="Activity Name" />
      </Form.Item>

     
      <Select
       style={{ width: 200 }}
       placeholder="Select Department"
       onChange={(value) => setSelectedDep(value)}
      >
        {dep.map((department)=>(
            <Option key={department._id} value={department.id}>
                {department.name}
            </Option>
        ))}
      </Select>
 
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Required' }]}> 
        <TextArea rows={7} placeholder="Description" />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Required' }]}> 
        <Input placeholder="Location" />
      </Form.Item>
      <Form.Item name="link" label="Meeting Link" rules={[{ required: true, message: 'Required' }]}> 
        <Input placeholder="Meeting Link" />
      </Form.Item>
      <Form.Item name="meeting_id" label="Meeting ID" rules={[{ required: true, message: 'Required' }]}> 
        <Input placeholder="Meeting ID" />
      </Form.Item>
      <Form.Item name="passcode" label="Passcode" rules={[{ required: true, message: 'Required' }]}> 
        <Input placeholder="Passcode" />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Required' }]}> 
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Required' }]}> 
        <TimePicker format="HH:mm" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Create Activity</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateActivity;
