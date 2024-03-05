import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function NotVerified({ toggleShowUpload }) {


    const [properties, setProperties] = useState([])
    const [notVerified,setNotVerified] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios.get('/property/show')
          .then(response => {
            setProperties(response.data)
            console.log(response.data)
            const unverified = response.data.filter(property => !property.isVerified);
            setNotVerified(unverified)
            setLoading(false)
          })
          .catch(error => {
            console.error("Error:", error);
          })
      },[])

      const VerifyProperty = async(e,id)=>{
        console.log(id)
        // update the variable isVerify to TRUE in this Property
      }

      

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div style={{display: 'flex'}}>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShowUpload()}>❌</p>
                </div>
                {loading && <p>LOADING......</p>}
                {
                    notVerified.map((val,ind)=>(
                        <div key={ind}>
                            <Link to="/property" state={{ property: val }}>{val.name}</Link>
                            <button className='p-6' onClick={(e)=>VerifyProperty(e,val._id)}>VERIFY</button>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default NotVerified