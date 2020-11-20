import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVilles } from "../actions/ville";
import { getMeteos, displayCoordonnees } from "../actions/meteo";

const Search = (props) => {
  const dispatch = useDispatch();
  const meteos = useSelector((state) => state.meteo.meteos);
  const villes = useSelector((state) => state.ville.villes);
  const search = useSelector((state) => state.ville.search);

  useEffect(() => {
    dispatch(getMeteos(villes));
  }, [villes]);

  useEffect(() => {
    dispatch(getVilles(search));
  }, [search, dispatch]);
  return (
    <div>
      {villes.map((ville) => {
        return (
          <p
            onClick={() => {
              dispatch(
                displayCoordonnees({
                  lon: ville.geometry.coordinates[0],
                  lat: ville.geometry.coordinates[1],
                })
              );
            }}
          >
            {ville.properties.label} a pour température {ville.meteo.main.temp}{" "}
            K
          </p>
        );
      })}
    </div>
  );
};

export default Search;
