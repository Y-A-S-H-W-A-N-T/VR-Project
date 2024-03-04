import {useState} from "react"
import axios from 'axios'
import {useUser} from '../useContext.jsx';
import {useHistory} from 'react-router-dom'
export const Login=()=>{

    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    const{setUserId}=useUser()
    const history=useHistory();
    const handleSubmit=()=>{
        try{
            axios.post('/user/login',{email, password}).then(response=>{
                if(response.status=='200'){
                    setUserId(response.data)
                    console.log("login")
                    history.push("./userPropertyList")
                }else{
                    console.log("Login Failed")
                }
            })
            
            
        }catch(err){console.log(err)}


    }
    
    return(
<div>
        <h1>Login</h1>
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>

</div>
       
    )
}