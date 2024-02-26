import React, { useState, useEffect } from 'react'
import 'aframe'
import VR_IMAGE from '../vr2.jpg'
import 'aframe-particle-system-component'
import { useLocation } from 'react-router'

// FOR PC

function Vr() {

  const data = useLocation()
  const { pano } = data.state
  console.log(pano)
  return (
    <div>
      <a-scene>
        <a-sky src={`http://localhost:3000/uploads/${pano}`}></a-sky>
          <a-camera id="main-camera">
            <a-cursor id="fuse-cursor" material="opacity: 0;" position="0 0 -1"></a-cursor>
          </a-camera>
      </a-scene>
    </div>
  )
}

export default Vr