import React from 'react'
import VR_IMAGE from './vr.jpeg'

import { Pannellum, PannellumVideo } from "pannellum-react";

function App() {
  return (
    <div className="App">
      <Pannellum
        width="100%"
        height="500px"
        image={VR_IMAGE}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
    >
    </Pannellum>

    {/* <PannellumVideo
      video={myVideo}
      loop
      width="100%"
      height="600px"
      pitch={10}
      yaw={180}
      hfov={140}
      minHfov={50}
      maxHfov={180}
    >
      <Pannellum.Hotspot
        type="custom"
        pitch={31}
        yaw={150}
        handleClick={(evt , name) => this.hanldeClick(name)}
        name="hs1"
      />

      <Pannellum.Hotspot
        type="info"
        pitch={31}
        yaw={-57}
        text="Info"
        URL="https://github.com/farminf"
      />
    </PannellumVideo> */}

    </div>
  );
}

export default App;
