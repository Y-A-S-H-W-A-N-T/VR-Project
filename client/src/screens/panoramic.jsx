import React, { useEffect, useState } from 'react'
import '../css/panoramic.css'
import { Pannellum, PannellumVideo } from 'pannellum-react'
import { useLocation } from 'react-router'

function Panoramic() {

  const data = useLocation()
  const { pano } = data.state

  return (
    <div>
      <div className='stereoscopic-view'>
        <div className='pano-screen'>
          <Pannellum
            image={`http://localhost:3000/uploads/${pano}`}
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          />
        </div>
        <div className='pano-screen'>
          <Pannellum
            image={`http://localhost:3000/uploads/${pano}`}
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