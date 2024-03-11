import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Notifications({ toggleShowNotification }) {

    const [allNotifications,setAllNotifications] = useState([])
    const [loading,setLoading] =  useState(true)

    useEffect(() => {
        axios.get('/property/showRequest')
          .then(response => {
            setAllNotifications(response.data)
            setLoading(false)
          })
          .catch(error => {
            console.error("Error:", error); 
          })
      },[])

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div className='flex items-center p-4 border-b border-gray-200 md:justify-between'>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShowNotification()}>❌</p>
                </div>
                {loading && <p>LOADING......</p>}
                <div className='test p-4 pr-3 pl-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        allNotifications.map((val,ind)=>(
                            <div key={ind}>
<<<<<<< HEAD
                                <p className='font-two' state={{ property: val }}>{val.UserId}</p>
                                <button className='mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700' onClick={(e)=>Accept(e,val.PropertyId,val.UserId)}>Accept</button>
=======
                                <p className='font-two' state={{ property: val }}>Property</p>
                                    {console.log(val)}
                                <button className='mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700' onClick={(e)=>Accept(e,val.UserId,val.PropertyId)}>Accept</button>
>>>>>>> 315b13a208d3a23fd44e392265c92aa68e991b4d
                                <Link to='/request' state={{ property_id: val.PropertyId, user_id: val.UserId }} className='mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700'>Check</Link>
                            </div>
                        ))
                    }
                </div>   
            </div>
        </div>
    </div>
  )
}

export default Notifications