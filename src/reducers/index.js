import { combineReducers } from "redux";

import meteo from "./meteo";
import ville from "./ville";

const rootReducer = combineReducers({
  meteo,
  ville,
});

export default rootReducer;
