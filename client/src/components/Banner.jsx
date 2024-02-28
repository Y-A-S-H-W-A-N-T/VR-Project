import React from 'react'
import { Link } from "react-router-dom";
import Heroimg from "../assets/heroimg.png"
import logo from '../assets/logo.png'
import { TypeAnimation } from 'react-type-animation';
const Banner = () => {
  return (
    <div>
       <div className="grid   grid-cols-2 gap-4  p-0 m-0 ">
        <div className="p-24 ">
          <h1 className="font-two text-6xl pb-12 text-yellow-950 sm:text-1xl">Welcome to <img src={logo} alt="Logo" className='w-128'/></h1>
           <TypeAnimation
        sequence={[
          `Your Gateway to Virtual Reality Real Estate Exploration.\nImmerse yourself in a world of possibilities. \n   Discover your dream properties in stunning VR and AR experiences. \n Start exploring today! .`,
          1000,
          "",
        ]}
        speed={50}
        className="font-two text-2xl text-amber-500 pt-12   "
      
        repeat={Infinity}
      />
        </div>
        <div>
        <img src={Heroimg} alt="Logo" className=' h-auto max-w-lg p-0  '/>
        </div>
      </div>

      
    </div>
  )
}

export default Banner
