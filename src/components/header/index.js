import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Link = ({ className, text, ...props }) => (
  <a {...props} className={className}>
    {text}
  </a>
);
const Header = () => {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <MenuLink href="/home">
            <FontAwesomeIcon icon="home" size="2x" />
            <StyledComp text="Accueil" />
          </MenuLink>

          <MenuLink href="/meteo">
            <FontAwesomeIcon icon="cloud-moon" size="2x" />
            <StyledComp text="Météo" />
          </MenuLink>

          <MenuLink href="/favorite">
            <FontAwesomeIcon icon="star" size="2x" />
            <StyledComp text="Favoris" />
          </MenuLink>
        </NavLeft>
        <NavRight>
          <StyledInput as="a" href="/home">
            <FontAwesomeIcon icon="map-marker-alt" size="2x" />
          </StyledInput>
          <Input type="text" placeholder="Search" />
          <FontAwesomeIcon icon="search" size="2x" />
        </NavRight>
      </NavHeader>
    </Nav>
  );
};

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid;
  width: 100%;
  top: 0;
  position: fixed;
  background: white;

  @media (max-width: 1366px) {
    width: 100%;
    top: 0;
    position: fixed;
    background: white;
  }
  @media (max-width: 1024px) {
    width: 100%;
    top: 0;
    position: fixed;
    background: white;
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
  padding: 20px 20px;
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
    width: 50%;
    text-align: center;
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
const MenuLink = styled.a`
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
const StyledComp = styled(Link)`
  margin: 20px 0px 0px 10px;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: #296fc6;

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
  @media (max-width: 1024px) {
    width: 50%;
    text-align: center;
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
const StyledInput = styled.input`
  color: red;
`;
const Input = styled.input`
  width: 80%;
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
export default Header;
