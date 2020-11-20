import { DISPLAY_VILLES, DISPLAY_SEARCH, SET_SEARCH } from "../actions/ville";

const initialState = {
  villes: [],
  search: "",
};

const export_ville = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_VILLES:
      return {
        ...state,
        villes: action.payload,
      };
    case DISPLAY_SEARCH:
      return {
        ...state,
        search: state.search,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default export_ville;
