import { useEffect, useState } from "react";
import "../css/shareScreen.css";
import axios from "axios";

function ShareToUser({ toggleShareScreen, propertyID }) {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/user/show")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Send = async (e, id) => {
    e.preventDefault();
    console.log("PROPERTY ID : ", propertyID);
    console.log("USER ID : ", id);
    await axios
      .post("user/updateProperty", { propertyID: propertyID, userID: id })
      .then((res) => {
        if (res.status == 200) {
          console.log("updated");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload(false);
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <div className="flex items-center p-4 border-b border-gray-200 md:justify-between">
            <p
              className="text-gray-600 cursor-pointer"
              onClick={() => toggleShareScreen()}
            >
              ❌
            </p>
          </div>
          <div className="test p-4 pr-3 pl-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Users.map((val) => (
              <div key={val.id} className="bg-gray-100 p-4 pr-6 pl-6 rounded">
                <p className=" font-two">NAME : {val.name}</p>
                <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700">
                  SEND
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareToUser;
