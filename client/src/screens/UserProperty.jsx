import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../useContext";
import { Link } from "react-router-dom";
import ShareToUser from "../components/shareToUser";
import { useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import NotVerified from "../components/notVerified"
import Notifications from "../components/notification"
import { FaCheck } from "react-icons/fa";
import { FcCameraAddon } from "react-icons/fc";
import { MdLocationOn } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { MdPriceCheck } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { CiLogout } from "react-icons/ci";import { CiUser } from "react-icons/ci";
import { FaBuildingCircleXmark } from "react-icons/fa6";
import Assets from '../components/assets'
import Navbar from "../components/navbar";
import Footer from "../components/Footer"

function UserPropertyList() {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [shareScreen, setShareScreen] = useState(false);
  const [sharedProperty, setSharedProperty] = useState("");
  const { userId, isAdmin } = useUser();
  const [showUpload, setShowUpload] = useState(false)
  const [notification,setNotification] = useState(false)
  const [assets,setAssets] = useState()
  const navigate = useNavigate();

  console.log(isAdmin)
  console.log(properties)

  useEffect(() => {
    if (!userId) {
      navigate("/a/login");
      return;
    }
    console.log("CAME : ", userId);
    if (isAdmin === true || isAdmin === "true") {
      console.log("Admin ");
      axios
        .get("/property/show")
        .then((response) => {
          const verified = response.data.filter(
            (property) => property.isVerified
          );
          setProperties(verified);
        })
        .catch((error) => {
          console.log(error);
          navigate("/a/login");
        });
    } else if (isAdmin === false || isAdmin === "false") {
      console.log("User ke liye");
      axios.post('/user/showCustomProperty', { userId: userId })
        .then((response) => {
          console.log("Response:", response.data);
          setProperties(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/a/login");
        });
    } else {
      console.log(isAdmin);
    }
  }, []);

  const toggleShareScreen = () => {
    setShareScreen(!shareScreen);
  }
  const toggleShowUpload = () => {
    setShowUpload(!showUpload);
  }
  const toggleShowNotification = () => {
    setNotification(!notification);
  }
  const toggleAssets = () => {
    setAssets(!assets);
  }

  const Share = (e, id) => {
    e.stopPropagation();
    setSharedProperty(id);
    setShareScreen(!shareScreen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload();
  };
 

  return (
    <div>
    <Navbar/>
      <div className=" px-4 ">
      <div className="">
      <div className="flex justify-around lg:justify-between items-center">


      <div className="lg:justify-normal flex mr-9 pr-5">
      <Link to='/profile'>
        <CiUser size={40}  className="mr-3"/>
      </Link>
     
      
      
      <div className="hidden md:block">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className=" bg-slate-200 border border-slate-900 hover:bg-slate-600 rounded-md px-4 py-2 "
        />
        <button className="ml-2 bg-amber-700 hover:bg-amber-600 text-white py-2 px-4 rounded-md font-thin ">
          Search
        </button>
      </div></div>
      
        
      
      <div className="flex justify-center flex-row">
        {isAdmin === true || isAdmin === "true" ? (
          <div>
            <p
              onClick={() => setShowUpload(!showUpload)}
              className="bg-red-100 hover:bg-red-600 border-2 border-red-800 rounded-s-full hover:text-white cursor-pointer text-red-900 font-thin p-2 mt-2 text-center flex  "
            >
              Unverified<FaBuildingCircleXmark  className="ml-2 text-red-500 mt-1"/>
            </p>
          </div>
        ) : (
          <></>
        )}
        {showUpload && <NotVerified toggleShowUpload={toggleShowUpload} />}
        <div>
          {isAdmin === true || isAdmin === "true" ? (
            <div onClick={() => setNotification(!notification)} >
            
              <p className="m-1 text-amber-500 rounded-full p-2 flex"><MdNotificationsActive size={36} />{properties.length}</p>
             
            </div>
          ) : (
            <></>
          )}
          {notification && <Notifications toggleShowNotification={toggleShowNotification} />}
       
        </div>
        <div>
          {isAdmin === true || isAdmin === "true" ? (
            <div onClick={() => setAssets(!assets)} >
            
              <p className="m-1 text-amber-500 rounded-full p-2 flex"><FcCameraAddon size={35} /></p>
             
            </div>
          ) : (
            <></>
          )}
          {assets && <Assets toggleAssets={toggleAssets} />}
       
        </div>
        <CiLogout onClick={handleLogOut} size={38}  className="mr-5 ml-2 mt-3 "/>
      </div>
    </div>
          <div className="p-5"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {properties.length > 0 ? (
            properties.map((item, ind) => (
              <div
                key={ind}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-lg"
              >
                 <Link
                key={item.id}
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
                    <p className="text-amber-900 mb-2 flex m-1"><MdBusiness  className="mr-3  text-amber-500 " />{item.type}</p>

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
                {isAdmin === true || isAdmin === "true" ? (
                  /* button */
                  <div className="p-6 pt-3">
                    <button
                      className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={(e) => Share(e, item._id)}>
                      Share
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
        {shareScreen && (
          <ShareToUser
            toggleShareScreen={toggleShareScreen}
            propertyID={sharedProperty}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default UserPropertyList;