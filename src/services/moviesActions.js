import axios from "axios";
const API_URL = "http://localhost:3001/api/movies";

//* Get Movies list
export const moviesListAction = async (token, page, sort, filter, search) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      sort: sort,
      genre: filter?.genre,
      quality: filter?.quality,
      rating: filter?.rating,
      search: typeof search != "undefined" && search ? search : "",
    },
  };
  try {
    const res = await axios.get(API_URL + "/list", config);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};

//* Get Movies data Details

export const movieDetailsAction = async (token, movieId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(API_URL + "/id/" + movieId, config);
    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

//* Get Movies Suggestions
export const movieSuggestions = async (token, movieId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(API_URL + "/suggestions/id/" + movieId, config);
    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

//* Post Movies to Favorite list

export const addMovieToFavorite = async (token, movieInfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(
      API_URL + "/add/tofavorite",
      movieInfo,
      config
    );

    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
//* Get Favorite list Movies

export const getFavoriteMovies = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(API_URL + "/favorite", config);

    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
//* Delete Favorite list Movies

export const DeleteFavoriteMovies = async (token, movieId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      API_URL + "/delete/fromfavorite/" + movieId,
      config
    );

    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
//* Post Movies to Watched list

export const addMovieToWatched = async (token, movieInfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(API_URL + "/add/towatch", movieInfo, config);
    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

//* Post Comment

export const addComment = async (token, movieId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(API_URL + "/comment/id/" + movieId, config);
    if (res) return res.data;
  } catch (error) {
    return error.response.data;
  }
};
