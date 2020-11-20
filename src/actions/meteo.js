import axios from "axios";

export const DISPLAY_METEO = "DISPLAY_METEO";

export const displayMeteo = (meteo) => ({
  type: DISPLAY_METEO,
  payload: meteo,
});

export const getMeteo = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lattlong = `${position.coords.latitude},${position.coords.longitude}`;
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    console.log(lattlong);
    axios({
      method: "GET",
      url: "https://www.metaweather.com/api/location/search/?query=london",
      // params: {
      //   lattlong: lattlong,
      // },
    })
      .then((res) => {
        console.log(res);
        dispatch(displayMeteo(res));
      })
      .catch((err) => err);
  });
};
