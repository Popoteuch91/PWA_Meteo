import { combineReducers } from "redux";

import meteo from "./meteo";
import ville from "./ville";

export default combineReducers({
  meteo,
  ville,
});
