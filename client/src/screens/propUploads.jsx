import React, { useState } from 'react';
import axios from "axios";

export const PropUpload = () => {
    const [propName, setPropName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null); 
    const [Type, setType] = useState(""); 

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
        });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
        console.log("Selected file:", e.target.files[0])
    };

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
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
