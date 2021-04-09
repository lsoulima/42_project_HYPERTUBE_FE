import axios from "axios";
const API_URL = "http://localhost:3001/api/movies";

//* MOVIES LIST
export const moviesAction = async (token, page, sort, filter) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      sort: sort,
    },
  };
  try {
    const res = await axios.get(API_URL + "/list", config);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};
