import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { GoVerified } from "react-icons/go";
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
                <div className='flex items-center p-4 border-b border-gray-200 md:justify-between'>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShowUpload()}><RxCross1 size={24} /></p>
                </div>
                {loading && <p>LOADING......</p>}
                <div className='test  p-4 pr-3 pl-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                    {
                        notVerified.map((val,ind)=>(
                            <div key={ind} className='p-5  '>
                                <Link to="/property" className='font-two p-6 mt-4 bg-slate-100 text-black py-2 px-4 rounded hover:bg-slate-300 w-full' state={{ property: val }}>{val.name}</Link>
                                <button className='p-6 mt-4 bg-green-400 text-black py-2 px-4 rounded hover:bg-green-300 w-full items-center text-center' onClick={(e)=>VerifyProperty(e,val._id)}><GoVerified size={24}/></button>
                            </div>
                        ))
                    }
                </div>


                
            </div>
        </div>
    </div>
  )
}

export default NotVerified