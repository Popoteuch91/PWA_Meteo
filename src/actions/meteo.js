export const DISPLAY_METEO = "DISPLAY_METEO";
export const DISPLAY_COORDONNEES = "DISPLAY_COORDONNEES";

export const displayMeteo = (meteo) => ({
  type: DISPLAY_METEO,
  payload: meteo,
});

export const getCurrentLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    dispatch(
      displayCoordonnees({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    );
  });
};

export const displayCoordonnees = (coordonnees) => ({
  type: DISPLAY_COORDONNEES,
  payload: coordonnees,
});
