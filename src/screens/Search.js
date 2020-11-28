import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { displayCoordonnees } from "../actions/meteo";
import axios_ville from "../axios/ville";
import { Weather } from "../axios/meteo";
import { pushFavorites } from "../actions/ville";
import { KalvinToCelsius, UnixTimeToHour } from "../mixins/functions";
import styled from "styled-components";

const Search = (props) => {
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
        console.log(res);
        setVilles(res.data.features);
      });
    }
  }, [search]);
  return (
    <StyledMain>
      {meteoVilles.map((meteoVille) => {
        return (
          <StyledDiv>
            <StyledDiv1>
              <StyledH1>{meteoVille.properties.label}</StyledH1>
            </StyledDiv1>
            <StyledDiv2>
              <StyledDiv2_>
                <img
                  src={`http://openweathermap.org/img/wn/${meteoVille.meteo.weather[0].icon}@2x.png`}
                />
              </StyledDiv2_>
              <StyledDiv2_1>
                <StyledDiv2_2>
                  {KalvinToCelsius(meteoVille.meteo.main.temp)}°
                </StyledDiv2_2>
                <StyledDiv2_3>{meteoVille.meteo.weather[0].main}</StyledDiv2_3>
              </StyledDiv2_1>
            </StyledDiv2>
            <StyledDiv3>
              <div>
                <StyledDiv3_>
                  {KalvinToCelsius(meteoVille.meteo.main.temp_max)}°
                </StyledDiv3_>
                <StyledDiv3_1>High</StyledDiv3_1>
                <StyledDiv3_>
                  {KalvinToCelsius(meteoVille.meteo.main.temp_min)}°
                </StyledDiv3_>
                <StyledDiv3_1>Low</StyledDiv3_1>
              </div>
              <div>
                <StyledDiv3_>{meteoVille.meteo.wind.speed}mph</StyledDiv3_>
                <StyledDiv3_1>Wind</StyledDiv3_1>
                <StyledDiv3_>{meteoVille.meteo.main.humidity}%</StyledDiv3_>
                <StyledDiv3_1>Humidity</StyledDiv3_1>
              </div>
              <div>
                <StyledDiv3_>
                  {UnixTimeToHour(meteoVille.meteo.sys.sunrise)}
                </StyledDiv3_>
                <StyledDiv3_1>Sunrise</StyledDiv3_1>
                <StyledDiv3_>
                  {UnixTimeToHour(meteoVille.meteo.sys.sunset)}
                </StyledDiv3_>
                <StyledDiv3_1>Sunset</StyledDiv3_1>
              </div>
            </StyledDiv3>
            <div>
              <StyledButton
                onClick={() => {
                  dispatch(pushFavorites(meteoVille));
                  history.push("/favorite");
                }}
              >
                Ajouter à la liste des favoris
              </StyledButton>
              <StyledButton1
                onClick={() => {
                  dispatch(
                    displayCoordonnees({
                      lon: meteoVille.geometry.coordinates[0],
                      lat: meteoVille.geometry.coordinates[1],
                    })
                  );
                  history.push("/");
                }}
              >
                Afficher cette localisation
              </StyledButton1>
            </div>
          </StyledDiv>
        );
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
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 920px) {
    width: 880px;
    margin: 8px auto;
    font-size: 1.1em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  }
  @media (max-width: 1366px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  }
  @media (max-width: 1024px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  }
  @media (max-width: 768px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  }
  @media (max-width: 375px) {
    margin-top: 1em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
  }
`;
const StyledDiv1 = styled.div`
  width: 100%;
`;
const StyledH1 = styled.h1`
  margin: 0;
  font-size: 2em;
  font-weight: 600;
`;
const StyledDiv2 = styled.div`
  display: flex;
  margin-top: 0.25em;
  width: 100%;
  @media screen and (min-width: 700px) {
    width: 50%;
  }
`;
const StyledDiv2_ = styled.div`
  flex-grow: 1.25;
  text-align: center;
  img {
    width: 10.5em;
  }
`;
const StyledDiv2_1 = styled.div`
  flex-grow: 1;
  text-align: center;
`;
const StyledDiv2_2 = styled.div`
  font-size: 5.25em;
  font-weight: 300;
  @media (max-width: 375px) {
    font-size: 3.25em;
  }
`;
const StyledDiv2_3 = styled.div`
  margin-top: 0em;
  margin-left: 0em;
  text-align: center;
  font-size: 2em;
`;
const StyledDiv3 = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 1em;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  @media screen and (min-width: 700px) {
    margin-bottom: 1em;
    padding-bottom: 0;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
  @media screen and (min-width: 700px) {
    width: 50%;
  }
`;
const StyledDiv3_ = styled.div`
  margin-top: 1em;
  font-size: 1.44em;
`;
const StyledDiv3_1 = styled.div`
  /*color: rgba(255, 255, 255, 0.8);*/
  @media screen and (min-width: 700px) {
    display: block;
  }
`;
const StyledButton = styled.button`
  background: #26a69a;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border: none;
  border-radius: 3px;
  font-weight: 900;
  margin: 20px;
  cursor: pointer;
  text-transform: uppercase;
`;
const StyledButton1 = styled.button`
  background: #ffa500;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border: none;
  border-radius: 3px;
  font-weight: 900;
  margin: 20px;
  cursor: pointer;
  text-transform: uppercase;
`;
export default Search;
