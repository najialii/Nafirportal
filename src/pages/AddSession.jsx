import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const AddSession = ({ mentorId }) => {
    const [mentor, setMentor] = useState(null);
    const [mentorSkills, setMentorSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [availableTimes, setAvailableTimes] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useAuthContext();

    const fetchMentor = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:4000/api/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
console.log('here is the response ',response.data)
            setMentor(response.data);
            setMentorSkills(response.data.skills || []);
        } catch (error) {
            console.error("Error fetching mentor details:", error);
            setError("Failed to load mentor details.");
        }
    };

    useEffect(() => {
        fetchMentor();
    }, [mentorId]);

    const handleSkillChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updatedSkills = [...mentorSkills];
            if (newSkill && !updatedSkills.includes(newSkill)) {
                updatedSkills.push(newSkill);
            }

            const response = await axios.post("http://localhost:4000/api/mentorsessions", {
                mentorId: mentor?._id,
                mentorName: mentor?.name,
                mentorImage: mentor?.profilePicture,
                aboutMentor: "very good mentor ",
                skills: updatedSkills,
                availableTimes: availableTimes.split(",").map(time => time.trim()),
            });

            console.log("Session Created:", response.data);
            setAvailableTimes("");
            setNewSkill("");
            setMentorSkills(updatedSkills);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-[80px] bg-gray-50">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create Mentor Session</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                {mentor ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="font-semibold">Mentor Name:</label>
                        <input 
                            type="text" 
                            value={mentor.name} 
                            disabled 
                            className="border p-2 rounded bg-gray-100 text-gray-600"
                        />

                        <label className="font-semibold">Select or Add Expertise:</label>
                        <input 
                            type="text" 
                            value={newSkill} 
                            onChange={handleSkillChange} 
                            className="border p-2 rounded"
                            placeholder="Type to add new skill"
                            list="skills-suggestions"
                        />
                        <datalist id="skills-suggestions">
                            {mentorSkills.map((skill, index) => (
                                <option key={index} value={skill} />
                            ))}
                        </datalist>

                        <div className="flex flex-wrap gap-2">
                            {mentorSkills.map((skill, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <label className="font-semibold">Available Times (comma separated):</label>
                        <input 
                            type="text" 
                            value={availableTimes} 
                            onChange={(e) => setAvailableTimes(e.target.value)} 
                            placeholder="e.g., 10:00 AM, 2:00 PM"
                            className="border p-2 rounded"
                        />

                        <label className="font-semibold">introduction</label>
                        <textarea 
                            type="text" 
                            value={availableTimes} 
                            onChange={(e) => setAvailableTimes(e.target.value)} 
                            placeholder="e.g., 10:00 AM, 2:00 PM"
                            className="border p-2 rounded"
                        />

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        >
                            {loading ? "Creating..." : "Create Session"}
                        </button>
                    </form>
                ) : (
                    <p className="text-gray-500">Loading mentor details...</p>
                )}
            </div>
        </div>
    );
};

export default AddSession;
