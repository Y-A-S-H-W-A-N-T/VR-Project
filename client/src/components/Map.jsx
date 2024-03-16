
import '../css/map.css'
import React from "react";
import { useState, useEffect, useRef } from "react";

//tom-tom maps ka api
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

//geocoding ka import
import { geocode, RequestType,setDefaults } from "react-geocode";

function Map(prop) {
    setDefaults({
        key: "AIzaSyDVa8IMHHUfv8wV_hXqXaXo84NPunD_JkA", // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
      });

    const address = prop.location;
geocode(RequestType.ADDRESS, address)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const mapZoom =13;
  const [map, setMap] = useState({});

 

  

  useEffect(() => {
    let map = tt.map({
      /* 
      This key will API key only works on this Stackblitz. To use this code in your own project,
      sign up for an API key on the TomTom Developer Portal.
      */
      key: "0aQL7esIkiwGEIEOmj72TsiERljDMr1O",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <div className="App"> 
      <div className="mapContainer">   
          <div className='' >
            <div ref={mapElement} className="mapDiv" />
          </div>
    
      </div>
    </div>
  );
}

export default Map;
