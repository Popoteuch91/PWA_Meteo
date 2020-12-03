import React from "react";
import { useSelector } from "react-redux";
import { persistor } from "./config/store";
import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./config/theme";
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
  faCloud,
  faWind,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faHome,
  faCloudMoon,
  faStar,
  faMapMarkerAlt,
  faSearch,
  faCloud,
  faWind,
  faCloudShowersHeavy
);
export const GlobalStyles = createGlobalStyle`
  body {
    

    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.p};

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
