import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import styled from "styled-components";

import i18n from "../i18n";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    background: "#202026",
  },
  title: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "inline",
      color: "red",
      cursor: "pointer",
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(8),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "8px",
  },

  inputRoot: {},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: "#fff",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const IconBtn = styled(IconButton)`
  margin-right: 10px;
  :hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }
`;

const NavButton = styled.div`
  vertical-align: "middle";
  border-radius: 15px;
  text-align: center;
  padding: 10px 15px;
  margin-right: 10px;
  :hover {
    cursor: pointer;
    background-color: hsla(0, 0%, 100%, 0.2);
  }
  .link {
    color: #fff;
    font-size: 18px;
    :hover {
      text-decoration: none;
    }
  }
`;

const ToggleTheme = styled.div`
  height: 15px;
  width: 45px;
  border: 1px solid white;
  border-radius: 50px;
  position: relative;
  margin-right: 20px;
  .monWraper {
    position: absolute;
    display: block;
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    bottom: -45%;
    right: -39%;
    transition: all 0.3s linear;
  }
  img {
    position: absolute;
    width: 13px;
    height: 15px;
    top: 5px;
    right: 6px;
  }
`;

const MobileMenu = styled(Menu)`
  .MuiPaper-root {
    background: ${(props) => props.theme.cards};
  }
  a {
    color: ${(props) => props.theme.text} !important;
  }
  svg {
    color: #fff;
  }
`;
const DesktopMenu = styled(Menu)`
  .MuiPaper-root {
    background: ${(props) => props.theme.cards};
    top: 55px !important;
  }
  a {
    color: ${(props) => props.theme.text} !important;
  }
`;
const Shadow = styled.div`
  .MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters {
    box-shadow: 0px 0px 50px -25px rgba(190, 186, 186, 0.56);
  }
`;

function NavBar({ t, mytheme, settheme }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let history = useHistory();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <DesktopMenu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/edit" style={{ color: "#fff" }}>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      </Link>
      <Link to="/login" style={{ color: "#fff" }}>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Link>
    </DesktopMenu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <MobileMenu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link className="link" to="/register">
        <MenuItem>Register</MenuItem>
      </Link>
      <Link className="link" to="/login">
        <MenuItem>Login</MenuItem>
      </Link>
      <Link className="link" to="/edit">
        <MenuItem onClick={handleProfileMenuOpen}>Settings</MenuItem>
      </Link>
    </MobileMenu>
  );

  const changeTheme = () => {
    const themeCheck = localStorage.getItem("theme");
    if (themeCheck === "light") {
      settheme({
        ...mytheme,
        background: "#202026",
        text: "#fff",
        background_btn: "#fff",
        text_background: "black",
        background_grey_2: "hsla(0,0%,100%,0.2)",
        background_grey_5: "hsla(0,0%,100%,0.5)",
        cards: "hsla(0,0%,100%,0.13)",
        border: "hsla(0,0%,100%,0.5)",
      });
      localStorage.setItem("theme", "dark");
    } else {
      settheme({
        ...mytheme,
        background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);",
        text: "#333",
        background_btn: "black",
        text_background: "#fff",
        background_grey_2: "black",
        background_grey_5: "black",
        cards: "#fff",
        border: "#cdcdcd",
      });
      localStorage.setItem("theme", "light");
    }
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark"
      ? false
      : localStorage.getItem("theme") === "light"
      ? true
      : false
  );
  const handlePosition = () => {
    setTheme((current) => !current);
    changeTheme();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={classes.grow}>
      <Shadow>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <div
              className={classes.title}
              onClick={() => {
                history.push("/");
              }}
            >
              <img src="./img/logo.png" className={classes.logo} alt="logo" />
              <Typography className={classes.title} variant="h4" noWrap>
                yperTube
              </Typography>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <NavButton>
                <Link className="link" to="/login">
                  {t("loginTr")}
                </Link>
              </NavButton>
              <NavButton>
                <Link className="link" to="/register">
                  {t("registerTr")}
                </Link>
              </NavButton>
              {localStorage.getItem("i18nextLng") === "en" ? (
                <IconBtn onClick={() => changeLanguage("fr")}>
                  <FlagIcon code="FR" size={25} />
                </IconBtn>
              ) : (
                <IconBtn onClick={() => changeLanguage("en")}>
                  <FlagIcon code="US" size={25} />
                </IconBtn>
              )}

              {/* check dark theme */}
              <ToggleTheme
                onClick={() => handlePosition()}
                style={
                  theme
                    ? { border: "1px solid white" }
                    : { border: "1px solid gray" }
                }
              >
                <span
                  className="monWraper"
                  style={
                    theme
                      ? { transform: "translateX(-15px)", background: "white" }
                      : { transform: "translateX(-40px)", background: "gray" }
                  }
                >
                  <img
                    src="./img/moon.svg"
                    alt="moon"
                    style={theme ? { color: "white" } : { color: "yellow" }}
                  />
                </span>
              </ToggleTheme>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                style={{ background: "red" }}
              >
                <AccountCircle style={{ color: "#fff" }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Shadow>
    </div>
  );
}

export default withNamespaces()(NavBar);
