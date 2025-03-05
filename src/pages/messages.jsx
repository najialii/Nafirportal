import { useEffect, useState } from "react";
import axios from "axios";

const RoomsList = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch all rooms for the given user
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/rooms", {
          params: { user },
        });
        setRooms(response.data); // Store rooms in state
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [user]);

  return (
    <div className="rooms-list">
      <h2>Your Chat Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <a href={`/chat/${room.room}`}>{room.room}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
