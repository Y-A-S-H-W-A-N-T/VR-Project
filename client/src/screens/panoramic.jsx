import React from 'react'
import '../css/panoramic.css'
import VR_IMAGE from '../vr.jpeg'
import { Pannellum, PannellumVideo } from 'pannellum-react'

function Panoramic() {
  return (
    <div>
      <div className='stereoscopic-view'>
        <div className='pano-screen'>
          <Pannellum
            image={VR_IMAGE}
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          />
        </div>
        <div className='pano-screen'>
          <Pannellum
            image={VR_IMAGE}
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          />
        </div>
        </div>
    </div>
  )
}

export default Panoramic