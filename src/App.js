import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Pano from './screens/panoramic'
import Vr from './screens/vr';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pano" element={<Pano />} />
        <Route path="/vr" element={<Vr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
