import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileRecipes from "../components/UserRecipes"

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userRecipes, setUserRecipes] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/users/${username}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserInfo(userData.user);
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

    const getFollowersCount = () => {
        if (userInfo && userInfo.followers) {
            return userInfo.followers.length;
        }
        return 0;
    };

    const getFollowingCount = () => {
        if (userInfo && userInfo.following) {
            return userInfo.following.length;
        }
        return 0;
    };

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
                    <p className="followers">Followers: {getFollowersCount()}</p>
                    <p className="following">Following: {getFollowingCount()}</p>
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
