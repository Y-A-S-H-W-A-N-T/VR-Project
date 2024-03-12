import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../components/navbar.jsx'
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
      <div><Navbar/>
        <div className="flex flex-col justify-center items-center mx-auto px-4 bg-gradient-to-r  min-h-screen font-two items-center">
  <div className="w-full max-w-md p-6 border  h-full bg-gradient-to-l border-amber-900">
  <h1 className="text-center text-3xl font-bold mb-4">Register</h1>
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={name}
      placeholder="Name"
      type="text"
      onChange={(e) => setName(e.target.value)}
    />
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={email}
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={number}
      placeholder="Number"
      type="tel"
      onChange={(e) => setNumber(e.target.value)}
    />
    
    <input
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
      value={password}
      placeholder="Password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
      onClick={onSubmit}
    >Register
    </button>
    
  <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 mb-3 pr-2">
                      Already have an account ? <a href="" className="font-medium text-blue-900 hover:underline dark:text-blue-500">Log In</a>
                  </p>
  </div>
  
  </div>
</div>

    );
};
