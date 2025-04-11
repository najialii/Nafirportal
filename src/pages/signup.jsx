import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Modal, Typography, Select, Steps } from "antd";

const { Text, Link } = Typography;
const { Option } = Select;
const { Step } = Steps;

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
    const [certificates, setCertificates] = useState([
        { title: "", startDate: "", endDate: "" },
      ]);
      
    const [about, setAbout] = useState('');
    const [department, setDepartment] = useState('');
    const [selectedep, setSelectedDep] = useState(null);
    const [dep, setDep] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    const getDeparment = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/department`);
            setDep(res.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getDeparment();
    }, []);


    const handleCertificateChange = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = value;
        setCertificates(updatedCertificates);
      };
      
      const addCertificate = () => {
        setCertificates([
            ...certificates,
            { title: "Untitled Certificate", startDate: "", endDate: "" } 
        ]);
      };
      
      const removeCertificate = (index) => {
        const updatedCertificates = certificates.filter((_, i) => i !== index);
        setCertificates(updatedCertificates);
      };

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        for (let i = 0; i < certificates.length; i++) {
            const certificate = certificates[i];
            if (!certificate.title.trim()) {
                setError(`Certificate ${i + 1}: Title is required.`);
                setLoading(false);
                return;
            }
            if (!certificate.startDate) {
                setError(`Certificate ${i + 1}: Start date is required.`);
                setLoading(false);
                return;
            }
            if (!certificate.endDate) {
                setError(`Certificate ${i + 1}: End date is required.`);
                setLoading(false);
                return;
            }
        }

        const userData = {
            email,
            password,
            role,
            name,
            profilePicture: "ddddd.com",
            country,
            skills,
            department: selectedep,
            linkedinProfile,
            experienceYears,
            industry,
            availability,
            achievements: 'Not yet',
            about,
            certificates
        };

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

    const handleSkillsChange = (value) => {
        setSkills(value);
      };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setCurrentStep(0);  // Reset the step when role changes
    };

    return (
        <div className='py-[80px] bg-gray-50'>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-primary-light text-3xl font-bold mb-6">Join Nafir</h2>

                {/* Role Selection Buttons */}
                <div className="flex w-full justify-center mb-6 gap-4">
                    <button
                        onClick={() => handleRoleChange('mentee')}
                        className={`px-6 py-3 rounded-md text-base font-medium ${role === "mentee" ? "bg-primary-light text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        Mentee
                    </button>
                    <button
                        onClick={() => handleRoleChange('mentor')}
                        className={`px-6 py-3 rounded-md text-base font-medium ${role === "mentor" ? "bg-primary-light text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        Mentor
                    </button>
                </div>

                <Steps current={currentStep} onChange={setCurrentStep} className="mb-6">
                    <Step title="Account Details" />
                    {role !== 'mentee' && <Step title="Professional Details" />}
                    {role !== 'mentee' && <Step title="Additional Information" />}
                </Steps>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentStep === 0 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>
                            </>
                        )}

                        {currentStep === 1 && role !== 'mentee' && (
                            <>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL:</label>
                                    <Input
                                        type="text"
                                        value={linkedinProfile}
                                        onChange={(e) => setLinkedinProfile(e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years:</label>
                                    <Input
                                        type="number"
                                        value={experienceYears}
                                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry:</label>
                                    <Input
                                        type="text"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>
                            </>
                        )}

                        {currentStep === 2 && role !== 'mentee' && (
                            <>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department:</label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Department"
                                        onChange={(value) => setSelectedDep(value)}
                                    >
                                        {dep.map((department) => (
                                            <Option key={department._id} value={department.id}>
                                                {department.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div>
                                    {/* <label className="block text-sm font-medium text-gray-700 mb-2">Availability:</label> */}
                                    {/* <Select
                                        style={{ width: '100%' }}
                                        value={availability ? 'Available' : 'Not Available'}
                                        onChange={(value) => setAvailability(value === 'Available')}
                                    >
                                        <Option value="Available">Available</Option>
                                        <Option value="Not Available">Not Available</Option>
                                    </Select> */}
                                </div>
                                <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Certificates:</label>
      {certificates.map((certificate, index) => (
        <div key={index} className="mb-4">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title:</label>
              <Input
                type="text"
                value={certificate.title}
                onChange={(e) => handleCertificateChange(index, "title", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date:</label>
              <Input
                type="date"
                value={certificate.startDate}
                onChange={(e) => handleCertificateChange(index, "startDate", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date:</label>
              <Input
                type="date"
                value={certificate.endDate}
                onChange={(e) => handleCertificateChange(index, "endDate", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
              />
            </div>
          </div>
          <Button
            onClick={() => removeCertificate(index)}
            type="danger"
            className="mt-2"
            disabled={certificates.length <= 1}
          >
            Remove Certificate
          </Button>
        </div>
      ))}

         

      <Button onClick={addCertificate} type="dashed" className="w-full mt-4">
        Add Certificate
      </Button>
    </div>

             <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skills:</label>
                            <Input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value.split(','))}
                                className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                placeholder="Enter skills, separated by commas"
                            />
                        </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">About:</label>
                                    <Input.TextArea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        rows={4}
                                        className="w-full p-4 border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-primary-light"
                                    />
                                </div>
                            
                            </>
                        )}

                        <div className="col-span-2 mt-6">
                            {currentStep < 2 && (
                                <Button
                                    onClick={handleNext}
                                    type="primary"
                                    className="w-full p-4 text-lg rounded-md"
                                    disabled={loading}
                                >
                                    Next
                                </Button>
                            )}
                            {currentStep === 2 && (
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    className="w-full p-4 text-lg rounded-md"
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account" : "Create Account"}
                                </Button>
                            )}
                            {currentStep > 0 && (
                                <Button
                                    onClick={handlePrev}
                                    type="default"
                                    className="w-full p-4 text-lg rounded-md mt-4"
                                >
                                    Back
                                </Button>
                            )}
                        </div>

                        {error && <p className="text-center text-red-500 text-sm mt-4 col-span-2">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
