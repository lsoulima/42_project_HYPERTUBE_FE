import React from "react";
import { ThemeProvider } from "styled-components";

const themeCheck = localStorage.getItem("theme");

// dark light
const theme = {
  colors: {
    background: themeCheck === "dark" ? "#202026" : "#fff",
    background_grey_2: "hsla(0,0%,100%,0.2)",
    background_grey_5: "hsla(0,0%,100%,0.5)",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
