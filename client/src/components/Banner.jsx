import React from 'react'
// import { Link } from "react-router-dom";
import Heroimg from "../assets/heroimg.png"
import logo from '../assets/logo.png'

import { TypeAnimation } from 'react-type-animation';
import SearchBar from './Searchcomp';
const Banner = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:flex-wrap justify-center items-center md:justify-between md:items-start py-10 pl-9 pr-4">
  {/* First div for text content */}
  <div className="text-center md:text-left md:w-1/2">
    <h1 className="font-bold text-6xl pb-6 text-yellow-950 sm:text-3xl ">Welcome to <img src={logo} alt="Logo" className='inline-block w-16 md:w-auto '/></h1>
    {/* TypeAnimation component for animating text */}
    <TypeAnimation
      sequence={[
        `Sell    Buy    Rent`,
        1000,
        "",
      ]}
      speed={45}
      className="font-two text-4xl text-amber-400 pt-6"
      repeat={Infinity}
    />
    {/* SearchBar component */}
    <SearchBar />
  </div>
  {/* Second div for an image */}
  <div className='w-full md:w-1/3 '>
    <img src={Heroimg} alt="Logo" className='h-auto max-w-full'/>
  </div>
</div>
</div>
    
  )
}

export default Banner
