import React from 'react'
import VR_IMAGE from '../vr2.jpg'
import './css/panoramic.css'
import { Pannellum, PannellumVideo } from "pannellum-react"

import 'aframe';
import 'aframe-particle-system-component'

function Pano() {
  return (
    <div className="App">
      <div className='panoramic'>
        <div className='pano'>
          <Pannellum
            image={VR_IMAGE}
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
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          >
          </Pannellum>
        </div>
      </div>
    </div>
  );
}

export default Pano;
