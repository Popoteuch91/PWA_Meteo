import axios from "axios";

/** base url to make requests to the cities database */
const instance = axios.create({
  baseURL: "https://api-adresse.data.gouv.fr/search/",
});

export default instance;
