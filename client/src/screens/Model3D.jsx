import React from 'react'
import 'aframe'
import 'aframe-particle-system-component';
import Table from '../table.png'
import Tv from '../vr1.jpg'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Model3D() {

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

  return (
    <div>
      <a-scene>
        <a-sky src={pano}></a-sky>
        <a-image src={`${Furniture}`} position="0 0 -5" height="0.9" width="0.9"></a-image>
      </a-scene>
    </div>
  )
}

export default Model3D