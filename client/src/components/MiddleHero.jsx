import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import phone1 from "../assets/phone1.png"
import phone2 from "../assets/phone2.png"
import phone3 from "../assets/phone3.png"
const MiddleHero = () => {
  return (
    <div>
      <div className="flex gap-8 flex-wrap justify-center md:flex-shrink-0 py-10">
        <div className="transform   sm:h-64 sm:w-64 md:w-96 bg-white  transition duration-300 hover:translate-x-4">
          
          <div className="px-6 py-4">
            
            <Link to="/home" state={{ property: "land" }}>
            <img
            className="h-full "
            src={phone1}
            alt="Sunset in the mountains"
          ></img>
            </Link>
          </div>
        </div>
        <div className="transform   sm:h-64 sm:w-64 md:w-96 bg-white  transition duration-300 hover:translate-x-4">
          
          <div className="px-6 py-4">
            
          <Link to="/home" state={{ property: "property" }}>
            <img
            className="h-full "
            src={phone2}
            alt="Sunset in the mountains"
          ></img>
              
            </Link>
          </div>
        </div>
        <div className="transform   sm:h-64 sm:w-64 md:w-96 bg-white  transition duration-300 hover:translate-x-4">
          
          <div className="px-6 py-4">
            
            <Link to="/home" state={{ property: "rent" }}>
            <img
            className="h-full "
            src={phone3}
            alt="Sunset in the mountains"
          ></img>
            </Link>
          </div>
        </div>

        

    
      </div>
    </div>
  );
};

export default MiddleHero;
