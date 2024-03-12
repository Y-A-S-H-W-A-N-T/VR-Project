import { useState } from "react";
import axios from 'axios';
import { useUser } from '../useContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import { toast  } from "react-toastify";
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId, setIsAdmin } = useUser();
    const [loader, setLoader]= useState(false)
    const navigate = useNavigate();

    const showToast = () => {
        toast.success('Successfully logged In!', {
        })
      }
      const failToast = () => {
        toast.error("Error !", {
           
          });
      }

      const passwordToast=()=>{
        toast.warning("Warning Notification !", {
            position: toast.POSITION.TOP_LEFT,
          });
          
      }
      const invalidToast=()=>{
        toast.warning("Warning User Not Found !", {
            position: toast.POSITION.TOP_LEFT,
          });
          
      }

      const handleSubmit = async () => {
        setLoader(true);
        try {
            const response = await axios.post('/user/login', { email, password });
    
            if (response.status === 200 && response.data._id) {
                setUserId(response.data._id);
                setIsAdmin(response.data.isAdmin);
                console.log(response.data.isAdmin);
                console.log("Login successful");
                setLoader(false);
                showToast();
                navigate("/p/userPropertyList");
            } else if (response.status === 404) {
                console.log("User not found");
                invalidToast();
                console.log("Login Failed:", response.data);
                setLoader(false);
            } else if (response.status === 400) {
                console.log("Invalid User");
                failToast();
                console.log("Login Failed:", response.data);
                setLoader(false);
            }
        } catch (error) {
            console.error("Login Error:", error);
            failToast();
            setLoader(false);
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
                {loader ? <h1>loading..</h1>:<button
                    className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
                    onClick={ handleSubmit}
                >
                    Submit
                </button>}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 mb-3 pr-2">
                      Don’t have an account yet? <Link   to="/a/register"className="font-medium text-blue-900 hover:underline dark:text-blue-500">Sign up</Link>
                  </p>
            </div>
        </div>
        </div>
    );
};
