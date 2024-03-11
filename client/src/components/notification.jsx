import React from "react";
import "../css/shareScreen.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaCheckDouble } from "react-icons/fa";
function Notifications({ toggleShowNotification }) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/property/showRequest")
      .then((response) => {
        setAllNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="modal ">
      <div className="overlay">
        <div className="modal-content">
          <div className="flex items-center p-4 border-b border-gray-200 md:justify-between ">
            <p
              style={{
                justifyContent: "center",
                padding: "0px",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => toggleShowNotification()}
            >
              <RxCross2 size={20} />
            </p>
          </div>
          {loading && <p className="text-center">Loading....</p>}
          <div className="p-10 pr-3 pl-3 md:grid md:grid-cols-1 lg:grid-cols-1 xl:grid-col-1 gap-4 bg-gradient-to-r from-amber-100 to-amber-200  ">
            {allNotifications.map((val, ind) => (
              <div key={ind} className="mb-4 bg-white rounded-sm p-3 w-full">
                <ul>
                  <li className="flex justify-between ">
                    <p
                      className="font-two mr-6 flex "
                      state={{ property: val }}
                    >
                      <FaCheckDouble />
                      Property
                    </p>
                    <Link
                      to="/request"
                      state={{
                        property_id: val.PropertyId,
                        user_id: val.UserId,
                      }}
                      className="font-two hover:underline text-amber-600"
                    >
                      Check
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
