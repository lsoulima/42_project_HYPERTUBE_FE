import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../helper/Verifications";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/steps" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
