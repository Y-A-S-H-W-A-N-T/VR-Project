import 'aframe'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Panoramic from './screens/panoramic.jsx'
import AR from './screens/ar.jsx'
import Home from './screens/home.jsx'
import MobileAR from './screens/mobileAR.jsx'
import Property from './screens/property.jsx'

function App() {

  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vr-view" element={<Panoramic />} />
          <Route path="/ar" element={<AR />} />
          <Route path="/mobilear" element={<MobileAR />} />
          <Route path="/property" element={<Property />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
