import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Routes from "./config/router";
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
