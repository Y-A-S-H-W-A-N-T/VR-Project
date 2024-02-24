import React from 'react'
import { useLocation, Link } from 'react-router-dom'

function Property() {

    const location = useLocation()
    const data = location.state

    console.log(data.property)

  return (
    <div>
        <h1>{data.property.location}</h1>
        <h1>{data.property.name}</h1>
        <h1>{data.property.type}</h1>
        <img src={data.property.image}/>
        <Link to='/vr-view' state={{pano: data.property.image}}>VIEW IN VR</Link>
        <Link to='/ar' state={{pano: data.property.image}}>VIEW AR</Link>
    </div>
  )
}

export default Property