import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../actions/ville";
import { getCurrentLocation } from "../../actions/meteo";
import { useTranslation } from "react-i18next";
import Toggle from "../toggle";
import { switchTheme, displayTheme } from "../../actions/theme";
import { ReactComponent as FlagFr } from "../../assets/france.svg";
import { ReactComponent as FlagEn } from "../../assets/usa.svg";

const Header = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ville.search);
  const theme = useSelector((state) => state.theme.mode);
  const themeInverse = theme === "light" ? "dark" : "light";
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <MenuLink to="/home">
            <FontAwesomeIcon icon="home" size="2x" />
            <StyledComp>{t("header.home")}</StyledComp>
          </MenuLink>
          <MenuLink to="/meteo">
            <FontAwesomeIcon icon="cloud-moon" size="2x" />
            <StyledComp>{t("header.meteo")}</StyledComp>
          </MenuLink>
          <MenuLink to="/favorite">
            <FontAwesomeIcon icon="star" size="2x" />
            <StyledComp>{t("header.favorite")}</StyledComp>
          </MenuLink>
        </NavLeft>
        <NavRight>
          <FontAwesomeIcon
            onClick={() => {
              dispatch(getCurrentLocation());
              history.push("/meteo");
            }}
            icon="map-marker-alt"
            size="2x"
          />
          <Input
            type="text"
            placeholder={t("header.search")}
            value={search}
            onChange={(event) => {
              dispatch(setSearch(event.target.value));
              history.push("/search");
            }}
          />
          <StyledButton onClick={() => i18n.changeLanguage("fr")}>
            <FlagFr />
          </StyledButton>
          <StyledButton onClick={() => i18n.changeLanguage("en")}>
            <FlagEn />
          </StyledButton>
          <Toggle
            theme={theme}
            toggleTheme={() => dispatch(displayTheme(themeInverse))}
          />
        </NavRight>
      </NavHeader>
    </Nav>
  );
};

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid;

  @media (max-width: 1366px) {
    border-bottom: none;
  }
  @media (max-width: 1024px) {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    border-bottom: none;
  }
  @media (max-width: 375px) {
    border-bottom: none;
  }
`;
const NavHeader = styled.div`
  /*max-width: 90%;*/
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 1366px) {
    padding: 20px 20px;
  }
  @media (max-width: 1024px) {
    padding: 20px 20px;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
  @media (max-width: 375px) {
    padding: 0;
  }
`;
const NavLeft = styled.div`
  width: 40%;
  text-align: center;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    height: 60px;
    position: fixed;
    bottom: 0;
    border-top: 1px solid black;
    padding-top: 4%;
    background: white;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    height: 60px;
    position: fixed;
    bottom: 0;
    border-top: 1px solid black;
    padding-top: 4%;
    background: white;
  }
  @media (max-width: 375px) {
    width: 100%;
    text-align: center;
    height: 60px;
    position: fixed;
    bottom: 0;
    border-top: 1px solid black;
    padding-top: 4%;
    background: white;
  }
`;
const MenuLink = styled(Link)`
  float: left;
  padding-left: 5%;
  padding-right: 5%;
  border-right: 1px solid black;
  text-decoration: none;
  color: #ffcc32;
  @media (max-width: 1366px) {
    float: left;
    padding-left: 4%;
    padding-right: 4%;
    border-right: 1px solid black;
  }
  @media (max-width: 768px) {
    float: left;
    padding-left: 9%;
    padding-right: 8%;
    border-right: none;
    display: block;
  }
  @media (max-width: 375px) {
    float: left;
    padding-left: 11%;
    padding-right: 10%;
    border-right: none;
    &:hover {
      color: #296fc6;
    }
  }
`;
const StyledComp = styled.span`
  margin: 20px 0px 0px 10px;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: #296fc6 !important;

  @media (max-width: 1366px) {
    font-size: 1.5rem;
  }
  @media (max-width: 375px) {
    /*font-size: 1.3rem;*/
    display: none;
  }
`;
const NavRight = styled.div`
  width: 60%;
  text-align: left;
  @media (max-width: 1366px) {
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    border-bottom: 1px solid black;
    padding-top: 4%;
    background: white;
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    border-bottom: 1px solid black;
    padding-top: 4%;
    background: white;
    margin: 0;
  }
  @media (max-width: 375px) {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    border-bottom: 1px solid black;
    padding-top: 4%;
    background: white;
    margin: 0;
  }
`;
const Input = styled.input`
  width: 65%;
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 5px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 1.5rem;
  font-weight: 300;
  background: #fafafa;
  padding-left: 1%;
  margin-right: 3%;
  margin-left: 3%;
  &:active,
  &:focus {
    text-align: left;
    font-size: 1.5rem;
  }

  @media (max-width: 1024px) {
    width: 70%;
    margin-right: 5%;
    margin-left: 5%;
    font-size: 1.3rem;
    &:active,
    &:focus {
      text-align: left;
      font-size: 1.3rem;
    }
  }
  @media (max-width: 768px) {
    width: 75%;
    font-size: 2rem;
    &:active,
    &:focus {
      font-size: 2rem;
    }
  }
  @media (max-width: 375px) {
    width: 65%;
    font-size: 1.5rem;
    &:active,
    &:focus {
      font-size: 1.5rem;
    }
  }
`;
const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: transparent;
  svg {
    width: 2.5rem;
    height: auto;
  }
`;
export default Header;
