import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Avatar, Typography, Button, Select, Spin, message } from "antd";
import useAuthContext from "../hooks/useAuthContext";
import cardtempimag from "../assets/studio-portrait-beautiful-young-woman-posing.jpg";

const { Title, Text } = Typography;
const { Option } = Select;

const MentorPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [mentor, setMentor] = useState(null);
  const [preferredTime, setPreferredTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/mentorsessions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        setMentor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mentor details:", error);
      });
  }, [id]);

  const requestSession = async () => {
    if (!preferredTime) {
      message.warning("Please select a preferred time.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("User token not found. Please log in again.");

      const response = await axios.post(
        "http://localhost:4000/api/requestsession",
        { sessionId: id, preferredTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Session request sent successfully!");
    } catch (error) {
      message.error("Failed to request session.");
    }
    setLoading(false);
  };

  const startChat = () => {
    if (mentor?.mentorId) {
      navigate(`/messanger/${mentor.mentorId}`);
    } else {
      message.error("Mentor ID is missing");
    }
  };

  return (
    <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
      {mentor ? (
        <Card style={{ width: 600, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar size={80} src={cardtempimag} />
            <Title level={3}>{mentor.mentorName}</Title>
          </div>
          <Text strong>Expertise: </Text><Text>{mentor.mentorExpertise}</Text>
          <br />
          <Text strong>About: </Text><Text>{mentor.aboutMentor}</Text>
          <br />
          <Text strong>Available Times: </Text>
          <Select
            style={{ width: "100%", marginTop: 8 }}
            placeholder="Select a time"
            value={preferredTime}
            onChange={setPreferredTime}
          >
            {mentor.availableTimes.map((slot) =>
              slot.times.map((time) => (
                <Option key={`${slot.day}-${time}`} value={`${slot.day} ${time}`}>
                  {slot.day} {time}
                </Option>
              ))
            )}
          </Select>
          <div style={{ marginTop: 16, display: "flex", gap: "8px" }}>
            <Button type="primary" loading={loading} onClick={requestSession} block>
              {loading ? "Requesting..." : "Book a Session"}
            </Button>
            <Button onClick={startChat} block>
              Message Mentor
            </Button>
          </div>
        </Card>
      ) : (
        <Spin tip="Loading mentor details..." size="large" />
      )}
    </div>
  );
};

export default MentorPage;
