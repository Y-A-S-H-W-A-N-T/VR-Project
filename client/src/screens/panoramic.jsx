import React from 'react'
import '../css/panoramic.css'
import VR_IMAGE from '../vr.jpeg'
import { Pannellum, PannellumVideo } from 'pannellum-react'
import 'aframe'
import { Entity, Scene } from 'aframe-react'

function Panoramic() {
  return (
    <div>
      <Scene>
          <a-sky src={VR_IMAGE}/>
      </Scene>
    </div>
  )
}

export default Panoramic