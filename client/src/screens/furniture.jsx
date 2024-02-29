import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

function Furniture() {

  const location = useLocation()
  const data = location.state

  const [fur,setFur] = useState('')
  console.log(fur)
  return (
    <div>
      <h1>TRY FURNITURES</h1>
      <select id="type" value={fur} onChange={(e) => setFur(e.target.value)}>
        <option value="">Select Furniture</option>
        <option value="table">Table</option>
        <option value="bed">Bed</option>
        <option value="sofa">Sofa</option>
        <option value="fridge">Fridge</option>
        <option value="chair">Chair</option>
        <option value="tv">TV</option>
      </select><br/>
      {fur && <><Link to='/mobilear' state={{pano: data.pano, furniture: fur}}>TRY OUT THE FURNITURE FEATURE IN AR in MOBILE</Link><br/>
      <Link to='/3D-model' state={{pano: data.pano, furniture: fur}}>TRY OUT THE FURNITURE FEATURE IN AR in PC</Link></>}
    </div>
  )
}

export default Furniture