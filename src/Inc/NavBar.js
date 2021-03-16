import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import styled from "styled-components";

import i18n from "../i18n";

const IconBtn = styled(IconButton)`
  margin-right: 10px;
  :hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;

const NavButton = styled.div`
  vertical-align: "middle";
  border-radius: 15px;
  text-align: center;
  width: 150px;
  padding: 10px;
  margin-right: 10px;
  :hover {
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.9);
  }
  .link {
    color: #333;
    font-size: 18px;
    :hover {
      text-decoration: none;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    background: "rgba(255,255,255,0.5)",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      color: "red",
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
  },
  inputRoot: {},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
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

function PrimarySearchAppBar({ t }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const preventDefault = (event) => event.preventDefault();
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
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <Link to="/edit">Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <Link to="/login">Logout</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AccountBoxIcon />
        </IconButton>
        <Link className="link" to="/register">
          Register
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <AccountBoxIcon />
        </IconButton>
        <Link className="link" to="/login">
          Login
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <FaceIcon />
        </IconButton>
        <Link className="link" to="/edit">
          Profile
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <img src="./img/logo.png" className={classes.logo} />
          <Typography className={classes.title} variant="h6" noWrap>
            yperTube
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {localStorage.getItem("i18nextLng") === "en" ? (
              <IconBtn onClick={() => changeLanguage("fr")}>
                <FlagIcon code="FR" size={25} />
              </IconBtn>
            ) : (
              <IconBtn onClick={() => changeLanguage("en")}>
                <FlagIcon code="US" size={25} />
              </IconBtn>
            )}
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
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              style={{ background: "rgba(255,0,0,0.7)" }}
              onClick={() => {
                history.push("/edit");
              }}
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
    </div>
  );
}

export default withNamespaces()(PrimarySearchAppBar);
