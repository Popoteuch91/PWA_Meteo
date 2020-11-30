import { combineReducers } from "redux";

import meteo from "./meteo";
import ville from "./ville";
import theme from "./theme";

const rootReducer = combineReducers({
  meteo,
  ville,
  theme,
});

export default rootReducer;
