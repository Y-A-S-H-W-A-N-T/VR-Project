import {useState} from "react"
import axios from 'axios'
export const Login=()=>{

    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    const handleSubmit=()=>{
        try{
            axios.post('/user/login',{email, password}).then(response=>{
                if(response.status=='200'){
                    console.log("Login")
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