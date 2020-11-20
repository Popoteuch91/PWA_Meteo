import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <div>
      <StyledDiv>
        <StyledText>
          © <StyledSpan>2020</StyledSpan>
          <StyledLink href="/home" className="transition">
            Météo
          </StyledLink>
          All rights reserved.
        </StyledText>
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  color: white;
  font-weight: 600;
  padding: 30px 0;
  background-color: black;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 375px) {
    display: none;
  }
`;
const StyledText = styled.p`
  margin-bottom: 0;
  line-height: 50px;
  font-size: 20px;
`;
const StyledSpan = styled.span`
  color: white;
`;
const StyledLink = styled.a`
  color: #296fc6;
  margin-left: 3px;
  padding-right: 3px;
  text-decoration: none;
  &:hover {
    color: #ffcc32;
    text-decoration: none;
  }
`;
export default Footer;
