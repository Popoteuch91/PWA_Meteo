import axios from "axios";

export const DISPLAY_VILLES = "DISPLAY_VILLES";
export const DISPLAY_SEARCH = "DISPLAY_SEARCH";
export const SET_SEARCH = "SET_SEARCH";

export const displayVilles = (villes) => ({
  type: DISPLAY_VILLES,
  payload: villes,
});

export const getVilles = (search) => (dispatch) => {
  if (search.length >= 1) {
    axios({
      method: "GET",
      url: "https://api-adresse.data.gouv.fr/search/",
      params: {
        q: search,
        limit: 5,
        type: "municipality",
      },
    })
      .then((res_villes) => {
        let promises = [];
        res_villes.data.features.map((ville, idVille) => {
          promises.push(
            axios({
              method: "GET",
              url: "https://api.openweathermap.org/data/2.5/weather",
              params: {
                lon: ville.geometry.coordinates[0],
                lat: ville.geometry.coordinates[1],
                appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
              },
            })
              .then((res_meteo) => {
                res_villes.data.features[idVille].meteo = res_meteo.data;
              })
              .catch((err) => err)
          );
          return null;
        });
        Promise.all(promises).then((values) => {
          // Une fois tous les axios terminés, on lance displayVilles
          dispatch(displayVilles(res_villes.data.features));
        });
      })
      .catch((err) => err);
  }
};

export const getSearch = () => ({
  type: DISPLAY_SEARCH,
});

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});
