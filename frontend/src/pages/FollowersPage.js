import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FollowersPage = () => {
    const [followers, setFollowers] = useState(null);
    const { username } = useParams();

    const navigate = useNavigate();
    const handleAuthorClick = (username) => {
        navigate(`/profile/${username}`);
      };

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/users/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setFollowers(data.user.followers);
                } else {
                    console.error('Failed to fetch followers');
                }
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, [username]);

    return (
        <div className="followers-container">
            <h1>{`${username}'s Followers`}</h1>
            <ul className="followers-list">
                {followers && followers.map((follower) => (
                    <li key={follower._id} className="follower-item" onClick={() => handleAuthorClick(follower.username)}>{follower.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowersPage;
