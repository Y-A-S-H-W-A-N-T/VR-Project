import React from 'react'
import 'aframe'
import VR_IMAGE from '../vr2.jpg'
import 'aframe-particle-system-component';
import Table from '../table.png'
import { Entity, Scene } from 'aframe-react'

function Vr() {

  return (
    <div>
      <a-scene>
        <a-sky src={VR_IMAGE}></a-sky>
        <a-image src={Table} position="0 0 -5" rotation="0 120 0"></a-image>
        <a-sphere click-drag position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-camera look-controls-enabled="false"></a-camera>
      </a-scene>
    </div>
  )
}

export default Vr