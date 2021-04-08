import React, { useContext } from "react";
import { useHistory, Route } from "react-router-dom";
import { HyperContext } from "../Context/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(HyperContext);
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        state.token ? <Component {...props} /> : history.push("/login")
      }
    />
  );
};

export default PrivateRoute;
