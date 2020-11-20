import React from "react";
import { Provider } from "react-redux";
import { store } from "./config/store";

import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Routes from "./config/router";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes />
      <Footer />
    </Provider>
  );
}

export default App;
