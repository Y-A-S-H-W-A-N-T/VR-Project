import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Foooter from "../components/Footer";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function Request() {
  const location = useLocation();
  const { user_id, property_id } = location.state;

  const [user, setUser] = useState();
  const [property, setProperty] = useState();

  const navigate = useNavigate();

  console.log(user, property);

  useEffect(() => {
    axios
      .get(`/user/userDetails/${user_id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get(`/property/propertyDetails/${property_id}`)
      .then((res) => {
        console.log(res.data);
        setProperty(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const Accept = async (e, user_id, property_id) => {
    navigate(-1);
    e.preventDefault();
    console.log(property_id, user_id);
    await axios.post("/user/updateProperty", {
      propertyID: property_id,
      userID: user_id,
    });
  };

  return (
    <>
     <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-white bg-blend-multiply">
      <Navbar />

     

      <div className="flex flex-col justify-center items-center mx-auto px-4 min-h-screen font-two">
    <div className="w-full max-w-md p-6 border  ">
        {user === undefined || property === undefined ? (
            <p className="text-center">Loading...</p>
        ) : (
            <div className="grid  gap-8 text-center ">
                <div className="mb-4 grid grid-cols-2">
                <FaUserCheck className="text-amber-500" size={36} />
                    <p className="text-xl font-two">{user.name}</p>
                </div>

                <div className="mb-4 grid grid-cols-2">
                <MdMarkEmailRead className="text-amber-500" size={36} />
                    <p className="text-xl font-two">{user.email}</p>
                </div>

                <div className="mb-4 grid grid-cols-2">
                <FaPhoneAlt className="text-amber-500" size={30} />
                    <p className="text-xl font-two">{user.number}</p>
                </div>
                <div className="mb-4 grid grid-cols-2"><FaBuildingCircleCheck  className="text-amber-500" size={36}/>
                    <p className="text-xl font-two">
                       {" "}
                        <Link to="/property" state={{ property: property }} className="text-blue-500 hover:underline">
                            {property.name}
                        </Link>
                    </p>
                </div>
                <div >
                    <button
                        onClick={(e) => Accept(e, user_id, property_id)}
                        className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        <FaCheckCircle className="mr-2" size={20} />
                        Accept Request
                    </button>
                </div>
            </div>
        )}
    </div>
</div>


      
      <Foooter />
      </section>
    </>
  );
}

export default Request;
