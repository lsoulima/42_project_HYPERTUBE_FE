import React, { useContext } from "react";
import { useHistory, Route } from "react-router-dom";
import { HyperContext } from "../Context/context";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(HyperContext);
  // const [logged, setLogged] = useState(false);
  // setLogged(state.isAuth);
  // console.log(logged);
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={
        (props) =>
          state.token ? (
            history.push("/library")
          ) : (
            // <div>
            //   <span>YOU ARE NOT LOGGED</span>
            // </div>
            <Component {...props} />
          )
        // logged ? <Redirect to='/library' /> : <Component {...props} />;
      }
    />
  );
};

export default PublicRoute;
