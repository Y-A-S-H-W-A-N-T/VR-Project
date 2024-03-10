import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../useContext";
import { Link } from "react-router-dom";
import ShareToUser from "../components/shareToUser";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NotVerified from "../components/notVerified";

function UserPropertyList() {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [shareScreen, setShareScreen] = useState(false);
  const [sharedProperty, setSharedProperty] = useState("");
  const { userId, isAdmin } = useUser();
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  console.log(isAdmin);

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
      axios
        .post(`/user/showCustomProperty`, { userId: userId })
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
  };
  const toggleShowUpload = () => {
    setShowUpload(!showUpload);
  };

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
  const handleProfile = () => {
    console.log("hello");
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-amber-50 to-white px-4 py-8">
        <div onClick={handleProfile}>
          <FaUserCircle
            size={48}
            className="text-gray-600"
            onclick={handleProfile}
          />
        </div>
        <div className="flex justify-center flex-row">
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <button className="ml-2 bg-amber-500 hover:bg-amber-600 text-white font-two py-2 px-4 rounded-md text-white font-two pr-6">
              Search
            </button>

            {isAdmin === true || isAdmin === "true" ? (
              <div>
                <p
                  onClick={() => setShowUpload(!showUpload)}
                  className="bg-amber-900 p-4 m-4 rounded-full cursor-pointer text-white font-two pr-6 text-center "
                >
                  Not verified Properties
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          {showUpload && <NotVerified toggleShowUpload={toggleShowUpload} />}
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
                  to="/property"
                  state={{ property: item }}
                  className="block"
                >
                  <div>
                    <img
                      src={item.property_Image}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                    />
                    <ul className="p-4 ">
                      <li className="text-lg font-semibold mb-2">{item.name}</li>
                      <li className="text-gray-600 mb-2">{item.location}</li>
                      <li className="text-gray-600 mb-2">{item.type}</li>
                      <li className="text-green-600 font-semibold">
                        {item.price} ₨
                      </li>
                    </ul>
                  </div>
                </Link>
                {isAdmin === true || isAdmin === "true" ? (
                  <p
                    onClick={(e) => Share(e, item._id)}
                    className="p-3 bg-amber-400 text-center font-two"
                  >
                    SHARE
                  </p>
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
      <button
        onClick={handleLogOut}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default UserPropertyList;
