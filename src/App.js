import React from 'react'
import VR_IMAGE from './vr.jpeg'

import { Pannellum, PannellumVideo } from "pannellum-react"
import './css/panoramic.css'

function App() {
  return (
    <div className="App">
      <div className='vr'>
        <div className='pano'>
          <Pannellum
            image={VR_IMAGE}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
          >
          </Pannellum>
        </div>
        <div className='pano'>
          <Pannellum
            image={VR_IMAGE}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
          >
          </Pannellum>
        </div>
      </div>
    </div>
  );
}

export default App;
