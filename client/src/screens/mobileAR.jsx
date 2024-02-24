import React from 'react'
import 'aframe'
import VR_IMAGE from '../vr2.jpg'
import 'aframe-particle-system-component';
import Table from '../table.png'

// FOR PC

function Vr() {

  return (
    <div>
      <a-scene>
        <a-sky src={VR_IMAGE}></a-sky>
        <a-camera id="main-camera">
            <a-cursor id="fuse-cursor" material="opacity: 0;" position="0 0 -1"></a-cursor>
            <a-image src={Table} position="0 0 -.99" height="0.2" width="0.2"></a-image>
        </a-camera>
      </a-scene>
    </div>
  )
}

export default Vr