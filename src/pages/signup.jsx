import { useState , useEffect} from 'react';
import axios from 'axios';
import { Input, Button,Checkbox, Modal, Typography, Select,Form, Divider } from "antd";
import logo from "../assets/nafir.svg"
import slider from "../assets/Group.png"
const { Text, Link } = Typography;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mentee');
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [country, setCountry] = useState('');
    const [skills, setSkills] = useState([]);
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [industry, setIndustry] = useState('');
    const [availability, setAvailability] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [about , setAbout] = useState()
    const [department , setDepartment] = useState()
    const [selectedep , setSelectedDep] = useState(null)
    const [dep , setDep] = useState([])




    const getDeparment = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/department`);
          setDep(res.data);
          console.log(res.data)
        } catch (error) {
          console.error(error.messsage);
        }
      };
  

      useEffect(()=>{
        getDeparment()
      },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      console.log('many man')

      const userData = {
          email,
          password,
          role,
          name,
          profilePicture,
          country,
          skills,
          department : selectedep,
          linkedinProfile,
          experienceYears,
          industry,
          availability,
          achievements: 'Not yet',
          about
}
  console.log('here the data sent to the server', userData)
      try {
          const response = await axios.post('http://localhost:4000/api/user/signup', userData);
          console.log(response); 
          localStorage.setItem("user", JSON.stringify(response.data)); 
          localStorage.setItem("userToken", response.data.token);
      } catch (err) {
          setError('Error creating user: ' + (err.response?.data?.message || err.message));
          console.error('Signup Error:', err.response || err.message);
      } finally {
          setLoading(false);
      }
  };

 
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


    return (

    <div className='grid grid-cols-5 p-4 lg:p-8'>
        <div className='col-span-2 rounded-lg bg-gradient-to-b from-green-100 to-orange-300 flex flex-col items-center justify-center'>
            <img src={logo} alt="" className='w-2xs' />
            <span className='text-2xl mb-4'>Wellcome</span>
            <p className='font-semibold text-3xl mb-8'>In Nafir Comunity</p>
            <img src={slider} alt="slider"/>
        </div>
        <div className='p-10 col-span-3'>
            <h1 className='text-4xl font-semibold mb-3'>Create New Acounte</h1>
            <p className='text-gray-500'>Lorem ipsum dolor sit amet . Asperiores animi tempora nulla sint.</p>
            <form className='mt-10'>
                <div className='flex w-full gap-4'>
                    <Form.Item
                        layout="vertical"
                        label="First Name"
                        name="vertical"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                        <Input style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"8px"}}  />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Secend Name"
                        name="vertical"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                        <Input style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"8px"}}  />
                        </Form.Item>
                </div>
               

                <Form.Item
                        layout="vertical"
                        label="Email"
                        name="vertical"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                        <Input style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"8px"}}  />
                        </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Password"
                        name="vertical"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                                                <Input style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"8px"}}  />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Confierm Password"
                        name="vertical"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                                          <Input style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"8px"}}  />

                    </Form.Item>

                <Form.Item label={null}>
                <Button type="primary" htmlType="submit" size="large" className='w-full' style={{ backgroundColor: '#618B44' ,borderRadius : "8px" ,padding:"10px"}}>
                    SignUp
                </Button>
                </Form.Item>
                <Divider>OR</Divider>
                <Button className='w-full' size='large' style={{ backgroundColor: 'white' ,borderRadius : "8px" ,padding:"10px"}} ><img src="/images/Icon.png" alt="google logo" /> SignUp with Google</Button>
          </form>
        </div>
    </div>
    );
};

export default Signup;
