import React, { useState } from 'react';
import axios from "axios";

export const PropUpload = () => {
    const [propName, setPropName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null) 
    const [Type, setType] = useState("")
    const [rooms, setRooms] = useState([])
    const [room_name,setRoom_name] =useState([])
    const [Loading,setLoading] = useState(false)

    const onSubmit =async() => {
        console.log(
           "PROPERTY NAME - ",propName,
            "\nROOMS NAME - ",room_name,
            "\nROOMS IMAGES - ",rooms,
            "\nPROPERTY TYPE - ",Type,
            "\nPROPERTY IMAGE - ",image,
            "\nPROPERTY PRICE - ",price,
            "\nPROPERTY LOCATION - ",location,

        )
        const DATA = {
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
        await axios.post('/property/register', DATA)
        .then(response => {
            if (response.status === 200) {
                console.log("Uploaded");
            } else {
                console.log("Upload failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        })
    };

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
    }
    //////////////////////////////////////////////// SHOW IMAGE PREVIEW

    return (
        <div>
            <label>Property Name</label>
            <input value={propName} type="text" onChange={(e) => setPropName(e.target.value)} />
            <label>Location</label>
            <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} />
            <label>Price</label>
            <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
            <label>Type</label>
            <select id="type" value={Type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="Rent">Rents</option>
                    <option value="Property">Property</option>
                    <option value="Land">Land</option>
            </select>
            <label>Image</label>
            <input type="file" onChange={handleFileChange} />
            <br/>
            {image && <img src={image} alt="property image" height={200} width={200}/>}
            <h1>FOR ROOMS</h1>
            <input placeholder='ADD ROOM NAME' onChange={(e)=>setRoomName(e.target.value)}></input>
            <input type="file" onChange={(e)=>uploadImage(e)}/>
            {Loading && <>LOADING.....</>}
            <button onClick={(e)=>ADD(e)}>ADD ROOM</button>
            {
                room_name.map((item,index)=>(
                    <div style={{margin: '20px',paddin: '10px'}} key={index}>
                        <button>{item}</button>
                        <img src={rooms[index]} height={50} width={50}/>
                    </div>
                ))
            }
            <br/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
