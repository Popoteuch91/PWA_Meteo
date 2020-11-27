import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { Weather, Forecast } from "../axios/meteo";
import { KalvinToCelsius } from "../mixins/functions";

const Meteo = () => {
  const [meteo, setMeteo] = useState({});
  const [forecast, setForecast] = useState({});
  const coordonnees = useSelector((state) => state.meteo.coordonnees);
  const appid = useSelector((state) => state.ville.appid);
  useEffect(() => {
    Weather.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      setMeteo(res.data);
      console.log(res.data);
    });
    Forecast.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      setForecast(res.data);
      console.log(res.data);
      console.log("toi");
    });
  }, [coordonnees, appid]);
  return (
    <div>
      {(Object.keys(meteo).length === 0 && meteo.constructor === Object) ||
      (Object.keys(forecast).length === 0 &&
        forecast.constructor === Object) ? (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={30000} // 30 secs
        />
      ) : (
        <StyledMain>
          <StyledDiv>
            <StyledDiv1>
              <StyledH1>
                {meteo.name}, {meteo.sys.country}
              </StyledH1>
              <StyledText>Sunday 4th August</StyledText>
            </StyledDiv1>
            <StyledDiv2>
              <StyledDiv2_>
                <img
                  src={`http://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
                />
              </StyledDiv2_>
              <StyledDiv2_1>
                <StyledDiv2_2>{KalvinToCelsius(meteo.main.temp)}°</StyledDiv2_2>
                <StyledDiv2_3>{meteo.weather[0].main}</StyledDiv2_3>
              </StyledDiv2_1>
            </StyledDiv2>
            <StyledDiv3>
              <div>
                <StyledDiv3_>
                  {KalvinToCelsius(meteo.main.temp_max)}°
                </StyledDiv3_>
                <StyledDiv3_1>High</StyledDiv3_1>
                <StyledDiv3_>
                  {KalvinToCelsius(meteo.main.temp_min)}°
                </StyledDiv3_>
                <StyledDiv3_1>Low</StyledDiv3_1>
              </div>
              <div>
                <StyledDiv3_>{meteo.wind.speed}mph</StyledDiv3_>
                <StyledDiv3_1>Wind</StyledDiv3_1>
                <StyledDiv3_>{meteo.main.humidity}%</StyledDiv3_>
                <StyledDiv3_1>Humidity</StyledDiv3_1>
              </div>
              <div>
                <StyledDiv3_>{meteo.sys.sunrise}</StyledDiv3_>
                <StyledDiv3_1>Sunrise</StyledDiv3_1>
                <StyledDiv3_>{meteo.sys.sunset}</StyledDiv3_>
                <StyledDiv3_1>Sunset</StyledDiv3_1>
              </div>
            </StyledDiv3>
            <StyledDiv4>
              <StyledH2>La météo du jour</StyledH2>
              <StyledDiv4_>
                <StyledDiv4_1>
                  <StyledDiv4_2>3am</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[0].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>6am</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[1].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>9am</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[2].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>12pm</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[3].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>3pm</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[4].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[4].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>6pm</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[5].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[5].main.temp)}°</div>
                </StyledDiv4_1>
                <StyledDiv4_1>
                  <StyledDiv4_2>9pm</StyledDiv4_2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.list[6].weather[0].icon}@2x.png`}
                  />
                  <div>{KalvinToCelsius(forecast.list[6].main.temp)}°</div>
                </StyledDiv4_1>
              </StyledDiv4_>
            </StyledDiv4>
            <StyledDiv5>
              <StyledH2_>Les jours à venir</StyledH2_>
              <StyledDiv5_>
                <StyledDiv5_1>
                  <StyledDiv5_2>
                    Tue
                    <StyledDiv5_3>30/7</StyledDiv5_3>
                  </StyledDiv5_2>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[2].main.temp_min)}°
                    <StyledDiv5_3>Low</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[2].main.temp_max)}°
                    <StyledDiv5_3>High</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_5>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </StyledDiv5_5>
                  <StyledDiv5_6>
                    {forecast.list[2].main.humidity}%
                    <StyledDiv5_3>Humidity</StyledDiv5_3>
                  </StyledDiv5_6>
                  <StyledDiv5_6>
                    {forecast.list[2].wind.speed}mph
                    <StyledDiv5_3>Wind</StyledDiv5_3>
                  </StyledDiv5_6>
                </StyledDiv5_1>
                <StyledDiv5_1>
                  <StyledDiv5_2>
                    Wed
                    <StyledDiv5_3>31/7</StyledDiv5_3>
                  </StyledDiv5_2>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[10].main.temp_min)}°
                    <StyledDiv5_3>Low</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[10].main.temp_max)}°
                    <StyledDiv5_3>High</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_5>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.list[10].weather[0].icon}@2x.png`}
                    />
                  </StyledDiv5_5>
                  <StyledDiv5_6>
                    {forecast.list[10].main.humidity}%
                    <StyledDiv5_3>Humidity</StyledDiv5_3>
                  </StyledDiv5_6>
                  <StyledDiv5_6>
                    {forecast.list[10].wind.speed}mph
                    <StyledDiv5_3>Wind</StyledDiv5_3>
                  </StyledDiv5_6>
                </StyledDiv5_1>
                <StyledDiv5_1>
                  <StyledDiv5_2>
                    Thur
                    <StyledDiv5_3>1/8</StyledDiv5_3>
                  </StyledDiv5_2>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[18].main.temp_min)}°
                    <StyledDiv5_3>Low</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[18].main.temp_max)}°
                    <StyledDiv5_3>High</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_5>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.list[18].weather[0].icon}@2x.png`}
                    />
                  </StyledDiv5_5>
                  <StyledDiv5_6>
                    {forecast.list[18].main.humidity}%
                    <StyledDiv5_3>Humidity</StyledDiv5_3>
                  </StyledDiv5_6>
                  <StyledDiv5_6>
                    {forecast.list[18].wind.speed}mph
                    <StyledDiv5_3>Wind</StyledDiv5_3>
                  </StyledDiv5_6>
                </StyledDiv5_1>
                <StyledDiv5_1>
                  <StyledDiv5_2>
                    Tue
                    <StyledDiv5_3>2/8</StyledDiv5_3>
                  </StyledDiv5_2>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[26].main.temp_min)}°
                    <StyledDiv5_3>Low</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[26].main.temp_max)}°
                    <StyledDiv5_3>High</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_5>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.list[26].weather[0].icon}@2x.png`}
                    />
                  </StyledDiv5_5>
                  <StyledDiv5_6>
                    {forecast.list[26].main.humidity}%
                    <StyledDiv5_3>Humidity</StyledDiv5_3>
                  </StyledDiv5_6>
                  <StyledDiv5_6>
                    {forecast.list[26].wind.speed}mph
                    <StyledDiv5_3>Wind</StyledDiv5_3>
                  </StyledDiv5_6>
                </StyledDiv5_1>
                <StyledDiv5_1>
                  <StyledDiv5_2>
                    Tue
                    <StyledDiv5_3>30/7</StyledDiv5_3>
                  </StyledDiv5_2>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[34].main.temp_min)}°
                    <StyledDiv5_3>Low</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_4>
                    {KalvinToCelsius(forecast.list[34].main.temp_max)}°
                    <StyledDiv5_3>High</StyledDiv5_3>
                  </StyledDiv5_4>
                  <StyledDiv5_5>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.list[34].weather[0].icon}@2x.png`}
                    />
                  </StyledDiv5_5>
                  <StyledDiv5_6>
                    {forecast.list[34].main.humidity}%
                    <StyledDiv5_3>Humidity</StyledDiv5_3>
                  </StyledDiv5_6>
                  <StyledDiv5_6>
                    {forecast.list[34].wind.speed}mph
                    <StyledDiv5_3>Wind</StyledDiv5_3>
                  </StyledDiv5_6>
                </StyledDiv5_1>
              </StyledDiv5_>
            </StyledDiv5>
          </StyledDiv>
        </StyledMain>
      )}
    </div>
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
const StyledH2 = styled.h2`
  /*color: rgba(255, 255, 255, 0.8);*/
  font-size: 1em;
  font-weight: normal;
  @media screen and (min-width: 768px) {
    font-size: 1.125em;
  }
`;
const StyledDiv4_ = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledDiv4_1 = styled.div`
  padding: 0.8em 0;
  width: 13%;
  border-radius: 5px;
  /*background-color: rgba(0, 0, 0, 0.15);/*
  font-size: 1.125em;
  text-align: center;
  @media screen and (min-width: 880px) {
    width: 6.05em;
  }
`;
const StyledDiv4_2 = styled.div`
  margin-bottom: 0.5em;
`;
const StyledDiv5 = styled.div`
  width: 100%;
  margin-top: 1em;
`;
const StyledH2_ = styled.div`
  /*color: rgba(255, 255, 255, 0.8);*/
  font-size: 1em;
  font-weight: normal;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  @media screen and (min-width: 768px) {
    font-size: 1.125em;
  }
`;
const StyledDiv5_ = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StyledDiv5_1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.3em;
  padding: 0.8em 0;
  width: 100%;
  border-radius: 5px;
  /*background-color: rgba(0, 0, 0, 0.2);*/
  font-size: 1.19em;
  text-align: center;
`;
const StyledDiv5_2 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  margin-bottom: 0.6em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
    order: -2;
  }
`;
const StyledDiv5_3 = styled.div`
  /*color: rgba(255, 255, 255, 0.6);*/
  font-size: 0.83em;
`;
const StyledDiv5_4 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  margin-bottom: 0.6em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
  }
`;
const StyledDiv5_5 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
    order: -1;
  }
`;
const StyledDiv5_6 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
  }
`;

export default Meteo;
