import { DISPLAY_METEO, DISPLAY_COORDONNEES } from "../actions/meteo";

const initialState = {
  meteo: [],
  coordonnees: {
    lon: -0.6337376,
    lat: 35.6976541,
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
