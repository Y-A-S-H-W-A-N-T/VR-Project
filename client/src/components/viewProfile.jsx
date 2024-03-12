import React, { useState, useEffect } from 'react';
import { useUser } from '../useContext.jsx';
import axios from 'axios';
import Navbar from './navbar.jsx';
import Foooter from './Footer.jsx';

import { FaUserCheck } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Profile = () => {
    const [userData, setUserData] = useState();
    const {userId}=useUser()
    useEffect(() => {
        try{
            axios.post('/user/userData',{userId}).then((res)=>{
                if(res.status==200){
                    console.log(res.data)
                    setUserData(res.data)
                    
                }else{
                    console.log("No res")
                }
             })

        }catch(err){
            console.log(err)
        }

    },[]);
 

    console.log(userData)
    return (
        <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-white bg-blend-multiply">
      <Navbar/>
        <div className='flex flex-col justify-center items-center mx-auto px-4 min-h-screen font-two '>

        <div className='w-full max-w-md p-6 border text-center flex flex-col justify-between'>
            {userData==undefined ? <div>Loading...</div> :
            <div className="grid  gap-8 text-center " > 
            <div className="mb-4 grid grid-cols-2">
                <FaUserCheck className="text-amber-500" size={36} />
                    <p className="text-xl font-two">{userData.name}</p>
                </div>
                <div className="mb-4 grid grid-cols-2">
                <MdMarkEmailRead className="text-amber-500" size={36} />
                    <p className="text-xl font-two">{userData.email}</p>
                </div>
                <div className="mb-4 grid grid-cols-2">
                <FaPhoneAlt className="text-amber-500" size={30} />
                    <p className="text-xl font-two">{userData.number}</p>
                </div>
            
            
            
            </div> }
</div>
        </div>
        <Foooter/>
        </section>
    );
};

export default Profile;
