import React from "react";
import "../css/shareScreen.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  FaTimesCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
function EditProperty({ ToggleEdit, property }) {
  const [propName, setPropName] = useState(property.name);
  const [location, setLocation] = useState(property.location);
  const [price, setPrice] = useState(property.price);
  const [image, setImage] = useState(property.property_Image);
  const [Type, setType] = useState(property.type);
  const [rooms, setRooms] = useState(property.room_info.room_images);
  const [room_name, setRoom_name] = useState(property.room_info.room_names);
  const [Loading, setLoading] = useState(false)
  const [description,setDescription] = useState(property.description)
  const [proof,setProof] = useState(property.property_Proof)

  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log(
      "PROPERTY NAME - ",
      propName,
      "\nROOMS NAME - ",
      room_name,
      "\nROOMS IMAGES - ",
      rooms,
      "\nPROPERTY TYPE - ",
      Type,
      "\nPROPERTY IMAGE - ",
      image,
      "\nPROPERTY PRICE - ",
      price,
      "\nPROPERTY LOCATION - ",
      location,
      "\n ID  = ",
      property._id
    );
    const DATA = {
      id: property._id,
      name: propName,
      type: Type,
      property_Image: image,
      property_Proof: proof,
      price: price,
      location: location,
      room_info: {
        room_images: rooms,
        room_names: room_name,
      },
    };
    await axios
      .post("/property/updateProperty", DATA)
      .then((response) => {
        if (response.status === 200) {
          console.log("Updated Property");
        } else {
          console.log("Update Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate(-1);
  };

  const handleFileChange = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6",
        formData
      )
      .then((res) => {
        setImage(res.data.data.url);
        setLoading(false);
      });
  };

  const [roomName, setRoomName] = useState();
  const [roomImage, setRoomImage] = useState();

  const uploadImage = (e) => {
    setRoomImage(e.target.files[0]);
  }

  const uploadProof = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6",
        formData
      )
      .then((res) => {
        console.log(res.data.data.url)
        setProof(res.data.data.url);
        setLoading(false);
      });
  };

  const getImage_URL = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6",
        formData
      )
      .then((res) => {
        setRooms((prev) => [...prev, res.data.data.url]);
        setRoom_name((prev) => [...prev, roomName]);
        setLoading(false);
        console.log(" - ", room_name);
        console.log(" - ", rooms);
      });
  };

  const ADD = async (e) => {
    e.preventDefault();
    setLoading(true);
    getImage_URL(roomImage);
    setRoomName("");
  };

  const popProperty = (name, link) => {
    setRooms((val) => val.filter((item) => item !== link));
    setRoom_name((val) => val.filter((item) => item !== name));
  };

  return (
    <div className="modal-edit">
      <div className="overlay-edit w-screen">
        <div className="flex">
          <p
            style={{
              justifyContent: "center",
              padding: "0px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={() => ToggleEdit()}
          >
            <RxCross2 size={36} className="m-2 lg:m-9 md:m-6"/>
          </p>
        </div>
        <div className="test">

          
        <div className="max-w-4xl mx-auto px-4 py-5 font-two ">
            <div>
              <label className="block mb-2 mt-7">Property Name</label>
              <input
                value={propName}
                type="text"
                onChange={(e) => setPropName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <label className="block mb-2">Location</label>
              <input
                value={location}
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <label className="block mb-2">Price</label>
              <input
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={description}
                placeholder="dimensions, landmark etc"
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <label className="block mb-2">Type</label>
              <select
                id="type"
                value={Type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full text-gray-300"
              >
                <option value="">Select Type</option>
                <option value="Rent">Rents</option>
                <option value="Property">Property</option>
                <option value="Land">Land</option>
              </select>
              <label className="block mb-2">Property Proof</label>
              <input
                type="file"
                onChange={uploadProof}
                className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-amber-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              {proof && (
                <img
                  src={proof}
                  alt="property Proof"
                  className="mb-2"
                  height={200}
                  width={200}
                />
              )}
              <label className="block mb-2">Image</label>
              <input type="file" onChange={handleFileChange} className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-amber-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" multiple/>
              {image && (
                <img
                  src={image}
                  alt="property image"
                  className="mb-2"
                  height={200}
                  width={200}
                />
              )}
              <h1 className="mb-2 mt-2">For Rooms</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-thin">
              <input
                placeholder="Add Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="border border-gray-300 rounded-md p-1  w-70% font-thin"
              />
              <input
                type="file"
                onChange={(e) => uploadImage(e)}
                className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-amber-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"multiple
              />
              {Loading && <p>LOADING.....</p>}
              <button
            onClick={(e) => ADD(e)}
            className="bg-amber-900 text-white px-4 py-2 rounded-md mr-4  hover:bg-amber-500 w-full "
          >
            Add Room
          </button>
              {room_name.map((item, index) => (
                <div key={index} className="flex items-center mt-4">
                  <button className="bg-gray-200 px-4 py-2 rounded-md">
                    {item}
                  </button>
                  <img
                    src={rooms[index]}
                    alt="room image"
                    height={50}
                    width={50}
                    className="ml-2"
                  />
                  <p
                    className="ml-4 cursor-pointer"
                    onClick={() => popProperty(item, rooms[index])}
                  >
                    <FaTimesCircle className="text-red-500" />
                  </p>
                </div>
              ))}
              <button
                onClick={onSubmit}
                className="bg-green-500 text-white px-4 py-2 p-5 rounded-md mt-4 w-full"
              >
                
                Submit
              </button>
            </div>
          </div>





</div>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
