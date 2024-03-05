import React from 'react'
import '../css/shareScreen.css'

function NotVerified({ toggleShowUpload }) {
  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div style={{display: 'flex'}}>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShowUpload()}>❌</p>
                </div>
                LIST OF NOT VERIFIED PROPERTIES
                {/* <div className='test'><br/>
                    {
                        Users.map((val)=>(
                            <div key={val.id}>
                                <p>NAME : {val.name}</p>
                                <button style={{backgroundColor: 'black',color: 'white'}} onClick={(e)=>Send(e,val._id)}>SEND</button>
                            </div>
                        ))
                    }
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default NotVerified