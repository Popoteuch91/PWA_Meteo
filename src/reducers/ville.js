import { SET_SEARCH, PUSH_FAVORITES, REMOVE_FAVORITE } from "../actions/ville";

const initialState = {
  favorites: [
    {
      geometry: {
        type: "Point",
        coordinates: [3.042048, 36.752887],
      },
      properties: {
        label: "Alger",
        score: 1,
        id: 0,
        type: "municipality",
        name: "Alger",
        postcode: 123,
        citycode: 123,
        population: 3916000,
        city: "Alger",
        context: "Alger",
        importance: 1,
      },
    },
  ],
  search: "",
  appid: "e23e25a0193db7cb3dd9bb17df22e6e9",
};

const export_ville = (state = initialState, action) => {
  let favArray = state.favorites;
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case PUSH_FAVORITES:
      favArray.push(action.payload);
      return {
        ...state,
        favorites: favArray,
      };
    case REMOVE_FAVORITE:
      favArray.splice(action.payload, 1);
      return {
        ...state,
        favorites: favArray,
      };
    default:
      return state;
  }
};

export default export_ville;
