import React from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiBox, FiCpu } from "react-icons/fi";

function rooms({ data }) {
  return (
    
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {data.property.room_info.room_names.map((item, index) => (
    <div key={index} className="border-2 border-amber-500 p-4 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-2 text-amber-900">{item}</h1>
      <Link to="/vr-view" state={{ pano: data.property.room_info.room_images[index] }} className="block text-amber-900 font-medium hover:underline flex items-center justify-between">
        <div>
          <FiEye size={20} className="inline-block mr-2" />
          View in VR
        </div>
        <span className="text-sm text-gray-500">See the room in a virtual tour</span>
      </Link><br/>
      <Link to="/ar" state={{ pano: data.property.room_info.room_images[index] }} className="block text-amber-900 font-medium hover:underline mt-2 flex items-center justify-between">
        <div>
          <FiBox size={20} className="inline-block mr-2" />
          View in AR
        </div>
        <span className="text-sm text-gray-500">See the room in augmented reality</span>
      </Link><br/>
      <Link to="/furniture" state={{ pano: data.property.room_info.room_images[index] }} className="block text-amber-900 font-medium mt-2 hover:underline flex items-center justify-between">
        <div>
          <FiCpu size={20} className="inline-block mr-2" />
          Try Adding Furniture
        </div>
        <span className="text-sm text-gray-500">See how furniture might look in the room</span>
      </Link><br/>
    </div>
  ))}
</div>
  )
}

export default rooms