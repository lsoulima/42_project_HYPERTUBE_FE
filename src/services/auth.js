import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";

//? AUTH USER
const register = (firstname, lastname, username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    lastname,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

//* VERIFY USER
const verify = (token) => {
  const config = {};
  return axios.post(API_URL + "verify", { config });
};
export default {
  register,
  login,
  logout,
};
