import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Input, Button, Modal, Typography, Select } from "antd";


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


  

    return (

      <>
      <div className='py-[80px] bg-gray-50'>
  
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-primary-light text-2xl mb-6">Signup</h2>
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Role:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                >
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">super Admin</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                {/* {role === 'mentor' && (
                    <>
                       

                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL:</label>
                        <Input
                            type="text"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills:</label>
                        <Input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value.split(','))}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                            
                            placeholder="Enter skills, separated by commas"
                        />
                    </>
                )} */}

{(role === 'mentor' || role === 'admin' || role === 'superadmin') && (
    <>
        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL:</label>
        <Input
            type="text"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">Department:</label>
        
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
        {/* <Input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
        /> */}

        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years:</label>
        <Input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(Number(e.target.value))}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">Industry:</label>
        <Input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
        />
         <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL:</label>
                        <Input
                            type="text"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills:</label>
                        <Input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value.split(','))}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                            
                            placeholder="Enter skills, separated by commas"
                        />

        {/* <label className="block text-sm font-medium text-gray-700 mb-2">Availability:</label>
        <Input
            type="checkbox"
            checked={availability}
            onChange={() => setAvailability(!availability)}
            className="mb-4"
        /> */}
    </>
)}

                <Button
                    // type="submit"
                    htmlType='submit'
                    type='primary'
                    className={`w-full p-3 mt-4 text-white text-lg rounded-md cursor-pointer transition-all duration-300 ${loading ? 'bg-gray-400' : 'bg-green-800 hover:bg-green-900'}`}
                >
                       {loading ? "Creating Account" : "Create Account"}
                </Button>

                {error && <p className="text-center text-red-500 text-sm mt-4">{error}</p>}
            </form>
        </div>

</div>
        </>
    );
};

export default Signup;
