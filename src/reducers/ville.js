import { DISPLAY_SEARCH, SET_SEARCH } from "../actions/ville";

const initialState = {
  villes: [],
  search: "",
  appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
};

const export_ville = (state = initialState, action) => {
  switch (action.type) {
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
