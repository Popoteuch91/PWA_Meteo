import React from "react";
import {
  KalvinToCelsius,
  UnixTimeToDate,
  UnixTimeToDay,
} from "../../mixins/functions";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ForecastMeteo = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <StyledDiv>
      <StyledDiv2>
        {t(
          `week.${UnixTimeToDay(props.meteo.list[8 * props.iterator - 1].dt)}`
        )}
        <StyledDivDate>
          {UnixTimeToDate(props.meteo.list[8 * props.iterator - 1].dt)}
        </StyledDivDate>
      </StyledDiv2>
      <StyledDiv3>
        {KalvinToCelsius(
          props.meteo.list[8 * props.iterator - 1].main.temp_min
        )}
        °<StyledDivDate>{t("meteo.temp_min")}</StyledDivDate>
      </StyledDiv3>
      <StyledDiv3>
        {KalvinToCelsius(
          props.meteo.list[8 * props.iterator - 1].main.temp_max
        )}
        °<StyledDivDate>{t("meteo.temp_max")}</StyledDivDate>
      </StyledDiv3>
      <StyledDiv4>
        <img
          src={`http://openweathermap.org/img/wn/${
            props.meteo.list[8 * props.iterator - 1].weather[0].icon
          }@2x.png`}
        />
      </StyledDiv4>
      <StyledDiv5>
        {props.meteo.list[8 * props.iterator - 1].main.humidity}%
        <StyledDivDate>{t("meteo.humidity")}</StyledDivDate>
      </StyledDiv5>
      <StyledDiv5>
        {props.meteo.list[8 * props.iterator - 1].wind.speed}mph
        <StyledDivDate>{t("meteo.wind")}</StyledDivDate>
      </StyledDiv5>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.3em;
  padding: 0.8em 0;
  width: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 1.19em;
  text-align: center;
`;
const StyledDiv2 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  margin-bottom: 0.6em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
    order: -2;
  }
`;
const StyledDivDate = styled.div`
  /*color: rgba(255, 255, 255, 0.6);*/
  font-size: 0.83em;
`;
const StyledDiv3 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  margin-bottom: 0.6em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
  }
`;
const StyledDiv4 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
    order: -1;
  }
`;
const StyledDiv5 = styled.div`
  width: 33.33333%;
  font-size: 0.95em;
  @media screen and (min-width: 450px) {
    width: 16.666666%;
    margin-bottom: initial;
  }
`;

export default ForecastMeteo;
