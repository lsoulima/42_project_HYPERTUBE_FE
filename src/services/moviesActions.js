import axios from "axios";
const API_URL = "http://localhost:3001/api/movies";

//* MOVIES LIST
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

//* Movies data Details

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
