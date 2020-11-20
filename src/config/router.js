import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Meteo from "../screens/Meteo";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Search from "../screens/Search";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
      <Route path={"/home"} component={Home}></Route>
      <Route path={"/meteo"} component={Meteo}></Route>
      <Route path={"/favorite"} component={Favorite}></Route>
      <Route path={"/search"} component={Search}></Route>
      <Redirect to={"/"}></Redirect>
    </Switch>
  );
};

export default Routes;
