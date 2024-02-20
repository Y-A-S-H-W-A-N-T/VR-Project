import React from 'react'
import VR_IMAGE from './vr2.jpg'

import { Pannellum, PannellumVideo } from "pannellum-react"
import './css/panoramic.css'

import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene, Sky} from 'aframe-react';

function App() {
  return (
    <div className="App">
      {/* <div className='pano'>
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
      </div> */}
      <Scene xr-mode-ui="enabled: false">
        <a-Sky src={VR_IMAGE} rotation='0 -130 0'/>
        <a-Camera cursor-visible="false"></a-Camera>
      </Scene>
      
      </div>
  );
}

export default App;
