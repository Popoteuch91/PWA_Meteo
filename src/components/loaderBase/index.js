import React from "react";
import Loader from "react-loader-spinner";

const LoaderBase = () => (
  <Loader
    type="TailSpin"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={30000} // 30 secs
  />
);

export default LoaderBase;
