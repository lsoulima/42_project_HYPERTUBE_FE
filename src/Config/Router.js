import React from "react";

//Pages component
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Chat from "./pages/Chat";
import Profile from "../pages/Profile";
import Settings from "./pages/Settings";
import { RegisterProvider } from "./Contexts/RegisterContext";

import Page404 from "./EmptyStates/404";

import Warning from "./EmptyStates/Warning";
import LandingPage from "./pages/LandingPage";
import CompleteProfile from "./pages/CompleteProfile";
import ForgotPswd from "./pages/ForgotPswd";
import Verify from "./pages/Verify";
// import About from "./components/About";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../Routing/PrivateRoute";

import PublicRoute from "../Routing/PublicRoute";

const Routing = () => {
  return (
    <RegisterProvider>
      <Router>
        <Switch>
          {/* Public Routes */}
          <PublicRoute
            restricted={true}
            component={Register}
            path='/register'
            exact
          />
          <PublicRoute
            restricted={true}
            component={Login}
            path='/login'
            exact
          />
          <PublicRoute
            restricted={true}
            component={Verify}
            path='/verify'
            exact
          />
          <PublicRoute
            restricted={true}
            component={LandingPage}
            path='/'
            exact
          />
          <PublicRoute
            restricted={true}
            component={ForgotPswd}
            path='/newpassword'
            exact
          />
          {/*   Private Routes */}
          <PrivateRoute component={Home} path='/home' exact />
          <Route component={Profile} path='/profile' exact />
          <Route component={Settings} path='/settings' exact />
          <PrivateRoute component={Chat} path='/chat' exact />
          <Route component={CompleteProfile} path='/steps' exact />
          {/* Other Routes */}
          <Route component={Page404} />

          <Page404 default />
        </Switch>
      </Router>
    </RegisterProvider>
  );
};

export default Routing;
