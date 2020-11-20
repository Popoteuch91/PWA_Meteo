import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const counter = useSelector((state) => state.counter.counterValue);
  console.log("test");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);
  return (
    <div>
      Home
      <p>{counter}</p>
      <Link to={"/meteo"}>Météo</Link>
    </div>
  );
};

export default Home;
