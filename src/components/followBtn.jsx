import { useState, useEffect } from "react";
import axios from "axios";

const FollowButton = ({ userId, currentUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/connect/${currentUserId}`);
                setIsFollowing(res.data.followers.includes(userId));
            } catch (error) {
                console.error("Error checking follow status:", error);
            }
        };
        checkFollowStatus();
    }, [userId, currentUserId]);

    
    const handleFollow = async () => {
        setLoading(true);
        try {
            if (isFollowing) {
                await axios.delete(`http://localhost:4000/api/connect/unfollow/${userId}`);
            } else {
                await axios.post(`/api/follow/${userId}`);
            }
            setIsFollowing(!isFollowing); 
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
        setLoading(false);
    };

    return (
        <button 
            onClick={handleFollow} 
            disabled={loading} 
            style={{
                padding: "10px 15px",
                backgroundColor: isFollowing ? "red" : "blue",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
            }}>
            {loading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;

//how to use dis 
{/* <FollowButton userId={userId} currentUserId={currentUserId} /> */}