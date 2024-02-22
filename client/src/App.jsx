import 'aframe'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Panoramic from './screens/panoramic.jsx'
import Vr from './screens/vr.jsx'

function App() {

  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/stereo-view" element={<Panoramic />} />
          <Route path="/mono-view" element={<Vr />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
