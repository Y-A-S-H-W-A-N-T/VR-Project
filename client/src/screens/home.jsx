import React from 'react'
import { useState,useEffect } from 'react'
import { data } from '../properties/data'
import { Link, useLocation } from "react-router-dom"
import axios from "axios"



function Home() {

  const location = useLocation()
  const { property } = location.state

  console.log("type  = ",property)

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
          onChange={(res)=>setSearch(res.target.value)}
        />
        <button>SEARCH</button>
        <div>
          {
            properties.filter((val)=>{
              if(search.toLowerCase()=='')
              {
                return val
              }
              else if(val.location.toLowerCase().includes(search.toLowerCase()))
              {
                return val
              }
              else if(val.type.toLowerCase().includes(search.toLowerCase()))
              {
                return val
              }
            })
            .map((item)=>{
              return(
                <div key={item.id} style={{border: '2px black solid'}}>
                  <Link to='/property' state={{property: item}}>
                    <div style={{display: 'flex'}}>
                      <h1>IMAGE -</h1><img src={`/src/images/${item.image}`} alt='propert image' height={100} width={400}/>
                    </div>
                    <div>
                      <h1>LOCATION : {item.location}</h1>
                      <h1>PRICE : {item.price}</h1>
                      <h1>NAME : {item.name}</h1>
                      <h1>TYPE : {item.type}</h1>
                    </div>
                  </Link>
                </div>
              )
            })

          }
        </div>
    </div>
  )
}

export default Home;
