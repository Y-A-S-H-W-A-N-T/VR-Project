import VR_IMAGE from './vr.jpeg'
import { Pannellum, PannellumVideo } from 'pannellum-react'
import 'aframe'
import { Entity, Scene } from 'aframe-react';

function App() {

  return (
    <div>
      <Scene>
            <a-sky src={VR_IMAGE}/>
      </Scene>
      {/* <Pannellum
            image={VR_IMAGE}
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
      /> */}
    </div>
  )
}

export default App
