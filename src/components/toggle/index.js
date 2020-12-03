import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/sun.svg";
const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};
const ToggleContainer = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 8rem;
  height: 3.5rem;
  margin-left: 1%;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  svg {
    width: 2.5rem;
    height: auto;
    transition: all 0.3s linear;
    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

Toggle.propTypes = {
  toggleTheme: func.isRequired,
  theme: string.isRequired,
};

export default Toggle;
