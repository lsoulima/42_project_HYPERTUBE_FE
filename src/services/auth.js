import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "../Context/actionsTypes";

const API_URL = "http://localhost:3001/api/users/";

//* REGISTER USER
export const registerAction = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(API_URL + "register", data, config);
    if (res) return res.data;
    return false;
  } catch (error) {
    return error.response.data;
  }
};

// //* LOGIN USER

export const loginAction = async (loginData, dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(API_URL + "login", loginData, config);
    localStorage.setItem("token", res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        isAuth: true,
        token: res.data.token,
      },
    });

    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};

//* LOGOUT USER
export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
    payload: {
      isAuth: false,
      token: null,
    },
  });
};

//* VERIFY USER ACCOUNT
export const verifyAccount = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(
      API_URL + "verify/account",
      { token: token },
      "",
      config
    );
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// //* VERIFY TOKEN OF USER
// const verifyToken = (token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return axios.post(API_URL + "verify", { config });
// };

// * RESET PASSWORD
export const resetPwd = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(API_URL + "resetpassword", email, config);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// * NEW PASSWORD
export const newPwd = async (newPassData, token) => {
  let body = {
    token: token,
    newpassword: newPassData.newpassword,
    confirmpassword: newPassData.confirmpassword,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(API_URL + "newpassword", body, config);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};
