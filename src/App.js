import React from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Routes from "./config/router";

function App() {
  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
