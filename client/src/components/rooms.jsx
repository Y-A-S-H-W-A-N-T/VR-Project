import React from 'react'
import { Link } from 'react-router-dom'

function rooms({ data }) {
  return (
    <div>
        {
          data.property.room_info.room_names.map((item,index)=>(
            <div key={index} style={{border: "2px solid red"}}>
                <h1>{item}</h1>
                <Link to='/vr-view' state={{pano: data.property.room_info.room_images[index]}}>VIEW IN VR</Link><br/>
                <Link to='/ar' state={{pano: data.property.room_info.room_images[index]}}>VIEW IN VR</Link><br/>
                <Link to='/furniture' state={{pano: data.property.room_info.room_images[index]}}>Try Adding Furniture</Link><br/>
            </div>
          ))
        }
    </div>
  )
}

export default rooms