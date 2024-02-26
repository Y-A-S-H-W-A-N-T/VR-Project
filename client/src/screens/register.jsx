import React, { useState } from 'react';
import axios from "axios";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null); 

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('number', number);
        formData.append('image', image);
        console.log(formData)
        axios.post('/user/register', formData)
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
        console.log("Selected file:", e.target.files[0]);
    };
    return (
        <div>
            <label>Name</label>
            <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            <label>Number</label>
            <input value={number} type="number" onChange={(e) => setNumber(e.target.value)} />
            <label>Password</label>
            <input value={password} type="text" onChange={(e) => setPassword(e.target.value)} />
            <input type="file" onChange={handleFileChange} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
