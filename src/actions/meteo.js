import axios from "axios";
export const DISPLAY_METEO = "DISPLAY_METEO";
export const DISPLAY_METEOS = "DISPLAY_METEOS";
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

export const getMeteo = (coordonnees) => (dispatch) => {
  axios({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      ...coordonnees,
      appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
    },
  })
    .then((res) => {
      dispatch(displayMeteo(res.data));
    })
    .catch((err) => err);
};

export const displayMeteos = (meteos) => ({
  type: DISPLAY_METEOS,
  payload: meteos,
});

export const getMeteos = (villes) => (dispatch) => {
  let meteos = [];
  villes.map((ville) => {
    axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lon: ville.geometry.coordinates[0],
        lat: ville.geometry.coordinates[1],
        appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
      },
    })
      .then((res) => {
        meteos[ville.properties.citycode] = res.data;
      })
      .catch((err) => err);
    return null;
  });
  dispatch(displayMeteos(meteos));
};
