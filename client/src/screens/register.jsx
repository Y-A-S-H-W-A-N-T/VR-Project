import React, { useState } from 'react';
import axios from "axios";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log(
            "NAME - ", name,
            "\nEMAIL - ", email,
            "\nNUMBER - ", number,
            "\nPASSWORD - ", password,
         
        );

        const userData = {
            name: name,
            email: email,
            number: number,
            password: password,
            
        };
        console.log(userData)

        await axios.post('/user/register', userData)
            .then(response => {
                if (response.status === 200) {
                    console.log("User registered successfully");
                } else {
                    console.log("User registration failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

   

   
    return (
        <div>
            <label>Name</label>
            <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            <label>Number</label>
            <input value={number} type="tel" onChange={(e) => setNumber(e.target.value)} />
            <label>Password</label>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            
            <button onClick={onSubmit}>Register</button>
        </div>
    );
};
