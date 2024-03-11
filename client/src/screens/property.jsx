import React, { useEffect, useId, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "../css/home.css"
import Rooms from '../components/rooms'
import { MdLocationOn } from 'react-icons/md';
import { MdBusiness } from 'react-icons/md';
import { MdPriceCheck } from 'react-icons/md';
import Maps from '../components/Maps';
import Footer2 from '../components/Footer2';
import PayButton from '../components/PayButton'
import { useUser } from '../useContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import EditProperty from '../components/editProperty'


function Property() {

  const location = useLocation()
  const data = location.state

  const navigate = useNavigate();

  const [showRooms,setShowRooms] = useState(false)
  const { userId, isAdmin } = useUser()
  const [user,setUser] = useState()
  const [edit,setEdit] = useState(false)


  const DeleteProperty = async()=>{
    await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be reversed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.post('/property/deleteProperty',{ id: data.property._id})
        .then((res)=>{
          res.status==200?
            (
              Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success"
              })
            ) 
          :
            Swal.fire({
              title: "Error!",
              text: res.data.message,
              icon: "error"
            })
            navigate(-1)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    })    
  }

  const ToggleEdit = ()=>{
    setEdit(!edit)
  }
  const requestProperty = async()=>{

    await axios.post('/property/request',{
      Property_id: data.property._id,
      User_id: userId,
<<<<<<< HEAD
  
=======
>>>>>>> 190126cb59cd9cd5cb3b5b57eae9cf67a5cfdd1c
    })
    .then((res)=>{
      if(res.status==200){
        console.log(res.data.message)
      }else{
        console.log(res.data.message)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

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
          {/* <button className="bg-green-500 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded">Book</button> */}
        </p>
        {isAdmin === 'false' || isAdmin === false ? <>{userId && <PayButton />}</> : <></> }
        
        {isAdmin === 'false' || isAdmin === false?
          <>
            <p onClick={requestProperty} style={{cursor: 'pointer'}}>Request Property 🙏</p>
          </>
          :
          <></>
        }
        <button onClick={() => setShowRooms(!showRooms)} className="text-amber-500 hover:text-amber-700 focus:outline-none">
          {showRooms ? '❌ Close Rooms' : '🔍 Show Rooms'}
        </button>
        {isAdmin === 'true' || isAdmin == true ?
          <>
            <p onClick={ToggleEdit} style={{cursor: 'pointer'}}>📝</p>
            <p onClick={DeleteProperty} style={{cursor: 'pointer'}}>🗑️</p>
          </>
          :
          <></>
        }
        {edit && <EditProperty ToggleEdit={ToggleEdit} property={data.property}/>}        
      </div>
    </div>
  
    {showRooms && <Rooms data={data} />}
    <div className="md:hidden">
      <p className="text-gray-600 mt-2">AR functionality for mobile</p>
    </div>
  </div>
<Footer2/>
  </>
  )
}

export default Property