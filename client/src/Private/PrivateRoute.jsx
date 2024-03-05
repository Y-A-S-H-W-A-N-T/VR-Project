import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useUser } from '../useContext.jsx';

const PrivateRoute = () => {
    const { userId } = useUser();
    const [checkedUserId, setCheckedUserId] = useState(userId);

    useEffect(() => {
        const intervalId = setInterval(() => {
          console.log("Checking userId:", userId);
          setCheckedUserId(userId);
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, [userId]);
          
    useEffect(() => {
        console.log("userId changed:", checkedUserId);
    }, [checkedUserId]); 
          
    return (
        <div>
            {checkedUserId !== null && checkedUserId !== undefined ? <Outlet /> : <Navigate to='/login' />}
        </div>
    );
};

export default PrivateRoute;
