import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoaderBase from "../components/loaderBase";
import { Weather, Forecast } from "../axios/meteo";
import {
  KalvinToCelsius,
  UnixTimeToHour,
  UnixTimeToDay,
  UnixTimeToMonth,
  UnixTimeToDayNumber,
} from "../mixins/functions";
import { useTranslation } from "react-i18next";
import ForecastMeteo from "../components/forecastMeteo";

const Meteo = () => {
  const { t } = useTranslation();
  const [meteo, setMeteo] = useState({});
  const [dailyMeteo, setDailyMeteo] = useState([]);
  const [previsionsMeteo, setPrevisionsMeteo] = useState([]);
  const coordonnees = useSelector((state) => state.meteo.coordonnees);
  const appid = useSelector((state) => state.ville.appid);
  useEffect(() => {
    Weather.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      setMeteo(res.data);
    });
    Forecast.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      let dMeteo = [];
      for (let i = 0; i < 8; i++) {
        dMeteo.push(
          <StyledDiv4ImgContainer>
            <StyledDiv4Img>{UnixTimeToHour(res.data.list[i].dt)}</StyledDiv4Img>
            <img
              alt={""}
              src={`http://openweathermap.org/img/wn/${res.data.list[i].weather[0].icon}@2x.png`}
            />
            <div>{KalvinToCelsius(res.data.list[i].main.temp)}°</div>
          </StyledDiv4ImgContainer>
        );
      }
      let pMeteo = [];
      for (let i = 1; i <= 5; i++) {
        pMeteo.push(
          <ForecastMeteo key={i} meteo={res.data} iterator={i}></ForecastMeteo>
        );
      }
      setPrevisionsMeteo(pMeteo);
      setDailyMeteo(dMeteo);
    });
  }, [coordonnees, appid]);

  return (
    <StyledMain>
      <StyledDiv>
        {Object.keys(meteo).length === 0 && meteo.constructor === Object ? (
          <LoaderBase />
        ) : (
          <StyledDiv1>
            <StyledH1>
              {meteo.name}, {meteo.sys.country}
            </StyledH1>
            <StyledText>
              {t(`week.${UnixTimeToDay(meteo.dt)}`)}{" "}
              {UnixTimeToDayNumber(meteo.dt)}{" "}
              {t(`month.${UnixTimeToMonth(meteo.dt)}`)}
            </StyledText>
          </StyledDiv1>
        )}
        {Object.keys(meteo).length === 0 && meteo.constructor === Object ? (
          <LoaderBase />
        ) : (
          <StyledDiv2>
            <StyledDiv2Img>
              <img
                alt={""}
                src={`http://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
              />
            </StyledDiv2Img>
            <StyledDiv2Temp>
              <StyledDiv2TempVal>
                {KalvinToCelsius(meteo.main.temp)}°
              </StyledDiv2TempVal>
              <StyledDiv2TempState>{meteo.weather[0].main}</StyledDiv2TempState>
            </StyledDiv2Temp>
          </StyledDiv2>
        )}
        {Object.keys(meteo).length === 0 && meteo.constructor === Object ? (
          <LoaderBase />
        ) : (
          <StyledDiv3>
            <div>
              <StyledDiv3TempVal>
                {KalvinToCelsius(meteo.main.temp_max)}°
              </StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.temp_max")}</StyledDiv3TempLabel>
              <StyledDiv3TempVal>
                {KalvinToCelsius(meteo.main.temp_min)}°
              </StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.temp_min")}</StyledDiv3TempLabel>
            </div>
            <div>
              <StyledDiv3TempVal>{meteo.wind.speed}mph</StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.wind")}</StyledDiv3TempLabel>
              <StyledDiv3TempVal>{meteo.main.humidity}%</StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.humidity")}</StyledDiv3TempLabel>
            </div>
            <div>
              <StyledDiv3TempVal>
                {UnixTimeToHour(meteo.sys.sunrise)}
              </StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.sunrise")}</StyledDiv3TempLabel>
              <StyledDiv3TempVal>
                {UnixTimeToHour(meteo.sys.sunset)}
              </StyledDiv3TempVal>
              <StyledDiv3TempLabel>{t("meteo.sunset")}</StyledDiv3TempLabel>
            </div>
          </StyledDiv3>
        )}
        <StyledDiv4>
          <Styled4H2>{t("meteo.meteo_day")}</Styled4H2>
          <StyledDiv4Container>
            {dailyMeteo.length === 0 ? <LoaderBase /> : dailyMeteo}
          </StyledDiv4Container>
        </StyledDiv4>
        <StyledDiv5>
          <Styled5H2>{t("meteo.meteo_forecast")}</Styled5H2>
          {previsionsMeteo.length === 0 ? (
            <LoaderBase />
          ) : (
            <StyledDiv5Container>{previsionsMeteo}</StyledDiv5Container>
          )}
        </StyledDiv5>
      </StyledDiv>
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
  /*color: white;*/
  height: 100%;
  /*background: linear-gradient(
    to bottom,
    rgb(43, 50, 178) 0%,
    rgb(20, 136, 204) 100%
  );*/
  /*background: linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(7 113 177) 100%);
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
const StyledText = styled.p``;
const StyledDiv2 = styled.div`
  display: flex;
  margin-top: 0.25em;
  width: 100%;
  @media screen and (min-width: 700px) {
    width: 50%;
  }
`;
const StyledDiv2Img = styled.div`
  flex-grow: 1.25;
  text-align: center;
  img {
    width: 10.5em;
  }
`;
const StyledDiv2Temp = styled.div`
  flex-grow: 1;
  text-align: center;
`;
const StyledDiv2TempVal = styled.div`
  font-size: 5.25em;
  font-weight: 300;
  @media (max-width: 375px) {
    font-size: 3.25em;
  }
`;
const StyledDiv2TempState = styled.div`
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
const StyledDiv3TempVal = styled.div`
  margin-top: 1em;
  font-size: 1.44em;
`;
const StyledDiv3TempLabel = styled.div`
  /* color: rgba(255, 255, 255, 0.8);*/
  @media screen and (min-width: 700px) {
    display: block;
  }
`;
const StyledDiv4 = styled.div`
  width: 100%;
  @media (max-width: 375px) {
    display: none;
  }
`;
const Styled4H2 = styled.h2`
  /*color: rgba(255, 255, 255, 0.8);*/
  font-size: 1em;
  font-weight: normal;
  @media screen and (min-width: 768px) {
    font-size: 1.125em;
  }
`;
const StyledDiv4Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledDiv4ImgContainer = styled.div`
  padding: 0.8em 0;
  width: 13%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  font-size: 1.125em;
  text-align: center;
  /*@media screen and (min-width: 880px) {
    width: 6.05em;
  }*/
`;
const StyledDiv4Img = styled.div`
  margin-bottom: 0.5em;
`;
const StyledDiv5 = styled.div`
  width: 100%;
  margin-top: 1em;
`;
const Styled5H2 = styled.div`
  /*color: rgba(255, 255, 255, 0.8);*/
  font-size: 1em;
  font-weight: normal;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  @media screen and (min-width: 768px) {
    font-size: 1.125em;
  }
`;
const StyledDiv5Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default Meteo;
