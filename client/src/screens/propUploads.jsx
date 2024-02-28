import React, { useState } from 'react';
import axios from "axios";

export const PropUpload = () => {
    const [propName, setPropName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null) 
    const [Type, setType] = useState("")
    const [Loading,setLoading] = useState(false)

    const [rooms, setRooms] = useState([])
    const [room_name,setRoom_name] =useState([])

    const onSubmit =async() => {
        const formData = new FormData();
        formData.append('propName', propName)
        formData.append('location', location)
        formData.append('price', price)
        formData.append('image', image)
        formData.append('Type', Type)
        await axios.post('/property/register', formData,
            { headers: {"Content-Type": "multipart/form-data"}}
        )
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
        console.log("ROOMS SENT - ",rooms)
        console.log("ROOM NAMES SENT - ",room_name)
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
        console.log("Selected file:", e.target.files[0])
    }
    
    const [roomName,setRoomName] = useState()
    const [roomImage,setRoomImage] = useState()
    const uploadImage = (e)=>{
        setRoomImage(e.target.files[0])
    }


    const ADD = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('image', roomImage)
        await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6',formData)
        .then((res)=>{
            setRooms((prev)=>[...prev,res.data.data.url])
            setRoom_name((prev)=>[...prev,roomName])
            setLoading(false)
            console.log(" - ",room_name)
            console.log(" - ",rooms)
        })
    }


    return (
        <div>
            <label>Property Name</label>
            <input value={propName} type="text" onChange={(e) => setPropName(e.target.value)} />
            <label>Location</label>
            <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} />
            <label>Price</label>
            <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
            <label>Type</label>
            <input value={Type} type="text" onChange={(e) => setType(e.target.value)} /> 
            <label>Image</label>
            <input type="file" onChange={handleFileChange} />
            <br/>
            <h1>FOR ROOMS</h1>
            <input placeholder='ADD ROOM NAME' onChange={(e)=>setRoomName(e.target.value)}></input>
            <input type="file" onChange={(e)=>uploadImage(e)}/>
            {Loading && <>LOADING.....</>}
            <button onClick={(e)=>ADD(e)}>ADD ROOM</button>
            {
                room_name.map((item)=>(
                    <div style={{margin: '20px',paddin: '10px'}}>
                        <button>{item}</button>
                    </div>
                ))
            }
            <br/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
