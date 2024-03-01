import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

function Furniture() {

  const location = useLocation()
  const data = location.state

  const [fur,setFur] = useState('')
  console.log(fur)


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
      {fur && <img src={fur} alt="test" height={100} width={100}/>}
      <input type='file' onChange={handleUpload}/><br/>
      {fur && <><Link to='/mobilear' state={{pano: data.pano, furniture: fur}}>TRY OUT THE FURNITURE FEATURE IN AR in MOBILE</Link><br/>
      <Link to='/3D-model' state={{pano: data.pano, furniture: fur}}>TRY OUT THE FURNITURE FEATURE IN AR in PC</Link></>}
    </div>
  )
}

export default Furniture