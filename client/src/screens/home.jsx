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
    <div>
        <input
          type='text'
          value={search}
          onChange={(res)=>setSearch(res.target.value)}
        />
        <button>SEARCH</button>

        <div>
          {
            properties.map((item,index)=>(
              <Link
      to='/property'
      state={{ property: item }}
      className="block mb-8 w-full max-w-sm mx-auto sm:max-w-none sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <div
        key={item.id}
        className="border border-gray-300 rounded-lg overflow-hidden shadow-lg"
      >
        <img
          src={item.property_Image}
          alt={item.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <p className="text-lg font-two mb-2">{item.name}</p>
          <p className="text-gray-600 mb-2">{item.location}</p>
          <p className="text-gray-600 mb-2">Type ➤ {item.type}</p>
          <p className="text-green-600 font-two">{item.price}</p>
        </div>
      </div>
    </Link>
            ))
          }
        </div>
        <div>
        </div>
    </div>
  )
}

export default Home;
