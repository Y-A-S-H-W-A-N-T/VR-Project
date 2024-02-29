import React from 'react'
import 'aframe'
import 'aframe-particle-system-component';
import Table from '../table.png'
import { useLocation, Link } from 'react-router-dom'

function Model3D() {

  const location = useLocation()
  const { pano } = location.state

  return (
    <div>
      <a-scene>
        <a-sky src={pano}></a-sky>
        <a-image src={Table} position="0 0 -5" height="0.9" width="0.9"></a-image>
      </a-scene>
    </div>
  )
}

export default Model3D