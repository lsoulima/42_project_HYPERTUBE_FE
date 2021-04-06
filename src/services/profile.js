import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";
//* GET DATA PROFILE
const getProfile = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "profile", { config });
};

//* GET DATA OTHERS PROFILE BY ID
const findProfileById = (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "find/" + id, { config });
};
//* GET DATA OTHERS PROFILE BY USERNAME
const findProfileByUsername = (token, username) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "find/" + username, { config });
};

//*EDIT USER PROFILE

const settings = (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(API_URL + "edit/informations", data, { config });
};

export default {
  getProfile,
  findProfileByUsername,
  findProfileById,
  settings,
};