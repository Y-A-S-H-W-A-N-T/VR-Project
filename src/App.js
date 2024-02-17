import React from "react";
import VR_IMAGE from './vr.jpeg'
import { Pannellum, PannellumVideo } from "pannellum-react";

function App() {
  return (
    <div>
        <Pannellum
            width="100%"
            height="500px"
            image={VR_IMAGE}
            yaw={180}
            hfov={110}
            autoLoad
        >
          {/* <Pannellum.Hotspot
            type="info"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/farminf/pannellum-react"
          /> */}
        </Pannellum>
    </div>
  )
}

export default App;
