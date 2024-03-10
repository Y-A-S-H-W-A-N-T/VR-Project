import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditProperty({ ToggleEdit, property }) {
    const [propName, setPropName] = useState(property.name)
    const [location, setLocation] = useState(property.location)
    const [price, setPrice] = useState(property.price)
    const [image, setImage] = useState(property.property_Image) 
    const [Type, setType] = useState(property.type)
    const [rooms, setRooms] = useState(property.room_info.room_images)
    const [room_name,setRoom_name] =useState(property.room_info.room_names)
    const [Loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmit = async() => {
        console.log(
           "PROPERTY NAME - ",propName,
            "\nROOMS NAME - ",room_name,
            "\nROOMS IMAGES - ",rooms,
            "\nPROPERTY TYPE - ",Type,
            "\nPROPERTY IMAGE - ",image,
            "\nPROPERTY PRICE - ",price,
            "\nPROPERTY LOCATION - ",location,
            "\n ID  = ",property._id
        )
        const DATA = {
            id: property._id,
            name: propName,
            type: Type,
            property_Image: image,
            price: price,
            location: location,
            room_info: {
                room_images: rooms,
                room_names: room_name
            }
        }
        await axios.post('/property/updateProperty', DATA)
        .then(response => {
            if (response.status === 200) {
                console.log("Updated Property");
            } else {
                console.log("Update Failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        })
        navigate(-1)
    }

    const handleFileChange = async(e) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6',formData)
        .then((res)=>{
            setImage(res.data.data.url)
            setLoading(false)
        })
    }
    
    const [roomName,setRoomName] = useState()
    const [roomImage,setRoomImage] = useState()

    const uploadImage = (e)=>{
        setRoomImage(e.target.files[0])
    }

    const getImage_URL = async(image)=>{
        const formData = new FormData()
        formData.append('image', image)
        await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6',formData)
        .then((res)=>{
            setRooms((prev)=>[...prev,res.data.data.url])
            setRoom_name((prev)=>[...prev,roomName])
            setLoading(false)
            console.log(" - ",room_name)
            console.log(" - ",rooms)
        })
    }


    const ADD = async(e)=>{
        e.preventDefault()
        setLoading(true)
        getImage_URL(roomImage)     
        setRoomName('')  
    }

    const popProperty = (name,link)=>{
        setRooms(val=> val.filter(item=> item !== link ))
        setRoom_name(val=> val.filter(item=> item !== name ))
    }   

    
      

  return (
    <div className='modal-edit'>
        <div className='overlay-edit'>
                    <div className='flex'>
                        <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>ToggleEdit()}>❌</p>
                    </div>
            <div className='test'>
                <div>
                        <div className="max-w-4xl mx-auto px-4">
                            <label className="block mb-2">Property Name</label>
                            <input value={propName} type="text" onChange={(e) => setPropName(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
                            <label className="block mb-2">Location</label>
                            <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
                            <label className="block mb-2">Price</label>
                            <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
                            <label className="block mb-2">Type</label>
                            <select id="type" value={Type} onChange={(e) => setType(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full">
                                <option value="">Select Type</option>
                                <option value="Rent">Rents</option>
                                <option value="Property">Property</option>
                                <option value="Land">Land</option>
                            </select>
                            <label className="block mb-2">Image</label>
                            <input type="file" onChange={handleFileChange} className="mb-2" />
                            {image && <img src={image} alt="property image" className="mb-2" height={200} width={200} />}
                            <h1 className="mb-2">FOR ROOMS</h1>
                            <input placeholder='ADD ROOM NAME'  value={roomName} onChange={(e)=>setRoomName(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
                            <input type="file" onChange={(e)=>uploadImage(e)} className="mb-2" />
                            {Loading && <>LOADING.....</>}
                            <button onClick={(e)=>ADD(e)} className="bg-blue-500 text-white px-4 py-2 rounded-md">ADD ROOM</button>
                            {room_name.map((item,index)=>(
                                <div style={{margin: '20px',paddin: '10px'}} key={index} className="flex items-center">
                                    <button className="bg-gray-200 px-4 py-2 rounded-md">{item}</button>
                                    <img src={rooms[index]} alt="room image" height={50} width={50} className="ml-2" />
                                    <p className='ml-4' style={{cursor: 'pointer'}} onClick={()=>popProperty(item,rooms[index])}>❌</p>
                                </div>
                            ))}
                        <button onClick={onSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProperty