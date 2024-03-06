import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../useContext'
import { Link } from 'react-router-dom';
import ShareToUser from '../components/shareToUser';
import { useNavigate } from 'react-router-dom';

function UserPropertyList() {
  const [search, setSearch] = useState('')
  const [properties, setProperties] = useState([])
  const [shareScreen, setShareScreen] = useState(false)
  const [sharedProperty, setSharedProperty] = useState('')
  const navigate = useNavigate();
  const { userId } = useUser();
if (!userId) {
    navigate('/login');
    return; 
  }else{

    useEffect(() => {
      if (userId==null) {
        navigate('/login');
        return; 
      }
  
      axios.get(`/user/showCustomProperty/${userId}`)
        .then(response => {
          if (response.data.status==200) {
            console.log("Response:", response.data);
            setProperties(response.data);
          } else {
            navigate('/login'); 
          }
        })
        .catch(error => {
          console.error("Error:", error);
          navigate('/login'); 
        });
    }, [userId, navigate])
  

  }
  
  const toggleShareScreen = () => {
    setShareScreen(!shareScreen);
  };

  const Share = (e, id) => {
    e.stopPropagation();
    setSharedProperty(id);
    setShareScreen(!shareScreen);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 via-purple-200 to-amber-50 px-4 py-8">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <button className="ml-2 bg-amber-500 hover:bg-amber-600 text-white font-two py-2 px-4 rounded-md">Search</button>
        </div>
        <div className="p-5"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {properties.map((item, ind) => (
          <div key={ind} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
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
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2">{item.name}</p>
                  <p className="text-gray-600 mb-2">{item.location} ➴</p>
                  <p className="text-gray-600 mb-2">Type ➤ {item.type}</p>
                  <p className="text-green-600 font-semibold">{item.price} ₨</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {shareScreen && <ShareToUser toggleShareScreen={toggleShareScreen} propertyID={sharedProperty} />}
    </div>
  );
}

export default UserPropertyList;