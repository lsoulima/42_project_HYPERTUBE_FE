import React, { useContext } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import { HyperContext } from "../Context/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(HyperContext);
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        state.token ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
