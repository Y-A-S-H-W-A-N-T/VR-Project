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
        <div className="flex flex-col justify-center items-center mx-auto px-4 bg-gradient-to-r from-white to-amber-100 min-h-screen font-two items-center">
  <div className="w-full max-w-md p-6">
    <label className="text-gray-600">Name</label>
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={name}
      type="text"
      onChange={(e) => setName(e.target.value)}
    />
    <label className="text-gray-600">Email</label>
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={email}
      type="email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <label className="text-gray-600">Number</label>
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={number}
      type="tel"
      onChange={(e) => setNumber(e.target.value)}
    />
    <label className="text-gray-600">Password</label>
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={password}
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
      onClick={onSubmit}
    >
      Register
    </button>
  </div>
</div>

    );
};
