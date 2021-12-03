import { Component, useEffect, useState } from "react";
//import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { MyCoords, Home } from "../interfaces/index";
//
const Marker = ({ text }: any) => (
  <>
    <div className="pin"></div>
    <div className="pulse"></div>
  </>
);

const Map = () => {
  //
  const weather = useSelector((state: Home) => state.weather);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => setLoad(false), 1);
  }, [weather.oneday.coord.lat]);
  return (
    <div
      style={{
        height: "100%",
        minHeight: "12rem",
        width: "100%",
        border: "1px solid rgba(117, 117, 117, 0.2)",
        borderRadius: "15%",
        overflow: "hidden",
      }}
    >
     
    </div>
  );
};

export default Map;