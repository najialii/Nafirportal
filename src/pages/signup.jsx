import React, { useState } from 'react';
import axios from 'axios';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        
        const userData = {
            email,
            password,
            role,
            name,
            profilePicture,
            country,
            skills,
            linkedinProfile,
            experienceYears,
            industry,
            availability,
        };

        try {
            const response = await axios.post('http://localhost:4000/api/user/signup', userData);
            console.log(response.data); 
        } catch (err) {
          setError('Error creating user: ' + (err.response?.data?.message || err.message));
          console.error('Signup Error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

      <>
      <div className='py-[80px] bg-gray-50'>
  
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-[#027384] text-2xl mb-6">Signup</h2>
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                <input
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
                </select>

                {role === 'mentor' && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL:</label>
                        <input
                            type="text"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills:</label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value.split(','))}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                            placeholder="Enter skills, separated by commas"
                        />
                    </>
                )}

                {role === 'mentor' && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL:</label>
                        <input
                            type="text"
                            value={linkedinProfile}
                            onChange={(e) => setLinkedinProfile(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years:</label>
                        <input
                            type="number"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(Number(e.target.value))}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Industry:</label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 text-sm"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability:</label>
                        <input
                            type="checkbox"
                            checked={availability}
                            onChange={() => setAvailability(!availability)}
                            className="mb-4"
                        />
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 text-white text-lg rounded-md cursor-pointer transition-all duration-300 ${loading ? 'bg-gray-400' : 'bg-green-800 hover:bg-green-900'}`}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                {error && <p className="text-center text-red-500 text-sm mt-4">{error}</p>}
            </form>
        </div>

</div>
        </>
    );
};

export default Signup;
