import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";
// //* GET DATA PROFILE
export const getUser = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(API_URL + "profile", config);

    if (res.data) return res.data.data;
  } catch (error) {
    return false;
  }
};

// //* GET DATA OTHERS PROFILE BY ID
// const findProfileById = (token, id) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return axios.get(API_URL + "find/" + id, { config });
// };
// //* GET DATA OTHERS PROFILE BY USERNAME
// const findProfileByUsername = (token, username) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return axios.get(API_URL + "find/" + username, { config });
// };

//*EDIT USER PROFILE

export const settingsAction = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.patch(API_URL + "edit/informations", data, config);

    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
  }
};

//* Update password Action

export const changePassword = async (token, editpassword) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.patch(
      API_URL + "edit/password",
      editpassword,
      config
    );

    if (res) return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
