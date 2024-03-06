import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import ShareToUser from '../components/shareToUser'
import NotVerified from '../components/notVerified'
import { useUser } from '../useContext'
import { useNavigate } from 'react-router-dom';




function Dash() {

  const [search, setSearch] = useState('')
  const [properties, setProperties] = useState([])
  const [shareScreen,setShareScreen] = useState(false)
  const [sharedProperty,setSharedProperty] = useState('')
  const [isAdmin,setAdmin] = useState(false)  /// for Admin to share properties
  const [showUpload,setShowUpload] = useState(false)
  const { userId } = useUser()
  const navigate = useNavigate()

  if (!userId) {
    navigate('/login');
    return; 
  }else{

    useEffect(() => {
      console.log("CAME : ",userId)
      if (userId==null) {
        navigate('/login');
        return; 
      }
      isAdmin?
      axios.get('/property/show')
      .then(response => {
        const verified = response.data.filter(property => property.isVerified);
        setProperties(verified)
        console.log("Mera wala : ",verified)
      })
      .catch(error => {
        navigate('/login')
      })
      :
      axios.get(`/user/showCustomProperty/${userId}`)
        .then(response => {
            console.log("Response:", response.data)
            setProperties(response.data)
        })
        .catch(error => {
          console.error("Error:", error)
          navigate('/login')
        })
    }, [userId])
  }

  const toggleShareScreen = ()=>{
    setShareScreen(!shareScreen)
  }

  const toggleShowUpload = ()=>{
    setShowUpload(!showUpload)
  }

  console.log("Ye properties ayi hai : ",properties)


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
      {isAdmin && <div>
            <p onClick={()=>setShowUpload(!showUpload)} style={{cursor: 'pointer'}}>Not verified Properties</p>
      </div>}
      {showUpload && <NotVerified toggleShowUpload={toggleShowUpload}/>}
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
              <p className="text-green-600 font-semibold">{item.price} ₨</p>
            </div>
          </div>
        </Link>
        {isAdmin && <p onClick={(e)=>Share(e,item._id)} style={{backgroundColor: 'red', display: 'flex',justifyContent: 'center',color: 'white',cursor: 'pointer'}}>SHARE</p>}
        </div>
      ))}
    </div>
      {shareScreen && <ShareToUser toggleShareScreen={toggleShareScreen} propertyID={sharedProperty}/>}
  </div>
  )
}

export default Dash;
