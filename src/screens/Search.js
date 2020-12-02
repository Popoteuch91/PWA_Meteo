import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { displayCoordonnees } from "../actions/meteo";
import axios_ville from "../axios/ville";
import { Weather } from "../axios/meteo";
import { pushFavorites } from "../actions/ville";
import { KalvinToCelsius, UnixTimeToHour } from "../mixins/functions";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import FicheMeteo from "../components/ficheMeteo";

const Search = (props) => {
  const { t, i18n } = useTranslation();
  const [villes, setVilles] = useState([]);
  const [meteoVilles, setMeteoVilles] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useSelector((state) => state.ville.search);
  const appid = useSelector((state) => state.ville.appid);

  useEffect(() => {
    if (villes.length === 0) return setMeteoVilles([]);
    let majMeteoVilles = villes;
    const requests = villes.map((ville, idVille) =>
      Weather.get(
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
        setVilles(res.data.features);
      });
    }
  }, [search]);
  return (
    <StyledMain>
      {meteoVilles.map((ville) => {
        return <FicheMeteo ville={ville}></FicheMeteo>;
      })}
    </StyledMain>
  );
};
const StyledMain = styled.div`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  font-size: 100%;
  height: 100%;
  /*color: white;
  
  background: linear-gradient(
    to bottom,
    rgb(43, 50, 178) 0%,
    rgb(20, 136, 204) 100%
  );
  background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  background: linear-gradient(180deg, #7595c4, #edc6bf);*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  @media screen and (min-width: 700px) {
    body {
      margin: 20px;
    }
  }
  margin-top: 4.5%;
  padding: 0.5%;
  padding-left: 1%;
  padding-right: 1%;
  @media (max-width: 1366px) {
    margin-top: 5%;
    padding: 2%;
    padding-left: 2%;
    padding-right: 2%;
  }
  @media (max-width: 1024px) {
    margin-top: 7.5%;
    padding: 1%;
    padding-left: 2%;
    padding-right: 2%;
  }
  @media (max-width: 768px) {
    margin-top: 12%;
    margin-bottom: 12%;
    padding: 1%;
    padding-left: 3%;
    padding-right: 3%;
  }
  @media (max-width: 375px) {
    margin-top: 20%;
    margin-bottom: 20%;
    padding: 1%;
    padding-left: 5%;
    padding-right: 5%;
  }
`;
export default Search;
