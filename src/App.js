import React from "react";
import { Provider } from "react-redux";
import Store from "./config/store";
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
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Provider store={Store().store}>
      <PersistGate loading={null} persistor={Store().persistor}>
        <ThemeProvider theme={themeMode}>
          <>
            <GlobalStyles />
            <Toggle theme={theme} toggleTheme={toggleTheme} />
            <Header />
            <Routes />
            <Footer />
          </>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
