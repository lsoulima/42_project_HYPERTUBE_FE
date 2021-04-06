import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./actionsTypes";

export const Initialstate = {
  isAuth: false,
  token: null,
  success: false,
};

export const HyperReducer = (state = Initialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        isAuth: true,
        token: payload.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuth: false,
        success: false,
        token: payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: null,
      };
    default:
      return {};
  }
};
