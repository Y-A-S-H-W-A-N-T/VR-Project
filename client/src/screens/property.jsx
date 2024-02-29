import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "../css/home.css"
import Rooms from '../components/rooms'

function Property() {

  const location = useLocation()
  const data = location.state

  const [showRooms,setShowRooms] = useState(false)

  return (
    <div className='Property-Box'>
        <h1>{data.property.location}</h1>
        <h1>{data.property.name}</h1>
        <h1>{data.property.type}</h1>
        <h1>{data.property.price}</h1>
        <img src={data.property.property_Image} height={100} width={100}/><br></br>
        <button onClick={()=>setShowRooms(!showRooms)}>{showRooms?<>❌</>:<>Show Rooms</>}</button>
        {showRooms && <Rooms data={data}/>}
        {/* add ar for mobile also */}
    </div>
  )
}

export default Property