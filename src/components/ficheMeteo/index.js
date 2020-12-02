import React from "react";
import { KalvinToCelsius, UnixTimeToHour } from "../../mixins/functions";
import { pushFavorites } from "../../actions/ville";
import { displayCoordonnees } from "../../actions/meteo";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const FicheMeteo = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <StyledDiv>
      <StyledDiv1>
        <StyledH1>{props.ville.properties.label}</StyledH1>
      </StyledDiv1>
      <StyledDiv2>
        <StyledDiv2_>
          <img
            src={`http://openweathermap.org/img/wn/${props.ville.meteo.weather[0].icon}@2x.png`}
          />
        </StyledDiv2_>
        <StyledDiv2_1>
          <StyledDiv2_2>
            {KalvinToCelsius(props.ville.meteo.main.temp)}°
          </StyledDiv2_2>
          <StyledDiv2_3>{props.ville.meteo.weather[0].main}</StyledDiv2_3>
        </StyledDiv2_1>
      </StyledDiv2>
      <StyledDiv3>
        <div>
          <StyledDiv3_>
            {KalvinToCelsius(props.ville.meteo.main.temp_max)}°
          </StyledDiv3_>
          <StyledDiv3_1>{t("meteo.temp_max")}</StyledDiv3_1>
          <StyledDiv3_>
            {KalvinToCelsius(props.ville.meteo.main.temp_min)}°
          </StyledDiv3_>
          <StyledDiv3_1>{t("meteo.temp_min")}</StyledDiv3_1>
        </div>
        <div>
          <StyledDiv3_>{props.ville.meteo.wind.speed}mph</StyledDiv3_>
          <StyledDiv3_1>{t("meteo.wind")}</StyledDiv3_1>
          <StyledDiv3_>{props.ville.meteo.main.humidity}%</StyledDiv3_>
          <StyledDiv3_1>{t("meteo.humidity")}</StyledDiv3_1>
        </div>
        <div>
          <StyledDiv3_>
            {UnixTimeToHour(props.ville.meteo.sys.sunrise)}
          </StyledDiv3_>
          <StyledDiv3_1>{t("meteo.sunrise")}</StyledDiv3_1>
          <StyledDiv3_>
            {UnixTimeToHour(props.ville.meteo.sys.sunset)}
          </StyledDiv3_>
          <StyledDiv3_1>{t("meteo.sunset")}</StyledDiv3_1>
        </div>
      </StyledDiv3>
      <div>
        <StyledButton
          onClick={() => {
            dispatch(pushFavorites(props.ville));
            history.push("/favorite");
          }}
        >
          {t("favorite.add")}
        </StyledButton>
        <StyledButton1
          onClick={() => {
            dispatch(
              displayCoordonnees({
                lon: props.ville.geometry.coordinates[0],
                lat: props.ville.geometry.coordinates[1],
              })
            );
            history.push("/meteo");
          }}
        >
          {t("favorite.set_location")}
        </StyledButton1>
      </div>
    </StyledDiv>
  );
};

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
    background: #e67d23;
  }
  @media (max-width: 1366px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: #e67d23;
  }
  @media (max-width: 1024px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: #e67d23;
  }
  @media (max-width: 768px) {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: #e67d23;
  }
  @media (max-width: 375px) {
    margin-top: 1em;
    margin-bottom: 0.3em;
    padding: 0.8em 0.8em;
    border-radius: 5px;
    background: #e67d23;
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
  background: #7e8c8d;
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
export default FicheMeteo;
