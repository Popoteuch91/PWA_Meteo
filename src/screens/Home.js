import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Weather } from "../axios/meteo";
import { useSelector } from "react-redux";
import { KalvinToCelsius } from "../mixins/functions";

const Home = () => {
  const { t } = useTranslation();
  const coordonnees = useSelector((state) => state.meteo.coordonnees);
  const appid = useSelector((state) => state.ville.appid);
  const [vetements, setVetements] = useState({
    casquette: false,
    echarpe: false,
    lunettes_soleil: false,
    parapluie: false,
    gants: false,
    bottes: false,
    pull: false,
    manteau: false,
    short: false,
    pantalon: false,
  });
  useEffect(() => {
    Weather.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      /* Traitement de la météo
       * Données utilisable :
       * res.data.main.temp
       * res.data.weather[0].main/humidity
       * res.data.wind.deg/speed
       */
      if (KalvinToCelsius(res.data.main.temp) > 20) {
        setVetements({ ...vetements, short: true });
        if (res.data.weather[0].main === "Clear") {
          setVetements({
            ...vetements,
            casquette: true,
            lunettes_soleil: true,
          });
        }
      } else {
        setVetements({ ...vetements, pantalon: true, pull: true });
      }
      if (KalvinToCelsius(res.data.main.temp) <= 10) {
        setVetements({ ...vetements, manteau: true, echarpe: true });
      }
      if (
        KalvinToCelsius(res.data.main.temp) <= 0 ||
        res.data.weather[0].main === "Snow"
      ) {
        setVetements({ ...vetements, gants: true });
      }
      if (
        res.data.weather[0].main === "Rain" ||
        res.data.weather[0].main === "Snow"
      ) {
        setVetements({ ...vetements, parapluie: true, bottes: true });
      }
    });
  }, [coordonnees, appid]);
  return (
    <div>
      <StyledDiv>
        <StyledH1>{t("home.title")}</StyledH1>
        <StyledText>{vetements.pantalon}</StyledText>
        <StyledText>{vetements.short}</StyledText>
        {vetements.casquette ? <p>Il faut mettre une casquette</p> : ""}
        {vetements.echarpe ? <p>Il faut mettre une echarpe</p> : ""}
        {vetements.lunettes_soleil ? (
          <p>Il faut mettre des lunettes_soleil</p>
        ) : (
          ""
        )}
        {vetements.parapluie ? <p>Il faut mettre un parapluie</p> : ""}
        {vetements.gants ? <p>Il faut mettre des gants</p> : ""}
        {vetements.bottes ? <p>Il faut mettre des bottes</p> : ""}
        {vetements.pull ? <p>Il faut mettre un pull</p> : ""}
        {vetements.manteau ? <p>Il faut mettre un manteau</p> : ""}
        {vetements.short ? <p>Il faut mettre un short ou une jupe</p> : ""}
        {vetements.pantalon ? <p>Il faut mettre un pantalon</p> : ""}
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
export default Home;
