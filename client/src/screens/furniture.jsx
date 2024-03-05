import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

function Furniture() {

  const location = useLocation()
  const data = location.state

  const [fur,setFur] = useState('')
  const [furniture,setFurniture] = useState('')


  const handleUpload = async(e)=>{
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6',formData)
    .then((res)=>{
      console.log(res.data.data.url)
      setFur(res.data.data.url)
    })
  }

  return (
    <div>
      <h1>TRY FURNITURES</h1>
      <p>note: Choose images without background. Use remove bg website to remove background in a click</p>
      <h1>TO DO : ADD ROTATION, SIZE SELECTION</h1>
      {fur && <img src={fur} alt="test" height={100} width={100}/>}
      <input type='file' onChange={handleUpload}/><br/>
      {fur && <><Link to='/mobilear' state={{pano: data.pano, furniture: fur}}>TRY OUT THE FURNITURE FEATURE IN AR in MOBILE</Link></>}<br/>
      <select id="type" value={furniture} onChange={(e) => setFurniture(e.target.value)}>
        <option value="">Select Furniture</option>
        <option value="https://cdn.glitch.global/d0e6a6bc-d958-44c6-be4a-0f9e40b44944/bench.glb?v=1709578521404v">Bench</option>
        <option value="https://cdn.glitch.global/168e0451-dc78-4fa9-9a84-028ef51d9561/File.glb?v=1651912125168">Table</option>
        <option value="https://cdn.glitch.global/ededd3e3-c762-41e8-93f6-c667b87a9882/signBoard.glb?v=1709577727732">Chair</option>
      </select>
      <Link to='/3D-model' state={{pano: data.pano, furniture: furniture}}>TRY OUT THE FURNITURE FEATURE IN AR in PC</Link>
    </div>
  )
}

export default Furniture