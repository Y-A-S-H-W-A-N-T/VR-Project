import React from 'react'
import 'aframe'
import 'aframe-particle-system-component';
import Table from '../table.png'
import Tv from '../tv.png'
import Sofa from '../sofa.png'
import Chair from '../chair.png'
import Bed from '../bed.png'
import Fridge from '../fridge.png'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Model3D() {

  const location = useLocation()
  const { pano, furniture } = location.state
  var temp = furniture

  const [Furniture,setFurniture] = useState(null)

  return (
    <div>
      <a-scene>
        <a-sky src={pano}></a-sky>
        <a-image src={furniture} position="0 0 -5" height="0.9" width="0.9"></a-image>
      </a-scene>
    </div>
  )
}

export default Model3D