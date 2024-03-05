import React from 'react'
import { useState,useEffect } from 'react'
import { data } from '../properties/data'
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import ShareToUser from '../components/shareToUser'




function Home() {

  const location = useLocation()
  const { property } = location.state

  console.log("type  = ",property)

  const [search, setSearch] = useState(property)
  const [properties, setProperties] = useState([])
  const [shareScreen,setShareScreen] = useState(false)
  const [sharedProperty,setSharedProperty] = useState('')

  const toggleShareScreen = ()=>{
    setShareScreen(!shareScreen)
  }

  useEffect(() => {
    axios.get('/property/show')
      .then(response => {
        setProperties(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error:", error);
      });
  },[])

 

  const Share = (e,id)=>{
    e.stopPropagation()
    setSharedProperty(id)
    setShareScreen(!shareScreen)
  }

  return (
    
    <div className=" bg-gradient-to-r from-amber-50 via-purple-200  to-amber-50   px-4 py-8 ">
    
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-4 py-2 "
        />
        <button className="ml-2 bg-amber-500 hover:bg-amber-600 text-white font-two py-2 px-4 rounded-md">Search</button>
      </div>
      <div className='p-5'>
      </div>
    </div>
    <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {properties.map((item,ind) => (
        <div key={ind} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <Link
          key={item.id}
          to="/property"
          state={{ property: item }}
          className="block"
        >
          <div>
            <img
              src={item.property_Image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{item.name}</p>
              <p className="text-gray-600 mb-2">{item.location} ➴</p>
              <p className="text-gray-600 mb-2">Type ➤ {item.type}</p>
              <p className="text-green-600 font-semibold">Rs.{item.price}</p>
             {item.isVerified ? 
             <span class="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Verified</span>
: 
             <span class="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Not Verified</span>
            }
            </div>
          </div>
        </Link>
        <p onClick={(e)=>Share(e,item._id)} style={{backgroundColor: 'red', display: 'flex',justifyContent: 'center',color: 'white',cursor: 'pointer'}}>SHARE</p>
        </div>
      ))}
    </div>
      {shareScreen && <ShareToUser toggleShareScreen={toggleShareScreen} propertyID={sharedProperty}/>}
  </div>
  )
}

export default Home;
