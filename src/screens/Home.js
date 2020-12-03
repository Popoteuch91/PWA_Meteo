import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LoaderBase from "../components/loaderBase";
import { Weather } from "../axios/meteo";
import { useDispatch, useSelector } from "react-redux";
import {
  KalvinToCelsius,
  UnixTimeToDay,
  UnixTimeToDayNumber,
  UnixTimeToMonth,
} from "../mixins/functions";
import { getCurrentLocation } from "../actions/meteo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import { ReactComponent as Umbrella } from "../assets/umbrella.svg";
import { ReactComponent as Cap } from "../assets/cap.svg";
import { ReactComponent as Sunglasses } from "../assets/sunglasses.svg";
import { ReactComponent as Mask } from "../assets/mask.svg";
import { ReactComponent as Scarf } from "../assets/scarf.svg";
import { ReactComponent as Gloves } from "../assets/gloves.svg";
import { ReactComponent as Shirt } from "../assets/shirt.svg";
import { ReactComponent as Raincoat } from "../assets/raincoat.svg";
import { ReactComponent as Sweater } from "../assets/sweater.svg";
import { ReactComponent as Short } from "../assets/shorts.svg";
import { ReactComponent as Skirt } from "../assets/skirt.svg";
import { ReactComponent as Pants } from "../assets/pants.svg";
import { ReactComponent as Boot } from "../assets/boot.svg";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const coordonnees = useSelector((state) => state.meteo.coordonnees);
  const [meteo, setMeteo] = useState({});
  const appid = useSelector((state) => state.ville.appid);
  const [vetements, setVetements] = useState({
    masque: true,
    casquette: false,
    echarpe: false,
    lunettes_soleil: false,
    parapluie: false,
    gants: false,
    bottes: false,
    pull: false,
    manteau: false,
    short: false,
    shirt: false,
    pantalon: false,
  });
  console.log(meteo);
  useEffect(() => {
    Weather.get(
      `?lon=${coordonnees.lon}&lat=${coordonnees.lat}&appid=${appid}`
    ).then((res) => {
      setMeteo(res.data);
    });
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
    <StyledMain>
      <StyledDiv>
        <StyledH1>{t("home.title")}</StyledH1>
        <StyledPanel>
          <StyledPanelBody>
            {Object.keys(meteo).length === 0 && meteo.constructor === Object ? (
              <LoaderBase />
            ) : (
              <div>
                <StyledTitre>
                  <FontAwesomeIcon
                    onClick={() => {
                      dispatch(getCurrentLocation());
                      history.push("/home");
                    }}
                    icon="map-marker-alt"
                    size="sx"
                  />{" "}
                  - {meteo.name}, {meteo.sys.country}
                </StyledTitre>
              </div>
            )}
            <hr />
            {Object.keys(meteo).length === 0 && meteo.constructor === Object ? (
              <LoaderBase />
            ) : (
              <Wrapper>
                <WrapperLeft>
                  <img
                    src={`http://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
                  />
                </WrapperLeft>
                <WrapperRight>
                  <StyledDivTempTitre>
                    {t(`week.${UnixTimeToDay(meteo.dt)}`)}{" "}
                    {UnixTimeToDayNumber(meteo.dt)}{" "}
                    {t(`month.${UnixTimeToMonth(meteo.dt)}`)}
                  </StyledDivTempTitre>
                  <StyledDivTemp>
                    {KalvinToCelsius(meteo.main.temp)}{" "}
                    <StyledSpan>°</StyledSpan>
                  </StyledDivTemp>
                  <StyledDivTempHL>
                    {t("meteo.temp_max")}:{" "}
                    {KalvinToCelsius(meteo.main.temp_max)}° |{" "}
                    {t("meteo.temp_min")}:{" "}
                    {KalvinToCelsius(meteo.main.temp_min)}°
                  </StyledDivTempHL>
                </WrapperRight>
              </Wrapper>
            )}
          </StyledPanelBody>
        </StyledPanel>
        <StyledWrapper>
          <StyledH1>{t("home.title_cloth")}</StyledH1>
          <StyledText>{t("home.text_cloth")}</StyledText>
          <StyledDressCode>
            {vetements.parapluie ? (
              <div>
                <StyledUm>
                  <Umbrella />
                </StyledUm>
              </div>
            ) : (
              ""
            )}
            {vetements.casquette ? (
              <div>
                <div>
                  <Cap />
                </div>
              </div>
            ) : (
              ""
            )}{" "}
            {vetements.lunettes_soleil ? (
              <div>
                <div>
                  <Sunglasses />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.masque ? (
              <div>
                <div>
                  <Mask />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.echarpe ? (
              <div>
                <div>
                  <Scarf />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.gants ? (
              <div>
                <div>
                  <Gloves />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.shirt ? (
              <div>
                <div>
                  <Shirt />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.pull ? (
              <div>
                <div>
                  <Raincoat />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.manteau ? (
              <div>
                <div>
                  <Sweater />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.short ? (
              <div>
                <StyledShk>
                  <Short /> <Skirt />
                </StyledShk>
              </div>
            ) : (
              ""
            )}
            {vetements.pantalon ? (
              <div>
                <div>
                  <Pants />
                </div>
              </div>
            ) : (
              ""
            )}
            {vetements.bottes ? (
              <div>
                <div>
                  <Boot />
                </div>
              </div>
            ) : (
              ""
            )}
          </StyledDressCode>
        </StyledWrapper>
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
  hr {
    margin-top: 3px;
    border-width: 1px 0;
    border-color: white;
  }

  hr#hr-bottom {
    margin-top: 0px;
    margin-bottom: 5px;
  }
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
    margin-top: 40%;
    margin-bottom: 20%;
    padding: 1%;
    padding-left: 5%;
    padding-right: 5%;
  }
`;
const StyledDiv = styled.div`
  max-width: 100%;
  max-width: none !important;
  width: 1170px;
  display: block;
  vertical-align: middle;
  float: none;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
const StyledH1 = styled.h1`
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;
const StyledPanel = styled.div`
  box-shadow: -1px 2px 8px 0px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.2);
`;
const StyledPanelBody = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 5px;
`;
const StyledTitre = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.1;
`;
const Wrapper = styled.div`
  display: flex;
`;
const WrapperLeft = styled.div`
  width: 50%;
  text-align: center;
  img {
    height: 100%;
  }
`;
const WrapperRight = styled.div`
  width: 50%;
`;
const StyledDivTempTitre = styled.h4`
  text-align: left;
  font-size: 32px;
  font-weight: 400;
`;
const StyledDivTemp = styled.p`
  text-align: left;
  font-size: 150px;
  font-size: 300px;
  margin-top: -10px;
  margin-left: -10px;
  margin-bottom: 0;
  text-align: left;
  font-weight: 500;
  line-height: 230px;
`;
const StyledSpan = styled.span`
  vertical-align: baseline;
  position: relative;
  top: -150px;
  line-height: 0;
  font-size: 100px;
  font-weight: 400;
  margin-left: -10%;
`;
const StyledDivTempHL = styled.h5`
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 3%;
  font-weight: 300;
`;
const StyledWrapper = styled.div`
  margin-top: 5%;
`;
const StyledText = styled.p`
  font-size: 1.5rem;
  padding-right: 15px;
  padding-left: 15px;
  text-align: center;
`;
const StyledDressCode = styled.div`
  text-align: center;
  display: block;
  width: 50%;
  box-shadow: -1px 2px 8px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  svg {
    width: 50%;
  }
`;
const StyledUm = styled.div`
  padding-top: 5%;
`;
const StyledShk = styled.div`
  display: flex;
  margin-top: -10%;
`;

export default Home;
