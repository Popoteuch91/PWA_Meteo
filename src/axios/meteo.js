import axios from "axios";

/** base url to make requests to the meteo database */
const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

export default instance;
