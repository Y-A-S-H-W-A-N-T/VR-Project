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
        <a-entity
          gltf-model="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
          scale="5 5 5"
          position="0 -10 -10"
          ></a-entity>
      </a-scene>
    </div>
  )
}

export default Vr