export const DISPLAY_THEME = "DISPLAY_THEME";
export const SWITCH_THEME = "SWITCH_THEME";

export const displayTheme = (theme) => ({
  type: DISPLAY_THEME,
  payload: theme,
});

export const switchTheme = () => ({
  type: SWITCH_THEME,
});
