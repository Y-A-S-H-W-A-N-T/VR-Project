import React from 'react'
import '../css/shareScreen.css'
import axios from 'axios'

function ShareToUser({ toggleShareScreen, propertyID }) {


    const Users = [

        {
            "id": 1,
            "name": 'Yashwant'
        },
        {
            "id": 2,
            "name": 'Abish'
        },
        {
            "id": 3,
            "name": 'Soumya'
        }
    ]


    const Send = async(e,id)=>{
        e.preventDefault()
        console.log("PROPERTY ID : ",propertyID)
        console.log("USER ID : ",id)
        await axios.post('URL',{propertyID: propertyID, userID: id})
        .then((res)=>{

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
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShareScreen()}>❌</p>
                </div>
                <div className='test'><br/>
                    {
                        Users.map((val)=>(
                            <div key={val.id}>
                                <p>NAME : {val.name}</p>
                                <button style={{backgroundColor: 'black',color: 'white'}} onClick={(e)=>Send(e,val.id)}>SEND</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShareToUser