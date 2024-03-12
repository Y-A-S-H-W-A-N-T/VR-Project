import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useUser } from '../useContext.jsx';
import { toast } from "react-toastify";

export const PrivateRoute = () => {
    const { userId } = useUser();

    useEffect(() => {
        if (!userId) {
            toast.warning("Warning: User Not Found !", {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }, [userId]);

    return (
        userId ? <Outlet /> : <Navigate to='/a/login' />
    );
};
