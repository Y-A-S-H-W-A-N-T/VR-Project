import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { MdPriceCheck } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Navbar from "../components/navbar";
import Foooter from "../components/Footer";

function Home() {
  const [search, setSearch] = useState();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/property/show")
      .then((response) => {
        var verified = response.data.filter(val => val.isVerified == true);
        setProperties(verified)
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      
  }, [])

  return (
    <>
      <Navbar />
      <div className="     px-4 py-8 ">
        <div className="flex justify-between items-center">
        <div className="mb-4 flex flex-wrap items-center">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
    className="border border-gray-900 bg-slate-200 rounded-md px-3 py-2 flex-grow"
  />
  <button className="ml-2 bg-amber-700 hover:bg-amber-600 text-white py-2 px-4 rounded-md">
    Search
  </button>
</div>

          
          <div className="p-5"></div>
        </div>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {properties.filter((val)=> search? val.name.toLowerCase().includes(search.toLowerCase()) : val)
            .map((item, ind) => (
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
                        <p className="text-lg font-bold mb-2 ">
                          {item.name}
                        </p>
                      </div>
                      {item.isVerified ? (
                        <span className="inline-block px-2 py-1 text-xs font-mono text-green-800 bg-green-100 rounded-full">Verified</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-mono text-red-800 bg-red-100 rounded-full">Not Verified</span>
                      )}
                      <p className="text-amber-900 mb-2 font-mono flex m-1">
                        <MdLocationOn className=" mr-3 text-amber-500" />
                        {item.location}{" "}
                      </p>
                      <p className="text-amber-900 font-mono mb-2 flex m-1">
                        <MdBusiness className="mr-3  text-amber-500 " />
                        {item.type}
                      </p>

                      <p className="text-green-600 font-mono flex">
                        <MdPriceCheck className="mr-3 ml-1 text-amber-500" />
                        {item.price}
                      </p>
                      <p className="block font-mono text-base antialiased font-light leading-relaxed text-gray-400 pr-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Foooter />
    </>
  );
}

export default Home;
