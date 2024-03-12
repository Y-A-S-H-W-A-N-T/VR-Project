import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { UserProvider } from './useContext.jsx'
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// axios.defaults.baseURL="https://vr-project-hzru.onrender.com"
axios.defaults.baseURL="http://localhost:3000"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
    
  </React.StrictMode>,
)
