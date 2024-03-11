import { useState } from "react";
import axios from 'axios';
import { useUser } from '../useContext.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId, setIsAdmin } = useUser();
    const navigate = useNavigate();

    const notify=()=>{
        toast.success("successful", { autoClose: 3000 });
    }


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
      <div>
      <Navbar/>
        <div className="flex flex-col justify-center items-center mx-auto px-4  min-h-screen font-two items-center">
            
            
            <div className="w-full max-w-md p-6 border  h-full bg-gradient-to-l border-amber-900">
                <h1 className="text-center text-3xl font-bold mb-4">Login</h1>
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
                <div className="flex items-center justify-between mt-3 mb-4">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label  className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                <button
                    className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 mb-3 pr-2">
                      Don’t have an account yet? <a href="" className="font-medium text-blue-900 hover:underline dark:text-blue-500">Sign up</a>
                  </p>
            </div>
        </div>
        </div>
    );
};
