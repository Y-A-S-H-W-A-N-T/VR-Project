import VR_IMAGE from './vr.jpeg'
import { Pannellum, PannellumVideo } from "pannellum-react";
import './App.css';

function App() {
  return (
    <div className="App">
      <Pannellum
            width="100%"
            height="500px"
            image={VR_IMAGE}
            yaw={180}
            hfov={110}
            autoLoad
        >
        </Pannellum>
    </div>
  );
}

export default App;
