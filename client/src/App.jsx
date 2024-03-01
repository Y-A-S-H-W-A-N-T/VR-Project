import 'aframe'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Panoramic from './screens/panoramic.jsx'
import AR from './screens/ar.jsx'
import Home from './screens/home.jsx'
import MobileAR from './screens/mobileAR.jsx'
import Property from './screens/property.jsx'
import {Register} from './screens/register.jsx'
import { PropUpload } from './screens/propUploads.jsx'
import Initial from './screens/initial.jsx'
import Furniture from './screens/furniture.jsx'
import Model3D from './screens/Model3D.jsx'
import {Login} from './screens/login.jsx'
function App() {

  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vr-view" element={<Panoramic />} />
          <Route path="/ar" element={<AR />} />
          <Route path="/mobilear" element={<MobileAR />} />
          <Route path="/property" element={<Property />} />
          <Route path="/register" element={<Register />} />
          <Route path="/propUpload" element={<PropUpload />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/3D-model" element={<Model3D />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
