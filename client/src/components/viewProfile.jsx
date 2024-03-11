import React, { useState, useEffect } from 'react';
import { useUser } from '../useContext.jsx';
import axios from 'axios';

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
        <div >
            {userData==undefined ? <div>Loading...</div> : <div>hello{userData.name}</div> }

        </div>
    );
};

export default Profile;
