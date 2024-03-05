import React from 'react'
import { Outlet, Navigate } from 'react-router'
import {useUser} from '../useContext.jsx'
const PrivateRoute = () => {
    const{userId}=useUser()
    console.log(userId)
  return (
    <div>
       {  userId !== null && userId !== undefined ? <Outlet/> : <Navigate to='/login'></Navigate>}
    </div>
  )
}

export default PrivateRoute