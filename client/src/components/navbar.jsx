import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
const Navbar = () => {
  
  const [nav, setNav] = useState(false);

 
  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Home', route:'/' },
    { id: 2, text: 'Account', route:'/p/userPropertyList'},
    { id: 3, text: 'Register',route:'/a/register' },
    { id: 4, text: 'Login',route:'/a/login' },
    { id: 5, text: 'Sell',route:'/propUpload' },
  ];

  return (
    <div>
    <div className='font-two flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <img src={logo} alt="Logo" className='w-32'/>
      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <Link to={item.route}>
          <li
            key={item.id}
            className="p-4 text-black block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
          >
            {item.text}
          </li></Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose color='black' size={30} /> : <AiOutlineMenu color='black' size={30} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full   bg-[#ffffff] text-black ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <img src={logo} alt="Logo" className='w-16'/>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <Link to={item.route}>
            <li
              key={item.id}
              className='p-4   hover:bg-[#CDCDCD] duration-300 hover:text-white cursor-pointer '
            >
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div></div>
  );
};

export default Navbar;