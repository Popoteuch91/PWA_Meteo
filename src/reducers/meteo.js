import { DISPLAY_METEO } from "../actions/meteo";

const initialState = {
  meteo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_METEO:
      return {
        ...state,
        meteo: action.payload,
      };
    default:
      return state;
  }
};
