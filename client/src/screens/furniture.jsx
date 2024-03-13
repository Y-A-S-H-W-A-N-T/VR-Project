import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
function Furniture() {

  const location = useLocation()
  const data = location.state

  const [fur,setFur] = useState('')
  const [furniture,setFurniture] = useState('')
  const [size,setSize] = useState('')
  const [rotateX,setRotateX] = useState(0)
  const [rotateY,setRotateY] = useState(0)
  const [rotateZ,setRotateZ] = useState(0)
  const [assets,setAssets] = useState([])

  useEffect(()=>{
    axios.get('/assets/bring')
    .then((res)=>{
      console.log(res)
      setAssets(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


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
    <div className="flex flex-col justify-center items-center mx-auto px-4 bg-gradient-to-r from-white to-amber-100 min-h-screen font-two items-center">

    <div className="flex flex-col lg:flex-row p-6">
    
      {/* Content for 'Use Your Furniture' section */}
      <div className='flex flex-col justify-between item-center p-4 w-full lg:w-1/2'>
        <h1 className='text-center text-4xl lg:text-6xl pb-8 text-amber-600 '>Use Your Furniture</h1>
        <a href="https://www.remove.bg/" target="_blank" rel="noopener noreferrer" className='border border-2 rounded-full border-yellow-100 rounded-md bg-amber-100 focus:outline-none text-center w-1/2 lg:w-full mb-3 p-2'>Click me for bg-removal</a>
        <p className="mb-4 text-slate-300 text-wrap font-sans ">Note: Select images with transparent backgrounds for best results. Utilize external websites for easy background removal in a click.</p>
        <h1 className="text-xl py-4 mb-2 text-yellow-600">TO DO: ADD ROTATION, SIZE SELECTION</h1>
        {fur && <img src={fur} alt="Furniture" className="w-24 h-24 mb-4 rounded-full border-yellow-500 rounded-md bg-yellow-100 focus:outline-none" />}
        <input type="file" className="mb-4 py-2" onChange={handleUpload} />
        {fur && (
          <Link
            to="/mobilear"
            state={{ pano: data.pano, furniture: fur }}
            className="rounded-md bg-blue-500 focus:outline-none hover:bg-blue-200 text-center p-2 mb-2 w-full"
          >
            Try With Image
          </Link>
        )}
      </div>
    
      {/* Content for 'Use Our 3D Simulations' section */}
      <div className='flex flex-col justify-between item-center p-4 w-full lg:w-1/2'>
        <h1 className='text-center text-4xl lg:text-6xl pb-8 text-amber-600'>Use Our 3D Simulations</h1>
        <div>
          <select
            id="type"
            value={furniture}
            onChange={(e) => setFurniture(e.target.value)}
            className="mb-4 border-2 border-yellow-500 rounded-md bg-white focus:outline-none text-center w-1/2 lg:w-1/2 p-2 mb-2"
          >
            <option value="">Select Furniture</option>
            {assets.map((val, index) => (
              <option key={index} value={val.asset_link}>
                {val.asset_name}
              </option>
            ))}
          </select>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mb-4 border-2 border-yellow-500 rounded-md bg-white focus:outline-none text-center w-1/2 lg:w-1/2 p-2 mb-2"
          >
            <option value="">Select Size</option>
            {[...Array(9)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          {/* Range inputs for rotation */}
          <div className="relative">
          <input
        type="range"
        min="0"
        max="360"
        value={rotateX}
        onChange={(e) => setRotateX(e.target.value)}
        className="mb-2 w-full bg-yellow-100"
      />
      <div className="realtive top-0 left-0 right-0 text-center text-sm text-gray-700">
        {rotateX}°
      </div>
          </div>
          <div className="relative">
          <input
        type="range"
        min="0"
        max="360"
        value={rotateY}
        onChange={(e) => setRotateY(e.target.value)}
        className="mb-2 w-full bg-yellow-100"
      />
      <div className="realtive top-0 left-0 right-0 text-center text-sm text-gray-700">
        {rotateY}°
      </div>
          </div>
          <div className="relative">
          <input
        type="range"
        min="0"
        max="360"
        value={rotateZ}
        onChange={(e) => setRotateZ(e.target.value)}
        className="mb-2 w-full bg-yellow-100"
      />
      <div className="realtive top-0 left-0 right-0 text-center text-sm text-gray-700">
        {rotateZ}°
      </div>
          </div>
        </div>
        {/* Link to try with 3D model */}
        <Link
          to="/3D-model"
          state={{
            pano: data.pano,
            furniture: furniture,
            size: size,
            x: rotateX,
            y: rotateY,
            z: rotateZ,
          }}
          className="rounded-md bg-blue-500 focus:outline-none hover:bg-blue-200 text-center p-2 mb-2 w-full"
        >
          Try With 3D Model
        </Link>
      </div>
    </div>
    </div>
    
  

  )
}

export default Furniture