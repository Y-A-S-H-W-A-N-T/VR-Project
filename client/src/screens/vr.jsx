import React from 'react'
import VR_IMAGE from '../vr.jpeg'
import 'aframe'
import { Entity, Scene } from 'aframe-react'

function Vr() {
  return (
    <div>
        <Scene>
          <a-sky src={VR_IMAGE}/>
        </Scene>
    </div>
  )
}

export default Vr