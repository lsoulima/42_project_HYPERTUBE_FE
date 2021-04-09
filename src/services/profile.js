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
// // ? PROFILE ACTION
// export const changeProfile = async (token, data) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   let form = new FormData();
//   form.append("profile", data);
//   try {
//     const res = await axios.put(
//       "http://localhost:3001/api/images/profile/upload",
//       form,
//       config
//     );
//     if (res) return res.data;
//   } catch (error) {
//     return error.response?.data;
//   }
// };
//*EDIT USER PROFILE

export const ProfileUpAction = async (token, file) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let formData = new FormData();

  formData.append("profile", file);
  try {
    const res = await axios.put(API_URL + "upload/profile", formData, config);
    console.log("hello");

    if (res) return res.data;
  } catch (error) {
    console.log("hello");
    return error.response.data;
  }
};

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
