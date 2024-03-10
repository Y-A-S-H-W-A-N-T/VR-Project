import React, { useState, useEffect } from 'react';
import { useUser } from '../useContext.jsx';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
   
        const fetchUserData = async () => {
            try {
                const response = await fetch(`users/userData/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

    }, [userId]);

    return (
        <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">User Profile</h2>
            {userData ? (
                <div>
                    <p className="text-lg">Name: {userData.name}</p>
                    <p className="text-lg">Email: {userData.email}</p>
                </div>
            ) : (
                <p className="text-lg">Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
