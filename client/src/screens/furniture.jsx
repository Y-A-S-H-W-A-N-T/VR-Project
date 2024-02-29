import React from 'react'
import { useLocation, Link } from 'react-router-dom'

function Furniture() {

  const location = useLocation()
  const data = location.state
  console.log(data.pano)
  return (
    <div>
      <h1>TRY FURNITURES</h1>
      <Link to='/mobilear' state={{pano: data.pano}}>TRY OUT THE FURNITURE FEATURE IN AR in MOBILE</Link><br/>
      <Link to='/mobilear' state={{pano: data.pano}}>TRY OUT THE FURNITURE FEATURE IN AR in PC</Link>
    </div>
  )
}

export default Furniture