import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";
import {
  TimePicker,
  Select,
  Button,
  Input,
  Tag,
  Spin,
  Form,
  AutoComplete,
} from "antd";
import daysjs from "dayjs";
import DashboardLayout from "../admin/admindash";
const { RangePicker } = TimePicker;
const dOfW = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddSession = ({ mentorId }) => {
  const [mentor, setMentor] = useState(null);
  const [mentorSkills, setMentorSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState([null, null]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const user = useAuthContext();

  // console.log("Token:", localStorage.getItem("userToken"));

  const fetchMentor = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("http://localhost:4000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const handleSelTime = () => {
    if (selectedDay && selectedTime.length === 2) {
      const formattedTimes = selectedTime.map((time) =>
        daysjs(time, "HH:mm").format("HH:mm")
      );

      setAvailableTimes((prevTimes) => {
        const existingSlot = prevTimes.find((slot) => slot.day === selectedDay);
        if (existingSlot) {
          return prevTimes.map((slot) =>
            slot.day === selectedDay
              ? {
                  ...slot,
                  times: [...new Set([...slot.times, ...formattedTimes])],
                }
              : slot
          );
        } else {
          return [...prevTimes, { day: selectedDay, times: formattedTimes }];
        }
      });

      setSelectedDay("");
      setSelectedTime([null, null]);
    }
  };

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

      const sessionData = {
        mentorId: mentor?._id,
        mentorName: mentor.name,
        mentorImage: mentor?.profilePicture,
        aboutMentor:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A cupiditate asperiores doloremque doloribus architecto distinctio ratione voluptas aliquid accusantium ad laudantium modi eum rerum, sit dolore odio voluptatem quod fuga.",
        skills: updatedSkills,
        availableTimes,
      };
      console.log(sessionData);
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:4000/api/mentorsessions",
        sessionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response:", response);
      setAvailableTimes([]);
      setNewSkill("");
      setMentorSkills(updatedSkills);
    } catch (err) {
      console.error(
        "Error creating session:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Mentor Session</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {mentor ? (
          <Form onSubmitCapture={handleSubmit} layout="vertical">
            <Form.Item label="Mentor Name">
              <Input value={mentor.name} disabled />
            </Form.Item>

            <Form.Item label="Select or Add Expertise">
              {/* <Input
                value={newSkill}
                onChange={handleSkillChange}
                placeholder="Type to add new skill"
                list="skills-suggestions"
              /> */}
              <AutoComplete
                options={mentorSkills.map((skill) => ({ value: skill }))}
                style={{ width: "100%" }}
                value={value}
                onChange={setValue}
                placeholder="Select or type a skill"
                filterOption={(inputValue, option) =>
                  option.value.toLowerCase().includes(inputValue.toLowerCase())
                }
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            {/* 
            <div className="flex flex-wrap gap-2">
              {mentorSkills.map((skill, index) => (
                <Tag key={index} color="blue">
                  {skill}
                </Tag>
              ))}
            </div> */}

            <Form.Item label="Available Days & Times">
              <div className="flex items-center gap-2">
                <Select
                  placeholder="Select a day"
                  value={selectedDay}
                  onChange={(value) => setSelectedDay(value)}
                  style={{ width: "45%" }}
                >
                  {dOfW.map((day) => (
                    <Select.Option key={day} value={day}>
                      {day}
                    </Select.Option>
                  ))}
                </Select>

                <RangePicker
                  format="HH:mm"
                  value={selectedTime}
                  onChange={(times) => setSelectedTime(times || [null, null])}
                  style={{ width: "45%" }}
                />

                <Button className="bg-primary-light" onClick={handleSelTime}>
                  Add
                </Button>
              </div>
            </Form.Item>

            <div className="flex gap-3 py-2">
              {availableTimes.length > 0 ? (
                availableTimes.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-white border border-primary-light w-fit flex flex-col p-2 rounded-md mb-1"
                  >
                    <div classsName="w-12">
                      <strong>{slot.day}</strong>
                    </div>
                    <div className="text-xs">
                      from {slot.times.join(" until ")}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No time slots added.</p>
              )}
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="bg-[#221F42] text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
                htmlType="submit"
                disabled={loading}
                loading={loading}
                block
                color="#221F42"
              >
                {loading ? "Creating..." : "Create Session"}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Spin tip="Loading mentor details..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSession;
