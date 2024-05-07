import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProfileRecipes from "../components/UserRecipes";
import FollowersPage from "./FollowersPage";
import FollowingsPage from "./FollowingsPage";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userRecipes, setUserRecipes] = useState(null);
    const [followings, setFollowings] = useState(null);
    const [followers, setFollowers] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/users/${username}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserInfo(userData.user);
                    setFollowers(userData.user.followers);
                    setFollowings(userData.user.following);
                    setUserRecipes(userData.user.postedRecipes);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    const handleFollow = () => {
        // Logic to handle follow/unfollow action
    };

    return (
        <div className="user-profile">
            {userInfo && (
                <div className="user-info">
                    <div className="user-header">
                        <div className="user-avatar">
                            <img src={'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT6eA2J0MDAOlrfXTNs9BzA5fPNWV0aO45Gigtj6Fvt3q-ygvtbmabw1LFayV9dz65A8ZmnqIDuEueh9V8'} alt="User Avatar" />
                        </div>
                        <div className="user-details">
                            <h2 className="username">{userInfo.username}</h2>
                            <p className="followers">Followers: <Link to={`/profile/${username}/followers`}>{followers ? followers.length : 0}</Link></p>
                            <p className="following">Following: <Link to={`/profile/${username}/followings`}>{followings ? followings.length : 0}</Link></p>
                        </div>
                        <button onClick={handleFollow} className="follow-btn">
                            Follow
                        </button>
                    </div>
                    <p className="email">Email: {userInfo.email}</p>
                    {/* Add more user info fields as needed */}
                </div>
            )}

            <div className="user-recipes">
                <h2>{`${username}'s Recipes`}</h2>
                <div className="recipe-container">
                    {userRecipes && userRecipes.map((recipe) => (
                        <ProfileRecipes key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
