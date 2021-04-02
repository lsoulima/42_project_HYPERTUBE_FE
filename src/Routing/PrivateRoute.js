import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../helper/Verifications";
import { RegisterContext } from "../Contexts/RegisterContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(RegisterContext);

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin(state) ? (
          (state.isCompletinfo === true && rest.path !== "/steps") ||
          (rest.path === "/steps" && state.isCompletinfo === false) ? (
            <Component {...props} />
          ) : state.isCompletinfo === true ? (
            <Redirect to="/profile" />
          ) : (
            <Redirect to="/steps" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
