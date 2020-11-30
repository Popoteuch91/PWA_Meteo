import { DISPLAY_THEME, SWITCH_THEME } from "../actions/theme";

const initialState = {
  mode: "light",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_THEME:
      return { ...state, mode: action.payload };
    case SWITCH_THEME:
      if (state.mode === "light")
        return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    default:
      return state;
  }
};
