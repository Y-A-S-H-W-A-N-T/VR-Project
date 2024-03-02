import React from "react";

import Navbar from "../components/navbar";

import Banner from "../components/Banner";
import MiddleHero from "../components/MiddleHero";
import DownHero from "../components/DownHero";
import Foooter from "../components/Footer";
function Initial() {
  return (
    <div>
      <Navbar />
      <Banner/>
     <MiddleHero/>
     <DownHero/>
   <Foooter/>
    </div>
  );
}

export default Initial;
