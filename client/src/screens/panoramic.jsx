import React, { useEffect, useState } from 'react'
import '../css/panoramic.css'
import { Pannellum, PannellumVideo } from 'pannellum-react'
import { useLocation } from 'react-router'
import VRIMAGE from '../vr1.jpg'
import Test from '../../../Server/public/uploads/postimages/image-1708861310035.png'

function Panoramic() {

  const data = useLocation()
  const { pano } = data.state

  return (
    <div>
      <div className='stereoscopic-view'>
        <div className='pano-screen'>
          <Pannellum
            image={`/src/images/${pano}`}
            pitch={10}
            yaw={90}
            hfov={110}
            autoLoad
            orientationOnByDefault
          />
        </div>
        <div className='pano-screen'>
          <Pannellum
            image={`/src/images/${pano}`}
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