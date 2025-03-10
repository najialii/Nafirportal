import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Avatar, Select, Spin, Typography } from "antd";
import { MessageOutlined, CalendarOutlined } from "@ant-design/icons";
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
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      })
      .then((response) => setMentor(response.data))
      .catch((error) => console.error("Error fetching mentor details:", error));
  }, [id]);

  const requestSession = async () => {
    if (!preferredTime) {
      alert("Please select a preferred time.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/requestsession",
        { sessionId: id, preferredTime },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      alert("Session request sent successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to request session. " + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const startChat = () => {
    if (!mentor?.mentorId) return;
    navigate(`/messanger/${mentor.mentorId}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {mentor ? (
        <Card style={{ width: "600px", textAlign: "center", padding: "24px" }}>
          <Avatar size={100} src={cardtempimag} />
          <Title level={2}>{mentor.mentorName}</Title>
          <Text type="secondary">{mentor.mentorExpertise}</Text>
          <p style={{ marginTop: "16px" }}>{mentor.aboutMentor}</p>
          <Select
            placeholder="Select a time"
            style={{ width: "100%", margin: "16px 0" }}
            onChange={setPreferredTime}
          >
            {mentor.availableTimes.map((slot) =>
              slot.times.map((time) => (
                <Option key={`${slot.day}-${time}`} value={`${slot.day} ${time}`}>{`${slot.day} ${time}`}</Option>
              ))
            )}
          </Select>
          <Button type="primary" icon={<CalendarOutlined />} block onClick={requestSession} loading={loading}>
            Book a Session
          </Button>
          <Button type="default" icon={<MessageOutlined />} block onClick={startChat} style={{ marginTop: "10px" }}>
            Message Mentor
          </Button>
        </Card>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default MentorPage;
