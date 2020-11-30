import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { persistor } from "./config/store";
import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useDarkMode } from "./actions/useDarkMode";
import { lightTheme, darkTheme } from "./config/theme";
import Toggle from "./components/toggle";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Routes from "./config/router";
import "./config/translations";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faCloudMoon,
  faStar,
  faSearch,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faHome, faCloudMoon, faStar, faMapMarkerAlt, faSearch);
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.p};
    padding: 0;
    margin: 0;
    transition: all 0.25s linear;
  } 
  a {
    color: ${({ theme }) => theme.text};
  }
`;
function App() {
  const theme = useSelector((state) => state.theme.mode);
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Header />
          <Routes />
          <Footer />
        </>
      </ThemeProvider>
    </PersistGate>
  );
}

export default App;
