import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "../css/home.css"
import Rooms from '../components/rooms'

function Property() {

  const location = useLocation()
  const data = location.state

  const [showRooms,setShowRooms] = useState(false)

  return (
    <div className="Property-Box bg-white p-6 md:p-8 lg:p-10 xl:p-12 border border-gray-300 rounded-lg shadow-md w-full">
    <h1 className="text-2xl lg:text-3xl font-bold mb-4">{data.property.name}</h1>
    <p className="text-gray-600 mb-4">{data.property.description}</p>
    
    <div className="flex flex-wrap items-center mb-4">
      <div className="w-full md:w-auto md:flex-1 md:mr-4">
        <img src={data.property.property_Image} alt="Property" className="w-full h-auto md:w-64 lg:w-72 object-cover rounded-md" />
      </div>
      <div className="w-full md:w-auto md:flex-1">
        <p className="text-lg font-semibold mb-2">Location: {data.property.location}</p>
        <p className="text-lg font-semibold mb-2">Type: {data.property.type}</p>
        <p className="text-lg font-semibold mb-2">Price: {data.property.price}</p>
        
        <button onClick={() => setShowRooms(!showRooms)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
          {showRooms ? '❌ Close Rooms' : '🔍 Show Rooms'}
        </button>
      </div>
    </div>
    
    {showRooms && <Rooms data={data} />}
    
    {/* AR functionality for mobile */}
    <div className="md:hidden">
      {/* Render AR functionality here */}
      <p className="text-gray-600 mt-2">AR functionality for mobile</p>
    </div>
  </div>
  )
}

export default Property