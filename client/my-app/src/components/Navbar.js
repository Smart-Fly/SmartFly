import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import { UPDATE_SUBSCRIPTION } from "../query/userQuery";
const logoSmartFly = require("../asset/SmartFlyLogo.png");

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // color: 'blue'
  },
  title: {
    display: "none",
    // color: 'blue',
    [theme.breakpoints.up("sm")]: {
      display: "block",
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
    // color: "blue",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
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
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    borderRadius: "30%",
    width: "4rem",
    height: "4rem",
  },
}));

const Navbar = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalShow, setModalShow] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  /** ============= START FUNGSI UPDATE DARI LUQMAN ================ */

  /** START STATE YANG DIGUNAKAN */
  const [showUserName, setShowUserName] = useState(""); // check Login
  const [showSubsStatus, setShowSubsstatus] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION);
  const [userSubsToUpdate] = useState({
    access_token: "",
    subsStatus: false,
  }); // Ini buat onSubmit yang dikirim ke server
  const history = useHistory();
  /** END STATE YANG DIGUNAKAN */

  useEffect(() => {
    if (localStorage) {
      setShowUserName(localStorage.getItem("userName"));
      setShowSubsstatus(localStorage.getItem("userName"));
    }
  }, [localStorage]);

  const toggleSwitchChange = (e) => {
    const { checked } = e.target;
    setShowSubsstatus(checked);
    setShowButton(true);
  };

  const handleSubmitSubs = (e) => {
    e.preventDefault();
    updateSubscription({
      variables: {
        updateData: {
          ...userSubsToUpdate,
          subsStatus: showSubsStatus,
          access_token: localStorage.getItem("access_token"),
        },
      },
    });
    handleMenuClose();
  };

  /** ============= END FUNGSI UPDATE DARI LUQMAN ================ */

  const handleProfileMenuOpen = (event) => {
    console.log(event.currentTarget, "ini apa");
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  /** ====================== INI RENDER MENU ====================== */
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        position="absolute"
      >
        <div className="row justify-content-center">
          <MenuItem onClick={handleMenuClose}>
            <div className="col-lg-12">
              <span style={{ fontSize: 15 }}>
                You are Sign in as <span color="blue">{showUserName}</span>
              </span>
            </div>
          </MenuItem>

          <MenuItem>
            <Form onSubmit={(e) => handleSubmitSubs(e)}>
              <FormControlLabel
                control={
                  <Switch
                    name="checkedA"
                    checked={showSubsStatus}
                    onChange={toggleSwitchChange}
                    variant="primary"
                  />
                }
                label="Change Subs Plan"
                style={{ maxWidth: "600px" }}
              />
              {showButton ? (
                <Button type="submit" variant="primary">
                  Save changes
                </Button>
              ) : null}
            </Form>
          </MenuItem>
        </div>
      </Menu>
    </>
  );

  /** ====================== INI RENDER MENU ====================== */

  /** ======================== INI NAVBAR ========================= */

  if (
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/flip"
  ) {
    return (
      <>
        <div className={classes.grow}>
          <Modal show={modalShow} onHide={() => setModalShow(false)}></Modal>
          <AppBar
            position="absolute"
            // style={
            //   pathname === "/"
            //     ? {
            //         background: "transparent",
            //         boxShadow: "none",
            //         border: "none",
            //       }
            //     : {
            //         background: "transparent",
            //         boxShadow: "none",
            //       }
            // }
            color="light"
            style={{ background: "transparent", boxShadow: "none" }}
            title={<img src={logoSmartFly} />}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              ></IconButton>
              <img src={logoSmartFly} alt="logo" className={classes.logo} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>{/* <SearchIcon /> */}</div>
                {pathname !== "/" ? (
                  <Button
                    onClick={() => setModalShow(true)}
                    color="primary"
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >
                    New Search
                  </Button>
                ) : null}
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {localStorage.getItem("access_token") ? (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle style={{ fontSize: 40 }} />
                  </IconButton>
                ) : (
                  <Button variant="primary" onClick={goToLoginPage}>
                    Log In
                  </Button>
                )}
              </div>
            </Toolbar>
            {renderMenu}
          </AppBar>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Navbar;
