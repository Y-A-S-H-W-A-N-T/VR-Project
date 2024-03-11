import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, Link, useNavigate } from 'react-router-dom'

function Request() {

    const location = useLocation()
    const { user_id, property_id } = location.state

    const [user,setUser] = useState()
    const [property,setProperty] = useState()

    const navigate = useNavigate()

    console.log(user,property)

    useEffect(() => {
        axios.get(`/user/userDetails/${user_id}`)
          .then(res => {
            console.log(res.data)
            setUser(res.data)
          })
          .catch(error => {
            console.error("Error:", error); 
          })
        axios.get(`/property/propertyDetails/${property_id}`)
          .then(res => {
            console.log(res.data)
            setProperty(res.data)
          })
          .catch(error => {
            console.error("Error:", error); 
          })
        },[])

        const Accept = async(e,user_id,property_id)=>{
            navigate(-1)
            e.preventDefault()
            console.log(property_id,user_id)
            await axios.post('/user/updateProperty',{propertyID: property_id, userID: user_id})
            
        }

  return (
    <div>
        {user==undefined || property==undefined ?
            <>Loading...</>
            :
            <>
                <div>
                    Requested User
                    <h1>NAME: {user.name}</h1>
                </div>
                <div>
                    Requested Property
                    <h1>NAME:<Link to='/property' state={{ property: property }}> {property.name}</Link></h1>
                </div>
                <div>
                    <button onClick={(e)=>Accept(e,user_id,property_id)}>ACCEPT REQUEST</button>
                </div>
            </>
        }
    </div>
  )
}

export default Request