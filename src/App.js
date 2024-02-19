import React from 'react'
import VR_IMAGE from './vr2.jpg'

import { Pannellum, PannellumVideo } from "pannellum-react"
import './css/panoramic.css'

function App() {
  return (
    <div className="App">
        <div className='pano'>
          <Pannellum
            image={VR_IMAGE}
            height='300px'
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          >
          </Pannellum>
        </div>
        <div className='pano'>
          <Pannellum
            image={VR_IMAGE}
            height='300px'
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          >
          </Pannellum>
        </div>
      </div>
  );
}

export default App;
