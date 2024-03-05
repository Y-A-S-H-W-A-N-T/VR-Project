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
        <a-gltf-model src='https://cdn.glitch.global/168e0451-dc78-4fa9-9a84-028ef51d9561/File.glb?v=1651912125168'></a-gltf-model>
      </a-scene>
    </div>
  )
}

export default Model3D