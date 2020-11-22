export const SET_SEARCH = "SET_SEARCH";
export const PUSH_FAVORITES = "PUSH_FAVORITES";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const pushFavorites = (favorite) => ({
  type: PUSH_FAVORITES,
  payload: favorite,
});

export const removeFavorite = (id) => ({
  type: REMOVE_FAVORITE,
  payload: id,
});
