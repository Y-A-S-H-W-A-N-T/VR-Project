import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function NotVerified({ toggleShowUpload }) {

    const [notVerified,setNotVerified] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios.get('/property/show')
          .then(response => {
            var unverified = response.data.filter(property => !property.isVerified);
            setNotVerified(unverified)
            setLoading(false)
          })
          .catch(error => {
            console.error("Error:", error); 
          })
      },[])

      const VerifyProperty = async(e,id)=>{
        console.log(id)
        axios.post('/property/verifyProperty',{id: id})
        .then((res)=>{
            console.log("Property Verified")
            window.location.reload(false)
        })
        .catch((err)=>{
            console.log(err)
        })
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
                        <div key={ind} className='test'>
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