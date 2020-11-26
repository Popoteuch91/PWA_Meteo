import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { removeFavorite } from "../actions/ville";
import axios_meteo from "../axios/meteo";

const Favorite = () => {
  const [meteoVilles, setMeteoVilles] = useState([]);
  const favorites = useSelector((state) => state.ville.favorites);
  const dispatch = useDispatch();
  const appid = useSelector((state) => state.ville.appid);
  useEffect(() => {
    if (favorites.length === 0) return setMeteoVilles([]);
    let majMeteoVilles = favorites;
    const requests = favorites.map((ville, idVille) =>
      axios_meteo.get(
        `?lon=${ville.geometry.coordinates[0]}&lat=${ville.geometry.coordinates[1]}&appid=${appid}`
      )
    );
    Promise.all(requests).then((res) => {
      res.map((meteo, idVille) => (majMeteoVilles[idVille].meteo = meteo.data));
      setMeteoVilles(majMeteoVilles);
    });
  }, [favorites, appid]);
  return (
    <div>
      <StyledDiv>
        <StyledH1>Favorite Page</StyledH1>
        {meteoVilles.map((favorite, idFavorite) => {
          return (
            <StyledText>
              {favorite.properties.label} a pour température{" "}
              {favorite.meteo.main.temp}{" "}
              <span onClick={() => dispatch(removeFavorite(idFavorite))}>
                [REMOVE FAVORITES]
              </span>
            </StyledText>
          );
        })}
      </StyledDiv>
    </div>
  );
};
const StyledDiv = styled.div`
  margin-top: 5%;
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
    margin-top: 7%;
    padding: 1%;
    padding-left: 2%;
    padding-right: 2%;
  }
  @media (max-width: 768px) {
    margin-top: 10%;
    margin-bottom: 10%;
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
const StyledH1 = styled.h1`
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;
const StyledText = styled.p`
  font-size: 20px;
  text-align: justify;
`;
export default Favorite;
