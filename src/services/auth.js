import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";

//* REGISTER USER
const registerAction = (data) => {
  console.log("dataregsuter", data);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(API_URL + "register", { config }, data);
};

//* LOGIN USER
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

//* LOGOUT USER
const logout = () => {
  localStorage.removeItem("user");
};

//* VERIFY USER ACCOUNT
const verifyAccount = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(API_URL + "verify", "", { config });
};

//* VERIFY TOKEN OF USER
const verifyToken = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(API_URL + "verify", { config });
};

// * RESET PASSWORD
const resetPwd = (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.patch(API_URL + "resetpassword", email, { config });
};

// * NEW PASSWORD
const newPwd = (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.patch(API_URL + "newpassword", data, { config });
};

export default {
  registerAction,
  login,
  logout,
  verifyToken,
  verifyAccount,
  resetPwd,
  newPwd,
};
