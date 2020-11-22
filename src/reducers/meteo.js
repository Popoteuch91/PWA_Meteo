import { DISPLAY_METEO, DISPLAY_COORDONNEES } from "../actions/meteo";

const initialState = {
  meteo: [],
  coordonnees: {
    lon: 3.042048,
    lat: 36.752887,
  },
};

const export_meteo = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_METEO:
      return {
        ...state,
        meteo: action.payload,
      };
    case DISPLAY_COORDONNEES:
      return {
        ...state,
        coordonnees: action.payload,
      };
    default:
      return state;
  }
};

export default export_meteo;
