import axios from "axios";

/** base url to make requests to the meteo database */
const Weather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});
const Forecast = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
});

export { Forecast, Weather };
