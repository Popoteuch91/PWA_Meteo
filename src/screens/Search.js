import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { displayCoordonnees } from "../actions/meteo";
import axios_ville from "../axios/ville";
import axios_meteo from "../axios/meteo";

const Search = (props) => {
  const [villes, setVilles] = useState([]);
  const [meteoVilles, setMeteoVilles] = useState([]);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ville.search);
  const appid = useSelector((state) => state.ville.appid);

  useEffect(() => {
    if (villes.length === 0) return setMeteoVilles([]);
    let majMeteoVilles = villes;
    const requests = villes.map((ville, idVille) =>
      axios_meteo.get(
        `?lon=${ville.geometry.coordinates[0]}&lat=${ville.geometry.coordinates[1]}&appid=${appid}`
      )
    );
    Promise.all(requests).then((res) => {
      res.map((meteo, idVille) => (majMeteoVilles[idVille].meteo = meteo.data));
      setMeteoVilles(majMeteoVilles);
    });
  }, [villes, appid]);

  useEffect(() => {
    if (search.length >= 1) {
      axios_ville.get(`?limit=5&type=municipality&q=${search}`).then((res) => {
        console.log(res);
        setVilles(res.data.features);
      });
    }
  }, [search]);
  return (
    <div>
      {meteoVilles.map((meteoVille) => {
        return (
          <p
            onClick={() => {
              dispatch(
                displayCoordonnees({
                  lon: meteoVille.geometry.coordinates[0],
                  lat: meteoVille.geometry.coordinates[1],
                })
              );
            }}
          >
            {meteoVille.properties.label} a pour température{" "}
            {meteoVille.meteo.main.temp}
          </p>
        );
      })}
    </div>
  );
};

export default Search;
