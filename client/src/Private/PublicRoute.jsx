import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useUser } from '../useContext.jsx';

export const PublicRoute = () => {
    const{userId}=useUser();
    if(userId){
        return(<Navigate to='/p/userPropertyList'></Navigate>)
        
    }else{
        return(<Outlet/>)
    }
}
