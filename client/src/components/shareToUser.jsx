import {useEffect,useState} from 'react'
import '../css/shareScreen.css'
import axios from 'axios'

function ShareToUser({ toggleShareScreen, propertyID }) {

    const[Users, setUsers]=useState([]);
    useEffect(() => {
          axios.get("/user/show").then((response)=>{
            console.log(response.data)
            setUsers(response.data)
          }).catch((err)=>{console.log(err)})
          
       
      }, []);



    const Send = async(e,id)=>{
        e.preventDefault()
        console.log("PROPERTY ID : ",propertyID)
        console.log("USER ID : ",id)
        await axios.post('user/updateProperty',{propertyID: propertyID, userID: id})
        .then((res)=>{
          if(res.status==200){
            console.log("updated")
          }else{
            console.log("Error")
          }
        })
        .catch((err)=>{
            console.log(err)
        })
        window.location.reload(false)
    }

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div className='flex '>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleShareScreen()}>❌</p>
                </div>
                <div className='test'><br/>
                    {
                        Users.map((val)=>(
                            <div key={val.id}>
                                <p>NAME : {val.name}</p>
                                <button style={{backgroundColor: 'green',color: 'white'}} onClick={(e)=>Send(e,val._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SEND</button>
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