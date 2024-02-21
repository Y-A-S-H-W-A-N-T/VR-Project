import React from 'react'
import VR_IMAGE from '../vr2.jpg'
import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';

function Vr() {
  return (
    <div className="App">
      <div className='aframe'>
        <Scene>
            <a-sky src={VR_IMAGE}/>
        </Scene>
      </div>
    </div>
  );
}

export default Vr;
