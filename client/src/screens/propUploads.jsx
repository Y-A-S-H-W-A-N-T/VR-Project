import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Foooter from "../components/Footer";
import { useUser } from '../useContext'
import { useNavigate } from "react-router";

export const PropUpload = () => {
  const [propName, setPropName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [Type, setType] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room_name, setRoom_name] = useState([]);
  const [Loading, setLoading] = useState(false)
  const [description,setDescription] =useState('')
  const { userId } = useUser()
  const navigate = useNavigate()

  useEffect(()=>{
    if(userId==null || userId=='null')
    {
      navigate('/a/login')
      return
    }
  })

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
      location
    );
    const DATA = {
      name: propName,
      type: Type,
      property_Image: image,
      price: price,
      location: location,
      description: description,
      room_info: {
        room_images: rooms,
        room_names: room_name,
      },
    };
    await axios
      .post("/property/register", DATA)
      .then((response) => {
        if (response.status === 200) {
          console.log("Uploaded");
        } else {
          console.log("Upload failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      navigate(-1)
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
    <>
      {" "}
      <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1565964450734-c6b267945d7a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-white bg-blend-multiply">
      <Navbar />

      
      <div className="max-w-4xl mx-auto px-4 py-5 font-two ">
        <label className="block mb-2 mt-7 ">Property Name</label>
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
        <label className="block mb-2">Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-amber-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        {image && (
          <img
            src={image}
            alt="property image"
            className="mb-2"
            height={200}
            width={200}
          />
        )}
        <h1 className="mb-2 mt-2">For rooms</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-thin">
          <input
            placeholder=" add room "
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            className="border border-gray-300 rounded-md p-1  w-70% font-thin"
          />
          <div>
            {" "}
            <input
              type="file"
              onChange={(e) => uploadImage(e)}
              className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-amber-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
              multiple
            />
          </div>

          <button
            onClick={(e) => ADD(e)}
            className="bg-amber-900 text-white px-4 py-2 rounded-md mr-4  hover:bg-amber-500 w-full "
          >
            Add Room
          </button>
        </div>
        <div className="flex justify-between">
          <div className="">
            {Loading && <div>loading...</div>}

            {room_name.map((item, index) => (
              <div
                style={{ margin: "20px", padding: "10px" }}
                key={index}
                className="flex items-center"
              >
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
                  ❌
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="bg-black text-white px-4 py-2 rounded-md mt-4 p-5 w-full "
        >
          Submit
        </button>
      </div>
      <Foooter/>
      </section>
    </>
  );
};

export default PropUpload;
