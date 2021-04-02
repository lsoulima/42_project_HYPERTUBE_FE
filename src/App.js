import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Inc/NavBar";
import "./css/app.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Inc/Footer";
import EditProfile from "./Pages/EditProfile";
import Library from "./Pages/Library";
import Stream from "./Pages/Stream";
import { useState } from "react";
import Profile from "./Pages/Profile";
import ForgetPwd from "./Pages/ForgetPwd";
import { ThemeProvider } from "styled-components";

import HyperContext from "./Context/context";
const App = () => {
  const [theme, setTheme] = useState({
    background:
      localStorage.getItem("theme") === "light"
        ? "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);"
        : "#202026",
    background_btn:
      localStorage.getItem("theme") === "light" ? "black" : "#fff",
    text_background:
      localStorage.getItem("theme") === "light" ? "#fff" : "black",
    text: localStorage.getItem("theme") === "light" ? "#202026" : "#fff",
    background_grey_2:
      localStorage.getItem("theme") === "light"
        ? "black"
        : "hsla(0,0%,100%,0.2)",
    background_grey_5:
      localStorage.getItem("theme") === "light"
        ? "black"
        : "hsla(0,0%,100%,0.5)",
    cards:
      localStorage.getItem("theme") === "light"
        ? "#fff"
        : "hsla(0,0%,100%,0.13)",
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavBar mytheme={theme} settheme={setTheme} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/library" component={Library} />
          <Route path="/stream" component={Stream} />
          <Route path="/profile" component={Profile} />
          <Route path="/forgetpwd" component={ForgetPwd} />

          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
