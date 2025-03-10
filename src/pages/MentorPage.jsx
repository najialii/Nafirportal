import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import cardtempimag from '../assets/studio-portrait-beautiful-young-woman-posing.jpg';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
const MentorPage = () => {
  const { id } = useParams(); 
  const { user } = useAuthContext()
  const [mentor, setMentor] = useState(null);
  const [preferredTime, setpreferredTime] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [room , setRoom] = useState(null)
  const navigate = useNavigate()
  // console.log(user)

console.log('this the user', user)
console.log('this the mentor id', id)
  const startChat = () => {
    if (!mentor?.mentorId) {
      console.error("mentorId is missing");
      return;
    }

    console.log(`Navigating to chat with mentorId: ${mentor.mentorId}`);
    navigate(`/messanger/${mentor.mentorId}`);
  };

  
  useEffect(() => {
    axios.get(`http://localhost:4000/api/mentorsessions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      }
    })
    
      .then((response) => {
        setMentor(response.data);
        console.log('here is the data',  response)
      })
      .catch((error) => {
        console.error("Error fetching mentor details:", error.message);
        if (error.response) {
          console.error("Server responded with:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      });
      
  }, [id]);

  

const userLS = JSON.parse(localStorage.getItem('user'));
const userId = user ? userLS.userid : null;


const hanProNavagte = ()=>{
  navigate(`/messanger/`)
}


const createConv = async ()=>{
  try {

    const res = await axios.post('http://localhost:4000/api/conversation', 
    {
      senderId: userId,
      receiverId: mentor.mentorId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userid")}`,
      }
    }
  )
  console.log(res.status)
  if(res.status === 200){
    const conversationId = res.data._id
    console.log(res.data._id)
    navigate(`/messanger/${conversationId}`)
  }
  } catch (err) {

    console.error(err.message)
  }
  
}

const requestSession = async () => {
  if (!preferredTime) {
    alert("Please select a preferred time.");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("userToken"); 
    if (!token) {
      throw new Error("User token not found. Please log in again.");
    }

    // Log the preferredTime to debug
    console.log('Selected preferredTime:', preferredTime);

    // Validate the preferredTime format
    const timeFormat = /^\w+ \d{2}:\d{2}$/; // Example format: "Friday 06:00"
    if (!timeFormat.test(preferredTime)) {
      throw new Error("Invalid time slot format.");
    }

    const reqbdy = {
      sessionId: id,
      preferredTime // Ensure it's a string
    };

    console.log('Request body:', reqbdy);

    const response = await axios.post(
      "http://localhost:4000/api/requestsession",
      reqbdy,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Session request sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error requesting session:", error);
    alert("Failed to request session. " + (error.response?.data?.message || error.message));
  }

  setLoading(false);
};

  const createRoom = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please log in to message the mentor.");
      return;
    }

    socket.emit('create-room', { user1: user.id, user2: mentor._id, token }, (room) => {
      if (room) {
        setRoom(room);
        alert(`Room ${room} created! You can now start messaging.`);
      } else {
        alert("Failed to create a room.");
      }
    });
  };
  

  return (
    <div className="p-8">
      {/* <header className="h-80 bg-gradient-to-br from-green-800 to-green-400"></header> */}

      {mentor ? (
        <div className="flex justify-between gap-8 items-center  px-8">
          <div className="flex justify-start items-center gap-2">
            <div className="h-40 w-40 overflow-hidden rounded-full flex justify-center items-center border-4 border-white shadow-lg">
              <img
                src={cardtempimag}
                alt={mentor.mentorName}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{mentor.mentorName}</h1>
          </div>

          <div className="bg-white fixed right-12 w-96 border border-gray-200 p-6 rounded-lg shadow-sm -mt-16">
            <p className="text-gray-600 text-lg mb-3"><strong>Expertise:</strong> {mentor.mentorExpertise}</p>
            <p className="text-gray-600 mb-3"><strong>About:</strong> {mentor.aboutMentor}</p>
            <p className="text-gray-600 mb-3"><strong>Available Times:</strong></p>
            <select
              value={preferredTime}
              onChange={(e) => setpreferredTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            >
             <option>Select a time</option>
{mentor.availableTimes.map((slot, index) => (
  slot.times.map((time, timeIndex) => {
    const formattedTime = `${slot.day} ${time}`;
    console.log("Available Time Option:", formattedTime); // Debugging log
    return (
      <option key={`${index}-${timeIndex}`} value={formattedTime}>
        {formattedTime}
      </option>
    );
  })
))}

            </select>

            <div className="flex flex-col justify-end w-full items-center">
              <button
                onClick={requestSession}
                className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                disabled={loading}
              >
                {loading ? "Requesting..." : "Book a Session"}
              </button>
              <button
                              className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              onClick={createConv}
              >
Message
                </button>
            </div>
          </div>
          <div>mentor.</div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading mentor details...</p>
      )}
    </div>
  );
};

export default MentorPage;
