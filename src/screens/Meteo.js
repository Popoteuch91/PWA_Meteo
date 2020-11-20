import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeteo } from "../actions/meteo";

const Meteo = () => {
  const dispatch = useDispatch();
  const meteo = useSelector((state) => state.meteo.meteo);
  useEffect(() => {
    dispatch(getMeteo());
  }, []);
  return (
    <div>
      <p>Météo</p>
      {meteo.map((ville) => (
        <p>{ville.title}</p>
      ))}
    </div>
  );
};

export default Meteo;
