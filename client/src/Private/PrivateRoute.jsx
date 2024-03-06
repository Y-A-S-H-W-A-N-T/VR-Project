import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useUser } from '../useContext.jsx';

export const PrivateRoute = () => {
    const{userId}=useUser();
    if(userId){
        return(<Outlet/>)
    }else{
        return(<Navigate to='/a/login'></Navigate>)
    }
}
