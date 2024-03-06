import { useState } from "react";
import axios from 'axios';
import { useUser } from '../useContext.jsx';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId, setIsAdmin } = useUser();
    const navigate = useNavigate();

    const handleSubmit = () => {
        try {
            axios.post('/user/login', { email, password })
                .then(response => {
                    if (response.status==200) {
                        setUserId(response.data._id);
                        setIsAdmin(response.data.isAdmin);
                        console.log(response.data.isAdmin)
                        console.log("Login successful");
                        navigate("/p/userPropertyList"); 
                    } else {
                        console.log("Login Failed:", response.data.message);
                    }
                })
                .catch(error => {
                    console.error("Login Error:", error);
                });
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className="flex flex-col justify-center items-center mx-auto px-4 bg-gradient-to-r from-white to-amber-100 min-h-screen font-two items-center">
            <div className="w-full max-w-md p-6">
                <h1 className="text-center text-3xl text-amber-400 mb-4">Login</h1>
                <input
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
