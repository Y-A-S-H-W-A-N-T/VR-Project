import {useState, createContext} from "react"

const UserContext=createContext();


const Global=()=>{

    return(
        <UserContext.Provider>
            
        </UserContext.Provider>
    )
}