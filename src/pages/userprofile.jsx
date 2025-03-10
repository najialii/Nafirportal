import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Typography, Tag } from "antd";
import FollowButton from "../components/followBtn";
import pimage from "../assets/studio-portrait-beautiful-young-woman-posing.jpg";

const { Title, Text } = Typography;

const UserPro = () => {
    const { userId } = useParams(); 
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCurrentUser(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const endpoint = userId
                    ? `http://localhost:4000/api/user/${userId}` 
                    : "http://localhost:4000/api/user/me"; 

                const res = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <div className="user-profile">
                <Card
                    hoverable
                    cover={
                        <img
                            alt="Cover"
                            src={pimage}
                            style={{ height: 250, objectFit: "cover", width: "100%" }}
                        />
                    }
                    style={{ width: "100%" }}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                src={pimage}
                                alt="Profile"
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    border: "4px solid white",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        </Col>
                        <Col span={18}>
                            <Title level={2}>{user?.name}</Title>
                            <div>
                                <Text>{user?.followers.length} followers</Text> | 
                                <Text>{user?.following.length} following</Text>
                            </div>
                            {currentUser && currentUser._id !== user._id && (
                                <FollowButton userId={user._id} currentUserId={currentUser._id} />
                            )}
                        </Col>
                    </Row>

                    <Text type="secondary" className="mt-2">
                        Hi, I'm a passionate developer with expertise in Node.js, React, and Tailwind CSS. I love building efficient and scalable web applications.
                    </Text>

                    <div className="mt-4">
                        <Title level={4}>Skills</Title>
                        <div>
                            {user?.skills?.map((skill, index) => (
                                <Tag  key={index}>
                                    {skill}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <Title level={4}>About</Title>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iusto provident deleniti, numquam aspernatur voluptates modi et iste ducimus similique molestiae enim animi ea aperiam velit repudiandae cupiditate perferendis impedit.
                        </Text>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default UserPro;
