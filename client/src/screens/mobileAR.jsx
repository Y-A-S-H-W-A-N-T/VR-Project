import React, { useEffect, useState } from 'react'
import 'aframe'
import 'aframe-particle-system-component';
import { useLocation, Link } from 'react-router-dom'
import Table from '../table.png'
import Tv from '../tv.png'
import Sofa from '../sofa.png'
import Chair from '../chair.png'
import Bed from '../bed.png'
import Fridge from '../fridge.png'

function Vr() {

  const location = useLocation()
  const { pano, furniture } = location.state

  return (
    <div>
      <a-scene>
        <a-sky src={pano}></a-sky>
        <a-camera id="main-camera">
            <a-cursor id="fuse-cursor" material="opacity: 0;" position="0 0 -1"></a-cursor>
            <a-image src={furniture} position="0 0 -.99" height="0.2" width="0.2" ></a-image>
        </a-camera>
      </a-scene>
    </div>
  )
}

export default Vr