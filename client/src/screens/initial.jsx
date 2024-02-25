import React from 'react'
import { Link } from 'react-router-dom'

function Initial() {

  return (
    <div>
      <Link to='/home' state={{property: 'land'}}>LAND</Link><br/>
      <Link to='/home' state={{property: 'property'}}>PROPERTY</Link><br/>
      <Link to='/home' state={{property: 'rent'}}>RENTS</Link>
    </div>
  )
}

export default Initial