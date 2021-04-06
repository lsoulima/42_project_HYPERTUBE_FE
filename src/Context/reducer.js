import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./actionsTypes";

const token = localStorage.getItem("token");

export const Initialstate = {
  success: false,
  token: token,
};

export const HyperReducer = (state = Initialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,

        token: payload.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: payload.token,
      };
    case LOGOUT:
      return {
        ...state,

        token: null,
      };
    default:
      return {};
  }
};
