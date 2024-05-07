import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FollowingsPage = () => {
    const [followings, setFollowers] = useState(null);
    const { username } = useParams();

    const navigate = useNavigate();
    const handleAuthorClick = (username) => {
        navigate(`/profile/${username}`);
      };

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/users/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setFollowers(data.user.following);
                } else {
                    console.error('Failed to fetch followings');
                }
            } catch (error) {
                console.error('Error fetching followings:', error);
            }
        };

        fetchFollowing();
    }, [username]);

    return (
        <div className="followings-container">
            <h1>{`${username}'s Followings`}</h1>
            <ul className="followings-list">
                {followings && followings.map((following) => (
                    <li key={following._id} className="following-item" 
                    onClick={() => handleAuthorClick(following.username)}>{following.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default FollowingsPage;
