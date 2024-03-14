import React, { useState, useEffect } from 'react';
import { useUser } from '../useContext.jsx';
import axios from 'axios';
import Navbar from './navbar.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { FaUserCheck, FaCheck, FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead, MdLocationOn, MdBusiness, MdPriceCheck } from "react-icons/md";
import { ImCross } from "react-icons/im"; 

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [propDetails, setPropDetails] = useState([]); 
    const { userId } = useUser();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('/user/userData', { userId });
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    console.log("No response for user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchUserProperties = async () => {
            try {
                const response = await axios.post('/property/showSellerProperty', { userId });
                if (response.status === 200) {
                    console.log(response.data)
                    setPropDetails(response.data);
                } else {
                    console.log("No response for user properties");
                }
            } catch (error) {
                console.error("Error fetching user properties:", error);
            }
        };

        fetchUserData();
        fetchUserProperties();
    }, [userId]); 

    return (
        <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-white bg-blend-multiply">
            <Navbar />
            <div className='flex flex-col justify-center items-center mx-auto px-4 min-h-screen font-two '>
                <div className='w-full max-w-md p-6 border text-center flex flex-col justify-between'>
                    {userData === null ? <div>Loading...</div> :
                        <div className="grid gap-8 text-center">
                       <div>Personal Details</div>

                            <div className="mb-4 grid grid-cols-2">
                                <FaUserCheck className="text-amber-500" size={36} />
                                <p className="text-xl font-two">{userData.name}</p>
                            </div>
                            <div className="mb-4 grid grid-cols-2">
                                <MdMarkEmailRead className="text-amber-500" size={36} />
                                <p className="text-xl font-two">{userData.email}</p>
                            </div>
                            <div className="mb-4 grid grid-cols-2">
                                <FaPhoneAlt className="text-amber-500" size={30} />
                                <p className="text-xl font-two">{userData.number}</p>
                            
                            
                            </div>

                            <h1>Your Property:</h1>
                                {propDetails=='' ?<div><h1 className='font-bold py-4 px-8'>No properties uploaded</h1><Link to='/propUpload' className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded"><button>Upload Your Property</button></Link></div>: propDetails
                                    .map(item => (
                                        <div
                                            key={item._id}
                                            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg"
                                        >
                                            <Link
                                                key={item._id}
                                                to="/property"
                                                state={{ property: item }}
                                                className="block"
                                            >
                                                <div className="">
                                                    <img
                                                        src={item.property_Image}
                                                        alt={item.name}
                                                        className="w-full h-56 object-cover"
                                                    />
                                                    <div className="p-4 pb-5">
                                                        <div className="flex justify-between text-justify">
                                                            <p className="text-lg font-semibold mb-2 ">{item.name}</p>
                                                            {item.isVerified ? (
                                                                <span className="inline-block px-5 py-2 m-2 text-xs font-semibold text-green-100 bg-green-500 rounded-full flex ">
                                                                    <FaCheck className="mr-1"/> Verified
                                                                </span>
                                                            ) : (
                                                                <span className="inline-block px-5 py-2 m-2 text-xs font-semibold text-red-800 bg-red-100 rounded-full flex">
                                                                    <ImCross  className="mr-1"/>
                                                                    Not Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-amber-900 mb-2 flex m-1">
                                                            <MdLocationOn className=" mr-3 text-amber-500" />
                                                            {item.location}{" "}
                                                        </p>
                                                        <p className="text-amber-900 mb-2 flex m-1">
                                                            <MdBusiness  className="mr-3  text-amber-500 " />
                                                            {item.type}
                                                        </p>
                                                        <p className="text-green-600 font-semibold flex">
                                                            <MdPriceCheck className="mr-3 ml-1 text-amber-500" />
                                                            {item.price}
                                                        </p>
                                                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-400 pr-5">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Profile;
