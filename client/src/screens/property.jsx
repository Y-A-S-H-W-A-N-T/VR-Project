import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import "../css/home.css"
function Property() {

    const location = useLocation()
    const data = location.state

    console.log(data.property)

  return (
    <div className='Property-Box'>
        <h1>{data.property.location}</h1>
        <h1>{data.property.name}</h1>
        <h1>{data.property.type}</h1>
        <h1>{data.property.price}</h1>
        <img src={`http://localhost:3000/uploads/${data.property.image}`} height={100} width={100}/><br></br>
        <Link to='/vr-view' state={{pano: data.property.image}}>VIEW IN VR</Link><br></br>
        <Link to='/ar' state={{pano: data.property.image}}>VIEW AR</Link><br></br>
        <button>TRY ADDING FURNITURES</button>
        <h1>DIFFERENT ROOMS IN ONE PROPERTY - {`>`} List here</h1>
        {/* add arfor mobile also */}
    </div>
  )
}

export default Property