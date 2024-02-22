import 'aframe'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Panoramic from './screens/panoramic.jsx'
import Vr from './screens/vr.jsx'

function App() {

  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Panoramic />} />
          <Route path="/vr" element={<Vr />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
