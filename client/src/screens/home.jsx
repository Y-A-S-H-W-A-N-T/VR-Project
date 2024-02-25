import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


function Home() {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/property/show')
      .then(response => {
        setProperties(response.data); 
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>SEARCH</button>

      <div>
        {properties.map(property => (
          <div key={property._id} style={{ border: '2px black solid', margin: '10px' }}>
            <Link to='/property' state={{ property }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>IMAGE -</h1>
                <img src={`../postimages/${property.image}`} alt={`${property.image}`} height={100} width={400} />
              </div>
              <div>
                <h1>LOCATION: {property.location}</h1>
                <h1>PRICE: {property.price}</h1>
                <h1>NAME: {property.name}</h1>
                <h1>TYPE: {property.type}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
