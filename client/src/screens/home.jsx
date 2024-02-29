import React from 'react'
import { useState,useEffect } from 'react'
import { data } from '../properties/data'
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import "../css/home.css"


function Home() {

  const location = useLocation()
  const { property } = location.state

  console.log("type  = ",property)

  const [search, setSearch] = useState(property);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/property/show')
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [])

  console.log(properties)



  return (
    <div className="container mx-auto px-4 py-8 ">
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 rounded-md px-4 py-2 "
      />
      <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Search</button>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {properties.map((item) => (
        <Link
          key={item.id}
          to="/property"
          state={{ property: item }}
          className="block"
        >
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.property_Image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{item.name}</p>
              <p className="text-gray-600 mb-2">{item.location}</p>
              <p className="text-gray-600 mb-2">Type ➤ {item.type}</p>
              <p className="text-green-600 font-semibold">{item.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  )
}

export default Home;
