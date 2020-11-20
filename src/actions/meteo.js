import axios from "axios";

export const DISPLAY_METEO = "DISPLAY_METEO";

export const displayMeteo = (meteo) => ({
  type: DISPLAY_METEO,
  payload: meteo,
});

export const getMeteo = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(displayMeteo(res.data));
      })
      .catch((err) => err);
  });
};
