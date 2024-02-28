import React from "react";

import Navbar from "../components/navbar";
import Heroimg from "../assets/heroimg.png"
import Banner from "../components/Banner";
import MiddleHero from "../components/MiddleHero";
function Initial() {
  return (
    <div>
      <Navbar />
      <Banner/>
     <MiddleHero/>
    </div>
  );
}

export default Initial;
