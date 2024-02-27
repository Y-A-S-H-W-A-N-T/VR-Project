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
              else if(val.type.toLowerCase()==property)
              {
                return val
              }
            })
            .map((item)=>{
              return(
                <div key={item.id} className='Property-Box' >
                  <Link to='/property' state={{property: item}}>
                    <div style={{display: 'flex'}}>
                      {item.Room1=='NoAvail.jpg'?<></>:<><img src={`http://localhost:3000/uploads/${item.Room1}`}  height={100} width={400}/></>}
                      {item.Room2=='NoAvail.jpg'?<></>:<><img src={`http://localhost:3000/uploads/${item.Room2}`}  height={100} width={400}/></>}
                      {item.Room3=='NoAvail.jpg'?<></>:<><img src={`http://localhost:3000/uploads/${item.Room3}`}  height={100} width={400}/></>}
                      {item.Room4=='NoAvail.jpg'?<></>:<><img src={`http://localhost:3000/uploads/${item.Room4}`}  height={100} width={400}/></>}
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
