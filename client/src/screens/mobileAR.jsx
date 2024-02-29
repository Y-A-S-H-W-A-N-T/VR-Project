import React, { useEffect, useState } from 'react'
import 'aframe'
import 'aframe-particle-system-component';
import { useLocation, Link } from 'react-router-dom'
import Table from '../table.png'
import Tv from '../vr1.jpg'

function Vr() {

  const location = useLocation()
  const { pano, furniture } = location.state
  var temp = furniture

  const [Furniture,setFurniture] = useState(null)
  
  useEffect(()=>{
    async function showFurniture(temp){
      if(furniture=='tv')
        setFurniture(Tv)
      if(furniture=='table')
        setFurniture(Table)
    }
    showFurniture()
  },[])

  console.log(Furniture)

  return (
    <div>
      <a-scene>
        <a-sky src={pano}></a-sky>
        <a-camera id="main-camera">
            <a-cursor id="fuse-cursor" material="opacity: 0;" position="0 0 -1"></a-cursor>
            <a-image src={`${Furniture}`} position="0 0 -.99" height="0.2" width="0.2"></a-image>
        </a-camera>
      </a-scene>
    </div>
  )
}

export default Vr