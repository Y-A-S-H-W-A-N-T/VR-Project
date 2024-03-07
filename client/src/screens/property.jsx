import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "../css/home.css"
import Rooms from '../components/rooms'
import { MdLocationOn } from 'react-icons/md';
import { MdBusiness } from 'react-icons/md';
import { MdPriceCheck } from 'react-icons/md';
import Maps from '../components/Maps';
import Footer2 from '../components/Footer2';
function Property() {

  const location = useLocation()
  const data = location.state

  const [showRooms,setShowRooms] = useState(false)

  return (
    <>
    <div className="Property-Box bg-white p-6 m-4 pr-5 md:p-8 lg:p-10 xl:p-12 border border-gray-300 rounded-lg shadow-md w-full">
    <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-amber-900">{data.property.name}</h1>
    {data.property.isVerified ? 
    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Verified</span>
     :
    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Not Verified</span>}
    <p className="text-gray-600 mb-4">{data.property.description}</p>
    
  
    <div className="flex flex-wrap items-center mb-4">
      <div className="w-full md:w-auto md:flex-1 md:mr-4">
        <img src={data.property.property_Image} alt="Property" className="w-full h-auto md:w-64 lg:w-72 object-cover rounded-md" />
      </div>
      <div className="w-full md:w-auto md:flex-1">
        <p className="text-lg font-semibold mb-2 flex items-center">
          <MdLocationOn className="mr-2 text-amber-500" />
          Location: {data.property.location}
        </p>
        <Maps className="p-11"/>
        <p className="text-lg font-semibold mb-2 flex items-center">
          <MdBusiness className="mr-2 text-amber-500" />
          Type: {data.property.type}
        </p>
        <p className="text-lg font-semibold mb-2 flex items-center">
          <MdPriceCheck className="mr-2 text-amber-500" />
          Price: {data.property.price}
          <button className="bg-green-500 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded">Book</button>
        </p>
        

  
        <button onClick={() => setShowRooms(!showRooms)} className="text-amber-500 hover:text-amber-700 focus:outline-none">
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
<Footer2/>
  </>
  )
}

export default Property