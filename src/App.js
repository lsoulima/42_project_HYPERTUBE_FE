import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Inc/NavBar";
import "./css/app.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Inc/Footer";

import EditProfile from "./Pages/EditProfile";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
