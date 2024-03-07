import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { UserProvider } from './useContext.jsx'

axios.defaults.baseURL="https://vr-project-hzru.onrender.com"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    
  </React.StrictMode>,
)
