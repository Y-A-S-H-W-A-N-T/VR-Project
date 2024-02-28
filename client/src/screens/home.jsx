import React from 'react'
import { useState,useEffect } from 'react'
import { data } from '../properties/data'
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import "../css/home.css"


function Home() {

  const location = useLocation()
  const { property } = location.state

  console.log("type  = ",property)

  const [search, setSearch] = useState(property);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/property/show')
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [])

  console.log(properties)



  return (
    <div>
        <input
          type='text'
          value={search}
          onChange={(res)=>setSearch(res.target.value)}
        />
        <button>SEARCH</button>

        <div>
          {
            properties.map((item)=>(
              <Link to='/property' state={{property: item}}>
                <div key={item.id} style={{border: "5px black solid"}}>
                <p>{item.name}</p>
                <p>{item.location}</p>
                <p>{item.type}</p>
                <p>{item.price}</p>
                <img src={item.property_Image}/>
              </div>
              </Link>
            ))
          }
        </div>
        <div>
        </div>
    </div>
  )
}

export default Home;
